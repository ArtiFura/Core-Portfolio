import React, { useState, useRef, useEffect } from 'react';
import {
  Play,
  TerminalSquare,
  Sparkles,
} from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { getAssetUrl } from '../../utils/asset';

gsap.registerPlugin(ScrollTrigger);

export const Chapter03LearnBuildProve: React.FC = () => {
  const [activeStage, setActiveStage] = useState<1 | 2 | 3>(2);
  const [isRunningTests, setIsRunningTests] = useState(false);
  const [testLogStep, setTestLogStep] = useState<number>(4);

  const sectionRef = useRef<HTMLElement | null>(null);
  const headerRef = useRef<HTMLDivElement | null>(null);
  const panelsRef = useRef<HTMLDivElement | null>(null);

  const runCodeSimulation = () => {
    if (isRunningTests) return;
    setIsRunningTests(true);
    setTestLogStep(1);

    setTimeout(() => setTestLogStep(2), 250);
    setTimeout(() => setTestLogStep(3), 550);
    setTimeout(() => {
      setTestLogStep(4);
      setIsRunningTests(false);
    }, 900);
  };

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      // Header entrance
      if (headerRef.current) {
        gsap.fromTo(
          headerRef.current.children,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            stagger: 0.15,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: headerRef.current,
              start: 'top 85%',
              once: true,
            },
          }
        );
      }

      // Scroll-driven progression between active stages 1 -> 2 -> 3
      if (panelsRef.current) {
        ScrollTrigger.create({
          trigger: panelsRef.current,
          start: 'top 75%',
          end: 'bottom 25%',
          onUpdate: (self) => {
            const p = self.progress;
            if (p < 0.33) {
              setActiveStage(1);
            } else if (p < 0.68) {
              setActiveStage(2);
            } else {
              setActiveStage(3);
            }
          },
        });
      }
    }, el);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="chapter-03"
      style={{
        padding: '100px 24px 90px',
        position: 'relative',
        background: 'linear-gradient(180deg, #080808 0%, #0d0d0d 50%, #080808 100%)',
      }}
    >
      <div style={{ maxWidth: '1360px', margin: '0 auto' }}>
        {/* Header */}
        <div ref={headerRef} style={{ textAlign: 'center', marginBottom: '44px' }}>


          <h2
            style={{
              fontFamily: 'var(--font-heading)',
              fontSize: 'clamp(1.8rem, 4vw, 3.2rem)',
              fontWeight: 800,
              textTransform: 'uppercase',
              color: '#FFF',
              lineHeight: 1.15,
              maxWidth: '960px',
              margin: '0 auto 16px',
            }}
          >
            FROM LEARNING SOMETHING TO{' '}
            <span className="gold-gradient-text">PROVING YOU CAN DO IT.</span>
          </h2>

          <p
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: '1.05rem',
              color: 'var(--text-muted)',
              maxWidth: '740px',
              margin: '0 auto 24px',
              lineHeight: 1.6,
            }}
          >
            Three sequential stages of mastery: moving from theoretical understanding, to iterative problem debugging, to verifiable proof of engineering competence.
          </p>

          {/* Controlled Progression Stage Selector */}
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              background: '#121212',
              padding: '6px 10px',
              border: '1px solid rgba(212, 175, 55, 0.25)',
              borderRadius: '2px',
            }}
          >
            {[
              { id: 1, label: '01. LEARN' },
              { id: 2, label: '02. PRACTICE' },
              { id: 3, label: '03. PROVE' },
            ].map((stg) => {
              const isActive = activeStage === stg.id;
              return (
                <button
                  key={stg.id}
                  onClick={() => setActiveStage(stg.id as any)}
                  style={{
                    background: isActive ? 'var(--gold-gradient)' : 'transparent',
                    color: isActive ? '#080808' : 'var(--text-muted)',
                    border: 'none',
                    padding: '8px 18px',
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.74rem',
                    fontWeight: 700,
                    cursor: 'pointer',
                    transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
                    boxShadow: isActive ? '0 4px 14px rgba(212, 175, 55, 0.4)' : 'none',
                  }}
                >
                  {stg.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* 3-Panel Coherent Visual Stage with Active / Subdued Hierarchy */}
        <div
          ref={panelsRef}
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))',
            gap: '24px',
            alignItems: 'stretch',
          }}
        >
          {/* STAGE 01 — LEARN */}
          <div
            onClick={() => setActiveStage(1)}
            className={`comic-frame comic-corner-accents interactive-panel ${
              activeStage === 1 ? 'gold-sweep-active' : ''
            }`}
            style={{
              display: 'flex',
              flexDirection: 'column',
              background: activeStage === 1 ? 'rgba(24, 20, 12, 0.96)' : 'rgba(14, 14, 14, 0.65)',
              border: activeStage === 1
                ? '1px solid var(--gold-bright)'
                : '1px solid rgba(212, 175, 55, 0.15)',
              boxShadow: activeStage === 1
                ? '0 20px 50px rgba(0,0,0,0.9), 0 0 30px rgba(212, 175, 55, 0.3)'
                : '0 10px 25px rgba(0,0,0,0.6)',
              opacity: activeStage === 1 ? 1 : 0.6,
              transform: activeStage === 1 ? 'translateY(-6px) scale(1.02)' : 'scale(0.99)',
              transition: 'all 0.45s cubic-bezier(0.16, 1, 0.3, 1)',
              cursor: 'pointer',
            }}
          >


            {/* Artwork Frame with Category Hover Style */}
            <div className="comic-artwork-container" style={{ position: 'relative', width: '100%', aspectRatio: '4/3', overflow: 'hidden' }}>
              <img
                src={getAssetUrl('/assets/comic/chapter3_learn.jpg')}
                alt="Student exploring a structured programming lesson"
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  display: 'block',
                  filter: activeStage === 1 ? 'contrast(1.05)' : 'grayscale(0.3) brightness(0.8)',
                  transition: 'filter 0.45s ease',
                }}
                loading="lazy"
              />
              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  background: 'linear-gradient(180deg, transparent 55%, rgba(8, 8, 8, 0.9) 100%)',
                }}
              />
            </div>

            {/* Overlay UI & Narrative Caption */}
            <div style={{ padding: '22px', flex: 1, display: 'flex', flexDirection: 'column' }}>
              <div
                style={{
                  background: '#161616',
                  border: '1px solid rgba(212, 175, 55, 0.2)',
                  padding: '14px 16px',
                  marginBottom: '16px',
                }}
              >
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginBottom: '6px',
                  }}
                >
                  <span
                    style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: '0.68rem',
                      color: 'var(--gold-bright)',
                      textTransform: 'uppercase',
                    }}
                  >
                    LEARNING PATH: TREE STRUCTURES
                  </span>
                  <span
                    style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: '0.72rem',
                      color: '#FFF',
                      fontWeight: 700,
                    }}
                  >
                    60%
                  </span>
                </div>
                <div
                  style={{
                    width: '100%',
                    height: '4px',
                    background: 'rgba(255, 255, 255, 0.08)',
                    borderRadius: '2px',
                    overflow: 'hidden',
                  }}
                >
                  <div style={{ width: '60%', height: '100%', background: 'var(--gold-gradient)' }} />
                </div>
                <div
                  style={{
                    marginTop: '8px',
                    fontSize: '0.75rem',
                    color: 'var(--text-muted)',
                  }}
                >
                  Target: Understand self-balancing AVL & Red-Black rotation rules.
                </div>
              </div>

              <h3
                style={{
                  fontFamily: 'var(--font-heading)',
                  fontSize: '1.25rem',
                  color: '#FFF',
                  marginBottom: '6px',
                }}
              >
                “Understand the fundamentals.”
              </h3>
              <p
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: '0.88rem',
                  color: 'var(--text-muted)',
                  lineHeight: 1.5,
                  marginTop: 'auto',
                }}
              >
                Concepts are deconstructed into bite-sized mental models. Students visualize data structures and computational complexity before typing a single character.
              </p>
            </div>
          </div>

          {/* STAGE 02 — PRACTICE */}
          <div
            onClick={() => setActiveStage(2)}
            className={`comic-frame comic-corner-accents interactive-panel ${
              activeStage === 2 ? 'gold-sweep-active' : ''
            }`}
            style={{
              display: 'flex',
              flexDirection: 'column',
              background: activeStage === 2 ? 'rgba(24, 20, 12, 0.96)' : 'rgba(14, 14, 14, 0.65)',
              border: activeStage === 2
                ? '1px solid var(--gold-bright)'
                : '1px solid rgba(212, 175, 55, 0.15)',
              boxShadow: activeStage === 2
                ? '0 20px 50px rgba(0,0,0,0.9), 0 0 30px rgba(212, 175, 55, 0.3)'
                : '0 10px 25px rgba(0,0,0,0.6)',
              opacity: activeStage === 2 ? 1 : 0.6,
              transform: activeStage === 2 ? 'translateY(-6px) scale(1.02)' : 'scale(0.99)',
              transition: 'all 0.45s cubic-bezier(0.16, 1, 0.3, 1)',
              cursor: 'pointer',
            }}
          >


            {/* Artwork Frame with Category Hover Style */}
            <div className="comic-artwork-container" style={{ position: 'relative', width: '100%', aspectRatio: '4/3', overflow: 'hidden' }}>
              <img
                src={getAssetUrl('/assets/comic/chapter3_practice.jpg')}
                alt="Student writing code and testing ideas"
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  display: 'block',
                  filter: activeStage === 2 ? 'contrast(1.05)' : 'grayscale(0.3) brightness(0.8)',
                  transition: 'filter 0.45s ease',
                }}
                loading="lazy"
              />
              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  background: 'linear-gradient(180deg, transparent 55%, rgba(8, 8, 8, 0.9) 100%)',
                }}
              />
            </div>

            {/* Interactive Code Runner Simulator with Subtle Blinking Cursor */}
            <div style={{ padding: '22px', flex: 1, display: 'flex', flexDirection: 'column' }}>
              <div
                style={{
                  background: '#121212',
                  border: '1px solid rgba(212, 175, 55, 0.25)',
                  padding: '14px 16px',
                  marginBottom: '16px',
                }}
              >
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginBottom: '8px',
                  }}
                >
                  <span
                    style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: '0.7rem',
                      color: 'var(--gold-bright)',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '6px',
                    }}
                  >
                    <TerminalSquare size={12} />
                    <span>TEST HARNESS // {testLogStep}/4 PASS</span>
                  </span>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      runCodeSimulation();
                    }}
                    disabled={isRunningTests}
                    style={{
                      background: 'rgba(212, 175, 55, 0.15)',
                      border: '1px solid var(--gold-border)',
                      color: 'var(--gold-bright)',
                      fontFamily: 'var(--font-mono)',
                      fontSize: '0.65rem',
                      padding: '4px 10px',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '5px',
                      transition: 'all 0.2s ease',
                    }}
                  >
                    <Play size={10} />
                    <span>{isRunningTests ? 'COMPILING RUNTIME...' : 'RUN TEST SUITE'}</span>
                  </button>
                </div>

                <div
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.72rem',
                    lineHeight: 1.5,
                    minHeight: '84px',
                    color: isRunningTests ? 'var(--gold-bright)' : '#4ade80',
                  }}
                >
                  {testLogStep >= 1 && <div>✓ [TEST 01] Edge case: empty input handled (0.4ms)</div>}
                  {testLogStep >= 2 && <div>✓ [TEST 02] Self-balancing tree rotation OK (1.2ms)</div>}
                  {testLogStep >= 3 && <div>✓ [TEST 03] Memory footprint within 12MB limit</div>}
                  {testLogStep >= 4 && <div>✓ [TEST 04] Benchmark throughput: 1.8M ops/sec</div>}
                  {isRunningTests && (
                    <div style={{ color: 'var(--gold-bright)', marginTop: '4px' }}>
                      ❯ Compiling next test vector...
                    </div>
                  )}
                </div>
              </div>

              <h3
                style={{
                  fontFamily: 'var(--font-heading)',
                  fontSize: '1.25rem',
                  color: '#FFF',
                  marginBottom: '6px',
                }}
              >
                “Turn knowledge into practice.”
              </h3>
              <p
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: '0.88rem',
                  color: 'var(--text-muted)',
                  lineHeight: 1.5,
                  marginTop: 'auto',
                }}
              >
                Real learning happens in the error loop. Students encounter compilation traps, write assertions, debug race conditions, and experience the tactile joy of green test passes.
              </p>
            </div>
          </div>

          {/* STAGE 03 — PROVE */}
          <div
            onClick={() => setActiveStage(3)}
            className={`comic-frame comic-corner-accents interactive-panel ${
              activeStage === 3 ? 'gold-sweep-active' : ''
            }`}
            style={{
              display: 'flex',
              flexDirection: 'column',
              background: activeStage === 3 ? 'rgba(24, 20, 12, 0.96)' : 'rgba(14, 14, 14, 0.65)',
              border: activeStage === 3
                ? '1px solid var(--gold-bright)'
                : '1px solid rgba(212, 175, 55, 0.15)',
              boxShadow: activeStage === 3
                ? '0 20px 50px rgba(0,0,0,0.9), 0 0 30px rgba(212, 175, 55, 0.3)'
                : '0 10px 25px rgba(0,0,0,0.6)',
              opacity: activeStage === 3 ? 1 : 0.6,
              transform: activeStage === 3 ? 'translateY(-6px) scale(1.02)' : 'scale(0.99)',
              transition: 'all 0.45s cubic-bezier(0.16, 1, 0.3, 1)',
              cursor: 'pointer',
            }}
          >


            {/* Artwork Frame with Category Hover Style */}
            <div className="comic-artwork-container" style={{ position: 'relative', width: '100%', aspectRatio: '4/3', overflow: 'hidden' }}>
              <img
                src={getAssetUrl('/assets/comic/chapter3_prove.jpg')}
                alt="Student completes assessment and reviews glowing golden verified skill scorecard"
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  display: 'block',
                  filter: activeStage === 3 ? 'contrast(1.05)' : 'grayscale(0.3) brightness(0.8)',
                  transition: 'filter 0.45s ease',
                }}
                loading="lazy"
              />
              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  background: 'linear-gradient(180deg, transparent 55%, rgba(8, 8, 8, 0.9) 100%)',
                }}
              />
            </div>

            {/* Overlay UI & Narrative Caption */}
            <div style={{ padding: '22px', flex: 1, display: 'flex', flexDirection: 'column' }}>
              <div
                style={{
                  background: '#161616',
                  border: '1px solid rgba(212, 175, 55, 0.2)',
                  padding: '14px 16px',
                  marginBottom: '16px',
                }}
              >
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginBottom: '4px',
                  }}
                >
                  <span
                    style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: '0.68rem',
                      color: 'var(--gold-bright)',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '6px',
                    }}
                  >
                    <Sparkles size={12} />
                    <span>ASSESSMENT VERIFICATION</span>
                  </span>
                  <span
                    style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: '0.78rem',
                      fontWeight: 700,
                      color: 'var(--gold-bright)',
                    }}
                  >
                    100% MASTERY
                  </span>
                </div>
                <div
                  style={{
                    fontSize: '0.75rem',
                    color: 'var(--text-muted)',
                  }}
                >
                  Algorithms: 100 • Systems: 100 • Clean Code: 100
                </div>
                <div
                  style={{
                    marginTop: '6px',
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.65rem',
                    color: 'var(--gold-antique)',
                  }}
                >
                  Attestation: Cryptographically sealed & portfolio exportable.
                </div>
              </div>

              <h3
                style={{
                  fontFamily: 'var(--font-heading)',
                  fontSize: '1.25rem',
                  color: '#FFF',
                  marginBottom: '6px',
                }}
              >
                “Make progress visible.”
              </h3>
              <p
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: '0.88rem',
                  color: 'var(--text-muted)',
                  lineHeight: 1.5,
                  marginTop: 'auto',
                }}
              >
                No vague completion certificates. Every student completes rigorous assessment suites that produce verifiable skill reports and transparent evidence of capability.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
