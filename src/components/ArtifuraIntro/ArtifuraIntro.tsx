import React, { useEffect, useRef, useState, useCallback } from 'react';
import {
  ARTIFURA_CHARACTERS,
  ARTIFURA_CONFIGS,
  calculateJumpTrajectory,
  calculateLandingSettle,
  calculateMasterSettle,
} from './physics';
import type { DecoyLetterState, ArtifuraLetterRuntimeState } from './types';
import { ArtifuraSymbol, ArtifuraLambdaGlyph } from './ArtifuraSymbol';
import './artifuraIntro.css';

// In-memory module flag to ensure intro animation ONLY plays once per reload
let hasIntroPlayedInSession = false;
let hasSimulationEverStarted = false;

export function hasIntroPlayed(): boolean {
  return hasIntroPlayedInSession;
}

export function markIntroAsPlayed(): void {
  hasIntroPlayedInSession = true;
}

export function resetIntroSession(): void {
  hasIntroPlayedInSession = false;
  hasSimulationEverStarted = false;
}

interface ArtifuraIntroProps {
  onIntroComplete?: () => void;
  className?: string;
}

// Mixture of letters matching the exact typography and gold color
const DECOY_CHAR_POOL = [
  'A', 'R', 'T', 'K', 'M', 'N', 'X', 'P', 'V', 'S',
  'E', 'B', 'W', 'O', 'D', 'G', 'L', 'Z', 'H', 'Y'
];

