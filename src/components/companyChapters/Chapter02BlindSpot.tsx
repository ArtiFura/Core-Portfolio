import React, { useState, useRef, useEffect } from 'react';
import {
  Eye,
  Zap,
} from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useParallax } from '../../motion/useScrollReveal';
import { getAssetUrl } from '../../utils/asset';

gsap.registerPlugin(ScrollTrigger);

export const Chapter02BlindSpot: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'commits' | 'terminal' | 'tests'>('commits');
  const sectionRef = useRef<HTMLElement | null>(null);
  const headerRef = useRef<HTMLDivElement | null>(null);
  const frameRef = useRef<HTMLDivElement | null>(null);
  const splitContainerRef = useRef<HTMLDivElement | null>(null);
  const leftPanelRef = useRef<HTMLDivElement | null>(null);
  const rightPanelRef = useRef<HTMLDivElement | null>(null);
  const connectingLineRef = useRef<HTMLDivElement | null>(null);

  const parallaxImgRef = useParallax<HTMLImageElement>(0.12);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      // 1. Header Reveal
      if (headerRef.current) {
        gsap.fromTo(
          headerRef.current.children,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            stagger: 0.12,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: headerRef.current,
              start: 'top 85%',
              once: true,
            },
          }
        );
      }

      // 2. Comic Artwork Frame
      if (frameRef.current) {
        gsap.fromTo(
          frameRef.current,
          { opacity: 0, y: 35, scale: 0.97 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.85,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: frameRef.current,
              start: 'top 82%',
              once: true,
            },
          }
        );
      }

      // 3. Independent Split-Screen Movement
      if (leftPanelRef.current && rightPanelRef.current) {
        // Left recruiter moves slightly slower with dimmer pacing
        gsap.fromTo(
          leftPanelRef.current,
          { opacity: 0, x: -40 },
          {
            opacity: 1,
            x: 0,
            duration: 0.9,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: splitContainerRef.current,
              start: 'top 80%',
              once: true,
            },
          }
        );

        // Right student side glows with golden flare
        gsap.fromTo(
          rightPanelRef.current,
          { opacity: 0, x: 40, scale: 0.98 },
          {
            opacity: 1,
            x: 0,
            scale: 1,
            duration: 0.9,
            delay: 0.15,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: splitContainerRef.current,
              start: 'top 80%',
              once: true,
            },
          }
        );
      }

      // 4. Connecting Golden Line at the bottom
      if (connectingLineRef.current) {
        gsap.fromTo(
          connectingLineRef.current,
          { scaleX: 0, opacity: 0 },
          {
            scaleX: 1,
            opacity: 1,
            duration: 1.1,
            ease: 'expo.out',
            scrollTrigger: {
              trigger: connectingLineRef.current,
              start: 'top 90%',
              once: true,
            },
          }
        );
      }
    }, el);

    return () => ctx.revert();
  }, []);

  const commitLogs = [
    {
      hash: 'commit 7e92a1',
      time: '01:42 AM',
      msg: 'perf(caching): replace mutex lock with lock-free ring buffer for thread queues',
      impact: 'Eliminated 94% lock contention under 10k concurrent simulated requests',
    },
    {
      hash: 'commit 3f810b',
      time: 'Yesterday',
      msg: 'fix(consensus): handle asymmetric network split during raft node election',
      impact: 'Added heartbeat quorum verification, passing Jepsen partition test suite',
    },
    {
      hash: 'commit b120d9',
      time: '3 days ago',
      msg: 'feat(telemetry): integrate OpenTelemetry distributed tracing spans with Prometheus metrics',
      impact: 'Full observability across RPC boundaries with sub-millisecond overhead',
    },
  ];

  return (
    <section
      ref={sectionRef}
      id="chapter-02"
      style={{
        position: 'relative',
        minHeight: '100vh',
        padding: '100px 24px 90px',
        background: 'radial-gradient(ellipse at 50% 50%, #11100b 0%, var(--bg-obsidian) 80%)',
        overflow: 'hidden',
      }}
    >
      <div
        style={{
          maxWidth: '1280px',
          margin: '0 auto',
          position: 'relative',
          zIndex: 2,
        }}
      >
        {/* Editorial Section Header */}
        <div
          ref={headerRef}
          style={{
            textAlign: 'center',
            marginBottom: '48px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >


          <h2
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(2rem, 4vw, 3.4rem)',
              fontWeight: 800,
              color: 'var(--text-ivory)',
              lineHeight: 1.15,
              letterSpacing: '0.04em',
              marginBottom: '16px',
            }}
          >
            POTENTIAL CAN BE <span className="gold-gradient-text">OVERLOOKED.</span>
          </h2>

          <p
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: 'clamp(0.95rem, 1.2vw, 1.15rem)',
              color: 'var(--text-muted)',
              maxWidth: '740px',
              lineHeight: 1.7,
              margin: '0 auto',
            }}
          >
            A student may have the skills, curiosity, and project experience to become a great hire without having an impressive resume or years of professional experience.
          </p>
        </div>

        {/* Graphic Novel Split-Scene Artwork Frame */}
        <div
          ref={frameRef}
          className="comic-frame comic-corner-accents"
          style={{
            maxWidth: '1040px',
            margin: '0 auto 48px',
            background: 'var(--bg-secondary)',
            border: '1px solid var(--gold-border)',
            boxShadow: '0 20px 50px rgba(0, 0, 0, 0.85)',
          }}
        >


          {/* Graphic Novel Artwork Container */}
          <div
            className="comic-artwork-container"
            style={{ position: 'relative', aspectRatio: '16/9', overflow: 'hidden' }}
          >
            <img
              ref={parallaxImgRef}
              src={getAssetUrl('/assets/comic/company_ch2_blindspot.jpg')}
              alt="Split composition: Recruiter filtering paper files on the left, capable student building code surrounded by glowing monitors on the right"
              style={{
                width: '100%',
                height: '110%',
                objectFit: 'cover',
                display: 'block',
                filter: 'contrast(1.08) brightness(0.96)',
              }}
              loading="lazy"
            />

            {/* Vignette Gradient */}
            <div
              style={{
                position: 'absolute',
                inset: 0,
                background:
                  'linear-gradient(180deg, rgba(8, 8, 8, 0.1) 0%, transparent 40%, rgba(8, 8, 8, 0.88) 100%)',
                pointerEvents: 'none',
              }}
            />

            {/* In-Artwork Left Indicator */}
            <div
              style={{
                position: 'absolute',
                top: '20px',
                left: '20px',
                background: 'rgba(12, 12, 12, 0.9)',
                border: '1px solid rgba(255, 255, 255, 0.15)',
                padding: '6px 12px',
                fontFamily: 'var(--font-mono)',
                fontSize: '0.68rem',
                color: '#aaa',
                letterSpacing: '0.12em',
              }}
            >
              SIDE A: ATS KEYWORD SCREEN
            </div>

            {/* In-Artwork Right Indicator with Golden Signal */}
            <div
              style={{
                position: 'absolute',
                top: '20px',
                right: '20px',
                background: 'rgba(16, 14, 8, 0.95)',
                border: '1px solid var(--gold-border-bright)',
                padding: '6px 12px',
                fontFamily: 'var(--font-mono)',
                fontSize: '0.68rem',
                color: 'var(--gold-bright)',
                letterSpacing: '0.12em',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
              }}
            >
              <div
                style={{
                  width: '8px',
                  height: '8px',
                  borderRadius: '50%',
                  background: 'var(--gold-bright)',
                }}
                className="gold-pulse"
              />
              <span>SIDE B: UNSEEN PRACTICAL MASTERY</span>
            </div>

            {/* Bottom Caption Overlay */}
            <div
              className="comic-caption-box"
              style={{
                position: 'absolute',
                bottom: '20px',
                left: '20px',
                right: '20px',
                maxWidth: '720px',
                background: 'rgba(10, 10, 10, 0.92)',
                backdropFilter: 'blur(8px)',
              }}
            >
              <span
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.64rem',
                  color: 'var(--gold-bright)',
                  letterSpacing: '0.2em',
                  display: 'block',
                  marginBottom: '2px',
                }}
              >
                THE CORE INSIGHT
              </span>
              <p
                style={{
                  margin: 0,
                  fontSize: '0.88rem',
                  color: 'var(--text-ivory)',
                  lineHeight: 1.45,
                }}
              >
                On paper, a student has zero corporate years. In reality, they are building resilient software, understanding edge cases, and pushing clean production-grade code every night.
              </p>
            </div>
          </div>
        </div>

        {/* Interactive Split-Screen Comparison: Recruiter's View vs Student's Reality */}
        <div
          ref={splitContainerRef}
          style={{
            maxWidth: '1040px',
            margin: '0 auto',
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '24px',
            position: 'relative',
          }}
        >
          {/* Left Side: The Recruiter's Traditional Filter */}
          <div
            ref={leftPanelRef}
            className="comic-frame"
            style={{
              padding: '24px',
              background: '#101010',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              clipPath: 'polygon(0 0, calc(100% - 12px) 0, 100% 12px, 100% 100%, 12px 100%, 0 calc(100% - 12px))',
            }}
          >
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginBottom: '16px',
                borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
                paddingBottom: '10px',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Eye size={15} color="var(--text-dim)" />
                <span
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.72rem',
                    color: 'var(--text-muted)',
                    letterSpacing: '0.15em',
                  }}
                >
                  WHAT THE SCREENING SYSTEM SEES:
                </span>
              </div>
              <span
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.62rem',
                  color: '#e06c75',
                  background: 'rgba(224, 108, 117, 0.1)',
                  padding: '2px 8px',
                  border: '1px solid rgba(224, 108, 117, 0.3)',
                }}
              >
                FILTERED OUT
              </span>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <div>
                <span style={{ fontSize: '0.72rem', color: 'var(--text-dim)', display: 'block' }}>
                  EXPERIENCE REQUIREMENT:
                </span>
                <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                  “Requires 2–3 Years of Production Experience”
                </span>
                <div style={{ fontSize: '0.78rem', color: '#e06c75', marginTop: '2px' }}>
                  → Flagged: Candidate lists 0 corporate years
                </div>
              </div>

              <div>
                <span style={{ fontSize: '0.72rem', color: 'var(--text-dim)', display: 'block' }}>
                  BRAND RECOGNITION:
                </span>
                <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                  Tier-3 Regional Technical Institute
                </span>
                <div style={{ fontSize: '0.78rem', color: '#e06c75', marginTop: '2px' }}>
                  → Skipped by institutional brand filter
                </div>
              </div>

              <div>
                <span style={{ fontSize: '0.72rem', color: 'var(--text-dim)', display: 'block' }}>
                  AUTOMATED RESUME PARSE:
                </span>
                <div
                  style={{
                    background: '#080808',
                    padding: '10px',
                    border: '1px solid #222',
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.74rem',
                    color: '#888',
                    lineHeight: 1.4,
                  }}
                >
                  <div>STATUS: REJECTED AT LEVEL 1</div>
                  <div>REASON: Lacks formal corporate company badge</div>
                  <div>SCORE: 42/100 (Keyword heuristics)</div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side: The Capable Student Building */}
          <div
            ref={rightPanelRef}
            className="comic-frame"
            style={{
              padding: '24px',
              background: '#14120a',
              border: '1px solid var(--gold-border-bright)',
              boxShadow: '0 0 30px rgba(212, 175, 55, 0.12)',
              clipPath: 'polygon(0 0, calc(100% - 12px) 0, 100% 12px, 100% 100%, 12px 100%, 0 calc(100% - 12px))',
            }}
          >
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginBottom: '16px',
                borderBottom: '1px solid rgba(212, 175, 55, 0.25)',
                paddingBottom: '10px',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Zap size={15} color="var(--gold-bright)" />
                <span
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.72rem',
                    color: 'var(--gold-bright)',
                    letterSpacing: '0.15em',
                  }}
                >
                  WHAT THE STUDENT IS ACTUALLY SHIPPING:
                </span>
              </div>
              <span
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.62rem',
                  color: 'var(--gold-bright)',
                  background: 'rgba(212, 175, 55, 0.15)',
                  padding: '2px 8px',
                  border: '1px solid var(--gold-border)',
                }}
              >
                PROVEN ABILITY
              </span>
            </div>

            {/* Tab switch for live evidence */}
            <div style={{ display: 'flex', gap: '8px', marginBottom: '14px' }}>
              <button
                onClick={() => setActiveTab('commits')}
                style={{
                  background: activeTab === 'commits' ? 'var(--gold-gradient)' : 'rgba(20, 20, 20, 0.8)',
                  color: activeTab === 'commits' ? '#080808' : 'var(--text-muted)',
                  border: '1px solid var(--gold-border)',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.68rem',
                  fontWeight: activeTab === 'commits' ? 700 : 500,
                  padding: '5px 10px',
                  cursor: 'pointer',
                }}
              >
                GIT COMMITS
              </button>
              <button
                onClick={() => setActiveTab('terminal')}
                style={{
                  background: activeTab === 'terminal' ? 'var(--gold-gradient)' : 'rgba(20, 20, 20, 0.8)',
                  color: activeTab === 'terminal' ? '#080808' : 'var(--text-muted)',
                  border: '1px solid var(--gold-border)',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.68rem',
                  fontWeight: activeTab === 'terminal' ? 700 : 500,
                  padding: '5px 10px',
                  cursor: 'pointer',
                }}
              >
                TEST BENCHMARKS
              </button>
            </div>

            {activeTab === 'commits' ? (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {commitLogs.map((log, idx) => (
                  <div
                    key={idx}
                    style={{
                      background: 'rgba(10, 10, 10, 0.7)',
                      border: '1px solid rgba(212, 175, 55, 0.2)',
                      padding: '10px',
                    }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '2px' }}>
                      <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.68rem', color: 'var(--gold-bright)' }}>
                        {log.hash}
                      </span>
                      <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', color: 'var(--text-dim)' }}>
                        {log.time}
                      </span>
                    </div>
                    <div style={{ fontSize: '0.82rem', color: 'var(--text-ivory)', marginBottom: '4px' }}>
                      {log.msg}
                    </div>
                    <div style={{ fontSize: '0.74rem', color: 'var(--gold-antique)', fontStyle: 'italic' }}>
                      ↳ {log.impact}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div
                style={{
                  background: '#090909',
                  border: '1px solid rgba(212, 175, 55, 0.25)',
                  padding: '14px',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.75rem',
                  color: '#98c379',
                  lineHeight: 1.6,
                }}
              >
                <div>$ cargo bench --bench raft_consensus</div>
                <div style={{ color: '#abb2bf' }}>Running 4 benchmark suites...</div>
                <div>✓ 10,000 tx/sec throughput: PASS (p99 latency 2.4ms)</div>
                <div>✓ Leader reelection under partition: PASS (180ms)</div>
                <div>✓ Zero data loss during crash recovery: VERIFIED</div>
                <div style={{ color: 'var(--gold-bright)', marginTop: '8px' }}>
                  RESULT: PRODUCTION-GRADE CONCURRENCY ARCHITECTURE
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Golden Line Connecting the Two Halves at the End */}
        <div
          ref={connectingLineRef}
          style={{
            maxWidth: '1040px',
            margin: '40px auto 0',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            textAlign: 'center',
          }}
        >
          <div
            style={{
              width: '100%',
              height: '2px',
              background: 'linear-gradient(90deg, rgba(255, 255, 255, 0.1), var(--gold-bright), rgba(255, 255, 255, 0.1))',
              marginBottom: '16px',
              boxShadow: '0 0 14px rgba(245, 215, 110, 0.6)',
            }}
          />
          <div
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.74rem',
              color: 'var(--gold-bright)',
              letterSpacing: '0.18em',
              background: '#0c0c0c',
              padding: '6px 18px',
              border: '1px solid var(--gold-border)',
            }}
          >
            THE BRIDGE IS MISSING // ARTIFURA CREATES IT
          </div>
        </div>
      </div>
    </section>
  );
};
