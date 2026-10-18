import React, { useState, useRef, useEffect } from 'react';
import {
  Cpu,
  Server,
  Shield,
  BarChart3,
  Globe2,
  Workflow,
  Maximize2,
} from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useParallax } from '../../motion/useScrollReveal';
import { getAssetUrl } from '../../utils/asset';
import { useComicLightbox } from '../common/ComicLightboxContext';

gsap.registerPlugin(ScrollTrigger);

export const Chapter06BuiltToScale: React.FC = () => {
  const { openLightbox } = useComicLightbox();
  const [activeModule, setActiveModule] = useState<number>(0);
  const sectionRef = useRef<HTMLElement | null>(null);
  const headerRef = useRef<HTMLDivElement | null>(null);
  const frameRef = useRef<HTMLDivElement | null>(null);
  const modulesGridRef = useRef<HTMLDivElement | null>(null);

  const parallaxImgRef = useParallax<HTMLImageElement>(0.12);

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
    }, el);

    return () => ctx.revert();
  }, []);

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


          <div
            className="comic-art-wrapper"
            style={{ cursor: 'pointer' }}
            onClick={() => {
              openLightbox({
                src: getAssetUrl('/assets/comic/chapter6.jpg'),
                alt: 'Connected technology ecosystem blueprint showing learning engines, assessment compilers, and institutional intelligence hubs',
                title: 'Chapter 06 // Built to Scale',
                chapterTag: 'CHRONICLE 06 // SYSTEM BLUEPRINT',
                dialogue: '“Automated sandboxing, cryptographic verification, and institutional pipeline integration operating at planetary scale.”',
              });
            }}
          >
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
              className="comic-zoom-pill"
              onClick={(e) => {
                e.stopPropagation();
                openLightbox({
                  src: getAssetUrl('/assets/comic/chapter6.jpg'),
                  alt: 'Connected technology ecosystem blueprint showing learning engines, assessment compilers, and institutional intelligence hubs',
                  title: 'Chapter 06 // Built to Scale',
                  chapterTag: 'CHRONICLE 06 // SYSTEM BLUEPRINT',
                  dialogue: '“Automated sandboxing, cryptographic verification, and institutional pipeline integration operating at planetary scale.”',
                });
              }}
            >
              <Maximize2 size={11} />
              <span>TAP TO ZOOM</span>
            </div>
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
      </div>
    </section>
  );
};
