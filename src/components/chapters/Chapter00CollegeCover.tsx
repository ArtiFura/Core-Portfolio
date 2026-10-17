import React, { useRef } from 'react';
import { ArrowDown, GraduationCap, Code2, ShieldCheck, Cpu, ArrowUpRight } from 'lucide-react';
import { useMagnetic } from '../../motion/useMagnetic';
import { useMouseSpotlight } from '../../motion/useMouseSpotlight';
import { SplitText, BlurText, ShinyText, RotatingText } from '../reactbits';
import { getAssetUrl } from '../../utils/asset';

interface Chapter00CollegeCoverProps {
  onExploreStory: () => void;
  onOpenProjectModal?: () => void;
}

export const Chapter00CollegeCover: React.FC<Chapter00CollegeCoverProps> = ({
  onExploreStory,
  onOpenProjectModal,
}) => {
  const containerRef = useRef<HTMLElement | null>(null);
  const exploreBtnRef = useMagnetic<HTMLButtonElement>({ strength: 0.22, maxDistance: 10 });
  const modalBtnRef = useMagnetic<HTMLButtonElement>({ strength: 0.2, maxDistance: 8 });

  // Interactive mouse spotlight for subtle golden ambient glow
  const spotlightRef = useMouseSpotlight<HTMLElement>({ opacity: 0.12 });

  return (
    <section
      ref={(el) => {
        containerRef.current = el;
        if (spotlightRef.current) spotlightRef.current = el;
      }}
      id="chapter-00"
      style={{
        position: 'relative',
        width: '100%',
        minHeight: '100vh',
        overflow: 'hidden',
        userSelect: 'none',
        zIndex: 30,
        padding: '110px 24px 60px',
        margin: 0,
        background: '#080808',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      {/* Ambient background breathing glow */}
      <div
        className="ambient-breathing-glow"
        style={{
          position: 'absolute',
          top: '48%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 'clamp(320px, 60vw, 840px)',
          height: 'clamp(260px, 45vh, 480px)',
          background: 'rgba(255, 224, 141, 0.08)',
          borderRadius: '9999px',
          filter: 'blur(110px)',
          pointerEvents: 'none',
        }}
      />

      {/* Atmospheric architectural blueprint grid */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          opacity: 0.04,
          pointerEvents: 'none',
          backgroundImage:
            'linear-gradient(to right, #ffe08d 1px, transparent 1px), linear-gradient(to bottom, #ffe08d 1px, transparent 1px)',
          backgroundSize: '80px 80px',
        }}
      />

      {/* Reference Corner HUD Elements & Markings */}
      {/* Top-Left: ARTIFURA // ACADEMIC PLATFORM */}
      <div
        className="hud-corner-tl"
        style={{
          position: 'absolute',
          top: '96px',
          left: '32px',
          zIndex: 20,
          display: 'flex',
          alignItems: 'flex-start',
          gap: '10px',
          fontFamily: 'var(--font-mono, monospace)',
          fontSize: '11px',
          color: '#a38c53',
          letterSpacing: '0.18em',
          pointerEvents: 'none',
          userSelect: 'none',
        }}
      >
        <span
          style={{
            width: '18px',
            height: '1.5px',
            background: '#a38c53',
            marginTop: '6px',
            flexShrink: 0,
          }}
        />
        <div style={{ display: 'flex', flexDirection: 'column', lineHeight: 1.25 }}>
          <span style={{ fontWeight: 600, color: 'rgba(255, 224, 141, 0.95)' }}>
            ARTIFURA //
          </span>
          <span style={{ color: '#887e6d', fontSize: '9.5px' }}>
            FOR COLLEGES & UNIVERSITIES
          </span>
        </div>
      </div>

      {/* Top-Right: CHRONICLE EDITION */}
      <div
        className="hud-corner-tr"
        style={{
          position: 'absolute',
          top: '96px',
          right: '32px',
          zIndex: 20,
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
          fontFamily: 'var(--font-mono, monospace)',
          fontSize: '11px',
          color: '#887e6d',
          letterSpacing: '0.18em',
          pointerEvents: 'none',
          userSelect: 'none',
        }}
      >
        <span
          style={{
            width: '18px',
            height: '1.5px',
            background: '#a38c53',
            flexShrink: 0,
          }}
        />
        <span>ACADEMIC CHRONICLE // 07 CHAPTERS</span>
      </div>

      {/* Centerpiece Content */}
      <div
        style={{
          position: 'relative',
          zIndex: 25,
          maxWidth: '1040px',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          textAlign: 'center',
          margin: 'auto 0',
        }}
      >
        {/* Category Badge with ShinyText */}
        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            padding: '6px 16px',
            borderRadius: '9999px',
            background: 'rgba(212, 175, 55, 0.08)',
            border: '1px solid rgba(212, 175, 55, 0.3)',
            fontFamily: 'var(--font-mono, monospace)',
            fontSize: '0.72rem',
            color: 'var(--gold-bright)',
            letterSpacing: '0.18em',
            marginBottom: '20px',
          }}
        >
          <GraduationCap size={15} color="var(--gold-bright)" />
          <ShinyText
            text="HIGHER EDUCATION & TECHNICAL INSTITUTES"
            speed={3}
            shineColor="#ffffff"
            color="var(--gold-bright)"
            glow={0.5}
          />
        </div>

        {/* Monumental Headline with SplitText & RotatingText */}
        <h1
          style={{
            fontFamily: 'var(--font-display, "Space Grotesk", sans-serif)',
            fontSize: 'clamp(2.1rem, 4.8vw, 4.2rem)',
            fontWeight: 800,
            lineHeight: 1.15,
            letterSpacing: '-0.02em',
            color: 'var(--text-ivory)',
            margin: '0 auto 16px',
            maxWidth: '960px',
            textTransform: 'uppercase',
            textAlign: 'center',
          }}
        >
          <span style={{ display: 'block', marginBottom: '8px' }}>
            <SplitText text="TURNING CURRICULUM INTO" effect="rise" delay={30} tag="span" style={{ display: 'inline-block' }} />
          </span>
          <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '1.25em', width: '100%' }}>
            <RotatingText
              texts={[
                'VERIFIABLE CODE PROOF.',
                'ENGINEERING EXCELLENCE.',
                'PROVEN CAREER PLACEMENTS.',
                'VERIFIED STUDENT ARTIFACTS.',
              ]}
              splitBy="words"
              effect="flip"
              direction="up"
              rotationInterval={3200}
              highlight={false}
              mainClassName="gold-gradient-text"
            />
          </span>
        </h1>

        {/* Narrative Deck with BlurText */}
        <div style={{ maxWidth: '720px', margin: '0 0 28px' }}>
          <BlurText
            text="Higher education doesn't lack ambitious students—it lacks an infrastructure of proof. Follow the 7-chapter manga chronicle of how institutions replace empty certificates with automated test runners and cryptographic code portfolios."
            delay={70}
            animateBy="words"
            direction="top"
            style={{
              fontFamily: 'var(--font-body, sans-serif)',
              fontSize: 'clamp(0.95rem, 1.25vw, 1.15rem)',
              lineHeight: 1.7,
              color: 'var(--text-muted)',
              justifyContent: 'center',
              textAlign: 'center',
            }}
          />
        </div>

        {/* Grand Manga Volume Hero Artwork */}
        <div
          className="comic-frame comic-corner-accents comic-artwork-container"
          style={{
            width: '100%',
            maxWidth: '920px',
            margin: '0 auto 36px',
            position: 'relative',
            overflow: 'hidden',
            border: '1px solid var(--gold-border-bright)',
            boxShadow: '0 25px 70px rgba(0, 0, 0, 0.95), 0 0 45px rgba(212, 175, 55, 0.2)',
          }}
        >
          <div style={{ position: 'relative', width: '100%', aspectRatio: '16/9', overflow: 'hidden' }}>
            <img
              src={getAssetUrl('/assets/comic/college_hero_campus.jpg')}
              alt="Grand university amphitheater where students compile real code against automated benchmarks under the golden Artifura emblem"
              style={{
                width: '100%',
                height: '105%',
                objectFit: 'cover',
                display: 'block',
                transition: 'transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
              }}
              loading="eager"
            />

            {/* Manga In-Scene Reticle & Live Badge */}
            <div
              style={{
                position: 'absolute',
                top: '18px',
                right: '20px',
                background: 'rgba(10, 10, 10, 0.88)',
                border: '1px solid var(--gold-border-bright)',
                padding: '6px 12px',
                backdropFilter: 'blur(8px)',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                boxShadow: '0 6px 20px rgba(0, 0, 0, 0.8)',
                zIndex: 6,
              }}
            >
              <span
                style={{
                  width: '7px',
                  height: '7px',
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
                AUTORUNNER: ACTIVE [48/48 TESTS PASS]
              </span>
            </div>

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
              PROLOGUE // THE CAMPUS RENAISSANCE
            </div>
          </div>
        </div>

        {/* Graphic Novel Frame: The 3 Institutional Pillars Preview */}
        <div
          className="comic-frame"
          style={{
            width: '100%',
            maxWidth: '920px',
            background: 'rgba(17, 17, 17, 0.75)',
            backdropFilter: 'blur(12px)',
            border: '1px solid var(--gold-border)',
            padding: '24px 28px',
            marginBottom: '40px',
            clipPath: 'var(--panel-bevel)',
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
            gap: '20px',
            textAlign: 'left',
          }}
        >
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <div
                style={{
                  width: '32px',
                  height: '32px',
                  borderRadius: '6px',
                  background: 'rgba(212, 175, 55, 0.12)',
                  border: '1px solid rgba(212, 175, 55, 0.4)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <Code2 size={16} color="var(--gold-bright)" />
              </div>
              <span
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.72rem',
                  color: 'var(--gold-bright)',
                  letterSpacing: '0.12em',
                }}
              >
                01 // EVALUATION
              </span>
            </div>
            <h4 style={{ fontFamily: 'var(--font-heading)', fontSize: '0.95rem', color: 'var(--text-ivory)', margin: 0 }}>
              Automated Code Sandboxes
            </h4>
            <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', lineHeight: 1.5, margin: 0 }}>
              Live test runners execute every student commit against institutional benchmarks.
            </p>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <div
                style={{
                  width: '32px',
                  height: '32px',
                  borderRadius: '6px',
                  background: 'rgba(212, 175, 55, 0.12)',
                  border: '1px solid rgba(212, 175, 55, 0.4)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <ShieldCheck size={16} color="var(--gold-bright)" />
              </div>
              <span
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.72rem',
                  color: 'var(--gold-bright)',
                  letterSpacing: '0.12em',
                }}
              >
                02 // CAPABILITY
              </span>
            </div>
            <h4 style={{ fontFamily: 'var(--font-heading)', fontSize: '0.95rem', color: 'var(--text-ivory)', margin: 0 }}>
              Proof-of-Ability Portfolios
            </h4>
            <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', lineHeight: 1.5, margin: 0 }}>
              Tamper-proof capability matrix linked directly to verified GitHub repositories.
            </p>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <div
                style={{
                  width: '32px',
                  height: '32px',
                  borderRadius: '6px',
                  background: 'rgba(212, 175, 55, 0.12)',
                  border: '1px solid rgba(212, 175, 55, 0.4)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <Cpu size={16} color="var(--gold-bright)" />
              </div>
              <span
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.72rem',
                  color: 'var(--gold-bright)',
                  letterSpacing: '0.12em',
                }}
              >
                03 // PLACEMENT
              </span>
            </div>
            <h4 style={{ fontFamily: 'var(--font-heading)', fontSize: '0.95rem', color: 'var(--text-ivory)', margin: 0 }}>
              Direct Industry Pipeline
            </h4>
            <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', lineHeight: 1.5, margin: 0 }}>
              Partner companies discover pre-vetted engineers without resume filtering delays.
            </p>
          </div>
        </div>

        {/* Dual CTA Actions */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexWrap: 'wrap',
            gap: '16px',
          }}
        >
          <button
            ref={exploreBtnRef}
            onClick={onExploreStory}
            className="btn-gold-primary gold-sweep-active"
            style={{
              padding: '12px 28px',
              fontSize: '0.85rem',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '10px',
            }}
          >
            <span>BEGIN THE 7-CHAPTER CHRONICLE</span>
            <ArrowDown size={15} />
          </button>

          {onOpenProjectModal && (
            <button
              ref={modalBtnRef}
              onClick={onOpenProjectModal}
              className="btn-gold-secondary"
              style={{
                padding: '12px 24px',
                fontSize: '0.85rem',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
              }}
            >
              <span>REQUEST CAMPUS PILOT</span>
              <ArrowUpRight size={15} />
            </button>
          )}
        </div>
      </div>

      {/* Bottom Floating Story Index Navigator */}
      <div
        style={{
          position: 'relative',
          zIndex: 20,
          marginTop: '40px',
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          flexWrap: 'wrap',
          justifyContent: 'center',
        }}
      >
        {[
          '00 COVER',
          '01 THE PROBLEM',
          '02 TURNING POINT',
          '03 SPRINT',
          '04 PROOF',
          '05 OPPORTUNITY',
          '06 SCALE',
          '07 FORWARD',
        ].map((title, i) => (
          <span
            key={title}
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.62rem',
              letterSpacing: '0.12em',
              color: i === 0 ? 'var(--gold-bright)' : 'var(--text-dim)',
              padding: '4px 10px',
              borderRadius: '9999px',
              background: i === 0 ? 'rgba(212, 175, 55, 0.15)' : 'rgba(255, 255, 255, 0.03)',
              border: i === 0 ? '1px solid rgba(212, 175, 55, 0.4)' : '1px solid rgba(255, 255, 255, 0.06)',
            }}
          >
            {title}
          </span>
        ))}
      </div>

      <style>{`
        @media (max-width: 640px) {
          .hud-corner-tl, .hud-corner-tr {
            display: none !important;
          }
        }
      `}</style>
    </section>
  );
};
