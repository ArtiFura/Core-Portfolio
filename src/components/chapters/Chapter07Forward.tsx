import React, { useRef, useEffect } from 'react';
import {
  GraduationCap,
  Building2,
  Handshake,
  ArrowUpRight,
  Mail,
  ChevronUp,
} from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useParallax } from '../../motion/useScrollReveal';
import { scrollToTarget } from '../../motion/lenisManager';
import { useMagnetic } from '../../motion/useMagnetic';
import { ArtifuraSymbol, ArtifuraLambdaGlyph } from '../ArtifuraIntro';

gsap.registerPlugin(ScrollTrigger);

interface Chapter07ForwardProps {
  onOpenProjectModal: (type?: 'college' | 'business' | 'partner') => void;
}

export const Chapter07Forward: React.FC<Chapter07ForwardProps> = ({
  onOpenProjectModal,
}) => {
  const currentYear = new Date().getFullYear();
  const sectionRef = useRef<HTMLElement | null>(null);
  const headerRef = useRef<HTMLDivElement | null>(null);
  const frameRef = useRef<HTMLDivElement | null>(null);
  const pathsGridRef = useRef<HTMLDivElement | null>(null);
  const signatureRef = useRef<HTMLDivElement | null>(null);
  const signatureLineRef = useRef<HTMLDivElement | null>(null);

  const parallaxImgRef = useParallax<HTMLImageElement>(0.12);

  // Magnetic button on the top-return button
  const returnTopBtnRef = useMagnetic<HTMLButtonElement>({ strength: 0.2, maxDistance: 8 });

  const paths = [
    {
      type: 'college' as const,
      title: 'FOR COLLEGES',
      subtitle: 'Higher Education & Technical Institutes',
      desc: 'Deploy automated assessment pipelines, transparent skill matrices, and structured project milestones across your engineering departments.',
      icon: GraduationCap,
      action: 'EXPLORE ACADEMIC PLATFORM',
    },
    {
      type: 'business' as const,
      title: 'FOR BUSINESSES',
      subtitle: 'Enterprise Labs & Growing Companies',
      desc: 'Build high-performance digital products, intelligent developer tooling, or discuss custom technical infrastructure challenges.',
      icon: Building2,
      action: 'DISCUSS A PROJECT',
    },
    {
      type: 'partner' as const,
      title: 'FOR PARTNERS',
      subtitle: 'Mentors, Accelerators & Ecosystems',
      desc: 'Collaborate on workforce readiness, open-source educational modules, or regional talent incubation initiatives.',
      icon: Handshake,
      action: 'EXPLORE COLLABORATION',
    },
  ];

  const handleScrollToTop = () => {
    scrollToTarget('#chapter-00', 0);
  };

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      // 1. Header Reveal with Clipping Masks
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

      // 2. Converging Finale Frame
      if (frameRef.current) {
        gsap.fromTo(
          frameRef.current,
          { opacity: 0, y: 40, scale: 0.98 },
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

      // 3. Staggered Entry of 3 Resolution Paths
      if (pathsGridRef.current) {
        gsap.fromTo(
          pathsGridRef.current.children,
          { opacity: 0, y: 35 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            stagger: 0.18,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: pathsGridRef.current,
              start: 'top 88%',
              once: true,
            },
          }
        );
      }

      // 4. Final Brand Resolution & Gold Drawing Line
      if (signatureRef.current) {
        const sigTl = gsap.timeline({
          scrollTrigger: {
            trigger: signatureRef.current,
            start: 'top 90%',
            once: true,
          },
        });

        sigTl
          .fromTo(
            signatureRef.current,
            { opacity: 0, scale: 0.97, y: 25 },
            { opacity: 1, scale: 1, y: 0, duration: 0.9, ease: 'power3.out' }
          )
          .fromTo(
            signatureLineRef.current,
            { scaleX: 0, opacity: 0, transformOrigin: 'center' },
            { scaleX: 1, opacity: 1, duration: 0.85, ease: 'expo.out' },
            '-=0.4'
          );
      }
    }, el);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="chapter-07"
      style={{
        padding: '100px 24px 40px',
        position: 'relative',
        background: 'radial-gradient(ellipse at 50% 30%, rgba(212, 175, 55, 0.08) 0%, #080808 80%)',
        overflow: 'hidden',
      }}
    >
      {/* Background Ambient Gold Glow */}
      <div
        className="ambient-gold-orbit"
        style={{
          width: '500px',
          height: '500px',
          background: 'radial-gradient(circle, rgba(212, 175, 55, 0.1) 0%, transparent 70%)',
          bottom: '10%',
          right: '15%',
        }}
      />

      <div style={{ maxWidth: '1280px', margin: '0 auto', position: 'relative', zIndex: 2 }}>
        {/* Header */}
        <div ref={headerRef} style={{ textAlign: 'center', marginBottom: '40px' }}>


          <h2
            style={{
              fontFamily: 'var(--font-heading)',
              fontSize: 'clamp(2rem, 4.5vw, 3.8rem)',
              fontWeight: 800,
              textTransform: 'uppercase',
              color: '#FFF',
              lineHeight: 1.12,
              maxWidth: '980px',
              margin: '0 auto 16px',
            }}
          >
            THE NEXT CHAPTER{' '}
            <span className="gold-gradient-text">STARTS WITH AN IDEA.</span>
          </h2>

          <p
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: '1.15rem',
              color: 'var(--text-muted)',
              maxWidth: '680px',
              margin: '0 auto',
              lineHeight: 1.6,
            }}
          >
            Have a challenge worth solving? Let’s build something meaningful.
          </p>
        </div>

        {/* Converging Grand Finale Artwork Frame with Image Hover Category Treatment */}
        <div
          ref={frameRef}
          className="comic-frame comic-corner-accents comic-artwork-container"
          style={{
            position: 'relative',
            overflow: 'hidden',
            border: '1px solid var(--gold-border-bright)',
            boxShadow: '0 25px 70px rgba(0, 0, 0, 0.95), 0 0 45px rgba(212, 175, 55, 0.25)',
            marginBottom: '48px',
          }}
        >


          <div style={{ position: 'relative', width: '100%', aspectRatio: '16/9', overflow: 'hidden' }}>
            <img
              ref={parallaxImgRef}
              src="/assets/comic/chapter7.jpg"
              alt="Comic panels converging towards the golden horizon with ARTIFURA wordmark"
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
                background: 'linear-gradient(180deg, transparent 55%, rgba(8, 8, 8, 0.95) 100%)',
                pointerEvents: 'none',
              }}
            />
          </div>
        </div>

        {/* Three Clear Paths */}
        <div
          ref={pathsGridRef}
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '24px',
            marginBottom: '64px',
          }}
        >
          {paths.map((p) => {
            const Icon = p.icon;
            return (
              <div
                key={p.type}
                className="comic-frame comic-corner-accents interactive-panel"
                style={{
                  background: '#101010',
                  border: '1px solid rgba(212, 175, 55, 0.25)',
                  padding: '30px',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  transition: 'all 0.35s cubic-bezier(0.16, 1, 0.3, 1)',
                }}
              >
                <div>
                  <div
                    style={{
                      width: '44px',
                      height: '44px',
                      background: 'rgba(212, 175, 55, 0.12)',
                      border: '1px solid var(--gold-border)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: 'var(--gold-bright)',
                      marginBottom: '16px',
                    }}
                  >
                    <Icon size={22} />
                  </div>

                  <h3
                    style={{
                      fontFamily: 'var(--font-heading)',
                      fontSize: '1.35rem',
                      fontWeight: 800,
                      color: '#FFF',
                      marginBottom: '4px',
                      letterSpacing: '0.04em',
                    }}
                  >
                    {p.title}
                  </h3>

                  <div
                    style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: '0.72rem',
                      color: 'var(--gold-bright)',
                      marginBottom: '14px',
                    }}
                  >
                    {p.subtitle}
                  </div>

                  <p
                    style={{
                      fontFamily: 'var(--font-body)',
                      fontSize: '0.9rem',
                      color: 'var(--text-muted)',
                      lineHeight: 1.6,
                      marginBottom: '24px',
                    }}
                  >
                    {p.desc}
                  </p>
                </div>

                <button
                  onClick={() => onOpenProjectModal(p.type)}
                  className="btn-gold-secondary"
                  style={{
                    width: '100%',
                    justifyContent: 'space-between',
                    padding: '12px 18px',
                  }}
                >
                  <span>{p.action}</span>
                  <ArrowUpRight size={16} />
                </button>
              </div>
            );
          })}
        </div>

        {/* Final Brand Signature & Callout with Self-Drawing Golden Frame */}
        <div
          ref={signatureRef}
          className="gold-sweep-active"
          style={{
            textAlign: 'center',
            padding: '60px 20px',
            borderTop: '1px solid rgba(212, 175, 55, 0.25)',
            borderBottom: '1px solid rgba(212, 175, 55, 0.25)',
            marginBottom: '48px',
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          {/* Drawing Gold Underline */}
          <div
            ref={signatureLineRef}
            style={{
              position: 'absolute',
              top: 0,
              left: '20%',
              right: '20%',
              height: '2px',
              background: 'var(--gold-gradient)',
              boxShadow: '0 0 14px rgba(245, 215, 110, 0.8)',
            }}
          />



          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '14px',
              marginBottom: '14px',
            }}
          >
            <ArtifuraSymbol
              style={{
                height: '46px',
                width: 'auto',
                filter: 'drop-shadow(0 0 24px rgba(255, 212, 87, 0.65))',
              }}
            />
            <span
              style={{
                fontFamily: 'var(--font-display, "Space Grotesk", sans-serif)',
                fontSize: 'clamp(2.2rem, 5vw, 3.4rem)',
                fontWeight: 600,
                letterSpacing: '0.08em',
                lineHeight: 1,
                color: '#f0efea',
                display: 'inline-flex',
                alignItems: 'baseline',
                textTransform: 'uppercase',
              }}
              className="wordmark-shine gold-glow-subtle"
            >
              RTIFUR
              <ArtifuraLambdaGlyph
                style={{
                  height: '0.88em',
                  width: 'auto',
                  display: 'inline-block',
                  verticalAlign: 'baseline',
                }}
              />
            </span>
          </div>

          <div
            style={{
              fontFamily: 'var(--font-heading)',
              fontStyle: 'italic',
              fontSize: '1.25rem',
              color: 'var(--text-ivory)',
              letterSpacing: '0.04em',
            }}
          >
            “We Build What Comes Next.”
          </div>
        </div>

        {/* Footer */}
        <footer
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '24px',
          }}
        >
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: '20px',
            }}
          >
            {/* Direct Email */}
            <a
              href="mailto:contact@artifura.com"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                textDecoration: 'none',
                fontFamily: 'var(--font-mono)',
                fontSize: '0.82rem',
                color: 'var(--gold-bright)',
              }}
            >
              <Mail size={16} />
              <span>contact@artifura.com</span>
            </a>

            {/* Social Links */}
            <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
              {/* GitHub */}
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  color: 'var(--text-muted)',
                  transition: 'color 0.2s',
                  display: 'flex',
                  alignItems: 'center',
                }}
                aria-label="GitHub Repository"
                onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--gold-bright)')}
                onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--text-muted)')}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
                  <path d="M9 18c-4.51 2-5-2-7-2" />
                </svg>
              </a>

              {/* LinkedIn */}
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  color: 'var(--text-muted)',
                  transition: 'color 0.2s',
                  display: 'flex',
                  alignItems: 'center',
                }}
                aria-label="LinkedIn"
                onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--gold-bright)')}
                onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--text-muted)')}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                  <rect x="2" y="9" width="4" height="12" />
                  <circle cx="4" cy="4" r="2" />
                </svg>
              </a>

              {/* X / Twitter */}
              <a
                href="https://x.com"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  color: 'var(--text-muted)',
                  transition: 'color 0.2s',
                  display: 'flex',
                  alignItems: 'center',
                }}
                aria-label="Twitter / X"
                onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--gold-bright)')}
                onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--text-muted)')}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>

              <button
                ref={returnTopBtnRef}
                onClick={handleScrollToTop}
                style={{
                  background: 'rgba(212, 175, 55, 0.1)',
                  border: '1px solid rgba(212, 175, 55, 0.3)',
                  color: 'var(--gold-bright)',
                  width: '38px',
                  height: '38px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  marginLeft: '12px',
                  transition: 'all 0.2s ease',
                }}
                aria-label="Scroll back to cover"
              >
                <ChevronUp size={18} />
              </button>
            </div>
          </div>

          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: '12px',
              fontFamily: 'var(--font-mono)',
              fontSize: '0.72rem',
              color: 'var(--text-dim)',
              borderTop: '1px solid rgba(255, 255, 255, 0.05)',
              paddingTop: '16px',
            }}
          >
            <div>
              © {currentYear} ARTIFURA TECHNOLOGIES PVT. LTD. ALL RIGHTS RESERVED.
            </div>
            <div>
              GOLDEN COMIC EDITION // SINGLE-PAGE CHRONICLE
            </div>
          </div>
        </footer>
      </div>
    </section>
  );
};

