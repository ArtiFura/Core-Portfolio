import React, { useEffect, useRef, useState } from 'react';
import { ArrowDown, Search, ShieldCheck, Terminal, Layers } from 'lucide-react';
import gsap from 'gsap';
import { useMagnetic } from '../../motion/useMagnetic';
import { useMouseSpotlight } from '../../motion/useMouseSpotlight';
import { useContainerParallax } from '../../motion/useContainerParallax';
import { ShinyText, BlurText, TextType } from '../reactbits';

interface Chapter00SearchProps {
  onExploreStory: () => void;
  onOpenCompanyModal: () => void;
}

export const Chapter00Search: React.FC<Chapter00SearchProps> = ({
  onExploreStory,
  onOpenCompanyModal,
}) => {
  const containerRef = useRef<HTMLElement | null>(null);
  const wordmarkRef = useRef<HTMLHeadingElement | null>(null);
  const goldLineRef = useRef<HTMLDivElement | null>(null);
  const headlineWordsRef = useRef<HTMLDivElement | null>(null);
  const heroFrameRef = useRef<HTMLDivElement | null>(null);
  const plaqueRef = useRef<HTMLDivElement | null>(null);
  const ctaGroupRef = useRef<HTMLDivElement | null>(null);
  const floatingCardsRef = useRef<HTMLDivElement | null>(null);
  const [inspectedCard, setInspectedCard] = useState<number | null>(null);

  // Magnetic CTA buttons
  const exploreBtnRef = useMagnetic<HTMLButtonElement>({ strength: 0.22, maxDistance: 10 });
  const modalBtnRef = useMagnetic<HTMLButtonElement>({ strength: 0.22, maxDistance: 8 });

  // Interactive mouse spotlight
  const spotlightRef = useMouseSpotlight<HTMLElement>({ opacity: 0.12 });

  // Parallax layers
  useContainerParallax<HTMLElement>({
    layers: [
      { selector: '.search-bg-layer', depth: 0.02 },
      { selector: '.search-mid-layer', depth: 0.05 },
      { selector: '.search-fg-layer', depth: 0.09 },
    ],
    lerp: 0.08,
  });

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power4.out' } });

      // Category / Wordmark reveal
      tl.fromTo(
        wordmarkRef.current,
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 1.0 }
      )
        // Metallic gold line draw across dark void
        .fromTo(
          goldLineRef.current,
          { scaleX: 0, opacity: 0, transformOrigin: 'center' },
          { scaleX: 1, opacity: 1, duration: 0.9, ease: 'expo.out' },
          '-=0.5'
        )
        // Masked headline words reveal
        .fromTo(
          headlineWordsRef.current?.querySelectorAll('.clip-word') || [],
          { y: '100%', opacity: 0 },
          { y: '0%', opacity: 1, duration: 0.75, stagger: 0.09, ease: 'power3.out' },
          '-=0.4'
        )
        // Hero comic frame emergence
        .fromTo(
          heroFrameRef.current,
          { opacity: 0, y: 35, scale: 0.97 },
          { opacity: 1, y: 0, scale: 1, duration: 1.0, ease: 'power3.out' },
          '-=0.45'
        )
        // Floating candidate cards
        .fromTo(
          floatingCardsRef.current?.children || [],
          { opacity: 0, y: 25, scale: 0.92 },
          { opacity: 1, y: 0, scale: 1, stagger: 0.12, duration: 0.8, ease: 'back.out(1.4)' },
          '-=0.5'
        )
        // Recruiter plaque slide
        .fromTo(
          plaqueRef.current,
          { opacity: 0, x: -25 },
          { opacity: 1, x: 0, duration: 0.7 },
          '-=0.3'
        )
        // CTAs
        .fromTo(
          ctaGroupRef.current,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.6 },
          '-=0.2'
        );
    }, el);

    return () => ctx.revert();
  }, []);

  const setCombinedRef = (node: HTMLElement | null) => {
    containerRef.current = node;
    (spotlightRef as React.MutableRefObject<HTMLElement | null>).current = node;
  };

  const headlineWords = ["GREAT", "TALENT", "ISN'T", "ALWAYS", "OBVIOUS."];

  const floatingProfiles = [
    {
      id: 1,
      name: 'Elena Rostova',
      role: 'Frontend Systems & WebGL',
      status: 'Similar keyword profile',
      similarity: '98% Keyword Match',
      unseenInsight: 'Hidden gem: Authored 60fps canvas node graph with 0 dependencies',
      tag: 'CANDIDATE #4092',
    },
    {
      id: 2,
      name: 'Aarav Sharma',
      role: 'Distributed Backend & Rust',
      status: 'Standard CV Format',
      similarity: '94% Keyword Match',
      unseenInsight: 'Hidden gem: Solved consensus split-brain in custom Raft cluster',
      tag: 'CANDIDATE #7183',
    },
    {
      id: 3,
      name: 'Devon Vance',
      role: 'Cloud Native & SRE Intern',
      status: 'Traditional Resume',
      similarity: '96% Keyword Match',
      unseenInsight: 'Hidden gem: Automated chaos testing mesh across 20 nodes',
      tag: 'CANDIDATE #9041',
    },
  ];

  return (
    <section
      ref={setCombinedRef}
      id="chapter-00"
      className="gold-spotlight-container"
      style={{
        position: 'relative',
        minHeight: '100vh',
        padding: '130px 24px 80px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
        background: 'radial-gradient(ellipse at 50% 25%, #14120a 0%, var(--bg-obsidian) 75%)',
      }}
    >
      {/* Ambient Gold Radial Orbit in Background */}
      <div
        className="ambient-gold-orbit search-bg-layer"
        style={{
          top: '15%',
          left: '30%',
          width: '540px',
          height: '540px',
          background: 'radial-gradient(circle, rgba(212, 175, 55, 0.16) 0%, transparent 70%)',
        }}
      />

      {/* Halftone & Speed Lines Overlay */}
      <div
        className="halftone-overlay"
        style={{
          position: 'absolute',
          inset: 0,
          opacity: 0.5,
          pointerEvents: 'none',
          zIndex: 1,
        }}
      />

      <div
        style={{
          position: 'absolute',
          inset: '20px',
          border: '1px solid rgba(212, 175, 55, 0.16)',
          pointerEvents: 'none',
          zIndex: 2,
          clipPath:
            'polygon(0 0, calc(100% - 24px) 0, 100% 24px, 100% 100%, 24px 100%, 0 calc(100% - 24px))',
        }}
      />

      <div
        style={{
          maxWidth: '1280px',
          width: '100%',
          margin: '0 auto',
          position: 'relative',
          zIndex: 3,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          textAlign: 'center',
        }}
      >


        {/* Brand Subtitle with React Bits ShinyText */}
        <div
          ref={wordmarkRef}
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '0.78rem',
            letterSpacing: '0.3em',
            color: 'var(--gold-bright)',
            textTransform: 'uppercase',
            marginBottom: '14px',
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
          }}
        >
          <Search size={14} color="var(--gold-bright)" />
          <ShinyText text="A RECRUITER’S DILEMMA IN OBSIDIAN DARKNESS" speed={3} shineColor="#fff" color="var(--gold-bright)" glow={0.5} />
        </div>

        {/* Dramatic Masked Headline */}
        <h1
          ref={headlineWordsRef}
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(2.4rem, 5.5vw, 4.8rem)',
            fontWeight: 800,
            letterSpacing: '0.04em',
            lineHeight: 1.1,
            color: 'var(--text-ivory)',
            maxWidth: '1000px',
            marginBottom: '20px',
          }}
        >
          {headlineWords.map((word, index) => (
            <span
              key={index}
              className="clip-reveal-container"
              style={{ marginRight: '0.28em', paddingBottom: '4px' }}
            >
              <span
                className={`clip-word clip-reveal-item ${word === 'ALWAYS' || word === 'OBVIOUS.' ? 'gold-gradient-text' : ''
                  }`}
              >
                {word}
              </span>
            </span>
          ))}
        </h1>

        {/* Metallic Thin Gold Dividing Line */}
        <div
          ref={goldLineRef}
          style={{
            width: '140px',
            height: '2px',
            background: 'var(--gold-gradient)',
            margin: '0 auto 24px',
            boxShadow: '0 0 16px rgba(245, 215, 110, 0.8)',
          }}
        />

        {/* Narrative Supporting Copy */}
        <p
          style={{
            fontFamily: 'var(--font-body)',
            fontSize: 'clamp(1rem, 1.35vw, 1.25rem)',
            color: 'var(--text-muted)',
            maxWidth: '720px',
            lineHeight: 1.7,
            marginBottom: '38px',
          }}
        >
          Somewhere, a talented student is building something remarkable. Somewhere else, a company is searching for someone exactly like them.
        </p>

        {/* Graphic Novel Hero Comic Frame */}
        <div
          ref={heroFrameRef}
          className="comic-frame comic-corner-accents search-mid-layer"
          style={{
            width: '100%',
            maxWidth: '1020px',
            margin: '0 auto 36px',
            background: 'var(--bg-secondary)',
            border: '1px solid var(--gold-border)',
            boxShadow: '0 20px 60px rgba(0, 0, 0, 0.9), 0 0 40px rgba(212, 175, 55, 0.15)',
            position: 'relative',
          }}
        >


          {/* Graphic Novel Artwork */}
          <div style={{ position: 'relative', aspectRatio: '16/9', overflow: 'hidden' }}>
            <img
              src="/assets/comic/company_hero.jpg"
              alt="Recruiter in dark obsidian room surrounded by floating candidate profile holograms"
              style={{
                width: '100%',
                height: '106%',
                objectFit: 'cover',
                display: 'block',
                filter: 'contrast(1.08) brightness(0.96)',
                transition: 'transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
              }}
              loading="eager"
            />

            {/* Gradient vignetting */}
            <div
              style={{
                position: 'absolute',
                inset: 0,
                background:
                  'linear-gradient(180deg, rgba(8, 8, 8, 0.1) 0%, transparent 45%, rgba(8, 8, 8, 0.88) 100%)',
                pointerEvents: 'none',
              }}
            />

            {/* In-Scene Interactive Floating Recruiter Signal */}
            <div
              style={{
                position: 'absolute',
                top: '20px',
                right: '24px',
                background: 'rgba(10, 10, 10, 0.85)',
                border: '1px solid var(--gold-border-bright)',
                padding: '8px 14px',
                backdropFilter: 'blur(8px)',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                clipPath: 'polygon(0 0, calc(100% - 6px) 0, 100% 6px, 100% 100%, 6px 100%, 0 calc(100% - 6px))',
              }}
            >
              <div
                style={{
                  width: '8px',
                  height: '8px',
                  borderRadius: '50%',
                  background: 'var(--gold-bright)',
                  boxShadow: '0 0 10px var(--gold-bright)',
                }}
                className="gold-pulse"
              />
              <span
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.7rem',
                  color: 'var(--gold-bright)',
                  letterSpacing: '0.12em',
                }}
              >
                CANDIDATE FIELD: 1,420 PROFILES EVALUATED
              </span>
            </div>

            {/* Comic Narration Caption Box */}
            <div
              ref={plaqueRef}
              className="comic-caption-box"
              style={{
                position: 'absolute',
                bottom: '24px',
                left: '24px',
                right: '24px',
                maxWidth: '680px',
                background: 'rgba(12, 12, 12, 0.94)',
                backdropFilter: 'blur(12px)',
                textAlign: 'left',
              }}
            >
              <div
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.65rem',
                  color: 'var(--gold-bright)',
                  letterSpacing: '0.2em',
                  marginBottom: '4px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                }}
              >
                <Layers size={11} />
                <span>NARRATIVE DISPATCH // BEYOND THE SURFACE</span>
              </div>
              <BlurText
                text="“Every screen shows identical bullet points, certifications, and high-level keywords. Yet beneath the noise, a breakthrough engineer is writing resilient code in silence.”"
                delay={65}
                animateBy="words"
                direction="top"
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: '0.92rem',
                  color: 'var(--text-ivory)',
                  lineHeight: 1.5,
                  margin: 0,
                }}
              />
            </div>
          </div>
        </div>

        {/* Interactive Floating Candidate Profile Layers */}
        <div style={{ width: '100%', maxWidth: '1020px', marginBottom: '36px' }}>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginBottom: '14px',
              fontFamily: 'var(--font-mono)',
              fontSize: '0.72rem',
              color: 'var(--gold-antique)',
              letterSpacing: '0.15em',
            }}
          >
            <TextType
              text={[
                'QUERY: candidates.filter(verified_tests: 100%, stack: ["Rust", "Distributed Systems"])',
                'AUDIT: sha256.verify(candidate_git_signature) == VALID',
                'STATUS: 3 verified builder profiles matched without resume keywords',
              ]}
              typingSpeed={35}
              deletingSpeed={18}
              pauseDuration={2400}
              loop={true}
              cursorStyle="bar"
              cursorColor="var(--gold-bright)"
            />
            <span style={{ color: 'var(--gold-bright)' }}>3 INSPECTION SAMPLES</span>
          </div>

          <div
            ref={floatingCardsRef}
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(290px, 1fr))',
              gap: '16px',
              textAlign: 'left',
            }}
          >
            {floatingProfiles.map((p) => {
              const isSelected = inspectedCard === p.id;
              return (
                <div
                  key={p.id}
                  onClick={() => setInspectedCard(isSelected ? null : p.id)}
                  className="interactive-panel"
                  style={{
                    background: isSelected ? 'rgba(212, 175, 55, 0.08)' : 'rgba(18, 18, 18, 0.85)',
                    border: isSelected
                      ? '1px solid var(--gold-bright)'
                      : '1px solid rgba(212, 175, 55, 0.25)',
                    padding: '18px',
                    cursor: 'pointer',
                    position: 'relative',
                    clipPath: 'polygon(0 0, calc(100% - 10px) 0, 100% 10px, 100% 100%, 10px 100%, 0 calc(100% - 10px))',
                    transition: 'all 0.3s ease',
                  }}
                >
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      marginBottom: '8px',
                    }}
                  >
                    <span
                      style={{
                        fontFamily: 'var(--font-mono)',
                        fontSize: '0.65rem',
                        color: 'var(--gold-bright)',
                        letterSpacing: '0.15em',
                      }}
                    >
                      {p.tag}
                    </span>
                    <span
                      style={{
                        fontFamily: 'var(--font-mono)',
                        fontSize: '0.62rem',
                        color: '#999',
                        background: '#111',
                        padding: '2px 6px',
                        border: '1px solid rgba(255, 255, 255, 0.1)',
                      }}
                    >
                      {p.similarity}
                    </span>
                  </div>

                  <h3
                    style={{
                      fontFamily: 'var(--font-heading)',
                      fontSize: '1.05rem',
                      color: 'var(--text-ivory)',
                      marginBottom: '4px',
                    }}
                  >
                    {p.name}
                  </h3>
                  <div
                    style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: '0.74rem',
                      color: 'var(--gold-antique)',
                      marginBottom: '10px',
                    }}
                  >
                    {p.role}
                  </div>

                  <div
                    style={{
                      fontSize: '0.82rem',
                      color: isSelected ? 'var(--gold-bright)' : 'var(--text-muted)',
                      lineHeight: 1.45,
                      borderTop: '1px solid rgba(212, 175, 55, 0.15)',
                      paddingTop: '8px',
                      fontFamily: isSelected ? 'var(--font-mono)' : 'var(--font-body)',
                    }}
                  >
                    {isSelected ? (
                      <div style={{ color: 'var(--gold-bright)', display: 'flex', alignItems: 'flex-start', gap: '6px' }}>
                        <Terminal size={14} style={{ flexShrink: 0, marginTop: '2px' }} />
                        <span>{p.unseenInsight}</span>
                      </div>
                    ) : (
                      <span>{p.status} · Click to reveal what’s hidden</span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Primary and Secondary CTA Button Group */}
        <div
          ref={ctaGroupRef}
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '18px',
            flexWrap: 'wrap',
          }}
        >
          <button
            ref={exploreBtnRef}
            onClick={onExploreStory}
            className="btn-gold-primary gold-sweep-active"
            style={{ cursor: 'pointer' }}
          >
            <span>BEGIN STORY & PROBLEM</span>
            <ArrowDown size={15} />
          </button>

          <button
            ref={modalBtnRef}
            onClick={onOpenCompanyModal}
            className="btn-gold-secondary"
            style={{ cursor: 'pointer' }}
          >
            <ShieldCheck size={15} />
            <span>CONNECT WITH ARTIFURA</span>
          </button>
        </div>

        {/* Bottom Golden Line Guide into Next Chapter */}
        <div
          style={{
            marginTop: '56px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '8px',
          }}
        >
          <span
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.65rem',
              color: 'var(--gold-antique)',
              letterSpacing: '0.2em',
            }}
          >
            FOLLOW THE GOLDEN SIGNAL DOWN
          </span>
          <div
            style={{
              width: '1px',
              height: '42px',
              background: 'linear-gradient(180deg, var(--gold-bright), transparent)',
            }}
            className="beam-pulse"
          />
        </div>
      </div>
    </section>
  );
};
