import React, { useState, useRef, useEffect } from 'react';
import {
  Sparkles,
  Send,
  CheckCircle2,
  ArrowUp,
  Handshake,
  Layers,
  Maximize2,
} from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { scrollToTarget } from '../../motion/lenisManager';
import { useMagnetic } from '../../motion/useMagnetic';
import { ArtifuraSymbol, ArtifuraLambdaGlyph } from '../ArtifuraIntro';
import { getAssetUrl } from '../../utils/asset';
import { useComicLightbox } from '../common/ComicLightboxContext';

gsap.registerPlugin(ScrollTrigger);

interface Chapter07FinalRevealProps {
  onOpenCompanyModal: () => void;
  onNavigateToStudents: () => void;
}

export const Chapter07FinalReveal: React.FC<Chapter07FinalRevealProps> = ({
  onOpenCompanyModal,
  onNavigateToStudents,
}) => {
  const { openLightbox } = useComicLightbox();
  const currentYear = new Date().getFullYear();
  const sectionRef = useRef<HTMLElement | null>(null);
  const headerRef = useRef<HTMLDivElement | null>(null);
  const brandVisualRef = useRef<HTMLDivElement | null>(null);
  const goldThreadRef = useRef<HTMLDivElement | null>(null);
  const formCardRef = useRef<HTMLDivElement | null>(null);

  // Form State
  const [companyName, setCompanyName] = useState('');
  const [workEmail, setWorkEmail] = useState('');
  const [companyType, setCompanyType] = useState('startup');
  const [rolesNeeded, setRolesNeeded] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const returnTopBtnRef = useMagnetic<HTMLButtonElement>({ strength: 0.2, maxDistance: 8 });
  const submitBtnRef = useMagnetic<HTMLButtonElement>({ strength: 0.18, maxDistance: 8 });

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
            duration: 0.85,
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

      // 2. Single Gold Thread Connecting Two Points
      if (goldThreadRef.current) {
        gsap.fromTo(
          goldThreadRef.current,
          { scaleX: 0, opacity: 0 },
          {
            scaleX: 1,
            opacity: 1,
            duration: 1.2,
            ease: 'expo.out',
            scrollTrigger: {
              trigger: goldThreadRef.current,
              start: 'top 88%',
              once: true,
            },
          }
        );
      }

      // 3. Resolving Artifura Brand Emblem
      if (brandVisualRef.current) {
        gsap.fromTo(
          brandVisualRef.current,
          { opacity: 0, scale: 0.92 },
          {
            opacity: 1,
            scale: 1,
            duration: 0.9,
            ease: 'back.out(1.4)',
            scrollTrigger: {
              trigger: brandVisualRef.current,
              start: 'top 85%',
              once: true,
            },
          }
        );
      }

      // 4. Form Entrance
      if (formCardRef.current) {
        gsap.fromTo(
          formCardRef.current,
          { opacity: 0, y: 35 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: formCardRef.current,
              start: 'top 85%',
              once: true,
            },
          }
        );
      }
    }, el);

    return () => ctx.revert();
  }, []);

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!companyName || !workEmail) return;

    const subject = encodeURIComponent(
      `ARTIFURA Talent Discovery Inquiry: ${companyName} (${companyType.toUpperCase()})`
    );
    const body = encodeURIComponent(
      `Company Name: ${companyName}\nWork Email: ${workEmail}\nOrganization Type: ${companyType}\nTarget Roles: ${rolesNeeded}\n\nMessage:\n${message}\n\n-- Submitted via ARTIFURA Companies Portal`
    );

    // Open user's email client directly with all prefilled details
    window.location.href = `mailto:partnerships@artifura.com?subject=${subject}&body=${body}`;
    setIsSubmitted(true);
  };

  const handleScrollToTop = () => {
    scrollToTarget('#chapter-00', 0);
  };

  return (
    <section
      ref={sectionRef}
      id="chapter-07"
      style={{
        position: 'relative',
        minHeight: '100vh',
        padding: '120px 24px 80px',
        background: 'radial-gradient(circle at 50% 25%, #14120a 0%, var(--bg-obsidian) 70%)',
        overflow: 'hidden',
      }}
    >
      <div
        style={{
          maxWidth: '1280px',
          margin: '0 auto',
          position: 'relative',
          zIndex: 2,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          textAlign: 'center',
        }}
      >
        {/* Editorial Section Header */}
        <div ref={headerRef} style={{ marginBottom: '40px', maxWidth: '880px' }}>
          <h2
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(2.4rem, 4.8vw, 4rem)',
              fontWeight: 800,
              color: 'var(--text-ivory)',
              lineHeight: 1.15,
              letterSpacing: '0.04em',
              marginBottom: '20px',
            }}
          >
            THE TALENT IS OUT THERE.{' '}
            <span className="gold-gradient-text">LET’S HELP YOU FIND IT.</span>
          </h2>

          <p
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: 'clamp(1rem, 1.3vw, 1.2rem)',
              color: 'var(--text-muted)',
              lineHeight: 1.7,
              margin: '0 auto',
            }}
          >
            Discover a different way to explore emerging talent with ARTIFURA.
          </p>
        </div>

        {/* Visual: Single Golden Line Connecting Two Points Resolving to ARTIFURA Identity */}
        <div
          style={{
            width: '100%',
            maxWidth: '680px',
            margin: '0 auto 40px',
            position: 'relative',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          {/* Two connecting points with traveling light */}
          <div
            ref={goldThreadRef}
            style={{
              width: '100%',
              height: '2px',
              background: 'linear-gradient(90deg, rgba(212, 175, 55, 0.2), var(--gold-bright), rgba(212, 175, 55, 0.2))',
              position: 'relative',
              boxShadow: '0 0 16px rgba(245, 215, 110, 0.8)',
              marginBottom: '24px',
            }}
          >
            <div
              style={{
                position: 'absolute',
                left: 0,
                top: '-4px',
                width: '10px',
                height: '10px',
                background: 'var(--gold-bright)',
                borderRadius: '50%',
                boxShadow: '0 0 10px var(--gold-bright)',
              }}
            />
            <div
              style={{
                position: 'absolute',
                right: 0,
                top: '-4px',
                width: '10px',
                height: '10px',
                background: 'var(--gold-bright)',
                borderRadius: '50%',
                boxShadow: '0 0 10px var(--gold-bright)',
              }}
            />
          </div>

          {/* ARTIFURA Resolving Visual Emblem — Single Liner */}
          <div
            ref={brandVisualRef}
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '10px',
            }}
          >
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '14px',
              }}
            >
              <ArtifuraSymbol
                style={{
                  height: '42px',
                  width: 'auto',
                  filter: 'drop-shadow(0 0 20px rgba(255, 212, 87, 0.65))',
                }}
              />
              <span
                className="wordmark-shine"
                style={{
                  fontFamily: 'var(--font-display, "Space Grotesk", sans-serif)',
                  fontSize: 'clamp(2rem, 4vw, 2.75rem)',
                  fontWeight: 600,
                  letterSpacing: '0.08em',
                  lineHeight: 1,
                  color: '#f0efea',
                  display: 'inline-flex',
                  alignItems: 'baseline',
                  textTransform: 'uppercase',
                }}
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
            <span
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.72rem',
                letterSpacing: '0.25em',
                color: 'var(--gold-antique)',
              }}
            >
              PROVEN ENGINEERING TALENT DISCOVERY
            </span>
          </div>
        </div>

        {/* Grand Manga Climax Finale Artwork */}
        <div
          className="comic-frame comic-corner-accents comic-artwork-container"
          style={{
            maxWidth: '1080px',
            margin: '0 auto 40px',
            position: 'relative',
            overflow: 'hidden',
            border: '1px solid var(--gold-border-bright)',
            boxShadow: '0 25px 70px rgba(0, 0, 0, 0.95), 0 0 50px rgba(212, 175, 55, 0.22)',
          }}
        >
          {/* Header Bar */}
          <div className="comic-mobile-header-bar">
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
              FINALE // THE ERA OF VERIFIED PROOF
            </div>

            {/* Live Manga Status Badge */}
            <div
              style={{
                position: 'absolute',
                top: '18px',
                right: '20px',
                background: 'rgba(10, 10, 10, 0.9)',
                border: '1px solid var(--gold-border-bright)',
                padding: '6px 14px',
                backdropFilter: 'blur(8px)',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                zIndex: 6,
                boxShadow: '0 6px 20px rgba(0, 0, 0, 0.8)',
              }}
            >
              <span
                style={{
                  width: '8px',
                  height: '8px',
                  borderRadius: '50%',
                  background: 'var(--gold-bright)',
                  boxShadow: '0 0 10px var(--gold-bright)',
                }}
              />
              <span
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.68rem',
                  color: 'var(--gold-bright)',
                  letterSpacing: '0.14em',
                }}
              >
                STATUS: VERIFIED PIPELINE ACTIVATED
              </span>
            </div>
          </div>

          <div
            className="comic-art-wrapper"
            style={{ cursor: 'pointer' }}
            onClick={() => {
              openLightbox({
                src: getAssetUrl('/assets/comic/company_ch7_reveal.jpg'),
                alt: 'Manga climax showing tech leader and verified student engineer shaking hands in front of glowing golden city with verified candidate passports',
                title: 'Chapter 07 // The Era of Verified Proof',
                chapterTag: 'FINALE // VERIFIED HIRING ERA',
                dialogue: '“A new era where hiring starts with proof, students build undeniable work, and companies discover extraordinary talent before the competition.”',
              });
            }}
          >
            <img
              src={getAssetUrl('/assets/comic/company_ch7_reveal.jpg')}
              alt="Manga climax showing tech leader and verified student engineer shaking hands in front of glowing golden city with verified candidate passports"
              style={{
                width: '100%',
                height: '106%',
                objectFit: 'cover',
                display: 'block',
                transition: 'transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
              }}
              loading="lazy"
            />
            <div
              className="comic-zoom-pill"
              onClick={(e) => {
                e.stopPropagation();
                openLightbox({
                  src: getAssetUrl('/assets/comic/company_ch7_reveal.jpg'),
                  alt: 'Manga climax showing tech leader and verified student engineer shaking hands in front of glowing golden city with verified candidate passports',
                  title: 'Chapter 07 // The Era of Verified Proof',
                  chapterTag: 'FINALE // VERIFIED HIRING ERA',
                  dialogue: '“A new era where hiring starts with proof, students build undeniable work, and companies discover extraordinary talent before the competition.”',
                });
              }}
            >
              <Maximize2 size={13} />
              <span>TAP TO EXPAND & ZOOM</span>
            </div>
          </div>
        </div>

        {/* Primary and Secondary Action Destination Buttons */}
        <div
          style={{
            display: 'flex',
            gap: '16px',
            justifyContent: 'center',
            marginBottom: '48px',
            flexWrap: 'wrap',
          }}
        >
          <button
            onClick={() => {
              const el = document.getElementById('company-contact-form');
              el?.scrollIntoView({ behavior: 'smooth' });
            }}
            className="btn-gold-primary gold-sweep-active"
            style={{ padding: '14px 28px', fontSize: '0.85rem' }}
          >
            <Sparkles size={16} />
            <span>DISCOVER TALENT WITH ARTIFURA</span>
          </button>

          <button
            onClick={onOpenCompanyModal}
            className="btn-gold-secondary"
            style={{ padding: '14px 28px', fontSize: '0.85rem' }}
          >
            <Handshake size={16} />
            <span>PARTNER WITH US</span>
          </button>
        </div>

        {/* Functional Company Discovery & Contact Form Card */}
        <div
          id="company-contact-form"
          ref={formCardRef}
          className="comic-frame comic-corner-accents"
          style={{
            width: '100%',
            maxWidth: '680px',
            margin: '0 auto 60px',
            background: '#0d0d0d',
            border: '1px solid var(--gold-border-bright)',
            padding: '36px',
            textAlign: 'left',
            boxShadow: '0 25px 70px rgba(0, 0, 0, 0.95), 0 0 30px rgba(212, 175, 55, 0.15)',
            clipPath: 'polygon(0 0, calc(100% - 16px) 0, 100% 16px, 100% 100%, 16px 100%, 0 calc(100% - 16px))',
          }}
        >
          <div
            style={{
              borderBottom: '1px solid rgba(212, 175, 55, 0.25)',
              paddingBottom: '16px',
              marginBottom: '24px',
            }}
          >
            <span
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.68rem',
                color: 'var(--gold-bright)',
                letterSpacing: '0.2em',
                display: 'block',
                marginBottom: '4px',
              }}
            >
              DIRECT DISCOVERY INQUIRY // ARTIFURA HIRING NETWORK
            </span>
            <h3
              style={{
                fontFamily: 'var(--font-heading)',
                fontSize: '1.4rem',
                color: 'var(--text-ivory)',
                margin: 0,
              }}
            >
              Tell Us What You’re Building
            </h3>
          </div>

          {isSubmitted ? (
            <div style={{ textAlign: 'center', padding: '30px 10px' }}>
              <div
                style={{
                  width: '54px',
                  height: '54px',
                  margin: '0 auto 16px',
                  background: 'rgba(212, 175, 55, 0.1)',
                  border: '1px solid var(--gold-bright)',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <CheckCircle2 size={30} color="var(--gold-bright)" />
              </div>
              <h4 style={{ fontFamily: 'var(--font-display)', fontSize: '1.3rem', color: 'var(--gold-bright)', marginBottom: '8px' }}>
                COMMUNICATION DISPATCHED
              </h4>
              <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', lineHeight: 1.6, maxWidth: '480px', margin: '0 auto 20px' }}>
                Your email client was opened with your company details for <strong>partnerships@artifura.com</strong>. We look forward to exploring early-career engineering discovery with your team.
              </p>
              <button
                onClick={() => setIsSubmitted(false)}
                className="btn-gold-secondary"
                style={{ padding: '8px 18px', fontSize: '0.78rem' }}
              >
                EDIT INQUIRY
              </button>
            </div>
          ) : (
            <form onSubmit={handleFormSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
              <div>
                <label
                  style={{
                    display: 'block',
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.72rem',
                    color: 'var(--gold-antique)',
                    marginBottom: '6px',
                    letterSpacing: '0.1em',
                  }}
                >
                  COMPANY NAME *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Acme Tech Labs / Stripe"
                  value={companyName}
                  onChange={(e) => setCompanyName(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '12px 14px',
                    background: '#141414',
                    border: '1px solid rgba(212, 175, 55, 0.3)',
                    color: '#FFF',
                    fontFamily: 'var(--font-body)',
                    fontSize: '0.9rem',
                    outline: 'none',
                  }}
                />
              </div>

              <div>
                <label
                  style={{
                    display: 'block',
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.72rem',
                    color: 'var(--gold-antique)',
                    marginBottom: '6px',
                    letterSpacing: '0.1em',
                  }}
                >
                  WORK EMAIL *
                </label>
                <input
                  type="email"
                  required
                  placeholder="name@company.com"
                  value={workEmail}
                  onChange={(e) => setWorkEmail(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '12px 14px',
                    background: '#141414',
                    border: '1px solid rgba(212, 175, 55, 0.3)',
                    color: '#FFF',
                    fontFamily: 'var(--font-body)',
                    fontSize: '0.9rem',
                    outline: 'none',
                  }}
                />
              </div>

              <div>
                <label
                  style={{
                    display: 'block',
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.72rem',
                    color: 'var(--gold-antique)',
                    marginBottom: '6px',
                    letterSpacing: '0.1em',
                  }}
                >
                  COMPANY CATEGORY
                </label>
                <select
                  value={companyType}
                  onChange={(e) => setCompanyType(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '12px 14px',
                    background: '#141414',
                    border: '1px solid rgba(212, 175, 55, 0.3)',
                    color: '#FFF',
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.85rem',
                    outline: 'none',
                  }}
                >
                  <option value="startup">Startup / Seed / Series A (1–25 Engineers)</option>
                  <option value="midmarket">Mid-Market / Scaleup (25–200 Engineers)</option>
                  <option value="enterprise">Enterprise / Campus Program (200+ Engineers)</option>
                  <option value="academic">University / Academic Partner</option>
                </select>
              </div>

              <div>
                <label
                  style={{
                    display: 'block',
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.72rem',
                    color: 'var(--gold-antique)',
                    marginBottom: '6px',
                    letterSpacing: '0.1em',
                  }}
                >
                  PRIMARY ROLES NEEDED
                </label>
                <input
                  type="text"
                  placeholder="e.g. Distributed Backend, WebGL / Frontend, SRE & Cloud"
                  value={rolesNeeded}
                  onChange={(e) => setRolesNeeded(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '12px 14px',
                    background: '#141414',
                    border: '1px solid rgba(212, 175, 55, 0.3)',
                    color: '#FFF',
                    fontFamily: 'var(--font-body)',
                    fontSize: '0.9rem',
                    outline: 'none',
                  }}
                />
              </div>

              <div>
                <label
                  style={{
                    display: 'block',
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.72rem',
                    color: 'var(--gold-antique)',
                    marginBottom: '6px',
                    letterSpacing: '0.1em',
                  }}
                >
                  MESSAGE / HIRING TIMELINE
                </label>
                <textarea
                  rows={3}
                  placeholder="Share details on your engineering culture, tech stack, or upcoming hiring targets..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '12px 14px',
                    background: '#141414',
                    border: '1px solid rgba(212, 175, 55, 0.3)',
                    color: '#FFF',
                    fontFamily: 'var(--font-body)',
                    fontSize: '0.9rem',
                    outline: 'none',
                    resize: 'vertical',
                  }}
                />
              </div>

              <button
                ref={submitBtnRef}
                type="submit"
                className="btn-gold-primary gold-sweep-active"
                style={{ padding: '14px', width: '100%', marginTop: '6px' }}
              >
                <span>INITIATE DISCOVERY INQUIRY</span>
                <Send size={15} />
              </button>

              <div
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.65rem',
                  color: 'var(--text-dim)',
                  textAlign: 'center',
                }}
              >
                Direct dispatch to partnerships@artifura.com · We never share corporate contact information
              </div>
            </form>
          )}
        </div>

        {/* Portal Bridge Footer: Switch naturally between FOR STUDENTS and FOR COMPANIES */}
        <div
          style={{
            width: '100%',
            maxWidth: '1040px',
            borderTop: '1px solid rgba(212, 175, 55, 0.2)',
            paddingTop: '32px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '16px',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px', textAlign: 'left' }}>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.72rem', color: 'var(--gold-antique)' }}>
              LOOKING FOR COLLEGE PLATFORM & LEARNING ECOSYSTEM?
            </span>
            <button
              onClick={onNavigateToStudents}
              className="btn-gold-secondary"
              style={{ padding: '8px 16px', fontSize: '0.74rem' }}
            >
              <span>SWITCH TO FOR COLLEGE</span>
              <Layers size={13} />
            </button>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.68rem', color: 'var(--text-dim)' }}>
              © {currentYear} ARTIFURA INC. // ALL RIGHTS RESERVED
            </span>

            <button
              ref={returnTopBtnRef}
              onClick={handleScrollToTop}
              style={{
                width: '36px',
                height: '36px',
                background: 'rgba(20, 20, 20, 0.8)',
                border: '1px solid var(--gold-border)',
                color: 'var(--gold-bright)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
              }}
              aria-label="Scroll back to top"
            >
              <ArrowUp size={16} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