export const ArtifuraIntro: React.FC<ArtifuraIntroProps> = ({
  onIntroComplete,
  className = '',
}) => {
  const prefersReducedMotion =
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Initial state: if already played in session or prefers-reduced-motion, start permanently settled
  const [isSettled, setIsSettled] = useState<boolean>(() => {
    return hasIntroPlayedInSession || prefersReducedMotion;
  });

  // Track which ARTIFURA letters have landed in order to reveal them progressively
  const [landedIndices, setLandedIndices] = useState<Set<number>>(() => {
    if (hasIntroPlayedInSession || prefersReducedMotion) {
      return new Set([0, 1, 2, 3, 4, 5, 6, 7]);
    }
    return new Set();
  });

  // State to trigger the subtle tagline reveal after settle
  const [showTagline, setShowTagline] = useState<boolean>(() => {
    return hasIntroPlayedInSession || prefersReducedMotion;
  });

  const containerRef = useRef<HTMLDivElement | null>(null);
  const wordmarkRef = useRef<HTMLHeadingElement | null>(null);
  const slotRefs = useRef<(HTMLSpanElement | null)[]>([]);

  // Refs for flying elements
  const flyingArtifuraElementsRef = useRef<(HTMLSpanElement | null)[]>([]);
  const decoyElementsRef = useRef<(HTMLSpanElement | null)[]>([]);

  // Keep callback reference stable to avoid effect re-triggers
  const onIntroCompleteRef = useRef(onIntroComplete);
  useEffect(() => {
    onIntroCompleteRef.current = onIntroComplete;
  }, [onIntroComplete]);

  // Execution guards
  const hasStartedRef = useRef<boolean>(false);
  const isRunningRef = useRef<boolean>(false);
  const hasTaglineShownRef = useRef<boolean>(false);

  const startTimeRef = useRef<number>(0);
  const rafIdRef = useRef<number>(0);
  const decoyLettersRef = useRef<DecoyLetterState[]>([]);
  const artifuraRuntimeRef = useRef<ArtifuraLetterRuntimeState[]>([]);
  const landedIndicesRef = useRef<Set<number>>(new Set());
  const masterSettleStartRef = useRef<number>(0);
  const targetPositionsRef = useRef<{ x: number; y: number }[]>([]);
  const groundYRef = useRef<number>(0);

  // Complete the animation cleanly
  const completeAnimation = useCallback(() => {
    if (isRunningRef.current) {
      cancelAnimationFrame(rafIdRef.current);
      isRunningRef.current = false;
    }

    markIntroAsPlayed();
    setLandedIndices(new Set([0, 1, 2, 3, 4, 5, 6, 7]));
    setIsSettled(true);
    setShowTagline(true);

    flyingArtifuraElementsRef.current.forEach((el) => {
      if (el) el.style.display = 'none';
    });
    decoyElementsRef.current.forEach((el) => {
      if (el) el.style.display = 'none';
    });

    if (wordmarkRef.current) {
      wordmarkRef.current.style.transform = 'scale(1, 1)';
    }

    onIntroCompleteRef.current?.();
  }, []);

  // Measure letter target positions precisely from actual DOM layout
  const measureTargets = useCallback(() => {
    const container = containerRef.current;
    if (!container) return;

    const containerRect = container.getBoundingClientRect();
    const positions: { x: number; y: number }[] = [];

    slotRefs.current.forEach((slot) => {
      if (slot) {
        const slotRect = slot.getBoundingClientRect();
        const x = slotRect.left - containerRect.left + slotRect.width / 2;
        const y = slotRect.top - containerRect.top + slotRect.height / 2;
        positions.push({ x, y });
      }
    });

    if (positions.length === 8) {
      targetPositionsRef.current = positions;
    }

    const H = containerRect.height;
    groundYRef.current = Math.min(H * 0.77, H - 95);
  }, []);

  // Initialize and run the physics simulation
  const startSimulation = useCallback(() => {
    if (hasStartedRef.current || hasSimulationEverStarted || hasIntroPlayedInSession || isRunningRef.current) {
      return;
    }

    hasStartedRef.current = true;
    hasSimulationEverStarted = true;

    measureTargets();

    const container = containerRef.current;
    if (!container || targetPositionsRef.current.length < 8) {
      hasStartedRef.current = false;
      hasSimulationEverStarted = false;
      requestAnimationFrame(startSimulation);
      return;
    }

    const containerRect = container.getBoundingClientRect();
    const W = containerRect.width;
    const isMobile = W < 768;
    const isTablet = W >= 768 && W < 1024;
    const groundY = groundYRef.current;

    // 1. Initialize Decoy Letters
    const decoyCount = isMobile ? 5 : isTablet ? 10 : 18;
    const decoys: DecoyLetterState[] = [];

    for (let i = 0; i < decoyCount; i++) {
      const char = DECOY_CHAR_POOL[i % DECOY_CHAR_POOL.length];
      const x = 40 + Math.random() * (W - 80);
      const y = -30 - Math.random() * 40;
      const fallDelay = 0.12 + (i / decoyCount) * 1.95 + (Math.random() - 0.5) * 0.25;
      const scale = (isMobile ? 0.85 : 0.92) + (Math.random() - 0.5) * 0.12;
      const gravity = 1600 + Math.random() * 300;
      const vx = (Math.random() - 0.5) * 55;
      const rot = (Math.random() - 0.5) * 35;
      const vrot = (Math.random() - 0.5) * 70;
      const bounceY = groundY + (Math.random() - 0.5) * 20;

      decoys.push({
        id: i,
        char,
        x,
        y,
        vx,
        vy: 0,
        rot,
        vrot,
        scale,
        opacity: 1,
        fallDelay: Math.max(0.08, fallDelay),
        gravity,
        bounceY,
        hasBounced: false,
        squashEndTime: 0,
        element: decoyElementsRef.current[i] || null,
      });
    }

    decoyLettersRef.current = decoys;

    // 2. Initialize 8 ARTIFURA Letters
    const artifuraList: ArtifuraLetterRuntimeState[] = [];
    const targets = targetPositionsRef.current;

    ARTIFURA_CONFIGS.forEach((config, idx) => {
      const target = targets[idx];
      const maxOffset = isMobile ? 42 : isTablet ? 80 : 135;
      const xOffset = config.xOffsetRatio * maxOffset;
      const xImpact = Math.max(36, Math.min(W - 36, target.x + xOffset));

      artifuraList.push({
        index: idx,
        char: config.char,
        config,
        status: 'pending',
        x: xImpact + (Math.random() - 0.5) * 8,
        y: -70,
        rot: (Math.random() - 0.5) * 24,
        scaleX: 1,
        scaleY: 1,
        opacity: 0,
        glow: 0,
        xImpact,
        yGround: groundY,
        targetX: target.x,
        targetY: target.y,
        tFallStart: config.fallDelay,
        tImpact: config.fallDelay + config.launchDelay,
        tLaunch: config.fallDelay + config.launchDelay + 0.06,
        tLand: config.fallDelay + config.launchDelay + 0.06 + config.jumpDuration,
        element: flyingArtifuraElementsRef.current[idx] || null,
      });
    });

    artifuraRuntimeRef.current = artifuraList;
    landedIndicesRef.current = new Set();
    startTimeRef.current = performance.now();
    isRunningRef.current = true;

    // 3. Main Animation Loop (High Performance 60/120 FPS)
    let lastTime = performance.now();

    const loop = (currentTime: number) => {
      if (!isRunningRef.current) return;

      const elapsedSec = (currentTime - startTimeRef.current) / 1000;
      const dt = Math.min((currentTime - lastTime) / 1000, 0.05);
      lastTime = currentTime;

      const H = containerRect.height;

      // A. UPDATE DECOY LETTERS
      const decoysList = decoyLettersRef.current;

      for (let i = 0; i < decoysList.length; i++) {
        const item = decoysList[i];
        const el = item.element;
        if (!el) continue;

        if (elapsedSec < item.fallDelay) {
          el.style.opacity = '0';
          continue;
        }

        item.vy += item.gravity * dt;
        item.y += item.vy * dt;
        item.x += item.vx * dt;
        item.rot += item.vrot * dt;

        // First impact: bounce
        if (!item.hasBounced && item.y >= item.bounceY) {
          item.y = item.bounceY;
          item.hasBounced = true;
          item.vy = -Math.abs(item.vy) * 0.38;
          item.vx *= 1.25;
          item.vrot = -item.vrot * 0.7;
          item.squashEndTime = currentTime + 45;
        }

        let scaleX = item.scale;
        let scaleY = item.scale;
        if (currentTime < item.squashEndTime) {
          scaleX = item.scale * 1.20;
          scaleY = item.scale * 0.80;
        }

        if (item.y > H + 120) {
          el.style.display = 'none';
          continue;
        }

        el.style.display = 'block';
        el.style.opacity = '1';
        el.style.transform = `translate3d(${item.x.toFixed(1)}px, ${item.y.toFixed(1)}px, 0) translate(-50%, -50%) rotate(${item.rot.toFixed(1)}deg) scale(${scaleX.toFixed(2)}, ${scaleY.toFixed(2)})`;
      }

      // B. UPDATE ARTIFURA LETTERS
      const artifuras = artifuraRuntimeRef.current;

      for (let i = 0; i < artifuras.length; i++) {
        const item = artifuras[i];
        const el = item.element;
        if (!el) continue;

        if (elapsedSec < item.tFallStart) {
          item.status = 'pending';
          el.style.opacity = '0';
          continue;
        }

        if (elapsedSec < item.tImpact) {
          item.status = 'falling';
          const fallProgress = (elapsedSec - item.tFallStart) / item.config.launchDelay;
          const easedFall = Math.pow(fallProgress, 1.6);
          item.y = -60 + (item.yGround - (-60)) * easedFall;
          item.x = item.xImpact;
          item.rot = Math.sin(fallProgress * Math.PI) * 12 * (item.config.xOffsetRatio > 0 ? 1 : -1);
          item.scaleX = 1;
          item.scaleY = 1;
          item.opacity = Math.min(1, fallProgress * 2.5);

          el.style.opacity = item.opacity.toFixed(3);
          el.style.transform = `translate3d(${item.x.toFixed(1)}px, ${item.y.toFixed(1)}px, 0) translate(-50%, -50%) rotate(${item.rot.toFixed(1)}deg) scale(1, 1)`;
          continue;
        }

        if (elapsedSec < item.tLaunch) {
          item.status = 'impact';
          const impactProgress = (elapsedSec - item.tImpact) / 0.06;
          item.x = item.xImpact;
          item.y = item.yGround;
          const squash = Math.sin(impactProgress * Math.PI);
          item.scaleX = 1.0 + squash * 0.28;
          item.scaleY = 1.0 - squash * 0.24;
          item.rot = item.config.xOffsetRatio < 0 ? 8 : -8;
          item.opacity = 1;

          el.style.opacity = '1';
          el.style.transform = `translate3d(${item.x.toFixed(1)}px, ${item.y.toFixed(1)}px, 0) translate(-50%, -50%) rotate(${item.rot.toFixed(1)}deg) scale(${item.scaleX.toFixed(3)}, ${item.scaleY.toFixed(3)})`;
          continue;
        }

        if (elapsedSec < item.tLand) {
          item.status = 'jumping';
          const jumpProgress = (elapsedSec - item.tLaunch) / item.config.jumpDuration;

          const trajectory = calculateJumpTrajectory(
            jumpProgress,
            item.xImpact,
            item.yGround,
            item.targetX,
            item.targetY,
            item.config.arcHeightRatio,
            item.config.extraRotation,
            item.config.xOffsetRatio < 0 ? 10 : -10
          );

          item.x = trajectory.x;
          item.y = trajectory.y;
          item.rot = trajectory.rot;
          item.scaleX = trajectory.scaleX;
          item.scaleY = trajectory.scaleY;
          item.opacity = 1;

          el.style.opacity = '1';
          el.style.transform = `translate3d(${item.x.toFixed(1)}px, ${item.y.toFixed(1)}px, 0) translate(-50%, -50%) rotate(${item.rot.toFixed(1)}deg) scale(${item.scaleX.toFixed(3)}, ${item.scaleY.toFixed(3)})`;
          continue;
        }

        // Post-landing stick settle (140ms elastic cushion)
        const timeSinceLand = elapsedSec - item.tLand;

        if (timeSinceLand < 0.14) {
          const settle = calculateLandingSettle(timeSinceLand / 0.14);
          el.style.opacity = '1';
          el.style.transform = `translate3d(${item.targetX.toFixed(1)}px, ${item.targetY.toFixed(1)}px, 0) translate(-50%, -50%) rotate(0deg) scale(${settle.scaleX.toFixed(3)}, ${settle.scaleY.toFixed(3)})`;
        } else {
          const slotEl = slotRefs.current[i];
          if (slotEl) {
            slotEl.style.visibility = 'visible';
            slotEl.style.opacity = '1';
          }
          el.style.display = 'none';

          if (!landedIndicesRef.current.has(i)) {
            landedIndicesRef.current.add(i);
            setLandedIndices(new Set(landedIndicesRef.current));

            if (i === 7) {
              masterSettleStartRef.current = currentTime;
            }
          }
        }
      }

      // C. WHOLE-WORD MASTER SETTLE
      if (masterSettleStartRef.current > 0) {
        const settleElapsed = (currentTime - masterSettleStartRef.current) / 1000;
        if (settleElapsed < 0.28 && wordmarkRef.current) {
          const master = calculateMasterSettle(settleElapsed / 0.28);
          wordmarkRef.current.style.transform = `scale(${master.scaleX.toFixed(3)}, ${master.scaleY.toFixed(3)})`;
        } else if (wordmarkRef.current) {
          wordmarkRef.current.style.transform = 'scale(1, 1)';
        }
      }

      // D. TIMELINE COMPLETION
      if (elapsedSec > 3.4 && !hasTaglineShownRef.current) {
        hasTaglineShownRef.current = true;
        setShowTagline(true);
      }

      if (elapsedSec > 3.9) {
        completeAnimation();
        return;
      }

      rafIdRef.current = requestAnimationFrame(loop);
    };

    rafIdRef.current = requestAnimationFrame(loop);
  }, [completeAnimation, measureTargets]);

  // Keyboard shortcut listener: Esc / Space / Enter to skip
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' || e.key === ' ' || e.key === 'Enter') {
        if (!isSettled) {
          e.preventDefault();
          completeAnimation();
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isSettled, completeAnimation]);

  // Window resize handler: update target layout
  useEffect(() => {
    const handleResize = () => {
      measureTargets();
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [measureTargets]);

  // Start animation on initial mount
  useEffect(() => {
    if (hasIntroPlayedInSession || prefersReducedMotion || hasStartedRef.current) {
      return;
    }

    const timer = setTimeout(() => {
      if (document.fonts) {
        document.fonts.ready.then(() => {
          startSimulation();
        });
      } else {
        startSimulation();
      }
    }, 60);

    return () => {
      clearTimeout(timer);
    };
  }, [prefersReducedMotion, startSimulation]);

  return (
    <div
      ref={containerRef}
      className={`artifura-intro-container ${className}`}
      onClick={() => {
        if (!isSettled) completeAnimation();
      }}
    >
      {/* 1. MATCHING DECOY LETTERS LAYER */}
      {!isSettled && (
        <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 10, overflow: 'hidden' }}>
          {Array.from({ length: 20 }).map((_, i) => (
            <span
              key={`decoy-${i}`}
              ref={(el) => {
                decoyElementsRef.current[i] = el;
              }}
              className="intro-decoy-char"
            >
              {DECOY_CHAR_POOL[i % DECOY_CHAR_POOL.length]}
            </span>
          ))}
        </div>
      )}

      {/* 2. FLYING ARTIFURA LETTERS LAYER */}
      {!isSettled && (
        <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 20, overflow: 'hidden' }}>
          {ARTIFURA_CHARACTERS.map((char, i) => (
            <span
              key={`flying-${i}`}
              ref={(el) => {
                flyingArtifuraElementsRef.current[i] = el;
              }}
              className="intro-flying-char"
            >
              {i === 0 ? (
                <ArtifuraSymbol
                  style={{
                    height: '1.28em',
                    width: 'auto',
                    filter: 'drop-shadow(0 0 28px rgba(255, 212, 87, 0.65))',
                  }}
                />
              ) : i === 7 ? (
                <ArtifuraLambdaGlyph
                  style={{
                    height: '0.88em',
                    width: 'auto',
                    color: '#f0efea',
                    filter: 'drop-shadow(0 0 20px rgba(255, 255, 255, 0.4))',
                  }}
                />
              ) : (
                <span style={{ color: '#f0efea', filter: 'drop-shadow(0 0 20px rgba(255, 255, 255, 0.4))' }}>
                  {char}
                </span>
              )}
            </span>
          ))}
        </div>
      )}

      {/* 3. CENTERPIECE: MONUMENTAL WORDMARK & TARGET SLOTS */}
      <div
        style={{
          position: 'relative',
          zIndex: 30,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          margin: 'auto 0',
          padding: '0 16px',
          cursor: 'default',
        }}
      >
        {/* Glow backdrop behind final word */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: 'rgba(255, 224, 141, 0.12)',
            filter: 'blur(48px)',
            borderRadius: '9999px',
            transform: 'scale(1.25)',
            pointerEvents: 'none',
            transition: 'opacity 0.7s ease',
            opacity: landedIndices.size === 8 ? 1 : 0,
          }}
        />

        {/* The 8 Wordmark Target Slots */}
        <h1
          ref={wordmarkRef}
          className="intro-wordmark"
        >
          {ARTIFURA_CHARACTERS.map((char, index) => {
            const isLanded = landedIndices.has(index);

            return (
              <span
                key={`slot-${index}`}
                ref={(el) => {
                  slotRefs.current[index] = el;
                }}
                style={{
                  display: 'inline-flex',
                  alignItems: 'flex-end',
                  position: 'relative',
                  opacity: isLanded ? 1 : 0,
                  visibility: isSettled || isLanded ? 'visible' : 'hidden',
                  marginRight: index === 0 ? '0.28em' : undefined,
                  transition: 'opacity 0.2s ease',
                }}
              >
                {index === 0 ? (
                  <span style={{ display: 'inline-block', position: 'relative' }}>
                    <ArtifuraSymbol
                      style={{
                        height: '1.28em',
                        width: 'auto',
                        verticalAlign: 'baseline',
                        filter: 'drop-shadow(0 0 28px rgba(255, 212, 87, 0.55))',
                      }}
                    />
                  </span>
                ) : index === 7 ? (
                  <span
                    style={{
                      display: 'inline-block',
                      position: 'relative',
                      color: '#f0efea',
                      filter: 'drop-shadow(0 0 18px rgba(255, 255, 255, 0.25))',
                    }}
                  >
                    <ArtifuraLambdaGlyph
                      style={{
                        height: '0.88em',
                        width: 'auto',
                        display: 'inline-block',
                        verticalAlign: 'baseline',
                      }}
                    />
                  </span>
                ) : (
                  <span
                    style={{
                      position: 'relative',
                      color: '#f0efea',
                      filter: 'drop-shadow(0 0 18px rgba(255, 255, 255, 0.25))',
                    }}
                  >
                    {char}
                  </span>
                )}
              </span>
            );
          })}
        </h1>

        {/* 4. TAGLINE REVEAL (W E   B U I L D   W H A T   C O M E S   N E X T .) */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            transition: 'all 0.7s cubic-bezier(0.16, 1, 0.3, 1)',
            marginTop: '28px',
            opacity: showTagline ? 1 : 0,
            transform: showTagline ? 'translateY(0)' : 'translateY(16px)',
            pointerEvents: showTagline ? 'auto' : 'none',
          }}
        >
          <p className="intro-tagline-text">
            W E &nbsp; B U I L D &nbsp; W H A T &nbsp; C O M E S &nbsp; N E X T .
          </p>
        </div>
      </div>

      {/* 5. MINIMAL SKIP HINT */}
      {!isSettled && (
        <div style={{ position: 'absolute', bottom: '24px', right: '24px', zIndex: 40 }}>
          <button
            onClick={completeAnimation}
            className="intro-skip-btn"
          >
            Skip Intro [Esc]
          </button>
        </div>
      )}
    </div>
  );
};
