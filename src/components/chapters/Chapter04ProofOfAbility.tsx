import React, { useState, useRef, useEffect } from 'react';
import {
  GitCommit,
  CheckCircle2,
  Copy,
  Check,
  Award,
  Layers,
  Maximize2,
} from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useParallax } from '../../motion/useScrollReveal';
import { use3DTilt } from '../../motion/use3DTilt';
import { useContainerParallax } from '../../motion/useContainerParallax';
import { getAssetUrl } from '../../utils/asset';
import { useComicLightbox } from '../common/ComicLightboxContext';

gsap.registerPlugin(ScrollTrigger);

export const Chapter04ProofOfAbility: React.FC = () => {
  const { openLightbox } = useComicLightbox();
  const [copied, setCopied] = useState(false);
  const [selectedTimelineNode, setSelectedTimelineNode] = useState<number>(2);

  const sectionRef = useRef<HTMLElement | null>(null);
  const headerRef = useRef<HTMLDivElement | null>(null);
  const frameRef = useRef<HTMLDivElement | null>(null);
  const timelineColumnRef = useRef<HTMLDivElement | null>(null);
  const timelineLaserRef = useRef<HTMLDivElement | null>(null);
  const passportCardRef = useRef<HTMLDivElement | null>(null);
  const metricCardsRef = useRef<HTMLDivElement | null>(null);

  const parallaxImgRef = useParallax<HTMLImageElement>(0.12);
  const tiltTimelineRef = use3DTilt<HTMLDivElement>({ maxRotation: 3, scale: 1.01 });
  const tiltPassportRef = use3DTilt<HTMLDivElement>({ maxRotation: 4, scale: 1.015 });

  // Profile illustration cursor parallax
  useContainerParallax<HTMLElement>({
    layers: [
      { selector: '.dossier-artwork-layer', depth: 0.035 },
      { selector: '.dossier-tag-layer', depth: 0.06 },
    ],
    lerp: 0.08,
  });

  const timelineNodes = [
    {
      year: 'PHASE 01',
      title: 'Algorithmic Foundations & Complexity',
      proof: '34 Data Structure implementations with benchmark testing',
      badge: 'COMPLEXITY CERTIFIED',
      tech: ['C++', 'Python', 'Algorithms'],
    },
    {
      year: 'PHASE 02',
      title: 'System Design & High-Concurrency APIs',
      proof: 'Distributed cache cluster with consistent hashing & WAL',
      badge: 'SYSTEMS ACCREDITED',
      tech: ['Go', 'Redis', 'Docker'],
    },
    {
      year: 'PHASE 03',
      title: 'Full-Stack Distributed Cloud Architecture',
      proof: 'End-to-end telemetry pipeline serving 50k mock events/sec',
      badge: 'PRODUCTION READY',
      tech: ['TypeScript', 'Node.js', 'PostgreSQL', 'WebSockets'],
    },
    {
      year: 'PHASE 04',
      title: 'Machine Learning & Model Integration',
      proof: 'Vector search ranking engine with cosine similarity index',
      badge: 'ML INFRASTRUCTURE',
      tech: ['PyTorch', 'Vector DB', 'FastAPI'],
    },
  ];

  const handleCopyPassport = () => {
    navigator.clipboard?.writeText('https://artifura.com/portfolio/verified/alex-chen-8892');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      // Header entrance
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

      // Illustration Frame
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

      // Timeline laser trace line drawing itself
      if (timelineLaserRef.current) {
        gsap.fromTo(
          timelineLaserRef.current,
          { scaleY: 0, transformOrigin: 'top center' },
          {
            scaleY: 1,
            duration: 1.2,
            ease: 'power2.inOut',
            scrollTrigger: {
              trigger: timelineColumnRef.current,
              start: 'top 80%',
              once: true,
            },
          }
        );
      }

      // Overlapping entry of timeline and passport panels
      if (timelineColumnRef.current) {
        gsap.fromTo(
          timelineColumnRef.current,
          { opacity: 0, x: -35 },
          {
            opacity: 1,
            x: 0,
            duration: 0.85,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: timelineColumnRef.current,
              start: 'top 85%',
              once: true,
            },
          }
        );
      }

      if (passportCardRef.current) {
        gsap.fromTo(
          passportCardRef.current,
          { opacity: 0, x: 35 },
          {
            opacity: 1,
            x: 0,
            duration: 0.85,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: passportCardRef.current,
              start: 'top 85%',
              once: true,
            },
          }
        );
      }

      // Staggered reveal of verified metric indicators
      if (metricCardsRef.current) {
        gsap.fromTo(
          metricCardsRef.current.children,
          { opacity: 0, scale: 0.9, y: 15 },
          {
            opacity: 1,
            scale: 1,
            y: 0,
            duration: 0.6,
            stagger: 0.12,
            ease: 'back.out(1.5)',
            scrollTrigger: {
              trigger: metricCardsRef.current,
              start: 'top 88%',
              once: true,
            },
          }
        );
      }
    }, el);

    return () => ctx.revert();
  }, []);

  const setTimelineWrapperRef = (node: HTMLDivElement | null) => {
    timelineColumnRef.current = node;
    (tiltTimelineRef as React.MutableRefObject<HTMLDivElement | null>).current = node;
  };

  const setPassportWrapperRef = (node: HTMLDivElement | null) => {
    passportCardRef.current = node;
    (tiltPassportRef as React.MutableRefObject<HTMLDivElement | null>).current = node;
  };

  return (
    <section
      ref={sectionRef}
      id="chapter-04"
      style={{
        padding: '100px 24px 90px',
        position: 'relative',
        background: 'radial-gradient(circle at 50% 30%, rgba(212, 175, 55, 0.05) 0%, #080808 70%)',
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
            DON’T JUST SAY YOU HAVE THE SKILL.{' '}
            <span className="gold-gradient-text">SHOW THE WORK.</span>
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
            Create a clearer picture of student progress through projects, assessments, and evidence of practical ability — turning self-reported resume claims into verifiable digital proof.
          </p>
        </div>

        {/* Graphic Novel Cinematic Artwork (Tactile Depth & Image Hover) */}
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
                src: getAssetUrl('/assets/comic/chapter4.jpg'),
                alt: 'Verified developer portfolio showing technical milestone timeline and shareable passport',
                title: 'Chapter 04 // Proof of Ability',
                chapterTag: 'CHRONICLE 04 // PROOF DOSSIER',
                dialogue: '“A shareable, tamper-proof proof-of-ability dossier with cryptographic hashes, test coverage metrics, and real commit timelines.”',
              });
            }}
          >
            <img
              ref={parallaxImgRef}
              className="dossier-artwork-layer"
              src={getAssetUrl('/assets/comic/chapter4.jpg')}
              alt="Verified developer portfolio showing technical milestone timeline and shareable passport"
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
                  src: getAssetUrl('/assets/comic/chapter4.jpg'),
                  alt: 'Verified developer portfolio showing technical milestone timeline and shareable passport',
                  title: 'Chapter 04 // Proof of Ability',
                  chapterTag: 'CHRONICLE 04 // PROOF DOSSIER',
                  dialogue: '“A shareable, tamper-proof proof-of-ability dossier with cryptographic hashes, test coverage metrics, and real commit timelines.”',
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
                background: 'linear-gradient(180deg, transparent 65%, rgba(8, 8, 8, 0.9) 100%)',
                pointerEvents: 'none',
              }}
            />
          </div>
        </div>

        {/* Interactive Milestone Timeline Explorer & Shareable Passport with 3D Depth */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '28px',
          }}
        >
          {/* Interactive Timeline Selector with Self-Drawing Laser Trace */}
          <div
            ref={setTimelineWrapperRef}
            className="comic-frame interactive-panel screenshot-card-container"
            style={{
              background: '#111111',
              padding: '28px',
              border: '1px solid rgba(212, 175, 55, 0.25)',
              boxShadow: '0 15px 40px rgba(0,0,0,0.8)',
            }}
          >
            <div
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.72rem',
                color: 'var(--gold-bright)',
                letterSpacing: '0.15em',
                marginBottom: '18px',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
              }}
            >
              <GitCommit size={14} />
              <span>INTERACTIVE MILESTONE TIMELINE (SELECT TO INSPECT)</span>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', position: 'relative' }}>
              {/* Connecting Laser Trace Line that Draws on Scroll */}
              <div
                ref={timelineLaserRef}
                style={{
                  position: 'absolute',
                  left: '1px',
                  top: '12px',
                  bottom: '12px',
                  width: '2px',
                  background: 'linear-gradient(180deg, var(--gold-bright) 0%, rgba(212, 175, 55, 0.2) 100%)',
                  boxShadow: '0 0 8px rgba(245, 215, 110, 0.7)',
                  zIndex: 0,
                }}
              />

              {timelineNodes.map((node, idx) => {
                const isSelected = selectedTimelineNode === idx;
                return (
                  <div
                    key={idx}
                    onClick={() => setSelectedTimelineNode(idx)}
                    className="interactive-panel"
                    style={{
                      position: 'relative',
                      zIndex: 1,
                      background: isSelected ? 'rgba(26, 22, 11, 0.95)' : 'rgba(20, 20, 20, 0.85)',
                      borderLeft: isSelected
                        ? '3px solid var(--gold-bright)'
                        : '3px solid rgba(255, 255, 255, 0.1)',
                      borderTop: '1px solid rgba(212, 175, 55, 0.15)',
                      borderRight: '1px solid rgba(212, 175, 55, 0.15)',
                      borderBottom: '1px solid rgba(212, 175, 55, 0.15)',
                      padding: '16px 20px',
                      cursor: 'pointer',
                      transition: 'all 0.35s cubic-bezier(0.16, 1, 0.3, 1)',
                      boxShadow: isSelected ? '0 0 22px rgba(212, 175, 55, 0.25)' : 'none',
                      transform: isSelected ? 'translateX(4px)' : 'none',
                    }}
                  >
                    <div
                      style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        marginBottom: '4px',
                      }}
                    >
                      <span
                        style={{
                          fontFamily: 'var(--font-mono)',
                          fontSize: '0.68rem',
                          color: isSelected ? 'var(--gold-bright)' : 'var(--text-muted)',
                        }}
                      >
                        {node.year}
                      </span>
                      <span
                        style={{
                          fontFamily: 'var(--font-mono)',
                          fontSize: '0.65rem',
                          background: isSelected ? 'var(--gold-gradient)' : 'rgba(212, 175, 55, 0.15)',
                          color: isSelected ? '#080808' : 'var(--gold-bright)',
                          fontWeight: isSelected ? 700 : 500,
                          padding: '2px 8px',
                          borderRadius: '2px',
                          transition: 'all 0.3s ease',
                        }}
                      >
                        {node.badge}
                      </span>
                    </div>

                    <div
                      style={{
                        fontFamily: 'var(--font-heading)',
                        fontSize: '0.98rem',
                        fontWeight: 600,
                        color: isSelected ? '#FFF' : 'var(--text-ivory)',
                        marginBottom: '4px',
                      }}
                    >
                      {node.title}
                    </div>

                    <div
                      style={{
                        fontSize: '0.8rem',
                        color: 'var(--text-muted)',
                        marginBottom: '8px',
                      }}
                    >
                      Proof: {node.proof}
                    </div>

                    <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                      {node.tech.map((t) => (
                        <span
                          key={t}
                          style={{
                            fontFamily: 'var(--font-mono)',
                            fontSize: '0.65rem',
                            color: isSelected ? 'var(--gold-bright)' : 'var(--gold-antique)',
                            background: '#0a0a0a',
                            padding: '2px 6px',
                            border: `1px solid ${isSelected ? 'rgba(212, 175, 55, 0.4)' : 'rgba(212, 175, 55, 0.2)'}`,
                          }}
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Shareable Developer Passport Mockup with 3D Depth & Illuminating Status */}
          <div
            ref={setPassportWrapperRef}
            className="comic-frame comic-corner-accents interactive-panel screenshot-card-container"
            style={{
              background: '#0d0d0d',
              border: '1px solid var(--gold-border-bright)',
              padding: '28px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              boxShadow: '0 20px 50px rgba(0, 0, 0, 0.9), 0 0 30px rgba(212, 175, 55, 0.15)',
            }}
          >
            <div>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  marginBottom: '20px',
                  paddingBottom: '14px',
                  borderBottom: '1px solid rgba(212, 175, 55, 0.2)',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <div
                    className="gold-pulse"
                    style={{
                      width: '42px',
                      height: '42px',
                      background: 'var(--gold-gradient)',
                      clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: '#080808',
                      fontWeight: 800,
                      fontFamily: 'var(--font-display)',
                    }}
                  >
                    V
                  </div>
                  <div>
                    <div
                      style={{
                        fontFamily: 'var(--font-heading)',
                        fontWeight: 700,
                        fontSize: '1.05rem',
                        color: '#FFF',
                      }}
                    >
                      SHAREABLE DEVELOPER PASSPORT
                    </div>
                    <div
                      style={{
                        fontFamily: 'var(--font-mono)',
                        fontSize: '0.68rem',
                        color: 'var(--gold-bright)',
                      }}
                    >
                      ARTIFURA VERIFIED PROFILE #8892-V
                    </div>
                  </div>
                </div>

                <div
                  className="gold-pulse"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.72rem',
                    color: '#4ade80',
                    background: 'rgba(74, 222, 128, 0.12)',
                    padding: '4px 10px',
                    border: '1px solid rgba(74, 222, 128, 0.4)',
                    borderRadius: '2px',
                  }}
                >
                  <CheckCircle2 size={12} />
                  <span>VERIFIED</span>
                </div>
              </div>

              {/* Verified Metrics Grid with Distinct Reveal Animations */}
              <div
                ref={metricCardsRef}
                style={{
                  display: 'grid',
                  gridTemplateColumns: '1fr 1fr',
                  gap: '14px',
                  marginBottom: '20px',
                }}
              >
                <div
                  className="interactive-panel"
                  style={{
                    background: '#161616',
                    padding: '14px',
                    border: '1px solid rgba(212, 175, 55, 0.25)',
                  }}
                >
                  <div
                    style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: '0.65rem',
                      color: 'var(--text-muted)',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '5px',
                    }}
                  >
                    <Award size={12} color="var(--gold-bright)" />
                    <span>BENCHMARK RUNS</span>
                  </div>
                  <div
                    style={{
                      fontFamily: 'var(--font-display)',
                      fontSize: '1.5rem',
                      color: 'var(--gold-bright)',
                      fontWeight: 800,
                      marginTop: '4px',
                    }}
                  >
                    142 PASS
                  </div>
                </div>

                <div
                  className="interactive-panel"
                  style={{
                    background: '#161616',
                    padding: '14px',
                    border: '1px solid rgba(212, 175, 55, 0.25)',
                  }}
                >
                  <div
                    style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: '0.65rem',
                      color: 'var(--text-muted)',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '5px',
                    }}
                  >
                    <Layers size={12} color="#FFF" />
                    <span>CAPSTONE COMMITS</span>
                  </div>
                  <div
                    style={{
                      fontFamily: 'var(--font-display)',
                      fontSize: '1.5rem',
                      color: '#FFF',
                      fontWeight: 800,
                      marginTop: '4px',
                    }}
                  >
                    48 AUDITED
                  </div>
                </div>
              </div>

              <p
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: '0.85rem',
                  color: 'var(--text-muted)',
                  lineHeight: 1.55,
                  marginBottom: '16px',
                }}
              >
                This passport represents authenticated project artifacts, passing test suites, code commits, and peer reviews. Shareable directly with college academic mentors, internship coordinators, and verified recruiters.
              </p>
            </div>

            {/* Copy / Export Action with Tactile Response */}
            <div
              style={{
                background: '#141414',
                border: '1px dashed var(--gold-border)',
                padding: '12px 16px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: '12px',
              }}
            >
              <div
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.72rem',
                  color: 'var(--gold-bright)',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  whiteSpace: 'nowrap',
                }}
              >
                artifura.com/portfolio/verified/alex-chen-8892
              </div>
              <button
                onClick={handleCopyPassport}
                style={{
                  background: 'rgba(212, 175, 55, 0.2)',
                  border: '1px solid var(--gold-bright)',
                  color: 'var(--gold-bright)',
                  padding: '7px 14px',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.7rem',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  whiteSpace: 'nowrap',
                  transition: 'all 0.2s ease',
                }}
              >
                {copied ? <Check size={12} /> : <Copy size={12} />}
                <span>{copied ? 'COPIED' : 'COPY PASSPORT LINK'}</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
