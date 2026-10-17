import React, { useState, useRef, useEffect } from 'react';
import {
  Cpu,
  Server,
  Shield,
  BarChart3,
  Globe2,
  Workflow,
  Sparkles,
} from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useParallax } from '../../motion/useScrollReveal';
import { useMouseSpotlight } from '../../motion/useMouseSpotlight';
import { getAssetUrl } from '../../utils/asset';

gsap.registerPlugin(ScrollTrigger);

export const Chapter06BuiltToScale: React.FC = () => {
  const [activeModule, setActiveModule] = useState<number>(0);
  const sectionRef = useRef<HTMLElement | null>(null);
  const headerRef = useRef<HTMLDivElement | null>(null);
  const frameRef = useRef<HTMLDivElement | null>(null);
  const modulesGridRef = useRef<HTMLDivElement | null>(null);
  const stackRef = useRef<HTMLDivElement | null>(null);

  const parallaxImgRef = useParallax<HTMLImageElement>(0.12);
  const stackSpotlightRef = useMouseSpotlight<HTMLDivElement>({ opacity: 0.08 });

  const modules = [
    {
      id: 'lms',
      title: 'Adaptive Learning Engines',
      role: 'Modular Curriculum Compiler',
      desc: 'Dynamic pacing algorithms that adapt challenge complexity based on real-time execution telemetry and diagnostic milestones.',
      icon: Cpu,
    },
    {
      id: 'eval',
      title: 'Automated Assessment Compilers',
      role: 'Deterministic Test Harness',
      desc: 'Containerized sandboxes executing multi-language unit suites, performance benchmarks, and memory boundary tests safely.',
      icon: Server,
    },
    {
      id: 'ledger',
      title: 'Student Skill Profiles',
      role: 'Verifiable Attestation Ledger',
      desc: 'Structured competency dossiers backed by cryptographic audit trails and direct links to audited project source code.',
      icon: Shield,
    },
    {
      id: 'inst',
      title: 'Institutional Dashboards',
      role: 'Academic Intelligence Hub',
      desc: 'Departmental analytics tracking cohort mastery, curriculum bottlenecks, and real-time accreditation metrics for college leadership.',
      icon: BarChart3,
    },
    {
      id: 'recruit',
      title: 'Recruitment Workflows',
      role: 'Consent-First Talent Routing',
      desc: 'Direct matchmaking between student-authorized skills and employer requirements, eliminating resume noise.',
      icon: Workflow,
    },
    {
      id: 'custom',
      title: 'Custom Digital Products',
      role: 'Bespoke Engineering Solutions',
      desc: 'End-to-end software development services for forward-thinking enterprises, universities, and innovative startups.',
      icon: Globe2,
    },
  ];

  // Dual Row Technology Ticker Items
  const tickerRowA = [
    'React 19 Core',
    'TypeScript 5',
    'Node.js Runtime',
    'Go Concurrency',
    'Docker Sandboxes',
    'PostgreSQL Engine',
    'Redis In-Memory',
    'WebGL Canvas',
    'Python AI Core',
    'Vector Embeddings',
  ];

  const tickerRowB = [
    'Zero-Trust Isolation',
    'SHA-256 Attestations',
    'GraphQL Subscriptions',
    'Kafka Event Streams',
    'WebAssembly Engines',
    'TLS 1.3 Encryption',
    'Tailwind & CSS Tokens',
    'Vite Build Pipeline',
    'PyTorch Vectors',
    'Deterministic Sandboxes',
  ];

  // Categorized Technical Matrix
  const techStack = [
    {
      category: 'INTERFACES & GRAPHICS',
      items: ['React 19', 'TypeScript', 'Tailwind & Vanilla CSS', 'WebGL Canvas', 'Vite Bundler'],
    },
    {
      category: 'SYSTEMS & EXECUTION RUNTIMES',
      items: ['Node.js', 'Go Runtime', 'Docker Sandboxes', 'WebAssembly', 'Python Core'],
    },
    {
      category: 'DATA STORES & TELEMETRY',
      items: ['PostgreSQL', 'Redis Cache', 'Vector Embeddings', 'GraphQL / REST', 'Kafka Streams'],
    },
    {
      category: 'SECURITY & PROTOCOLS',
      items: ['JWT & OAuth2', 'Zero-Trust Isolation', 'SHA-256 Attestations', 'TLS 1.3 Encryption'],
    },
  ];

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
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

      if (frameRef.current) {
        gsap.fromTo(
          frameRef.current,
          { opacity: 0, y: 40, scale: 0.98 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.85,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: frameRef.current,
              start: 'top 85%',
              once: true,
            },
          }
        );
      }

      if (modulesGridRef.current) {
        gsap.fromTo(
          modulesGridRef.current.children,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.75,
            stagger: 0.1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: modulesGridRef.current,
              start: 'top 88%',
              once: true,
            },
          }
        );
      }

      if (stackRef.current) {
        gsap.fromTo(
          stackRef.current,
          { opacity: 0, y: 35 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: stackRef.current,
              start: 'top 90%',
              once: true,
            },
          }
        );
      }
    }, el);

    return () => ctx.revert();
  }, []);

  const setStackRef = (node: HTMLDivElement | null) => {
    stackRef.current = node;
    (stackSpotlightRef as React.MutableRefObject<HTMLDivElement | null>).current = node;
  };

  return (
    <section
      ref={sectionRef}
      id="chapter-06"
      style={{
        padding: '100px 24px 90px',
        position: 'relative',
        background: 'radial-gradient(circle at 50% 20%, rgba(212, 175, 55, 0.06) 0%, #080808 65%)',
        overflow: 'hidden',
      }}
    >
      <div style={{ maxWidth: '1280px', margin: '0 auto', position: 'relative', zIndex: 2 }}>
        {/* Header */}
        <div ref={headerRef} style={{ textAlign: 'center', marginBottom: '40px' }}>


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
            ONE VISION.{' '}
            <span className="gold-gradient-text">MULTIPLE POSSIBILITIES.</span>
          </h2>

          <p
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: '1.05rem',
              color: 'var(--text-muted)',
              maxWidth: '740px',
              margin: '0 auto',
              lineHeight: 1.6,
            }}
          >
            We design technology experiences that can evolve with the people, institutions, and businesses they serve — engineered as an extensible modular ecosystem.
          </p>
        </div>

        {/* Cinematic Architectural Schematic Artwork */}
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
              src={getAssetUrl('/assets/comic/chapter6.jpg')}
              alt="Connected technology ecosystem blueprint showing learning engines, assessment compilers, and institutional intelligence hubs"
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
                background: 'linear-gradient(180deg, transparent 65%, rgba(8, 8, 8, 0.85) 100%)',
                pointerEvents: 'none',
              }}
            />
          </div>
        </div>

        {/* Interactive Architecture Modules Grid */}
        <div
          ref={modulesGridRef}
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '18px',
            marginBottom: '48px',
          }}
        >
          {modules.map((mod, idx) => {
            const Icon = mod.icon;
            const isSelected = activeModule === idx;
            return (
              <div
                key={mod.id}
                onClick={() => setActiveModule(idx)}
                className={`comic-frame comic-corner-accents interactive-panel ${
                  isSelected ? 'gold-pulse' : ''
                }`}
                style={{
                  padding: '20px',
                  background: isSelected ? 'rgba(26, 22, 12, 0.95)' : 'rgba(17, 17, 17, 0.8)',
                  borderColor: isSelected ? 'var(--gold-bright)' : 'rgba(212, 175, 55, 0.2)',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  transform: isSelected ? 'translateY(-4px)' : 'none',
                }}
              >
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    marginBottom: '10px',
                  }}
                >
                  <div
                    style={{
                      width: '34px',
                      height: '34px',
                      background: 'rgba(212, 175, 55, 0.15)',
                      border: '1px solid var(--gold-border)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: 'var(--gold-bright)',
                    }}
                  >
                    <Icon size={18} />
                  </div>
                  <span
                    style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: '0.65rem',
                      color: isSelected ? 'var(--gold-bright)' : 'var(--gold-antique)',
                    }}
                  >
                    MODULE 0{idx + 1}
                  </span>
                </div>

                <h3
                  style={{
                    fontFamily: 'var(--font-heading)',
                    fontSize: '1.1rem',
                    color: '#FFF',
                    fontWeight: 700,
                    marginBottom: '4px',
                  }}
                >
                  {mod.title}
                </h3>

                <div
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.72rem',
                    color: 'var(--gold-bright)',
                    marginBottom: '8px',
                  }}
                >
                  {mod.role}
                </div>

                <p
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: '0.84rem',
                    color: 'var(--text-muted)',
                    lineHeight: 1.5,
                  }}
                >
                  {mod.desc}
                </p>
              </div>
            );
          })}
        </div>

        {/* THE STACK: Continuous Horizontal Energy with Seamless Tickers & Spotlight */}
        <div
          ref={setStackRef}
          className="comic-frame tech-ticker-container gold-spotlight-container"
          style={{
            background: '#0d0d0d',
            border: '1px solid var(--gold-border-bright)',
            padding: '36px',
            position: 'relative',
            overflow: 'hidden',
            boxShadow: '0 20px 50px rgba(0,0,0,0.85), 0 0 30px rgba(212, 175, 55, 0.15)',
          }}
        >
          {/* Header Bar */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginBottom: '28px',
              flexWrap: 'wrap',
              gap: '12px',
              borderBottom: '1px solid rgba(212, 175, 55, 0.2)',
              paddingBottom: '16px',
              position: 'relative',
              zIndex: 3,
            }}
          >
            <div>
              <div
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.72rem',
                  color: 'var(--gold-antique)',
                  letterSpacing: '0.2em',
                }}
              >
                CORE CAPABILITIES // INTENDED ARCHITECTURE
              </div>
              <h3
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: '1.6rem',
                  letterSpacing: '0.08em',
                  color: 'var(--gold-bright)',
                }}
              >
                THE STACK
              </h3>
            </div>
            <span
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.72rem',
                color: 'var(--gold-bright)',
                background: 'rgba(212, 175, 55, 0.1)',
                padding: '6px 14px',
                border: '1px solid rgba(212, 175, 55, 0.3)',
                borderRadius: '2px',
              }}
            >
              CONTINUOUS RUNTIME • EDITABLE • BENCHMARKED
            </span>
          </div>

          {/* Continuous Dual-Speed Horizontal Energy Tickers (Pause on Hover/Focus) */}
          <div
            style={{
              marginBottom: '32px',
              overflow: 'hidden',
              position: 'relative',
              display: 'flex',
              flexDirection: 'column',
              gap: '12px',
              padding: '8px 0',
              zIndex: 3,
            }}
          >
            {/* Ticker Row 1 (Moving Left) */}
            <div className="tech-ticker-row ticker-left">
              {[...tickerRowA, ...tickerRowA].map((item, idx) => (
                <div
                  key={`${item}-${idx}`}
                  className="tech-badge-interactive"
                  tabIndex={0}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '8px',
                    marginRight: '14px',
                    padding: '8px 16px',
                    background: 'rgba(20, 20, 20, 0.85)',
                    border: '1px solid rgba(212, 175, 55, 0.22)',
                    borderRadius: '2px',
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.76rem',
                    color: 'var(--text-ivory)',
                    cursor: 'pointer',
                    userSelect: 'none',
                    whiteSpace: 'nowrap',
                  }}
                >
                  <Sparkles size={11} color="var(--gold-bright)" />
                  <span>{item}</span>
                </div>
              ))}
            </div>

            {/* Ticker Row 2 (Moving Right, Slower) */}
            <div className="tech-ticker-row ticker-right">
              {[...tickerRowB, ...tickerRowB].map((item, idx) => (
                <div
                  key={`${item}-${idx}`}
                  className="tech-badge-interactive"
                  tabIndex={0}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '8px',
                    marginRight: '14px',
                    padding: '8px 16px',
                    background: 'rgba(24, 20, 14, 0.85)',
                    border: '1px solid rgba(212, 175, 55, 0.22)',
                    borderRadius: '2px',
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.76rem',
                    color: 'var(--gold-bright)',
                    cursor: 'pointer',
                    userSelect: 'none',
                    whiteSpace: 'nowrap',
                  }}
                >
                  <span style={{ width: '4px', height: '4px', background: 'var(--gold-bright)', borderRadius: '1px' }} />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Categorized Architecture Matrix */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
              gap: '20px',
              position: 'relative',
              zIndex: 3,
            }}
          >
            {techStack.map((group) => (
              <div
                key={group.category}
                style={{
                  background: '#141414',
                  border: '1px solid rgba(212, 175, 55, 0.15)',
                  padding: '18px',
                }}
              >
                <div
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.68rem',
                    color: 'var(--gold-bright)',
                    letterSpacing: '0.12em',
                    marginBottom: '12px',
                  }}
                >
                  {group.category}
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  {group.items.map((tech) => (
                    <div
                      key={tech}
                      className="interactive-panel"
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px',
                        fontFamily: 'var(--font-mono)',
                        fontSize: '0.8rem',
                        color: 'var(--text-ivory)',
                        padding: '6px 8px',
                        background: 'rgba(255, 255, 255, 0.02)',
                        border: '1px solid transparent',
                        borderRadius: '2px',
                        cursor: 'default',
                      }}
                    >
                      <span
                        style={{
                          width: '4px',
                          height: '4px',
                          background: 'var(--gold-bright)',
                          borderRadius: '1px',
                        }}
                      />
                      <span>{tech}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
