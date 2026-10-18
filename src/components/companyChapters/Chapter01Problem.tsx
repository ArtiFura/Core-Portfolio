import React, { useState, useRef, useEffect } from 'react';
import {
  FileText,
  AlertTriangle,
  HelpCircle,
  Clock,
  Filter,
  Maximize2,
} from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useParallax } from '../../motion/useScrollReveal';
import { getAssetUrl } from '../../utils/asset';
import { useComicLightbox } from '../common/ComicLightboxContext';

gsap.registerPlugin(ScrollTrigger);

export const Chapter01Problem: React.FC = () => {
  const { openLightbox } = useComicLightbox();
  const [selectedResumeIndex, setSelectedResumeIndex] = useState(0);
  const sectionRef = useRef<HTMLElement | null>(null);
  const headerRef = useRef<HTMLDivElement | null>(null);
  const frameRef = useRef<HTMLDivElement | null>(null);
  const crowdedCardsRef = useRef<HTMLDivElement | null>(null);
  const interactiveTerminalRef = useRef<HTMLDivElement | null>(null);

  const parallaxImgRef = useParallax<HTMLImageElement>(0.12);

  const resumeCards = [
    {
      id: 0,
      candidate: 'Application #0482',
      education: 'B.Tech in Computer Science (2025)',
      claimedSkills: ['Python', 'Docker', 'Kubernetes', 'Microservices', 'GraphQL', 'AWS', 'TensorFlow', 'PostgreSQL'],
      certificates: '6 Digital Course Completion Badges',
      claimedProject: 'Built an enterprise e-commerce platform with AI recommendation engine.',
      screeningQuestion: '“Can you explain how your cache invalidation strategy avoided stale inventory reads?”',
      realityAnswer: '“We followed a course template; the database and cache orchestration were preconfigured by the instructor.”',
      verdict: 'High buzzword density · Ambiguous independent execution',
      flagType: 'Ambiguity',
    },
    {
      id: 1,
      candidate: 'Application #0891',
      education: 'B.E. Information Technology (2024)',
      claimedSkills: ['React', 'Next.js', 'Redux', 'TypeScript', 'Tailwind', 'REST APIs', 'Node.js', 'Jest'],
      certificates: 'Full-Stack Bootcamp Certificate',
      claimedProject: 'Full-scale Social Media App with live chat and media uploads.',
      screeningQuestion: '“How did you manage memory leaks and cleanup in the WebSocket connection listeners?”',
      realityAnswer: '“The boilerplate handled connections; I wrote the front-end UI buttons and forms.”',
      verdict: 'Visually polished frontend · Unknown runtime architecture depth',
      flagType: 'Superficial Evidence',
    },
    {
      id: 2,
      candidate: 'Application #1204',
      education: 'B.Tech Software Engineering (2025)',
      claimedSkills: ['Go', 'Distributed Systems', 'Kafka', 'Redis', 'gRPC', 'CI/CD Pipelines', 'Linux'],
      certificates: 'Cloud Architecture Specialization Certificate',
      claimedProject: 'High-throughput payment gateway simulation.',
      screeningQuestion: '“What was your approach to idempotency and network timeouts during transaction retries?”',
      realityAnswer: '“The project used sample mock endpoints; edge cases weren’t stress-tested under real network partitions.”',
      verdict: 'Promising technology list · Untested under real-world constraints',
      flagType: 'Unverified Depth',
    },
  ];

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

      // 2. Comic Artwork Frame Emergence
      if (frameRef.current) {
        gsap.fromTo(
          frameRef.current,
          { opacity: 0, scale: 0.96 },
          {
            opacity: 1,
            scale: 1,
            duration: 0.9,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: frameRef.current,
              start: 'top 82%',
              once: true,
            },
          }
        );
      }

      // 3. Crowded candidate panels entering from different directions and overlapping
      if (crowdedCardsRef.current) {
        const cards = crowdedCardsRef.current.children;
        gsap.fromTo(
          cards[0],
          { x: -60, opacity: 0, rotate: -3 },
          {
            x: 0,
            opacity: 1,
            rotate: -1.5,
            duration: 0.85,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: crowdedCardsRef.current,
              start: 'top 80%',
              once: true,
            },
          }
        );

        gsap.fromTo(
          cards[1],
          { y: 50, opacity: 0, scale: 0.92 },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 0.85,
            delay: 0.15,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: crowdedCardsRef.current,
              start: 'top 80%',
              once: true,
            },
          }
        );

        gsap.fromTo(
          cards[2],
          { x: 60, opacity: 0, rotate: 3 },
          {
            x: 0,
            opacity: 1,
            rotate: 1.5,
            duration: 0.85,
            delay: 0.25,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: crowdedCardsRef.current,
              start: 'top 80%',
              once: true,
            },
          }
        );
      }

      // 4. Interactive Screening Terminal
      if (interactiveTerminalRef.current) {
        gsap.fromTo(
          interactiveTerminalRef.current,
          { opacity: 0, y: 35 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: interactiveTerminalRef.current,
              start: 'top 85%',
              once: true,
            },
          }
        );
      }
    }, el);

    return () => ctx.revert();
  }, []);

  const currentResume = resumeCards[selectedResumeIndex];

  return (
    <section
      ref={sectionRef}
      id="chapter-01"
      style={{
        position: 'relative',
        minHeight: '100vh',
        padding: '100px 24px 90px',
        background: 'var(--bg-obsidian)',
        overflow: 'hidden',
      }}
    >
      {/* Background speed lines */}
      <div
        className="speed-lines"
        style={{
          position: 'absolute',
          inset: 0,
          opacity: 0.45,
          pointerEvents: 'none',
        }}
      />

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
            HUNDREDS OF RESUMES.{' '}
            <span className="gold-gradient-text">STILL SEARCHING.</span>
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
            Skills are listed. Certificates are attached. Projects are claimed. But identifying who can actually contribute takes more than reading a resume.
          </p>
        </div>

        {/* Comic Panel Artwork Frame */}
        <div
          ref={frameRef}
          className="comic-frame comic-corner-accents"
          style={{
            maxWidth: '1040px',
            margin: '0 auto 48px',
            background: 'var(--bg-secondary)',
            border: '1px solid var(--gold-border)',
            boxShadow: '0 20px 50px rgba(0, 0, 0, 0.85)',
          }}
        >


          {/* Graphic Novel Artwork Container */}
          <div
            className="comic-art-wrapper"
            style={{ cursor: 'pointer' }}
            onClick={() => {
              openLightbox({
                src: getAssetUrl('/assets/comic/company_ch1_problem.jpg'),
                alt: 'Tired recruiter sitting before a desk and monitors overflowing with identical resumes',
                title: 'Chapter 01 // The Problem',
                chapterTag: 'CHRONICLE 01 // THE RESUME ILLUSION',
                dialogue: '“Every applicant lists Python, React, and AWS. But when we ask how they debugged an edge-case deadlock, the conversation stalls.”',
              });
            }}
          >
            <img
              ref={parallaxImgRef}
              src={getAssetUrl('/assets/comic/company_ch1_problem.jpg')}
              alt="Tired recruiter sitting before a desk and monitors overflowing with identical resumes"
              style={{
                width: '100%',
                height: '110%',
                objectFit: 'cover',
                display: 'block',
                filter: 'contrast(1.08) brightness(0.95)',
              }}
              loading="lazy"
            />

            {/* Tap to Zoom Indicator */}
            <div
              className="comic-zoom-pill"
              onClick={(e) => {
                e.stopPropagation();
                openLightbox({
                  src: getAssetUrl('/assets/comic/company_ch1_problem.jpg'),
                  alt: 'Tired recruiter sitting before a desk and monitors overflowing with identical resumes',
                  title: 'Chapter 01 // The Problem',
                  chapterTag: 'CHRONICLE 01 // THE RESUME ILLUSION',
                  dialogue: '“Every applicant lists Python, React, and AWS. But when we ask how they debugged an edge-case deadlock, the conversation stalls.”',
                });
              }}
            >
              <Maximize2 size={11} />
              <span>TAP TO ZOOM</span>
            </div>

            {/* Vignette Gradient */}
            <div
              style={{
                position: 'absolute',
                inset: 0,
                background:
                  'linear-gradient(180deg, rgba(8, 8, 8, 0.15) 0%, transparent 40%, rgba(8, 8, 8, 0.9) 100%)',
                pointerEvents: 'none',
              }}
            />

            {/* Comic Speech Bubble (Desktop In-Artwork overlay) */}
            <div
              className="comic-speech-bubble comic-desktop-only-annotation"
              style={{
                position: 'absolute',
                top: '24px',
                right: '24px',
                maxWidth: '340px',
                background: 'rgba(16, 16, 16, 0.95)',
                border: '1px solid var(--gold-bright)',
                boxShadow: '0 10px 30px rgba(0, 0, 0, 0.8)',
                zIndex: 6,
              }}
            >
              <div
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.62rem',
                  color: 'var(--gold-bright)',
                  letterSpacing: '0.15em',
                  marginBottom: '4px',
                }}
              >
                RECRUITING LEAD REFLECTION:
              </div>
              <p style={{ margin: 0, fontSize: '0.85rem', lineHeight: 1.45, color: '#f0f0f0' }}>
                “Every applicant lists Python, React, and AWS. But when we ask how they debugged an edge-case deadlock, the conversation stalls.”
              </p>
            </div>
          </div>

          {/* Bottom Caption Overlay: On PC bottom inside frame; On Mobile stacked cleanly below */}
          <div
            className="comic-caption-box comic-mobile-stack-card"
            style={{
              position: 'absolute',
              bottom: '20px',
              left: '20px',
              right: '20px',
              maxWidth: '700px',
              background: 'rgba(10, 10, 10, 0.94)',
              backdropFilter: 'blur(8px)',
              zIndex: 7,
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '4px' }}>
              <span
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.64rem',
                  color: 'var(--gold-antique)',
                  letterSpacing: '0.2em',
                  display: 'block',
                }}
              >
                THE CORE BOTTLENECK
              </span>
              <span style={{ fontSize: '0.62rem', color: 'var(--gold-bright)', fontFamily: 'var(--font-mono)' }}>
                SIGNAL RATIO: 4%
              </span>
            </div>
            <p
              style={{
                margin: 0,
                fontSize: '0.88rem',
                color: 'var(--text-ivory)',
                lineHeight: 1.45,
              }}
            >
              Traditional resumes summarize titles and courses, but offer no direct evidence of architectural intuition, code hygiene, or real problem-solving endurance.
            </p>
          </div>
        </div>

        {/* Crowded Overlapping Comic Cards Sequence */}
        <div style={{ maxWidth: '1040px', margin: '0 auto 48px' }}>
          <div
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.72rem',
              color: 'var(--gold-bright)',
              letterSpacing: '0.18em',
              marginBottom: '16px',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
            }}
          >
            <AlertTriangle size={14} color="var(--gold-bright)" />
            <span>THREE DIMENSIONS OF THE RESUME SCREENING GAP</span>
          </div>

          <div
            ref={crowdedCardsRef}
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(310px, 1fr))',
              gap: '20px',
            }}
          >
            {/* Card 1 */}
            <div
              className="comic-frame"
              style={{
                padding: '24px',
                background: '#121212',
                border: '1px solid rgba(212, 175, 55, 0.25)',
                clipPath: 'polygon(0 0, calc(100% - 12px) 0, 100% 12px, 100% 100%, 12px 100%, 0 calc(100% - 12px))',
              }}
            >
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                  marginBottom: '12px',
                }}
              >
                <div
                  style={{
                    width: '32px',
                    height: '32px',
                    background: 'rgba(212, 175, 55, 0.1)',
                    border: '1px solid var(--gold-border)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <FileText size={16} color="var(--gold-bright)" />
                </div>
                <div>
                  <span
                    style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: '0.65rem',
                      color: 'var(--gold-antique)',
                      letterSpacing: '0.15em',
                      display: 'block',
                    }}
                  >
                    GAP 01 // SYNTACTIC OVERLOAD
                  </span>
                  <h4
                    style={{
                      fontFamily: 'var(--font-heading)',
                      fontSize: '1.05rem',
                      color: 'var(--text-ivory)',
                      margin: 0,
                    }}
                  >
                    The Keyword Standard
                  </h4>
                </div>
              </div>
              <p
                style={{
                  fontSize: '0.86rem',
                  color: 'var(--text-muted)',
                  lineHeight: 1.6,
                  marginBottom: '12px',
                }}
              >
                When every applicant uses the same prompt-engineered resume templates, keyword matching stops being a reliable proxy for technical mastery.
              </p>
              <div
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.7rem',
                  color: 'var(--gold-bright)',
                  background: 'rgba(212, 175, 55, 0.06)',
                  padding: '6px 10px',
                  borderLeft: '2px solid var(--gold-bright)',
                }}
              >
                OBSERVATION: 500+ RESUMES // IDENTICAL BUZZWORD MATRICES
              </div>
            </div>

            {/* Card 2 */}
            <div
              className="comic-frame"
              style={{
                padding: '24px',
                background: '#121212',
                border: '1px solid rgba(212, 175, 55, 0.25)',
                clipPath: 'polygon(0 0, calc(100% - 12px) 0, 100% 12px, 100% 100%, 12px 100%, 0 calc(100% - 12px))',
              }}
            >
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                  marginBottom: '12px',
                }}
              >
                <div
                  style={{
                    width: '32px',
                    height: '32px',
                    background: 'rgba(212, 175, 55, 0.1)',
                    border: '1px solid var(--gold-border)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <Clock size={16} color="var(--gold-bright)" />
                </div>
                <div>
                  <span
                    style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: '0.65rem',
                      color: 'var(--gold-antique)',
                      letterSpacing: '0.15em',
                      display: 'block',
                    }}
                  >
                    GAP 02 // TIME INTENSIVE
                  </span>
                  <h4
                    style={{
                      fontFamily: 'var(--font-heading)',
                      fontSize: '1.05rem',
                      color: 'var(--text-ivory)',
                      margin: 0,
                    }}
                  >
                    High Screening Tax
                  </h4>
                </div>
              </div>
              <p
                style={{
                  fontSize: '0.86rem',
                  color: 'var(--text-muted)',
                  lineHeight: 1.6,
                  marginBottom: '12px',
                }}
              >
                Engineering leaders spend 30% of their sprints conducting initial screening calls just to determine whether a candidate has actually run production code.
              </p>
              <div
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.7rem',
                  color: 'var(--gold-bright)',
                  background: 'rgba(212, 175, 55, 0.06)',
                  padding: '6px 10px',
                  borderLeft: '2px solid var(--gold-bright)',
                }}
              >
                FRICTION: 35+ SCREENING HOURS PER SINGLE OFFER
              </div>
            </div>

            {/* Card 3 */}
            <div
              className="comic-frame"
              style={{
                padding: '24px',
                background: '#121212',
                border: '1px solid rgba(212, 175, 55, 0.25)',
                clipPath: 'polygon(0 0, calc(100% - 12px) 0, 100% 12px, 100% 100%, 12px 100%, 0 calc(100% - 12px))',
              }}
            >
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                  marginBottom: '12px',
                }}
              >
                <div
                  style={{
                    width: '32px',
                    height: '32px',
                    background: 'rgba(212, 175, 55, 0.1)',
                    border: '1px solid var(--gold-border)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <Filter size={16} color="var(--gold-bright)" />
                </div>
                <div>
                  <span
                    style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: '0.65rem',
                      color: 'var(--gold-antique)',
                      letterSpacing: '0.15em',
                      display: 'block',
                    }}
                  >
                    GAP 03 // FALSE NEGATIVES
                  </span>
                  <h4
                    style={{
                      fontFamily: 'var(--font-heading)',
                      fontSize: '1.05rem',
                      color: 'var(--text-ivory)',
                      margin: 0,
                    }}
                  >
                    The Missed Outlier
                  </h4>
                </div>
              </div>
              <p
                style={{
                  fontSize: '0.86rem',
                  color: 'var(--text-muted)',
                  lineHeight: 1.6,
                  marginBottom: '12px',
                }}
              >
                Exceptional builders with brilliant GitHub commits and deep systems thinking get filtered out by naive keyword parsers simply because of resume formatting.
              </p>
              <div
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.7rem',
                  color: 'var(--gold-bright)',
                  background: 'rgba(212, 175, 55, 0.06)',
                  padding: '6px 10px',
                  borderLeft: '2px solid var(--gold-bright)',
                }}
              >
                VULNERABILITY: CAPABLE TALENT DISMISSED BY AUTOMATED FILTERS
              </div>
            </div>
          </div>
        </div>

        {/* Interactive Screening Inspection Simulation */}
        <div
          ref={interactiveTerminalRef}
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
              alignItems: 'center',
              justifyContent: 'space-between',
              marginBottom: '20px',
              borderBottom: '1px solid rgba(212, 175, 55, 0.2)',
              paddingBottom: '12px',
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
                INTERACTIVE SIMULATOR // THE RESUME PARADOX
              </div>
              <h3
                style={{
                  fontFamily: 'var(--font-heading)',
                  fontSize: '1.2rem',
                  color: 'var(--text-ivory)',
                  margin: '4px 0 0',
                }}
              >
                Compare Claimed Skills Against Evaluated Real-World Depth
              </h3>
            </div>

            {/* Selector Tabs */}
            <div style={{ display: 'flex', gap: '8px' }}>
              {resumeCards.map((card, idx) => (
                <button
                  key={card.id}
                  onClick={() => setSelectedResumeIndex(idx)}
                  style={{
                    background: selectedResumeIndex === idx ? 'var(--gold-gradient)' : 'rgba(20, 20, 20, 0.8)',
                    color: selectedResumeIndex === idx ? '#080808' : 'var(--text-muted)',
                    border: '1px solid var(--gold-border)',
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.72rem',
                    fontWeight: selectedResumeIndex === idx ? 700 : 500,
                    padding: '8px 14px',
                    cursor: 'pointer',
                    clipPath: 'polygon(0 0, calc(100% - 6px) 0, 100% 6px, 100% 100%, 6px 100%, 0 calc(100% - 6px))',
                    transition: 'all 0.2s ease',
                  }}
                >
                  RESUME {idx + 1}
                </button>
              ))}
            </div>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: '24px',
            }}
          >
            {/* Left: What the Resume Claims */}
            <div
              style={{
                background: '#131313',
                border: '1px solid rgba(255, 255, 255, 0.08)',
                padding: '20px',
                borderRadius: '2px',
              }}
            >
              <div
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.65rem',
                  color: 'var(--gold-bright)',
                  letterSpacing: '0.15em',
                  marginBottom: '10px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                }}
              >
                <FileText size={12} />
                <span>WHAT THE CANDIDATE RESUME CLAIMS:</span>
              </div>

              <div style={{ marginBottom: '12px' }}>
                <span style={{ fontSize: '0.75rem', color: 'var(--text-dim)', display: 'block' }}>
                  CANDIDATE ID:
                </span>
                <span style={{ fontFamily: 'var(--font-mono)', color: 'var(--text-ivory)', fontSize: '0.9rem' }}>
                  {currentResume.candidate} · {currentResume.education}
                </span>
              </div>

              <div style={{ marginBottom: '14px' }}>
                <span style={{ fontSize: '0.75rem', color: 'var(--text-dim)', display: 'block', marginBottom: '6px' }}>
                  LISTED SKILL STACK (KEYWORD LIST):
                </span>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                  {currentResume.claimedSkills.map((sk, idx) => (
                    <span
                      key={idx}
                      style={{
                        background: 'rgba(212, 175, 55, 0.1)',
                        border: '1px solid rgba(212, 175, 55, 0.25)',
                        color: 'var(--gold-bright)',
                        fontFamily: 'var(--font-mono)',
                        fontSize: '0.68rem',
                        padding: '3px 8px',
                      }}
                    >
                      {sk}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <span style={{ fontSize: '0.75rem', color: 'var(--text-dim)', display: 'block', marginBottom: '4px' }}>
                  CLAIMED PROJECT SCOPE:
                </span>
                <p style={{ fontSize: '0.84rem', color: 'var(--text-muted)', margin: 0, lineHeight: 1.5 }}>
                  {currentResume.claimedProject}
                </p>
              </div>
            </div>

            {/* Right: The Ambiguity Reveal During Screening */}
            <div
              style={{
                background: '#16140e',
                border: '1px solid var(--gold-border-bright)',
                padding: '20px',
                borderRadius: '2px',
                position: 'relative',
              }}
            >
              <div
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.65rem',
                  color: 'var(--gold-bright)',
                  letterSpacing: '0.15em',
                  marginBottom: '10px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                }}
              >
                <HelpCircle size={12} />
                <span>WHAT THE FIRST SCREENING ROUND ACTUALLY REVEALS:</span>
              </div>

              <div style={{ marginBottom: '14px' }}>
                <span style={{ fontSize: '0.75rem', color: 'var(--gold-antique)', display: 'block', marginBottom: '4px' }}>
                  CRITICAL ARCHITECTURAL PROBE:
                </span>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-ivory)', fontStyle: 'italic', margin: 0, lineHeight: 1.45 }}>
                  {currentResume.screeningQuestion}
                </p>
              </div>

              <div style={{ marginBottom: '16px' }}>
                <span style={{ fontSize: '0.75rem', color: 'var(--text-dim)', display: 'block', marginBottom: '4px' }}>
                  CANDIDATE DISCLOSURE:
                </span>
                <p style={{ fontSize: '0.84rem', color: 'var(--text-muted)', margin: 0, lineHeight: 1.45 }}>
                  {currentResume.realityAnswer}
                </p>
              </div>

              <div
                style={{
                  background: 'rgba(212, 175, 55, 0.08)',
                  border: '1px solid var(--gold-border)',
                  padding: '10px 14px',
                }}
              >
                <div
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.66rem',
                    color: 'var(--gold-bright)',
                    marginBottom: '2px',
                  }}
                >
                  VERDICT // {currentResume.flagType.toUpperCase()}
                </div>
                <div style={{ fontSize: '0.84rem', color: '#FFF' }}>
                  {currentResume.verdict}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
