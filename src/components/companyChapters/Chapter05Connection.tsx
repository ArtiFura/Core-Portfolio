import React, { useState, useRef, useEffect } from 'react';
import {
  ShieldCheck,
  ArrowRight,
  Maximize2,
} from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useParallax } from '../../motion/useScrollReveal';
import { useMagnetic } from '../../motion/useMagnetic';
import { getAssetUrl } from '../../utils/asset';
import { useComicLightbox } from '../common/ComicLightboxContext';

gsap.registerPlugin(ScrollTrigger);

interface Chapter05ConnectionProps {
  onOpenCompanyModal: () => void;
}

export const Chapter05Connection: React.FC<Chapter05ConnectionProps> = ({
  onOpenCompanyModal,
}) => {
  const { openLightbox } = useComicLightbox();
  const [connectionStep, setConnectionStep] = useState<1 | 2 | 3>(2);
  const sectionRef = useRef<HTMLElement | null>(null);
  const headerRef = useRef<HTMLDivElement | null>(null);
  const frameRef = useRef<HTMLDivElement | null>(null);
  const connectionBeamRef = useRef<HTMLDivElement | null>(null);
  const actionCenterRef = useRef<HTMLDivElement | null>(null);

  const parallaxImgRef = useParallax<HTMLImageElement>(0.12);
  const connectBtnRef = useMagnetic<HTMLButtonElement>({ strength: 0.2, maxDistance: 8 });

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

      // 2. Artwork Frame
      if (frameRef.current) {
        gsap.fromTo(
          frameRef.current,
          { opacity: 0, scale: 0.96 },
          {
            opacity: 1,
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

      // 3. Traveling Gold Connection Beam
      if (connectionBeamRef.current) {
        gsap.fromTo(
          connectionBeamRef.current,
          { scaleX: 0, opacity: 0 },
          {
            scaleX: 1,
            opacity: 1,
            duration: 1.2,
            ease: 'expo.out',
            scrollTrigger: {
              trigger: connectionBeamRef.current,
              start: 'top 85%',
              once: true,
            },
          }
        );
      }

      // 4. Action Center
      if (actionCenterRef.current) {
        gsap.fromTo(
          actionCenterRef.current,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: actionCenterRef.current,
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
      id="chapter-05"
      style={{
        position: 'relative',
        minHeight: '100vh',
        padding: '100px 24px 90px',
        background: 'var(--bg-obsidian)',
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
            marginBottom: '44px',
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
            FIND POTENTIAL.{' '}
            <span className="gold-gradient-text">START A CONVERSATION.</span>
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
            Discover promising candidates, explore their work, and take the next step toward an interview or hiring opportunity.
          </p>
        </div>

        {/* Comic Panel Artwork Frame */}
        <div
          ref={frameRef}
          className="comic-frame comic-corner-accents"
          style={{
            maxWidth: '1040px',
            margin: '0 auto 40px',
            background: 'var(--bg-secondary)',
            border: '1px solid var(--gold-border)',
            boxShadow: '0 20px 50px rgba(0, 0, 0, 0.85)',
          }}
        >
          {/* Top badges: Split in corners on desktop, clean header row on mobile */}
          <div className="comic-mobile-header-bar">
            <div
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
              CHRONICLE 05 // DIRECT CONNECTION
            </div>

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
                  background: '#22c55e',
                  boxShadow: '0 0 10px #22c55e',
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
                PIPELINE STATUS: VERIFIED MATCH
              </span>
            </div>
          </div>

          {/* Graphic Novel Artwork Container */}
          <div
            className="comic-art-wrapper"
            style={{ cursor: 'pointer' }}
            onClick={() => {
              openLightbox({
                src: getAssetUrl('/assets/comic/company_ch5_pipeline.jpg'),
                alt: 'Engineering director connecting directly with verified candidate after reviewing verified algorithms and test results',
                title: 'Chapter 05 // Direct Connection',
                chapterTag: 'CHRONICLE 05 // PIPELINE MATCH',
                dialogue: '“The conversation changes when you start with proof. Instead of ‘Tell me about yourself,’ the interview begins with ‘We looked at your consensus engine—let’s talk about your raft quorum design.’”',
              });
            }}
          >
            <img
              ref={parallaxImgRef}
              src={getAssetUrl('/assets/comic/company_ch5_pipeline.jpg')}
              alt="Engineering director connecting directly with verified candidate after reviewing verified algorithms and test results"
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

            {/* Traveling Gold Connector Line across the composition */}
            <div
              ref={connectionBeamRef}
              style={{
                position: 'absolute',
                top: '50%',
                left: '8%',
                right: '8%',
                height: '2px',
                background: 'linear-gradient(90deg, rgba(212, 175, 55, 0.2), var(--gold-bright), #FFF, var(--gold-bright), rgba(212, 175, 55, 0.2))',
                boxShadow: '0 0 16px rgba(245, 215, 110, 0.9)',
                pointerEvents: 'none',
              }}
            >
              <div className="connector-photon" />
            </div>

            {/* Tap to Zoom Indicator */}
            <div
              className="comic-zoom-pill"
              onClick={(e) => {
                e.stopPropagation();
                openLightbox({
                  src: getAssetUrl('/assets/comic/company_ch5_pipeline.jpg'),
                  alt: 'Engineering director connecting directly with verified candidate after reviewing verified algorithms and test results',
                  title: 'Chapter 05 // Direct Connection',
                  chapterTag: 'CHRONICLE 05 // PIPELINE MATCH',
                  dialogue: '“The conversation changes when you start with proof. Instead of ‘Tell me about yourself,’ the interview begins with ‘We looked at your consensus engine—let’s talk about your raft quorum design.’”',
                });
              }}
            >
              <Maximize2 size={11} />
              <span>TAP TO ZOOM</span>
            </div>
          </div>

          {/* Caption Overlay: Desktop bottom inside frame, Mobile stacked cleanly below */}
          <div
            className="comic-caption-box comic-mobile-stack-card"
            style={{
              position: 'absolute',
              bottom: '20px',
              left: '20px',
              right: '20px',
              maxWidth: '720px',
              background: 'rgba(10, 10, 10, 0.94)',
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
              THE CONNECTION MOMENT
            </span>
            <p
              style={{
                margin: 0,
                fontSize: '0.88rem',
                color: 'var(--text-ivory)',
                lineHeight: 1.45,
              }}
            >
              “The conversation changes when you start with proof. Instead of ‘Tell me about yourself,’ the interview begins with ‘We looked at your consensus engine—let’s talk about your raft quorum design.’”
            </p>
          </div>
        </div>

        {/* Interactive Connection Workflow & Privacy Notice */}
        <div
          ref={actionCenterRef}
          className="comic-frame"
          style={{
            maxWidth: '1040px',
            margin: '0 auto',
            background: '#0d0d0d',
            border: '1px solid var(--gold-border-bright)',
            padding: '28px',
          }}
        >
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: '20px',
              borderBottom: '1px solid rgba(212, 175, 55, 0.2)',
              paddingBottom: '14px',
              flexWrap: 'wrap',
              gap: '12px',
            }}
          >
            <div>
              <div
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.65rem',
                  color: 'var(--gold-bright)',
                  letterSpacing: '0.2em',
                }}
              >
                DISCOVERY TO INTERVIEW PIPELINE
              </div>
              <h3
                style={{
                  fontFamily: 'var(--font-heading)',
                  fontSize: '1.25rem',
                  color: 'var(--text-ivory)',
                  margin: '4px 0 0',
                }}
              >
                How Companies Engage with Emerging Engineers
              </h3>
            </div>

            {/* Step Tabs */}
            <div style={{ display: 'flex', gap: '8px' }}>
              {[
                { step: 1, label: '1. EXPLORE WORK' },
                { step: 2, label: '2. REQUEST INTRO' },
                { step: 3, label: '3. DIRECT INTERVIEW' },
              ].map((s) => (
                <button
                  key={s.step}
                  onClick={() => setConnectionStep(s.step as any)}
                  style={{
                    background: connectionStep === s.step ? 'var(--gold-gradient)' : 'rgba(20, 20, 20, 0.8)',
                    color: connectionStep === s.step ? '#080808' : 'var(--text-muted)',
                    border: '1px solid var(--gold-border)',
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.72rem',
                    fontWeight: connectionStep === s.step ? 700 : 500,
                    padding: '8px 14px',
                    cursor: 'pointer',
                  }}
                >
                  {s.label}
                </button>
              ))}
            </div>
          </div>

          {/* Active Step Content */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: '24px',
              marginBottom: '24px',
            }}
          >
            <div
              style={{
                background: '#121212',
                border: '1px solid rgba(255, 255, 255, 0.08)',
                padding: '20px',
              }}
            >
              <h4 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.05rem', color: '#FFF', marginBottom: '8px' }}>
                {connectionStep === 1 && 'Step 1: Inspect Validated Code Sandboxes'}
                {connectionStep === 2 && 'Step 2: Mutual Consent Introduction'}
                {connectionStep === 3 && 'Step 3: Skip Screeners Straight to Technical Alignment'}
              </h4>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', lineHeight: 1.6, margin: 0 }}>
                {connectionStep === 1 && 'Review verified pull requests, test telemetry, benchmark passes, and project source code before scheduling any initial calls.'}
                {connectionStep === 2 && 'When your team identifies a match, send an official introduction request. Students review your team role and explicitly authorize contact.'}
                {connectionStep === 3 && 'Fast-track promising engineers directly into advanced technical conversations with engineering managers, eliminating weeks of repetitive screening.'}
              </p>
            </div>

            <div
              style={{
                background: '#16140e',
                border: '1px solid var(--gold-border)',
                padding: '20px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
              }}
            >
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                  <ShieldCheck size={16} color="var(--gold-bright)" />
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', color: 'var(--gold-bright)' }}>
                    ETHICAL RECRUITMENT & PRIVACY STANDARD
                  </span>
                </div>
                <p style={{ fontSize: '0.82rem', color: 'var(--text-ivory)', lineHeight: 1.5, margin: 0 }}>
                  ARTIFURA supports discovery and connection; it does not guarantee that a candidate will be hired. All student profiles, projects, and contact details are shared in full compliance with candidate privacy and explicit student consent.
                </p>
              </div>

              <div style={{ marginTop: '16px' }}>
                <button
                  ref={connectBtnRef}
                  onClick={onOpenCompanyModal}
                  className="btn-gold-primary"
                  style={{ width: '100%', padding: '12px' }}
                >
                  <span>CONNECT WITH TALENT POOL</span>
                  <ArrowRight size={14} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
