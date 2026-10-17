import { useState, useRef, useEffect } from 'react';
import {
  Layers,
  Terminal,
  Activity,
  Award,
  CheckCircle,
  Network,
  Cpu,
} from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useParallax } from '../../motion/useScrollReveal';
import { useMouseSpotlight } from '../../motion/useMouseSpotlight';
import { getAssetUrl } from '../../utils/asset';

gsap.registerPlugin(ScrollTrigger);

export const Chapter02TurningPoint: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'paths' | 'challenges' | 'assessment' | 'milestones'>('paths');
  const sectionRef = useRef<HTMLElement | null>(null);
  const headerRef = useRef<HTMLDivElement | null>(null);
  const frameRef = useRef<HTMLDivElement | null>(null);
  const mockupContainerRef = useRef<HTMLDivElement | null>(null);
  const topChromeRef = useRef<HTMLDivElement | null>(null);
  const tabsBarRef = useRef<HTMLDivElement | null>(null);
  const convergenceLinesRef = useRef<HTMLDivElement | null>(null);
  const tabContentRef = useRef<HTMLDivElement | null>(null);

  const parallaxImgRef = useParallax<HTMLImageElement>(0.12);
  const mockupSpotlightRef = useMouseSpotlight<HTMLDivElement>({ opacity: 0.08 });

  const lmsTabs = [
    { id: 'paths' as const, label: 'LEARNING PATHWAYS', icon: Layers },
    { id: 'challenges' as const, label: 'CODING CHALLENGES', icon: Terminal },
    { id: 'assessment' as const, label: 'SKILL RADAR & AUDIT', icon: Activity },
    { id: 'milestones' as const, label: 'PROJECT MILESTONES', icon: Award },
  ];

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

      // 2. Illustration Frame
      if (frameRef.current) {
        gsap.fromTo(
          frameRef.current,
          { opacity: 0, y: 35, scale: 0.97 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.9,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: frameRef.current,
              start: 'top 85%',
              once: true,
            },
          }
        );
      }

      // 3. Transformation & Matrix Assembly Animation (Panels converge from different directions)
      if (mockupContainerRef.current) {
        const assemblyTl = gsap.timeline({
          scrollTrigger: {
            trigger: mockupContainerRef.current,
            start: 'top 82%',
            once: true,
          },
        });

        // Background convergence gold lines extend across composition
        assemblyTl
          .fromTo(
            convergenceLinesRef.current?.querySelectorAll('.assembly-line') || [],
            { scaleX: 0, opacity: 0 },
            { scaleX: 1, opacity: 1, duration: 0.9, stagger: 0.12, ease: 'expo.out' }
          )
          // Central mockup scales into place from slightly smaller size
          .fromTo(
            mockupContainerRef.current,
            { scale: 0.94, opacity: 0, y: 40 },
            { scale: 1, opacity: 1, y: 0, duration: 0.85, ease: 'power3.out' },
            '-=0.6'
          )
          // Top chrome slides down from above
          .fromTo(
            topChromeRef.current,
            { y: -30, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.6, ease: 'power2.out' },
            '-=0.4'
          )
          // Tab bar slides in from left
          .fromTo(
            tabsBarRef.current,
            { x: -40, opacity: 0 },
            { x: 0, opacity: 1, duration: 0.6, ease: 'power2.out' },
            '-=0.3'
          )
          // Tab content converges into view
          .fromTo(
            tabContentRef.current,
            { opacity: 0, scale: 0.98 },
            { opacity: 1, scale: 1, duration: 0.65, ease: 'power3.out' },
            '-=0.2'
          )
          // Gold accent indicators illuminate sequentially
          .fromTo(
            mockupContainerRef.current.querySelectorAll('.assembly-accent'),
            { opacity: 0, scale: 0.8 },
            { opacity: 1, scale: 1, duration: 0.45, stagger: 0.08, ease: 'back.out(2)' },
            '-=0.2'
          );
      }
    }, el);

    return () => ctx.revert();
  }, []);

  const setMockupRef = (node: HTMLDivElement | null) => {
    mockupContainerRef.current = node;
    (mockupSpotlightRef as React.MutableRefObject<HTMLDivElement | null>).current = node;
  };

  return (
    <section
      ref={sectionRef}
      id="chapter-02"
      style={{
        padding: '100px 24px 90px',
        position: 'relative',
        background: 'radial-gradient(circle at 50% 20%, rgba(212, 175, 55, 0.06) 0%, #080808 65%)',
        overflow: 'hidden',
      }}
    >
      <div style={{ maxWidth: '1280px', margin: '0 auto', position: 'relative', zIndex: 2 }}>
        {/* Header */}
        <div ref={headerRef} style={{ textAlign: 'center', marginBottom: '36px' }}>


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
            WHAT IF LEARNING BECAME A JOURNEY{' '}
            <span className="gold-gradient-text">YOU COULD MEASURE?</span>
          </h2>

          <p
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: '1.05rem',
              color: 'var(--text-muted)',
              maxWidth: '720px',
              margin: '0 auto',
              lineHeight: 1.6,
            }}
          >
            ARTIFURA brings learning, practice, assessment, and skill development into a connected experience — transforming unguided tutorials into measurable engineering milestones.
          </p>
        </div>

        {/* Cinematic Illustration Frame with Image Hover Category Treatment */}
        <div
          ref={frameRef}
          className="comic-frame comic-corner-accents comic-artwork-container"
          style={{
            position: 'relative',
            overflow: 'hidden',
            border: '1px solid var(--gold-border-bright)',
            boxShadow: '0 25px 60px rgba(0, 0, 0, 0.9), 0 0 35px rgba(212, 175, 55, 0.15)',
            marginBottom: '40px',
          }}
        >


          <div style={{ position: 'relative', width: '100%', aspectRatio: '16/9', overflow: 'hidden' }}>
            <img
              ref={parallaxImgRef}
              src={getAssetUrl('/assets/comic/chapter2.jpg')}
              alt="Student connecting through glowing golden lines to a structured futuristic desktop LMS dashboard"
              style={{
                width: '100%',
                height: '110%',
                objectFit: 'cover',
                display: 'block',
                willChange: 'transform',
              }}
              loading="lazy"
            />
            <div
              style={{
                position: 'absolute',
                inset: 0,
                background:
                  'linear-gradient(180deg, transparent 60%, rgba(8, 8, 8, 0.85) 100%)',
                pointerEvents: 'none',
              }}
            />
          </div>
        </div>

        {/* Decorative Golden Convergence Lines extending across composition */}
        <div
          ref={convergenceLinesRef}
          style={{
            position: 'relative',
            width: '100%',
            marginBottom: '24px',
            pointerEvents: 'none',
          }}
        >
          <div
            className="assembly-line"
            style={{
              width: '100%',
              height: '1px',
              background: 'linear-gradient(90deg, transparent, rgba(212, 175, 55, 0.6) 20%, rgba(245, 215, 110, 0.9) 50%, rgba(212, 175, 55, 0.6) 80%, transparent)',
              boxShadow: '0 0 10px rgba(245, 215, 110, 0.4)',
              transformOrigin: 'center',
            }}
          />
        </div>

        {/* 4-Stage Sequential Manga Pipeline Artwork */}
        <div
          className="comic-frame comic-corner-accents comic-artwork-container"
          style={{
            position: 'relative',
            overflow: 'hidden',
            border: '1px solid var(--gold-border-bright)',
            boxShadow: '0 25px 60px rgba(0, 0, 0, 0.9), 0 0 35px rgba(212, 175, 55, 0.15)',
            marginBottom: '40px',
          }}
        >
          <div style={{ position: 'relative', width: '100%', aspectRatio: '16/9', overflow: 'hidden' }}>
            <img
              src={getAssetUrl('/assets/comic/college_ch2_architecture.jpg')}
              alt="4-Stage sequential manga flow showing student entering sandbox, compiler executing 50 edge-case tests, O(N log N) benchmarking, and cryptographic passport generation"
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                display: 'block',
                transition: 'transform 0.5s ease',
              }}
              loading="lazy"
            />
            <div
              className="comic-caption-box"
              style={{
                position: 'absolute',
                top: '16px',
                left: '16px',
                zIndex: 6,
                background: 'rgba(12, 12, 12, 0.92)',
                border: '1px solid var(--gold-bright)',
                padding: '6px 14px',
                color: 'var(--gold-bright)',
                fontFamily: 'var(--font-mono)',
                fontSize: '0.72rem',
                fontWeight: 700,
                letterSpacing: '0.12em',
              }}
            >
              CHRONICLE 02 // THE 4-STAGE SANDBOX PIPELINE
            </div>
          </div>
        </div>

        {/* Desktop LMS Concept Mockup Panel (Assembled from converging directions) */}
        <div
          ref={setMockupRef}
          className="comic-frame gold-spotlight-container screenshot-card-container"
          style={{
            background: '#0e0e0e',
            border: '1px solid var(--gold-border)',
            borderRadius: '4px',
            overflow: 'hidden',
            boxShadow: '0 25px 60px rgba(0, 0, 0, 0.9), 0 0 35px rgba(212, 175, 55, 0.12)',
          }}
        >
          {/* Top Window Chrome (Slides from Top) */}
          <div
            ref={topChromeRef}
            style={{
              background: '#161616',
              borderBottom: '1px solid rgba(212, 175, 55, 0.25)',
              padding: '12px 20px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              flexWrap: 'wrap',
              gap: '12px',
              position: 'relative',
              zIndex: 3,
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
              <div style={{ display: 'flex', gap: '6px' }}>
                <span className="assembly-accent" style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#ff5f56' }} />
                <span className="assembly-accent" style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#ffbd2e' }} />
                <span className="assembly-accent" style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#27c93f' }} />
              </div>
              <span
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.78rem',
                  color: 'var(--gold-bright)',
                  letterSpacing: '0.1em',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                }}
              >
                <Network size={14} />
                <span>ARTIFURA LEARNING SYSTEM</span>
              </span>
            </div>
          </div>

          {/* Sub Navigation Tabs (Slides from Left) */}
          <div
            ref={tabsBarRef}
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
              background: '#121212',
              borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
              position: 'relative',
              zIndex: 3,
            }}
          >
            {lmsTabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '8px',
                    padding: '12px 16px',
                    background: isActive ? 'rgba(212, 175, 55, 0.14)' : 'transparent',
                    border: 'none',
                    borderBottom: isActive ? '2px solid var(--gold-bright)' : '2px solid transparent',
                    color: isActive ? 'var(--gold-bright)' : 'var(--text-muted)',
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.74rem',
                    fontWeight: 600,
                    letterSpacing: '0.08em',
                    cursor: 'pointer',
                    transition: 'all 0.25s ease',
                  }}
                >
                  <Icon size={14} />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>

          {/* Tab Content Display (Converges into Alignment) */}
          <div ref={tabContentRef} style={{ padding: '24px', position: 'relative', zIndex: 3 }}>
            {activeTab === 'paths' && (
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                  gap: '18px',
                }}
              >
                {[
                  {
                    code: 'CS-401',
                    title: 'Advanced Algorithmic Architectures',
                    progress: 88,
                    units: '8 / 9 Lessons Complete',
                    focus: 'Dynamic Programming & Graph Traversal',
                  },
                  {
                    code: 'SYS-502',
                    title: 'High-Throughput Distributed Systems',
                    progress: 72,
                    units: '6 / 8 Lessons Complete',
                    focus: 'Event Streaming & Microservice Consistency',
                  },
                  {
                    code: 'AI-301',
                    title: 'Neural Networks & Tensor Operations',
                    progress: 45,
                    units: '4 / 10 Lessons Complete',
                    focus: 'Vector Embeddings & Attention Mechanisms',
                  },
                ].map((item) => (
                  <div
                    key={item.code}
                    className="interactive-panel assembly-accent"
                    style={{
                      background: '#161616',
                      border: '1px solid rgba(212, 175, 55, 0.22)',
                      padding: '18px',
                      position: 'relative',
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
                        <Cpu size={12} />
                        {item.code}
                      </span>
                      <span
                        style={{
                          fontFamily: 'var(--font-mono)',
                          fontSize: '0.72rem',
                          color: '#FFF',
                          fontWeight: 700,
                        }}
                      >
                        {item.progress}%
                      </span>
                    </div>

                    <h4
                      style={{
                        fontFamily: 'var(--font-heading)',
                        fontSize: '1.05rem',
                        color: '#FFF',
                        marginBottom: '6px',
                      }}
                    >
                      {item.title}
                    </h4>

                    <div
                      style={{
                        fontSize: '0.82rem',
                        color: 'var(--text-muted)',
                        marginBottom: '12px',
                      }}
                    >
                      Focus: {item.focus}
                    </div>

                    {/* Progress Bar with Shimmer */}
                    <div
                      style={{
                        width: '100%',
                        height: '6px',
                        background: 'rgba(255, 255, 255, 0.08)',
                        borderRadius: '3px',
                        overflow: 'hidden',
                        marginBottom: '8px',
                      }}
                    >
                      <div
                        style={{
                          width: `${item.progress}%`,
                          height: '100%',
                          background: 'var(--gold-gradient)',
                        }}
                      />
                    </div>

                    <div
                      style={{
                        fontFamily: 'var(--font-mono)',
                        fontSize: '0.72rem',
                        color: 'var(--gold-antique)',
                      }}
                    >
                      {item.units}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {activeTab === 'challenges' && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {[
                  {
                    title: 'Optimizing Red-Black Tree Balancing with Zero Allocations',
                    difficulty: 'HARD',
                    tests: '28 / 28 Test Cases Passed',
                    time: '142ms Execution',
                    status: 'VERIFIED',
                  },
                  {
                    title: 'Concurrent Distributed Rate Limiter using Token Bucket',
                    difficulty: 'MEDIUM',
                    tests: '19 / 19 Test Cases Passed',
                    time: '88ms Execution',
                    status: 'VERIFIED',
                  },
                  {
                    title: 'Zero-Copy Serialization Engine for Binary Telemetry',
                    difficulty: 'HARD',
                    tests: '32 / 32 Test Cases Passed',
                    time: '210ms Execution',
                    status: 'IN REVIEW',
                  },
                ].map((item, i) => (
                  <div
                    key={i}
                    className="interactive-panel assembly-accent"
                    style={{
                      background: '#151515',
                      border: '1px solid rgba(212, 175, 55, 0.2)',
                      padding: '14px 20px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      flexWrap: 'wrap',
                      gap: '12px',
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                      <CheckCircle size={18} color="var(--gold-bright)" />
                      <div>
                        <div
                          style={{
                            fontFamily: 'var(--font-heading)',
                            fontSize: '0.98rem',
                            color: '#FFF',
                            fontWeight: 600,
                          }}
                        >
                          {item.title}
                        </div>
                        <div
                          style={{
                            fontFamily: 'var(--font-mono)',
                            fontSize: '0.72rem',
                            color: 'var(--text-muted)',
                            display: 'flex',
                            gap: '12px',
                            marginTop: '2px',
                          }}
                        >
                          <span>DIFFICULTY: {item.difficulty}</span>
                          <span>•</span>
                          <span>{item.tests}</span>
                          <span>•</span>
                          <span>{item.time}</span>
                        </div>
                      </div>
                    </div>

                    <span
                      style={{
                        fontFamily: 'var(--font-mono)',
                        fontSize: '0.72rem',
                        padding: '4px 10px',
                        background: 'rgba(212, 175, 55, 0.12)',
                        border: '1px solid var(--gold-border)',
                        color: 'var(--gold-bright)',
                      }}
                    >
                      {item.status}
                    </span>
                  </div>
                ))}
              </div>
            )}

            {activeTab === 'assessment' && (
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                  gap: '20px',
                }}
              >
                <div
                  className="interactive-panel assembly-accent"
                  style={{
                    background: '#151515',
                    border: '1px solid rgba(212, 175, 55, 0.2)',
                    padding: '20px',
                  }}
                >
                  <div
                    style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: '0.72rem',
                      color: 'var(--gold-antique)',
                      marginBottom: '8px',
                    }}
                  >
                    COMPETENCY MATRIX // 5 PILLARS
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    {[
                      { skill: 'Data Structures & Algorithms', score: 94 },
                      { skill: 'System Design & Scalability', score: 86 },
                      { skill: 'Asynchronous Programming', score: 91 },
                      { skill: 'Database Query Optimization', score: 84 },
                      { skill: 'Code Cleanliness & Documentation', score: 96 },
                    ].map((s) => (
                      <div key={s.skill}>
                        <div
                          style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            fontSize: '0.8rem',
                            marginBottom: '4px',
                            color: 'var(--text-ivory)',
                          }}
                        >
                          <span>{s.skill}</span>
                          <span style={{ fontFamily: 'var(--font-mono)', color: 'var(--gold-bright)' }}>
                            {s.score}%
                          </span>
                        </div>
                        <div
                          style={{
                            width: '100%',
                            height: '4px',
                            background: 'rgba(255, 255, 255, 0.08)',
                          }}
                        >
                          <div
                            style={{
                              width: `${s.score}%`,
                              height: '100%',
                              background: 'var(--gold-gradient)',
                            }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div
                  className="interactive-panel assembly-accent"
                  style={{
                    background: '#151515',
                    border: '1px solid rgba(212, 175, 55, 0.2)',
                    padding: '20px',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                  }}
                >
                  <div
                    style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: '0.72rem',
                      color: 'var(--gold-bright)',
                      marginBottom: '8px',
                    }}
                  >
                    OVERALL VERIFIED MASTERY
                  </div>
                  <div
                    style={{
                      fontFamily: 'var(--font-display)',
                      fontSize: '3.5rem',
                      fontWeight: 800,
                      lineHeight: 1,
                      color: 'var(--gold-bright)',
                      marginBottom: '8px',
                    }}
                  >
                    90.2%
                  </div>
                  <p
                    style={{
                      fontSize: '0.85rem',
                      color: 'var(--text-muted)',
                      lineHeight: 1.5,
                      marginBottom: '14px',
                    }}
                  >
                    Computed directly from 47 timed unit-tested coding benchmarks, 3 full system builds, and peer code audit reviews.
                  </p>
                  <div
                    style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: '0.72rem',
                      color: 'var(--gold-antique)',
                    }}
                  >
                    SHA-256 VERIFIED ATTESTATION ID: #ART-8892-V
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'milestones' && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                {[
                  {
                    stage: 'MILESTONE 01',
                    title: 'Core Syntax & Computational Logic Foundations',
                    date: 'Term 01 Completed',
                    badge: 'FOUNDATION CERT',
                  },
                  {
                    stage: 'MILESTONE 02',
                    title: 'Full-Stack Distributed Chat & WebSockets Engine',
                    date: 'Term 02 Completed',
                    badge: 'SYSTEM BUILDER',
                  },
                  {
                    stage: 'MILESTONE 03',
                    title: 'Production-Grade API Gateway & Microservices Cluster',
                    date: 'Term 03 Completed',
                    badge: 'ADVANCED CAPSTONE',
                  },
                ].map((item, i) => (
                  <div
                    key={i}
                    className="interactive-panel assembly-accent"
                    style={{
                      background: '#151515',
                      borderLeft: '3px solid var(--gold-bright)',
                      padding: '14px 20px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      flexWrap: 'wrap',
                      gap: '10px',
                    }}
                  >
                    <div>
                      <div
                        style={{
                          fontFamily: 'var(--font-mono)',
                          fontSize: '0.68rem',
                          color: 'var(--gold-bright)',
                          letterSpacing: '0.15em',
                        }}
                      >
                        {item.stage}
                      </div>
                      <div
                        style={{
                          fontFamily: 'var(--font-heading)',
                          fontSize: '1rem',
                          color: '#FFF',
                          fontWeight: 600,
                        }}
                      >
                        {item.title}
                      </div>
                      <div
                        style={{
                          fontFamily: 'var(--font-mono)',
                          fontSize: '0.72rem',
                          color: 'var(--text-muted)',
                        }}
                      >
                        {item.date}
                      </div>
                    </div>

                    <span
                      style={{
                        fontFamily: 'var(--font-mono)',
                        fontSize: '0.72rem',
                        padding: '6px 12px',
                        background: 'rgba(212, 175, 55, 0.1)',
                        border: '1px solid var(--gold-border)',
                        color: 'var(--gold-bright)',
                      }}
                    >
                      {item.badge}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
