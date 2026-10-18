import React, { useState, useRef, useEffect } from 'react';
import { BookOpen, Bug, Lightbulb, AlertTriangle, TerminalSquare, MessageSquare, Maximize2 } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useParallax } from '../../motion/useScrollReveal';
import { use3DTilt } from '../../motion/use3DTilt';
import { ScrollReveal, BlurText } from '../reactbits';
import { getAssetUrl } from '../../utils/asset';
import { useComicLightbox } from '../common/ComicLightboxContext';

gsap.registerPlugin(ScrollTrigger);

export const Chapter01Problem: React.FC = () => {
  const [activePanel, setActivePanel] = useState<'A' | 'B' | 'C'>('B');
  const { openLightbox } = useComicLightbox();
  const sectionRef = useRef<HTMLElement | null>(null);
  const headerRef = useRef<HTMLDivElement | null>(null);
  const frameRef = useRef<HTMLDivElement | null>(null);
  const frameBorderRef = useRef<HTMLDivElement | null>(null);
  const panelARef = useRef<HTMLDivElement | null>(null);
  const panelBRef = useRef<HTMLDivElement | null>(null);
  const panelCRef = useRef<HTMLDivElement | null>(null);
  const speechBubbleRef = useRef<HTMLDivElement | null>(null);
  const annotationsRef = useRef<HTMLDivElement | null>(null);

  const parallaxImgRef = useParallax<HTMLImageElement>(0.12);
  const tiltCardARef = use3DTilt<HTMLDivElement>({ maxRotation: 4 });
  const tiltCardBRef = use3DTilt<HTMLDivElement>({ maxRotation: 4 });
  const tiltCardCRef = use3DTilt<HTMLDivElement>({ maxRotation: 4 });

  const panels = [
    {
      id: 'A' as const,
      tag: 'PANEL A // CONSUMPTION TRAP',
      title: 'Infinite Tutorials',
      desc: 'Dozens of browser tabs, crash courses, and video walkthroughs open at 2:00 AM. Syntax is familiar, but independent architectural intuition hasn’t formed.',
      icon: BookOpen,
      callout: '“There are so many videos... yet why does staring at a blank editor feel like a void?”',
      annotation: 'METRIC: 48 HOURS WATCHED // ZERO LINES SHIPPED',
    },
    {
      id: 'B' as const,
      tag: 'PANEL B // RUNTIME COLLISION',
      title: 'The Real-World Gap',
      desc: 'When faced with an unscripted edge case or real data pipeline bug, tutorial memory fractures. Red syntax errors illuminate the screen.',
      icon: Bug,
      callout: '“Syntax errors and traceback cascades: tutorials never showed how to diagnose the root cause under ambiguity.”',
      annotation: 'RUNTIME_ERR: SIGSEGV AT MEM_ADDR 0x7FFF09',
    },
    {
      id: 'C' as const,
      tag: 'PANEL C // THE REALIZATION',
      title: 'The True Turning Point',
      desc: 'Pausing to confront the fundamental reality: watching someone else write optimal algorithms is not the same as cultivating verifiable engineering prowess.',
      icon: Lightbulb,
      callout: '“Watching tutorials is passive consumption. True competence requires deliberate practice, measurement, and proof.”',
      annotation: 'EPIPHANY: COMPETENCE REQUIRES DELIBERATE PROOF',
    },
  ];

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      // 1. Editorial Header Reveal
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

      // 2. Comic Frame Artwork & Drawing Borders
      if (frameRef.current) {
        const frameTl = gsap.timeline({
          scrollTrigger: {
            trigger: frameRef.current,
            start: 'top 82%',
            once: true,
          },
        });

        frameTl
          .fromTo(
            frameRef.current,
            { opacity: 0, scale: 0.96 },
            { opacity: 1, scale: 1, duration: 0.9, ease: 'power3.out' }
          )
          // Border draws itself after artwork reveal
          .fromTo(
            frameBorderRef.current,
            { scaleX: 0, opacity: 0 },
            { scaleX: 1, opacity: 1, duration: 0.8, ease: 'expo.out' },
            '-=0.4'
          )
          // Technical annotations discover sequentially
          .fromTo(
            annotationsRef.current?.children || [],
            { opacity: 0, y: 12, scale: 0.92 },
            { opacity: 1, y: 0, scale: 1, duration: 0.5, stagger: 0.18, ease: 'back.out(1.5)' },
            '-=0.3'
          )
          // Speech bubble scale & opacity transition
          .fromTo(
            speechBubbleRef.current,
            { opacity: 0, scale: 0.88, y: 16 },
            { opacity: 1, scale: 1, y: 0, duration: 0.65, ease: 'back.out(1.4)' },
            '-=0.2'
          );
      }

      // 3. Sequential Comic Strip Panels Choreography (Distinct Directional Reveals)

      // Panel A: Horizontal wipe mask reveal
      if (panelARef.current) {
        gsap.fromTo(
          panelARef.current,
          {
            clipPath: 'polygon(0% 0%, 0% 0%, 0% 100%, 0% 100%)',
            opacity: 0,
          },
          {
            clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)',
            opacity: 1,
            duration: 0.9,
            ease: 'power3.inOut',
            scrollTrigger: {
              trigger: panelARef.current,
              start: 'top 88%',
              once: true,
            },
          }
        );
      }

      // Panel B: Opposite horizontal movement with collision highlight
      if (panelBRef.current) {
        gsap.fromTo(
          panelBRef.current,
          {
            x: 75,
            opacity: 0,
          },
          {
            x: 0,
            opacity: 1,
            duration: 0.85,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: panelBRef.current,
              start: 'top 86%',
              once: true,
            },
          }
        );
      }

      // Panel C: Short vertical clipping transition
      if (panelCRef.current) {
        gsap.fromTo(
          panelCRef.current,
          {
            clipPath: 'polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)',
            opacity: 0,
            y: 25,
          },
          {
            clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)',
            opacity: 1,
            y: 0,
            duration: 0.95,
            ease: 'power4.out',
            scrollTrigger: {
              trigger: panelCRef.current,
              start: 'top 84%',
              once: true,
            },
          }
        );
      }
    }, el);

    return () => ctx.revert();
  }, []);

  const setCardRef = (
    _idx: number,
    animRef: React.MutableRefObject<HTMLDivElement | null>,
    tiltRef: React.RefObject<HTMLDivElement | null>
  ) => {
    return (node: HTMLDivElement | null) => {
      animRef.current = node;
      (tiltRef as React.MutableRefObject<HTMLDivElement | null>).current = node;
    };
  };

  return (
    <section
      ref={sectionRef}
      id="chapter-01"
      style={{
        padding: '100px 24px 80px',
        position: 'relative',
        background: 'linear-gradient(180deg, #080808 0%, #0d0d0d 50%, #080808 100%)',
      }}
    >
      <div
        style={{
          maxWidth: '1280px',
          margin: '0 auto',
        }}
      >
        {/* Header Metadata */}
        <div ref={headerRef} style={{ textAlign: 'center', marginBottom: '36px' }}>


          <ScrollReveal
            mode="scrub"
            effect="rise"
            enableBlur={true}
            blurStrength={4}
            baseOpacity={0.25}
            style={{
              fontFamily: 'var(--font-heading)',
              fontSize: 'clamp(1.8rem, 4vw, 3.2rem)',
              fontWeight: 800,
              textTransform: 'uppercase',
              color: '#FFF',
              lineHeight: 1.15,
              maxWidth: '960px',
              margin: '0 auto 16px',
              textAlign: 'center',
            }}
          >
            KNOWING THE CODE ISN’T THE SAME AS SOLVING THE PROBLEM.
          </ScrollReveal>

          <div style={{ maxWidth: '720px', margin: '0 auto' }}>
            <BlurText
              text="Learning creates potential. Practice, assessment, and real-world application turn that potential into demonstrable ability."
              delay={60}
              animateBy="words"
              direction="top"
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: '1.05rem',
                color: 'var(--text-muted)',
                lineHeight: 1.6,
                justifyContent: 'center',
                textAlign: 'center',
              }}
            />
          </div>
        </div>

        {/* Mobile-Friendly Panel Switcher Tabs (Shown on Mobile Viewport) */}
        <div className="chapter01-panel-tabs-mobile">
          {(['A', 'B', 'C'] as const).map((panelKey) => (
            <button
              key={panelKey}
              onClick={() => setActivePanel(panelKey)}
              style={{
                background: activePanel === panelKey ? 'var(--gold-bright)' : 'rgba(15, 15, 15, 0.9)',
                color: activePanel === panelKey ? '#080808' : 'var(--gold-bright)',
                border: '1px solid var(--gold-border-bright)',
                borderRadius: '2px',
                fontWeight: 700,
                fontFamily: 'var(--font-mono)',
                cursor: 'pointer',
                boxShadow: activePanel === panelKey ? '0 0 12px rgba(245, 215, 110, 0.5)' : 'none',
                transition: 'all 0.2s ease',
              }}
            >
              PANEL 01-{panelKey}
            </button>
          ))}
        </div>

        {/* 3-Panel Comic Strip Frame */}
        <div
          ref={frameRef}
          className="comic-frame comic-corner-accents comic-artwork-container"
          style={{
            position: 'relative',
            overflow: 'hidden',
            border: '1px solid var(--gold-border)',
            boxShadow: '0 20px 50px rgba(0, 0, 0, 0.9)',
            marginBottom: '36px',
            padding: 0,
          }}
        >
          {/* Thin Self-Drawing Border Indicator */}
          <div
            ref={frameBorderRef}
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              height: '2px',
              background: 'var(--gold-gradient)',
              zIndex: 10,
              boxShadow: '0 0 12px rgba(245, 215, 110, 0.8)',
            }}
          />

          {/* Graphic Novel Artwork with Delayed Subtle Parallax & Tap to Zoom */}
          <div
            className="comic-art-wrapper"
            style={{ cursor: 'pointer' }}
            onClick={() => {
              openLightbox({
                src: getAssetUrl('/assets/comic/chapter1.jpg'),
                alt: 'Three-panel comic scene showing student struggling with code tutorials',
                title: `Chapter 01 // Panel 01-${activePanel}: ${panels.find((p) => p.id === activePanel)?.title}`,
                chapterTag: 'CHRONICLE 01 // THE PROBLEM',
                dialogue: panels.find((p) => p.id === activePanel)?.callout,
              });
            }}
          >
            <img
              ref={parallaxImgRef}
              src={getAssetUrl('/assets/comic/chapter1.jpg')}
              alt="Three-panel comic scene showing student struggling with code tutorials before realizing real practice is needed"
              style={{
                width: '100%',
                height: '110%',
                objectFit: 'cover',
                display: 'block',
                willChange: 'transform',
              }}
              loading="lazy"
            />

            {/* Interactive Zoom Pill for Mobile & Desktop Discovery */}
            <div
              className="comic-zoom-pill"
              onClick={(e) => {
                e.stopPropagation();
                openLightbox({
                  src: getAssetUrl('/assets/comic/chapter1.jpg'),
                  alt: 'Three-panel comic scene showing student struggling with code tutorials',
                  title: `Chapter 01 // Panel 01-${activePanel}: ${panels.find((p) => p.id === activePanel)?.title}`,
                  chapterTag: 'CHRONICLE 01 // THE PROBLEM',
                  dialogue: panels.find((p) => p.id === activePanel)?.callout,
                });
              }}
            >
              <Maximize2 size={11} />
              <span>TAP TO ZOOM</span>
            </div>

            {/* Error Messages & Technical Annotations Discovering Sequentially (Desktop Only overlay) */}
            <div
              ref={annotationsRef}
              className="comic-desktop-only-annotation"
              style={{
                position: 'absolute',
                top: '55px',
                left: '20px',
                display: 'flex',
                flexDirection: 'column',
                gap: '8px',
                zIndex: 6,
                pointerEvents: 'none',
              }}
            >
              <div
                style={{
                  background: 'rgba(18, 10, 10, 0.88)',
                  border: '1px solid #FF5555',
                  padding: '4px 10px',
                  borderRadius: '2px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.66rem',
                  color: '#FFAAAA',
                  boxShadow: '0 4px 16px rgba(0, 0, 0, 0.8)',
                }}
              >
                <AlertTriangle size={11} color="#FF5555" />
                <span>ERR: UNDEFINED REFERENCE (SYNTAX != LOGIC)</span>
              </div>

              <div
                style={{
                  background: 'rgba(10, 12, 18, 0.88)',
                  border: '1px solid rgba(212, 175, 55, 0.5)',
                  padding: '4px 10px',
                  borderRadius: '2px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.66rem',
                  color: 'var(--gold-bright)',
                }}
              >
                <TerminalSquare size={11} color="var(--gold-bright)" />
                <span>STACK_TRACE: PASSIVE_TUTORIAL_CYCLE_DETECTED</span>
              </div>
            </div>

            {/* Interactive Panel Guides (Desktop & Tablet In-Artwork overlay) */}
            <div
              className="chapter01-panel-guides-desktop"
              style={{
                position: 'absolute',
                inset: 0,
                display: 'grid',
                gridTemplateColumns: 'repeat(3, 1fr)',
                pointerEvents: 'none',
              }}
            >
              {(['A', 'B', 'C'] as const).map((panelKey, idx) => (
                <div
                  key={panelKey}
                  style={{
                    borderRight: idx < 2 ? '1px dashed rgba(212, 175, 55, 0.3)' : 'none',
                    position: 'relative',
                  }}
                >
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setActivePanel(panelKey);
                    }}
                    style={{
                      pointerEvents: 'auto',
                      position: 'absolute',
                      top: '16px',
                      left: '16px',
                      background:
                        activePanel === panelKey
                          ? 'var(--gold-bright)'
                          : 'rgba(10, 10, 10, 0.82)',
                      color: activePanel === panelKey ? '#080808' : 'var(--gold-bright)',
                      border: '1px solid var(--gold-border-bright)',
                      padding: '4px 10px',
                      fontFamily: 'var(--font-mono)',
                      fontSize: '0.7rem',
                      fontWeight: 700,
                      cursor: 'pointer',
                      transition: 'all 0.25s cubic-bezier(0.16, 1, 0.3, 1)',
                      boxShadow: '0 4px 12px rgba(0, 0, 0, 0.6)',
                      transform: activePanel === panelKey ? 'scale(1.05)' : 'none',
                    }}
                  >
                    PANEL 01-{panelKey}
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Selected Speech Bubble with Scale & Opacity Transition */}
          {/* On Desktop: Absoluted bottom-right inside frame; On Mobile: Stacks cleanly below image without obscuring art */}
          <div
            ref={speechBubbleRef}
            className="comic-mobile-stack-card"
            style={{
              position: 'absolute',
              bottom: '24px',
              right: '24px',
              maxWidth: '460px',
              background: 'rgba(12, 12, 12, 0.94)',
              backdropFilter: 'blur(10px)',
              border: '1px solid var(--gold-bright)',
              borderRadius: '4px',
              padding: '12px 18px',
              boxShadow: '0 8px 30px rgba(0, 0, 0, 0.9), 0 0 15px rgba(212, 175, 55, 0.2)',
              zIndex: 7,
            }}
          >
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: '6px',
                fontFamily: 'var(--font-mono)',
                fontSize: '0.66rem',
                color: 'var(--gold-bright)',
                letterSpacing: '0.15em',
                marginBottom: '4px',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <MessageSquare size={11} />
                <span>ACTIVE REFLECTION // PANEL 01-{activePanel}</span>
              </div>
              <span style={{ fontSize: '0.62rem', color: 'var(--text-muted)' }}>
                {panels.find((p) => p.id === activePanel)?.tag}
              </span>
            </div>
            <p
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: '0.88rem',
                color: 'var(--text-ivory)',
                lineHeight: 1.45,
                margin: 0,
                fontStyle: 'italic',
              }}
            >
              {panels.find((p) => p.id === activePanel)?.callout}
            </p>
          </div>
        </div>

        {/* Dynamic Editorial Breakdown Cards with Distinct Reveal Choreography */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '20px',
          }}
        >
          {/* PANEL A: The Passive Consumption Trap */}
          <div
            ref={setCardRef(0, panelARef, tiltCardARef)}
            onClick={() => setActivePanel('A')}
            className={`comic-frame comic-corner-accents interactive-panel ${
              activePanel === 'A' ? 'gold-pulse' : ''
            }`}
            style={{
              padding: '16px',
              background: activePanel === 'A' ? 'rgba(26, 22, 12, 0.95)' : 'rgba(17, 17, 17, 0.85)',
              borderColor: activePanel === 'A' ? 'var(--gold-bright)' : 'rgba(212, 175, 55, 0.2)',
              cursor: 'pointer',
              boxShadow: '0 12px 30px rgba(0, 0, 0, 0.7)',
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            {/* Manga Vignette Illustration */}
            <div
              style={{
                position: 'relative',
                borderRadius: '2px',
                overflow: 'hidden',
                aspectRatio: '4/3',
                marginBottom: '14px',
                border: '1px solid var(--gold-border)',
                cursor: 'pointer',
              }}
              onClick={(e) => {
                e.stopPropagation();
                openLightbox({
                  src: getAssetUrl('/assets/comic/ch1_trap.jpg'),
                  alt: 'Panel A: The Passive Consumption Trap',
                  title: 'Panel 01-A: Infinite Tutorials',
                  chapterTag: '01 // TRAP',
                  dialogue: '“I watched 80 hours of tutorials... why can\'t I build anything from scratch?!” — ' + panels[0].callout,
                });
              }}
            >
              <img
                src={getAssetUrl('/assets/comic/ch1_trap.jpg')}
                alt="Panel A: The Passive Consumption Trap - Exhausted student drowning in endless video tutorials"
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  display: 'block',
                  transition: 'transform 0.4s ease',
                }}
              />
              <div
                style={{
                  position: 'absolute',
                  top: '8px',
                  right: '8px',
                  background: 'rgba(0, 0, 0, 0.8)',
                  padding: '3px 8px',
                  borderRadius: '2px',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.62rem',
                  color: 'var(--gold-bright)',
                  border: '1px solid var(--gold-border)',
                }}
              >
                01 // TRAP
              </div>
              <div className="comic-zoom-pill" style={{ bottom: '8px', left: '8px', padding: '2px 7px', fontSize: '0.6rem' }}>
                <Maximize2 size={10} />
                <span>ZOOM</span>
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
              <h3
                style={{
                  fontFamily: 'var(--font-heading)',
                  fontSize: '1.15rem',
                  fontWeight: 700,
                  color: '#FFF',
                  margin: 0,
                }}
              >
                {panels[0].title}
              </h3>
              <BookOpen size={16} color={activePanel === 'A' ? 'var(--gold-bright)' : 'var(--text-muted)'} />
            </div>

            <p
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: '0.84rem',
                color: 'var(--text-muted)',
                lineHeight: 1.5,
                margin: '0 0 12px',
              }}
            >
              {panels[0].desc}
            </p>

            <div
              style={{
                marginTop: 'auto',
                background: 'rgba(10, 10, 10, 0.75)',
                borderLeft: `2px solid ${activePanel === 'A' ? 'var(--gold-bright)' : 'var(--gold-antique)'}`,
                padding: '8px 10px',
                fontFamily: 'var(--font-body)',
                fontSize: '0.8rem',
                color: 'var(--gold-bright)',
                fontStyle: 'italic',
              }}
            >
              "{panels[0].callout}"
            </div>
          </div>

          {/* PANEL B: The Logic Gap */}
          <div
            ref={setCardRef(1, panelBRef, tiltCardBRef)}
            onClick={() => setActivePanel('B')}
            className={`comic-frame comic-corner-accents interactive-panel ${
              activePanel === 'B' ? 'gold-pulse' : ''
            }`}
            style={{
              padding: '16px',
              background: activePanel === 'B' ? 'rgba(26, 22, 12, 0.95)' : 'rgba(17, 17, 17, 0.85)',
              borderColor: activePanel === 'B' ? 'var(--gold-bright)' : 'rgba(212, 175, 55, 0.2)',
              cursor: 'pointer',
              boxShadow: '0 12px 30px rgba(0, 0, 0, 0.7)',
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            {/* Manga Vignette Illustration */}
            <div
              style={{
                position: 'relative',
                borderRadius: '2px',
                overflow: 'hidden',
                aspectRatio: '4/3',
                marginBottom: '14px',
                border: '1px solid var(--gold-border)',
                cursor: 'pointer',
              }}
              onClick={(e) => {
                e.stopPropagation();
                openLightbox({
                  src: getAssetUrl('/assets/comic/ch1_logic.jpg'),
                  alt: 'Panel B: The Logic Gap',
                  title: 'Panel 01-B: The Real-World Gap',
                  chapterTag: '02 // CRASH',
                  dialogue: panels[1].callout,
                });
              }}
            >
              <img
                src={getAssetUrl('/assets/comic/ch1_logic.jpg')}
                alt="Panel B: The Logic Gap - Red terminal screens crashing with syntax errors"
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  display: 'block',
                  transition: 'transform 0.4s ease',
                }}
              />
              <div
                style={{
                  position: 'absolute',
                  top: '8px',
                  right: '8px',
                  background: 'rgba(0, 0, 0, 0.8)',
                  padding: '3px 8px',
                  borderRadius: '2px',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.62rem',
                  color: '#FF6B6B',
                  border: '1px solid #FF6B6B',
                }}
              >
                02 // CRASH
              </div>
              <div className="comic-zoom-pill" style={{ bottom: '8px', left: '8px', padding: '2px 7px', fontSize: '0.6rem' }}>
                <Maximize2 size={10} />
                <span>ZOOM</span>
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
              <h3
                style={{
                  fontFamily: 'var(--font-heading)',
                  fontSize: '1.15rem',
                  fontWeight: 700,
                  color: '#FFF',
                  margin: 0,
                }}
              >
                {panels[1].title}
              </h3>
              <Bug size={16} color={activePanel === 'B' ? 'var(--gold-bright)' : 'var(--text-muted)'} />
            </div>

            <p
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: '0.84rem',
                color: 'var(--text-muted)',
                lineHeight: 1.5,
                margin: '0 0 12px',
              }}
            >
              {panels[1].desc}
            </p>

            <div
              style={{
                marginTop: 'auto',
                background: 'rgba(10, 10, 10, 0.75)',
                borderLeft: `2px solid ${activePanel === 'B' ? 'var(--gold-bright)' : 'var(--gold-antique)'}`,
                padding: '8px 10px',
                fontFamily: 'var(--font-body)',
                fontSize: '0.8rem',
                color: 'var(--gold-bright)',
                fontStyle: 'italic',
              }}
            >
              "{panels[1].callout}"
            </div>
          </div>

          {/* PANEL C: The Proof Dilemma */}
          <div
            ref={setCardRef(2, panelCRef, tiltCardCRef)}
            onClick={() => setActivePanel('C')}
            className={`comic-frame comic-corner-accents interactive-panel ${
              activePanel === 'C' ? 'gold-pulse' : ''
            }`}
            style={{
              padding: '16px',
              background: activePanel === 'C' ? 'rgba(26, 22, 12, 0.95)' : 'rgba(17, 17, 17, 0.85)',
              borderColor: activePanel === 'C' ? 'var(--gold-bright)' : 'rgba(212, 175, 55, 0.2)',
              cursor: 'pointer',
              boxShadow: '0 12px 30px rgba(0, 0, 0, 0.7)',
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            {/* Manga Vignette Illustration */}
            <div
              style={{
                position: 'relative',
                borderRadius: '2px',
                overflow: 'hidden',
                aspectRatio: '4/3',
                marginBottom: '14px',
                border: '1px solid var(--gold-border)',
                cursor: 'pointer',
              }}
              onClick={(e) => {
                e.stopPropagation();
                openLightbox({
                  src: getAssetUrl('/assets/comic/ch1_proof.jpg'),
                  alt: 'Panel C: The Proof Dilemma',
                  title: 'Panel 01-C: The True Turning Point',
                  chapterTag: '03 // DILEMMA',
                  dialogue: panels[2].callout,
                });
              }}
            >
              <img
                src={getAssetUrl('/assets/comic/ch1_proof.jpg')}
                alt="Panel C: The Proof Dilemma - Recruiter discarding generic paper certificates"
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  display: 'block',
                  transition: 'transform 0.4s ease',
                }}
              />
              <div
                style={{
                  position: 'absolute',
                  top: '8px',
                  right: '8px',
                  background: 'rgba(0, 0, 0, 0.8)',
                  padding: '3px 8px',
                  borderRadius: '2px',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.62rem',
                  color: 'var(--gold-bright)',
                  border: '1px solid var(--gold-border)',
                }}
              >
                03 // DILEMMA
              </div>
              <div className="comic-zoom-pill" style={{ bottom: '8px', left: '8px', padding: '2px 7px', fontSize: '0.6rem' }}>
                <Maximize2 size={10} />
                <span>ZOOM</span>
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
              <h3
                style={{
                  fontFamily: 'var(--font-heading)',
                  fontSize: '1.15rem',
                  fontWeight: 700,
                  color: '#FFF',
                  margin: 0,
                }}
              >
                {panels[2].title}
              </h3>
              <Lightbulb size={16} color={activePanel === 'C' ? 'var(--gold-bright)' : 'var(--text-muted)'} />
            </div>

            <p
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: '0.84rem',
                color: 'var(--text-muted)',
                lineHeight: 1.5,
                margin: '0 0 12px',
              }}
            >
              {panels[2].desc}
            </p>

            <div
              style={{
                marginTop: 'auto',
                background: 'rgba(10, 10, 10, 0.75)',
                borderLeft: `2px solid ${activePanel === 'C' ? 'var(--gold-bright)' : 'var(--gold-antique)'}`,
                padding: '8px 10px',
                fontFamily: 'var(--font-body)',
                fontSize: '0.8rem',
                color: 'var(--gold-bright)',
                fontStyle: 'italic',
              }}
            >
              "{panels[2].callout}"
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
