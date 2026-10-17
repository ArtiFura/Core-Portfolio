import React, { useRef, useEffect } from 'react';
import {
  Rocket,
  Building2,
  Network,
  ArrowRight,
} from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface Chapter06BuiltForDifferentCompaniesProps {
  onOpenCompanyModal: (type?: 'startup' | 'enterprise') => void;
}

export const Chapter06BuiltForDifferentCompanies: React.FC<Chapter06BuiltForDifferentCompaniesProps> = ({
  onOpenCompanyModal,
}) => {
  const sectionRef = useRef<HTMLElement | null>(null);
  const headerRef = useRef<HTMLDivElement | null>(null);
  const startupPanelRef = useRef<HTMLDivElement | null>(null);
  const enterprisePanelRef = useRef<HTMLDivElement | null>(null);
  const convergenceRef = useRef<HTMLDivElement | null>(null);

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

      // 2. Startup & Enterprise Panels Entrance
      if (startupPanelRef.current && enterprisePanelRef.current) {
        gsap.fromTo(
          startupPanelRef.current,
          { opacity: 0, x: -35 },
          {
            opacity: 1,
            x: 0,
            duration: 0.85,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: startupPanelRef.current,
              start: 'top 82%',
              once: true,
            },
          }
        );

        gsap.fromTo(
          enterprisePanelRef.current,
          { opacity: 0, x: 35 },
          {
            opacity: 1,
            x: 0,
            duration: 0.85,
            delay: 0.15,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: enterprisePanelRef.current,
              start: 'top 82%',
              once: true,
            },
          }
        );
      }

      // 3. Convergence Box
      if (convergenceRef.current) {
        gsap.fromTo(
          convergenceRef.current,
          { opacity: 0, y: 30, scale: 0.98 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.85,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: convergenceRef.current,
              start: 'top 85%',
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
        position: 'relative',
        minHeight: '100vh',
        padding: '100px 24px 90px',
        background: 'radial-gradient(ellipse at 50% 40%, #12100a 0%, var(--bg-obsidian) 85%)',
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
            YOUR NEXT GREAT HIRE{' '}
            <span className="gold-gradient-text">STARTS WITH DISCOVERY.</span>
          </h2>

          <p
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: 'clamp(0.95rem, 1.2vw, 1.15rem)',
              color: 'var(--text-muted)',
              maxWidth: '780px',
              lineHeight: 1.7,
              margin: '0 auto',
            }}
          >
            From high-velocity seed startups deploying on Day 1 to multinational enterprises auditing technical cohorts, verified proof adapts to every scale.
          </p>
        </div>

        {/* Graphic Novel 3-Panel Comic Strip: Tailored for Every Scale */}
        <div
          className="comic-frame comic-corner-accents comic-artwork-container"
          style={{
            maxWidth: '1100px',
            margin: '0 auto 36px',
            position: 'relative',
            overflow: 'hidden',
            border: '1px solid var(--gold-border-bright)',
            boxShadow: '0 25px 70px rgba(0, 0, 0, 0.95), 0 0 45px rgba(212, 175, 55, 0.18)',
          }}
        >
          <div style={{ position: 'relative', width: '100%', aspectRatio: '16/9', overflow: 'hidden' }}>
            <img
              src="/assets/comic/company_ch6_multicompany.jpg"
              alt="Three-panel manga strip showing how startups, scale-ups, and enterprises all benefit from verified candidate proof"
              style={{
                width: '100%',
                height: '106%',
                objectFit: 'cover',
                display: 'block',
                transition: 'transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
              }}
              loading="lazy"
            />

            {/* Manga Caption Box */}
            <div
              className="comic-caption-box"
              style={{
                position: 'absolute',
                top: '18px',
                left: '20px',
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
              CHRONICLE 06 // TAILORED FOR EVERY SCALE
            </div>
          </div>
        </div>

        {/* Dual Distinct Panels: Startups vs Enterprises */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '28px',
            maxWidth: '1100px',
            margin: '0 auto 40px',
          }}
        >
          {/* PANEL 1: FOR STARTUPS */}
          <div
            ref={startupPanelRef}
            className="comic-frame comic-corner-accents"
            style={{
              background: '#0d0d0d',
              border: '1px solid var(--gold-border)',
              padding: '28px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              boxShadow: '0 15px 40px rgba(0, 0, 0, 0.85)',
            }}
          >
            <div>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                  marginBottom: '16px',
                }}
              >
                <div
                  style={{
                    width: '36px',
                    height: '36px',
                    background: 'rgba(212, 175, 55, 0.12)',
                    border: '1px solid var(--gold-bright)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <Rocket size={18} color="var(--gold-bright)" />
                </div>
                <div>
                  <span
                    style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: '0.65rem',
                      color: 'var(--gold-bright)',
                      letterSpacing: '0.18em',
                      display: 'block',
                    }}
                  >
                    FOR LEAN & GROWING TEAMS
                  </span>
                  <h3
                    style={{
                      fontFamily: 'var(--font-heading)',
                      fontSize: '1.25rem',
                      color: 'var(--text-ivory)',
                      margin: 0,
                    }}
                  >
                    FOR STARTUPS
                  </h3>
                </div>
              </div>

              <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)', lineHeight: 1.6, marginBottom: '20px' }}>
                Focus on finding promising early-career talent, discovering practical project experience, and identifying autonomous builders who can grow with a small, high-velocity team.
              </p>

              {/* Startup Key Advantages */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '24px' }}>
                {[
                  {
                    title: 'Evaluate Real Repositories First',
                    desc: 'Small teams cannot afford weeks of generic interviews. Review commit histories and architecture decisions upfront.',
                  },
                  {
                    title: 'Direct Early-Career Momentum',
                    desc: 'Discover hungry self-starters who have already built complex personal systems with genuine passion.',
                  },
                  {
                    title: 'Speed to Offer',
                    desc: 'Skip non-technical filtering stages and connect directly with candidates ready to contribute to your codebase.',
                  },
                ].map((item, idx) => (
                  <div
                    key={idx}
                    style={{
                      background: '#121212',
                      borderLeft: '2px solid var(--gold-bright)',
                      padding: '10px 14px',
                    }}
                  >
                    <div style={{ fontSize: '0.82rem', color: 'var(--text-ivory)', fontWeight: 600 }}>
                      {item.title}
                    </div>
                    <div style={{ fontSize: '0.76rem', color: 'var(--text-dim)', marginTop: '2px' }}>
                      {item.desc}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <button
              onClick={() => onOpenCompanyModal('startup')}
              className="btn-gold-secondary"
              style={{ width: '100%', padding: '12px' }}
            >
              <span>EXPLORE STARTUP USE CASE</span>
              <ArrowRight size={14} />
            </button>
          </div>

          {/* PANEL 2: FOR ENTERPRISES */}
          <div
            ref={enterprisePanelRef}
            className="comic-frame comic-corner-accents"
            style={{
              background: '#0d0d0d',
              border: '1px solid var(--gold-border)',
              padding: '28px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              boxShadow: '0 15px 40px rgba(0, 0, 0, 0.85)',
            }}
          >
            <div>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                  marginBottom: '16px',
                }}
              >
                <div
                  style={{
                    width: '36px',
                    height: '36px',
                    background: 'rgba(212, 175, 55, 0.12)',
                    border: '1px solid var(--gold-bright)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <Building2 size={18} color="var(--gold-bright)" />
                </div>
                <div>
                  <span
                    style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: '0.65rem',
                      color: 'var(--gold-bright)',
                      letterSpacing: '0.18em',
                      display: 'block',
                    }}
                  >
                    FOR SCALE & INSTITUTIONAL REACH
                  </span>
                  <h3
                    style={{
                      fontFamily: 'var(--font-heading)',
                      fontSize: '1.25rem',
                      color: 'var(--text-ivory)',
                      margin: 0,
                    }}
                  >
                    FOR ENTERPRISES
                  </h3>
                </div>
              </div>

              <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)', lineHeight: 1.6, marginBottom: '20px' }}>
                Focus on exploring emerging talent across institutions, reviewing relevant skills, and supporting broader campus and early-career recruitment efforts at scale.
              </p>

              {/* Enterprise Key Advantages */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '24px' }}>
                {[
                  {
                    title: 'Cross-Campus Signal Without Bias',
                    desc: 'Discover skilled developers at regional colleges whose resumes might otherwise be overlooked by prestige-filtered filters.',
                  },
                  {
                    title: 'Standardized Assessment Telemetry',
                    desc: 'Compare candidates across rigorous, code-based problem sets evaluated under uniform runtime environments.',
                  },
                  {
                    title: 'Early Pipeline Incubation',
                    desc: 'Build strong relationships with academic departments and identify top students months before graduating.',
                  },
                ].map((item, idx) => (
                  <div
                    key={idx}
                    style={{
                      background: '#121212',
                      borderLeft: '2px solid var(--gold-bright)',
                      padding: '10px 14px',
                    }}
                  >
                    <div style={{ fontSize: '0.82rem', color: 'var(--text-ivory)', fontWeight: 600 }}>
                      {item.title}
                    </div>
                    <div style={{ fontSize: '0.76rem', color: 'var(--text-dim)', marginTop: '2px' }}>
                      {item.desc}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <button
              onClick={() => onOpenCompanyModal('enterprise')}
              className="btn-gold-secondary"
              style={{ width: '100%', padding: '12px' }}
            >
              <span>EXPLORE ENTERPRISE PIPELINE</span>
              <ArrowRight size={14} />
            </button>
          </div>
        </div>

        {/* Converged Ecosystem Banner */}
        <div
          ref={convergenceRef}
          className="comic-frame"
          style={{
            maxWidth: '1100px',
            margin: '0 auto',
            background: 'linear-gradient(180deg, #121008 0%, #080808 100%)',
            border: '1px solid var(--gold-border-bright)',
            padding: '24px 32px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '20px',
          }}
        >
          <div style={{ maxWidth: '680px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
              <Network size={16} color="var(--gold-bright)" />
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', color: 'var(--gold-bright)' }}>
                THE UNIFIED ARTIFURA TALENT ECOSYSTEM
              </span>
            </div>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', lineHeight: 1.5, margin: 0 }}>
              From nimble seed-stage engineering squads to Fortune 500 tech labs, discovering verifiable ability creates transparent, fair, and effective hiring conversations.
            </p>
          </div>

          <div style={{ display: 'flex', gap: '10px' }}>
            <span
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.68rem',
                color: 'var(--gold-bright)',
                background: 'rgba(212, 175, 55, 0.1)',
                padding: '6px 12px',
                border: '1px solid var(--gold-border)',
              }}
            >
              USE CASE ARCHITECTURE // PLANNED & EVOLVING
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};
