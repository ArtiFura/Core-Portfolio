import React, { useState, useEffect } from 'react';
import {
  GraduationCap,
  Building2,
  Code2,
  ShieldCheck,
  Cpu,
  ArrowRight,
  ArrowUpRight,
  CheckCircle2,
  Sparkles,
  Send,
  ArrowUp,
  AlertTriangle,
} from 'lucide-react';
import { StoryNavigation } from './common/StoryNavigation';
import { ParticleCanvas } from './common/ParticleCanvas';
import { GoldDivider } from './common/GoldDivider';
import { ProjectModal } from './common/ProjectModal';
import { ArtifuraSymbol } from './ArtifuraIntro';
import { getAssetUrl } from '../utils/asset';
import { initSmoothScroll, destroySmoothScroll } from '../motion/lenisManager';
import { useMagnetic } from '../motion/useMagnetic';
import { useMouseSpotlight } from '../motion/useMouseSpotlight';
import {
  SplitText,
  BlurText,
  FoldText,
  TextType,
  ShinyText,
  ScrollFloat,
  ScrollReveal,
  RotatingText,
} from './reactbits';

interface HomePageProps {
  onNavigatePage: (page: 'home' | 'colleges' | 'companies', targetSection?: string) => void;
}

export function HomePage({ onNavigatePage }: HomePageProps) {
  const currentYear = new Date().getFullYear();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState<'college' | 'business' | 'partner'>('college');

  // Interactive Terminal State for College Simulator
  const [activeTab, setActiveTab] = useState<'college' | 'company'>('college');

  // Contact Form State
  const [contactRole, setContactRole] = useState<'college' | 'company'>('college');
  const [contactName, setContactName] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [contactOrg, setContactOrg] = useState('');
  const [contactMessage, setContactMessage] = useState('');
  const [contactSubmitted, setContactSubmitted] = useState(false);

  // Magnetic CTAs
  const heroCollegeBtnRef = useMagnetic<HTMLButtonElement>({ strength: 0.2, maxDistance: 8 });
  const heroCompanyBtnRef = useMagnetic<HTMLButtonElement>({ strength: 0.2, maxDistance: 8 });
  const returnTopBtnRef = useMagnetic<HTMLButtonElement>({ strength: 0.2, maxDistance: 8 });

  // Mouse spotlight on hero
  const spotlightRef = useMouseSpotlight<HTMLElement>({ opacity: 0.14 });

  useEffect(() => {
    window.scrollTo(0, 0);
    initSmoothScroll();
    return () => {
      destroySmoothScroll();
    };
  }, []);

  const handleOpenModal = (type: 'college' | 'business' | 'partner' = 'college') => {
    setModalType(type);
    setIsModalOpen(true);
  };

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const recipient = contactRole === 'college' ? 'campus@artifura.com' : 'partnerships@artifura.com';
    const subject = encodeURIComponent(`ARTIFURA LMS Inquiry [${contactRole.toUpperCase()}]: ${contactName} (${contactOrg})`);
    const body = encodeURIComponent(
      `Name: ${contactName}\nEmail: ${contactEmail}\nOrganization/Company: ${contactOrg}\nRole: ${contactRole}\n\nMessage / Requirements:\n${contactMessage}`
    );
    window.location.href = `mailto:${recipient}?subject=${subject}&body=${body}`;
    setContactSubmitted(true);
  };

  return (
    <div
      style={{
        background: 'var(--bg-obsidian)',
        color: 'var(--text-ivory)',
        minHeight: '100vh',
        position: 'relative',
        overflowX: 'hidden',
      }}
    >
      {/* Ambient Gold Stardust Canvas */}
      <ParticleCanvas />

      {/* Fixed Sticky Header Navigation */}
      <StoryNavigation
        pageMode="home"
        onNavigatePage={onNavigatePage}
        onOpenProjectModal={() => handleOpenModal('business')}
      />

      <main style={{ position: 'relative', zIndex: 2 }}>
        {/* ============================================================ */}
        {/* HERO SECTION — MINIMAL DUAL-SIDED LMS FRONT DOOR */}
        {/* ============================================================ */}
        <section
          ref={spotlightRef}
          id="home-hero"
          style={{
            position: 'relative',
            minHeight: '100vh',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '130px 24px 70px',
            background: '#080808',
            overflow: 'hidden',
          }}
        >
          {/* Ambient background breathing glow */}
          <div
            className="ambient-breathing-glow"
            style={{
              position: 'absolute',
              top: '45%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              width: 'clamp(320px, 70vw, 920px)',
              height: 'clamp(280px, 50vh, 520px)',
              background: 'rgba(255, 224, 141, 0.08)',
              borderRadius: '9999px',
              filter: 'blur(120px)',
              pointerEvents: 'none',
            }}
          />

          {/* Architectural Blueprint Grid */}
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

          {/* Top Corner Markings */}
          <div
            style={{
              position: 'absolute',
              top: '96px',
              left: '32px',
              fontFamily: 'var(--font-mono)',
              fontSize: '10.5px',
              color: '#8c6a18',
              letterSpacing: '0.18em',
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              opacity: 0.9,
            }}
            className="hud-hide-mobile"
          >
            <span style={{ width: '16px', height: '1.5px', background: 'var(--gold-primary)' }} />
            <ShinyText text="ARTIFURA // LMS ECOSYSTEM" speed={3.5} shineColor="#ffe08d" color="#8c6a18" />
          </div>

          <div
            style={{
              position: 'absolute',
              top: '96px',
              right: '32px',
              fontFamily: 'var(--font-mono)',
              fontSize: '10.5px',
              color: '#8c6a18',
              letterSpacing: '0.18em',
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              opacity: 0.9,
            }}
            className="hud-hide-mobile"
          >
            <span style={{ width: '16px', height: '1.5px', background: 'var(--gold-primary)' }} />
            <ShinyText text="TALENT & LEARNING INFRASTRUCTURE" speed={3.5} delay={1} shineColor="#ffe08d" color="#8c6a18" />
          </div>

          {/* Centerpiece Content */}
          <div
            style={{
              position: 'relative',
              zIndex: 10,
              maxWidth: '1080px',
              width: '100%',
              textAlign: 'center',
              margin: 'auto 0',
            }}
          >
            {/* Minimal Badge with React Bits ShinyText */}
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                padding: '6px 18px',
                borderRadius: '9999px',
                background: 'rgba(212, 175, 55, 0.08)',
                border: '1px solid rgba(212, 175, 55, 0.3)',
                fontFamily: 'var(--font-mono)',
                fontSize: '0.72rem',
                color: 'var(--gold-bright)',
                letterSpacing: '0.16em',
                marginBottom: '22px',
              }}
            >
              <Sparkles size={14} color="var(--gold-bright)" />
              <ShinyText
                text="THE VERIFIABLE LEARNING & TALENT ECOSYSTEM · EST. 2026"
                speed={3}
                shineColor="#ffffff"
                color="var(--gold-bright)"
                glow={0.5}
              />
            </div>

            {/* Monumental Headline with React Bits SplitText and RotatingText */}
            <h1
              style={{
                fontFamily: 'var(--font-display, "Space Grotesk", sans-serif)',
                fontSize: 'clamp(2.1rem, 4.8vw, 4.2rem)',
                fontWeight: 800,
                lineHeight: 1.15,
                letterSpacing: '-0.025em',
                color: 'var(--text-ivory)',
                margin: '0 auto 20px',
                maxWidth: '980px',
                textTransform: 'uppercase',
                textAlign: 'center',
              }}
            >
              <span style={{ display: 'block', marginBottom: '8px' }}>
                <SplitText
                  text="ONE VERIFIABLE LMS."
                  effect="rise"
                  delay={35}
                  duration={0.9}
                  tag="span"
                  style={{ display: 'inline-block' }}
                />
              </span>
              <span
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  minHeight: '1.25em',
                  width: '100%',
                }}
              >
                <RotatingText
                  texts={[
                    'PROVEN CODE OVER RESUMES.',
                    'CONTINUOUS TEST SANDBOXES.',
                    'CRYPTOGRAPHIC PROOFS OF CODE.',
                    'TWO SIDES OF ONE PLATFORM.',
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

            {/* Concise Mission Deck with React Bits BlurText */}
            <div style={{ maxWidth: '780px', margin: '0 auto 44px' }}>
              <BlurText
                text="Bridging academic rigor with high-stakes industry hiring. We replace paper certificates and keyword-stuffed resumes with continuous automated test sandboxes and cryptographic proof of capability."
                delay={80}
                animateBy="words"
                direction="top"
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: 'clamp(1rem, 1.35vw, 1.2rem)',
                  lineHeight: 1.7,
                  color: 'var(--text-muted)',
                  justifyContent: 'center',
                  textAlign: 'center',
                }}
              />
            </div>

            {/* DUAL GATEWAY CARDS: FOR COLLEGES vs FOR COMPANIES */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(310px, 1fr))',
                gap: '24px',
                maxWidth: '960px',
                margin: '0 auto 40px',
                textAlign: 'left',
              }}
            >
              {/* CARD 1: FOR COLLEGES */}
              <div
                className="comic-frame"
                style={{
                  background: 'rgba(17, 17, 17, 0.85)',
                  backdropFilter: 'blur(12px)',
                  border: '1px solid var(--gold-border)',
                  padding: '28px',
                  borderRadius: '2px',
                  clipPath: 'var(--panel-bevel)',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  transition: 'all 0.3s ease',
                  position: 'relative',
                  overflow: 'hidden',
                }}
              >
                <div
                  style={{
                    position: 'absolute',
                    top: 0,
                    right: 0,
                    width: '60px',
                    height: '60px',
                    background: 'radial-gradient(circle, rgba(212, 175, 55, 0.15) 0%, transparent 70%)',
                    pointerEvents: 'none',
                  }}
                />

                <div>
                  {/* Manga Preview Thumbnail */}
                  <div
                    style={{
                      position: 'relative',
                      borderRadius: '2px',
                      overflow: 'hidden',
                      aspectRatio: '16/9',
                      marginBottom: '18px',
                      border: '1px solid var(--gold-border)',
                    }}
                  >
                    <img
                      src={getAssetUrl('/assets/comic/college_hero_campus.jpg')}
                      alt="Artifura College Academic Engineering Manga"
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
                        left: '8px',
                        background: 'rgba(10, 10, 10, 0.85)',
                        border: '1px solid var(--gold-border)',
                        padding: '2px 8px',
                        fontFamily: 'var(--font-mono)',
                        fontSize: '0.62rem',
                        color: 'var(--gold-bright)',
                        fontWeight: 700,
                      }}
                    >
                      MANGA CHRONICLE // 07 CHAPTERS
                    </div>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
                    <div
                      style={{
                        width: '42px',
                        height: '42px',
                        borderRadius: '8px',
                        background: 'rgba(212, 175, 55, 0.12)',
                        border: '1px solid rgba(212, 175, 55, 0.4)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                    >
                      <GraduationCap size={22} color="var(--gold-bright)" />
                    </div>
                    <span
                      style={{
                        fontFamily: 'var(--font-mono)',
                        fontSize: '0.68rem',
                        color: 'var(--gold-antique)',
                        letterSpacing: '0.14em',
                      }}
                    >
                      ACADEMIC ENGINE
                    </span>
                  </div>

                  <h3
                    style={{
                      fontFamily: 'var(--font-heading)',
                      fontSize: '1.4rem',
                      fontWeight: 700,
                      color: 'var(--text-ivory)',
                      margin: '0 0 10px',
                    }}
                  >
                    For Colleges & Institutes
                  </h3>

                  <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)', lineHeight: 1.6, margin: '0 0 20px' }}>
                    Equip engineering departments with automated continuous testing sandboxes. Replace unverified exams
                    with verifiable student code repositories and undeniable placement capability.
                  </p>

                  <ul
                    style={{
                      listStyle: 'none',
                      padding: 0,
                      margin: '0 0 24px',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '8px',
                      fontFamily: 'var(--font-mono)',
                      fontSize: '0.74rem',
                      color: '#c2bca8',
                    }}
                  >
                    <li style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <span style={{ color: 'var(--gold-bright)' }}>▸</span> Automated Containerized Test Runners
                    </li>
                    <li style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <span style={{ color: 'var(--gold-bright)' }}>▸</span> Cryptographic Skill Matrices & Portfolios
                    </li>
                    <li style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <span style={{ color: 'var(--gold-bright)' }}>▸</span> Direct Placement Industry Pipeline
                    </li>
                  </ul>
                </div>

                <button
                  ref={heroCollegeBtnRef}
                  onClick={() => onNavigatePage('colleges')}
                  className="btn-gold-primary gold-sweep-active"
                  style={{
                    width: '100%',
                    padding: '12px 18px',
                    fontSize: '0.82rem',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '10px',
                  }}
                >
                  <span>EXPLORE FOR COLLEGES</span>
                  <ArrowRight size={15} />
                </button>
              </div>

              {/* CARD 2: FOR COMPANIES */}
              <div
                className="comic-frame"
                style={{
                  background: 'rgba(17, 17, 17, 0.85)',
                  backdropFilter: 'blur(12px)',
                  border: '1px solid var(--gold-border)',
                  padding: '28px',
                  borderRadius: '2px',
                  clipPath: 'var(--panel-bevel)',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  transition: 'all 0.3s ease',
                  position: 'relative',
                  overflow: 'hidden',
                }}
              >
                <div
                  style={{
                    position: 'absolute',
                    top: 0,
                    right: 0,
                    width: '60px',
                    height: '60px',
                    background: 'radial-gradient(circle, rgba(212, 175, 55, 0.15) 0%, transparent 70%)',
                    pointerEvents: 'none',
                  }}
                />

                <div>
                  {/* Manga Preview Thumbnail */}
                  <div
                    style={{
                      position: 'relative',
                      borderRadius: '2px',
                      overflow: 'hidden',
                      aspectRatio: '16/9',
                      marginBottom: '18px',
                      border: '1px solid var(--gold-border)',
                    }}
                  >
                    <img
                      src={getAssetUrl('/assets/comic/company_hero.jpg')}
                      alt="Artifura Company Talent Search Manga"
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
                        left: '8px',
                        background: 'rgba(10, 10, 10, 0.85)',
                        border: '1px solid var(--gold-border)',
                        padding: '2px 8px',
                        fontFamily: 'var(--font-mono)',
                        fontSize: '0.62rem',
                        color: 'var(--gold-bright)',
                        fontWeight: 700,
                      }}
                    >
                      MANGA CHRONICLE // 07 CHAPTERS
                    </div>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
                    <div
                      style={{
                        width: '42px',
                        height: '42px',
                        borderRadius: '8px',
                        background: 'rgba(212, 175, 55, 0.12)',
                        border: '1px solid rgba(212, 175, 55, 0.4)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                    >
                      <Building2 size={22} color="var(--gold-bright)" />
                    </div>
                    <span
                      style={{
                        fontFamily: 'var(--font-mono)',
                        fontSize: '0.68rem',
                        color: 'var(--gold-antique)',
                        letterSpacing: '0.14em',
                      }}
                    >
                      TALENT PIPELINE
                    </span>
                  </div>

                  <h3
                    style={{
                      fontFamily: 'var(--font-heading)',
                      fontSize: '1.4rem',
                      fontWeight: 700,
                      color: 'var(--text-ivory)',
                      margin: '0 0 10px',
                    }}
                  >
                    For Companies & Startups
                  </h3>

                  <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)', lineHeight: 1.6, margin: '0 0 20px' }}>
                    Stop filtering thousands of AI-generated resumes. Inspect verified student codebases, production
                    benchmarks, and algorithmic depth to hire pre-evaluated engineers with certainty.
                  </p>

                  <ul
                    style={{
                      listStyle: 'none',
                      padding: 0,
                      margin: '0 0 24px',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '8px',
                      fontFamily: 'var(--font-mono)',
                      fontSize: '0.74rem',
                      color: '#c2bca8',
                    }}
                  >
                    <li style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <span style={{ color: 'var(--gold-bright)' }}>▸</span> Zero Resume Noise · Real Git Repositories
                    </li>
                    <li style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <span style={{ color: 'var(--gold-bright)' }}>▸</span> Pre-Vetted Systems & Architecture Tests
                    </li>
                    <li style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <span style={{ color: 'var(--gold-bright)' }}>▸</span> Instant Talent Matchmaking by Benchmark
                    </li>
                  </ul>
                </div>

                <button
                  ref={heroCompanyBtnRef}
                  onClick={() => onNavigatePage('companies')}
                  className="btn-gold-primary gold-sweep-active"
                  style={{
                    width: '100%',
                    padding: '12px 18px',
                    fontSize: '0.82rem',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '10px',
                  }}
                >
                  <span>EXPLORE FOR COMPANIES</span>
                  <ArrowRight size={15} />
                </button>
              </div>
            </div>

            {/* Quick Proof Metrics Strip with React Bits ShinyText */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexWrap: 'wrap',
                gap: '24px',
                padding: '14px 24px',
                background: 'rgba(13, 13, 13, 0.65)',
                border: '1px solid rgba(212, 175, 55, 0.2)',
                borderRadius: '9999px',
                maxWidth: '820px',
                margin: '0 auto',
                fontFamily: 'var(--font-mono)',
                fontSize: '0.74rem',
                color: 'var(--text-muted)',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <CheckCircle2 size={14} color="var(--gold-bright)" />
                <span style={{ color: 'var(--text-ivory)', fontWeight: 600 }}>100%</span>
                <ShinyText text="Live Code Execution" speed={3.5} shineColor="#ffe08d" color="var(--text-muted)" />
              </div>
              <div style={{ width: '4px', height: '4px', background: 'var(--gold-antique)', borderRadius: '50%' }} />
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <CheckCircle2 size={14} color="var(--gold-bright)" />
                <span style={{ color: 'var(--text-ivory)', fontWeight: 600 }}>0%</span>
                <ShinyText text="Unverified Resume Noise" speed={3.5} delay={0.8} shineColor="#ffe08d" color="var(--text-muted)" />
              </div>
              <div style={{ width: '4px', height: '4px', background: 'var(--gold-antique)', borderRadius: '50%' }} />
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <CheckCircle2 size={14} color="var(--gold-bright)" />
                <span style={{ color: 'var(--text-ivory)', fontWeight: 600 }}>12x</span>
                <ShinyText text="Faster Hiring Velocity" speed={3.5} delay={1.6} shineColor="#ffe08d" color="var(--text-muted)" />
              </div>
            </div>
          </div>

          <style>{`
            @media (max-width: 768px) {
              .hud-hide-mobile {
                display: none !important;
              }
            }
          `}</style>
        </section>

        <GoldDivider label="THE PARADIGM SHIFT" />

        {/* ============================================================ */}
        {/* SECTION 2 — THE DISCONNECT WE SOLVE (MINIMAL GRAPHIC COMPARISON) */}
        {/* ============================================================ */}
        <section
          style={{
            padding: '80px 24px',
            maxWidth: '1120px',
            margin: '0 auto',
            position: 'relative',
          }}
        >
          <div style={{ textAlign: 'center', marginBottom: '50px' }}>
            <span
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.72rem',
                color: 'var(--gold-bright)',
                letterSpacing: '0.2em',
                textTransform: 'uppercase',
                display: 'block',
                marginBottom: '8px',
              }}
            >
              <ShinyText text="CHALLENGE // THE INDUSTRY GAP" speed={3} shineColor="#ffffff" color="var(--gold-bright)" />
            </span>
            <ScrollReveal
              mode="scrub"
              effect="rise"
              enableBlur={true}
              blurStrength={5}
              baseOpacity={0.2}
              style={{
                fontFamily: 'var(--font-heading)',
                fontSize: 'clamp(1.8rem, 3.5vw, 2.6rem)',
                color: 'var(--text-ivory)',
                margin: 0,
                textAlign: 'center',
              }}
            >
              Why Traditional Learning Platforms Failed Engineering
            </ScrollReveal>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
              gap: '24px',
            }}
          >
            {/* The Broken Reality */}
            <div
              className="comic-frame"
              style={{
                background: 'rgba(25, 15, 15, 0.45)',
                border: '1px solid rgba(220, 60, 60, 0.3)',
                padding: '30px',
                clipPath: 'var(--panel-bevel-sm)',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
                <AlertTriangle size={20} color="#ff6b6b" />
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: '#ff8585', letterSpacing: '0.12em' }}>
                  THE STATUS QUO // WITHOUT PROOF
                </span>
              </div>
              <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.25rem', color: '#fff', marginBottom: '12px' }}>
                Theoretical Exams & Speculative Hiring
              </h3>
              <p style={{ fontSize: '0.88rem', color: '#b0a0a0', lineHeight: 1.6, marginBottom: '20px' }}>
                Colleges administer multiple-choice exams and theoretical quizzes. Students graduate with certificates
                that lack actual verifiable code. Companies receive 10,000 resume PDFs with zero ability to separate builders from pretenders.
              </p>
              <div
                style={{
                  background: 'rgba(0, 0, 0, 0.4)',
                  padding: '14px 18px',
                  borderRadius: '4px',
                  borderLeft: '3px solid #ff6b6b',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.75rem',
                  color: '#e0b0b0',
                }}
              >
                Result: 84% of engineering recruiters reject candidate portfolios for lack of verifiable code evidence.
              </div>
            </div>

            {/* The ARTIFURA LMS Reality */}
            <div
              className="comic-frame"
              style={{
                background: 'rgba(15, 22, 18, 0.55)',
                border: '1px solid var(--gold-border-bright)',
                padding: '30px',
                clipPath: 'var(--panel-bevel-sm)',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
                <ShieldCheck size={20} color="var(--gold-bright)" />
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--gold-bright)', letterSpacing: '0.12em' }}>
                  THE ARTIFURA ENGINE // VERIFIABLE PROOF
                </span>
              </div>
              <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.25rem', color: 'var(--text-ivory)', marginBottom: '12px' }}>
                Automated Sandboxes & Pre-Vetted Discovery
              </h3>
              <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)', lineHeight: 1.6, marginBottom: '20px' }}>
                Colleges run student code inside automated test runners against real industry specifications. Every project
                generates a verifiable cryptographic proof badge. Companies bypass resume screening and hire proven talent instantly.
              </p>
              <div
                style={{
                  background: 'rgba(0, 0, 0, 0.4)',
                  padding: '14px 18px',
                  borderRadius: '4px',
                  borderLeft: '3px solid var(--gold-bright)',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.75rem',
                  color: 'var(--gold-bright)',
                }}
              >
                Result: 100% of student capabilities are backed by live Docker evaluation, git commit history, and test coverage.
              </div>
            </div>
          </div>
        </section>

        <GoldDivider label="THE DUAL PLATFORMS" />

        {/* ============================================================ */}
        {/* SECTION 3 — INTERACTIVE DEEP DIVE: COLLEGE SIDE vs COMPANY SIDE */}
        {/* ============================================================ */}
        <section
          style={{
            padding: '80px 24px',
            maxWidth: '1160px',
            margin: '0 auto',
            position: 'relative',
          }}
        >
          {/* Segment Toggle */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '12px',
              marginBottom: '50px',
            }}
          >
            <button
              onClick={() => setActiveTab('college')}
              style={{
                padding: '10px 24px',
                borderRadius: '9999px',
                background: activeTab === 'college' ? 'var(--gold-primary)' : 'rgba(20, 20, 20, 0.8)',
                color: activeTab === 'college' ? '#080808' : 'var(--text-muted)',
                border: activeTab === 'college' ? '1px solid var(--gold-bright)' : '1px solid rgba(212, 175, 55, 0.25)',
                fontFamily: 'var(--font-mono)',
                fontSize: '0.8rem',
                fontWeight: 600,
                letterSpacing: '0.12em',
                cursor: 'pointer',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                transition: 'all 0.25s ease',
              }}
            >
              <GraduationCap size={16} />
              <span>COLLEGE ENGINE (ACADEMIC)</span>
            </button>

            <button
              onClick={() => setActiveTab('company')}
              style={{
                padding: '10px 24px',
                borderRadius: '9999px',
                background: activeTab === 'company' ? 'var(--gold-primary)' : 'rgba(20, 20, 20, 0.8)',
                color: activeTab === 'company' ? '#080808' : 'var(--text-muted)',
                border: activeTab === 'company' ? '1px solid var(--gold-bright)' : '1px solid rgba(212, 175, 55, 0.25)',
                fontFamily: 'var(--font-mono)',
                fontSize: '0.8rem',
                fontWeight: 600,
                letterSpacing: '0.12em',
                cursor: 'pointer',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                transition: 'all 0.25s ease',
              }}
            >
              <Building2 size={16} />
              <span>COMPANY PIPELINE (HIRING)</span>
            </button>
          </div>

          {/* TAB 1: COLLEGE VIEW */}
          {activeTab === 'college' && (
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))',
                gap: '36px',
                alignItems: 'center',
              }}
            >
              <div>
                <span
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.72rem',
                    color: 'var(--gold-bright)',
                    letterSpacing: '0.18em',
                    textTransform: 'uppercase',
                    display: 'block',
                    marginBottom: '8px',
                  }}
                >
                  FOR INSTITUTIONS // THE ACADEMIC TRANSFORMATION
                </span>
                <FoldText
                  text="Turn Your Curriculum Into Undeniable Proof"
                  splitBy="word"
                  trigger="scroll"
                  foldStyle="paper"
                  fontSize="clamp(1.5rem, 2.7vw, 2.3rem)"
                  fontWeight={700}
                  color="var(--text-ivory)"
                  hoverRefold={true}
                  style={{ margin: '0 0 16px', lineHeight: 1.2 }}
                />
                <p
                  style={{
                    fontSize: '0.92rem',
                    color: 'var(--text-muted)',
                    lineHeight: 1.7,
                    marginBottom: '24px',
                  }}
                >
                  Traditional college LMS platforms store lecture slides and homework PDFs. ARTIFURA LMS embeds containerized
                  test runners directly into academic coursework. When a student builds an operating system kernel or microservice,
                  our engine compiles, executes edge-case tests, and issues verifiable proof.
                </p>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginBottom: '32px' }}>
                  <div style={{ display: 'flex', gap: '14px', alignItems: 'flex-start' }}>
                    <div style={{ width: '28px', height: '28px', borderRadius: '4px', background: 'rgba(212, 175, 55, 0.1)', border: '1px solid var(--gold-border)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                      <Code2 size={15} color="var(--gold-bright)" />
                    </div>
                    <div>
                      <h4 style={{ fontFamily: 'var(--font-heading)', fontSize: '0.95rem', color: 'var(--text-ivory)', margin: '0 0 4px' }}>Continuous Sandbox Evaluation</h4>
                      <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', margin: 0, lineHeight: 1.5 }}>Automated test suites evaluate performance, memory safety, and concurrency on every commit.</p>
                    </div>
                  </div>

                  <div style={{ display: 'flex', gap: '14px', alignItems: 'flex-start' }}>
                    <div style={{ width: '28px', height: '28px', borderRadius: '4px', background: 'rgba(212, 175, 55, 0.1)', border: '1px solid var(--gold-border)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                      <ShieldCheck size={15} color="var(--gold-bright)" />
                    </div>
                    <div>
                      <h4 style={{ fontFamily: 'var(--font-heading)', fontSize: '0.95rem', color: 'var(--text-ivory)', margin: '0 0 4px' }}>Cryptographic Proof Records</h4>
                      <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', margin: 0, lineHeight: 1.5 }}>Students receive immutable proof badges linked to live GitHub code, verified by university faculty.</p>
                    </div>
                  </div>

                  <div style={{ display: 'flex', gap: '14px', alignItems: 'flex-start' }}>
                    <div style={{ width: '28px', height: '28px', borderRadius: '4px', background: 'rgba(212, 175, 55, 0.1)', border: '1px solid var(--gold-border)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                      <Cpu size={15} color="var(--gold-bright)" />
                    </div>
                    <div>
                      <h4 style={{ fontFamily: 'var(--font-heading)', fontSize: '0.95rem', color: 'var(--text-ivory)', margin: '0 0 4px' }}>Transparent Institutional Accreditation</h4>
                      <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', margin: 0, lineHeight: 1.5 }}>Higher placement rates, zero accreditation stress, and proven graduate engineering competence.</p>
                    </div>
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
                  <button
                    onClick={() => onNavigatePage('colleges')}
                    className="btn-gold-primary gold-sweep-active"
                    style={{ padding: '12px 24px', fontSize: '0.82rem', display: 'inline-flex', alignItems: 'center', gap: '8px' }}
                  >
                    <span>EXPLORE THE 7-CHAPTER COLLEGE NOVEL</span>
                    <ArrowRight size={15} />
                  </button>

                  <button
                    onClick={() => handleOpenModal('college')}
                    className="btn-gold-secondary"
                    style={{ padding: '12px 20px', fontSize: '0.82rem', display: 'inline-flex', alignItems: 'center', gap: '8px' }}
                  >
                    <span>REQUEST CAMPUS PILOT</span>
                    <ArrowUpRight size={15} />
                  </button>
                </div>
              </div>

              {/* Terminal Simulator Preview */}
              <div
                className="comic-frame"
                style={{
                  background: '#0d0d0e',
                  border: '1px solid var(--gold-border-bright)',
                  padding: '20px',
                  borderRadius: '4px',
                  boxShadow: '0 20px 50px rgba(0, 0, 0, 0.8), 0 0 30px rgba(212, 175, 55, 0.1)',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.75rem',
                }}
              >
                {/* Terminal Header */}
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingBottom: '12px', borderBottom: '1px solid rgba(255, 255, 255, 0.08)', marginBottom: '14px' }}>
                  <div style={{ display: 'flex', gap: '6px' }}>
                    <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#ff5f56' }} />
                    <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#ffbd2e' }} />
                    <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#27c93f' }} />
                  </div>
                  <span style={{ color: 'var(--gold-antique)', fontSize: '0.68rem', letterSpacing: '0.1em' }}>
                    ARTIFURA EVAL ENGINE // DOCKER SANDBOX
                  </span>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', lineHeight: 1.6 }}>
                  <TextType
                    text={[
                      '$ artifura-eval test --suite=cs402-distributed-cache',
                      '$ artifura-verify --audit=cryptographic-proof-sig',
                      '$ artifura-bench --concurrency=10000 --metric=p99_latency',
                      '$ artifura-attest --student=elena-rostova --tier=1',
                    ]}
                    typingSpeed={40}
                    deletingSpeed={22}
                    pauseDuration={2400}
                    loop={true}
                    cursorStyle="bar"
                    cursorColor="var(--gold-bright)"
                    style={{ color: 'var(--gold-bright)', fontWeight: 600 }}
                  />
                  <div style={{ color: '#888' }}>
                    [INFO] Provisioning isolated runtime: Linux x86_64 / Rust 1.78
                  </div>
                  <div style={{ color: '#27c93f' }}>
                    ✔ test_consistent_hashing ... OK (14ms)
                  </div>
                  <div style={{ color: '#27c93f' }}>
                    ✔ test_node_failure_recovery ... OK (32ms)
                  </div>
                  <div style={{ color: '#27c93f' }}>
                    ✔ test_replication_factor_quorum ... OK (28ms)
                  </div>
                  <div style={{ color: '#27c93f' }}>
                    ✔ test_lru_eviction_under_concurrency ... OK (41ms)
                  </div>
                  <div style={{ color: '#888' }}>
                    ----------------------------------------------------
                  </div>
                  <div style={{ color: 'var(--text-ivory)' }}>
                    TOTAL: 48/48 TESTS PASSED · CODE COVERAGE: 98.4%
                  </div>
                  <div style={{ color: 'var(--gold-bright)' }}>
                    [ATTESTATION] Cryptographic Proof Hash: #art-b892-7f
                  </div>
                  <div style={{ color: '#888', fontSize: '0.68rem' }}>
                    Status: Pushed to Student Verified Capability Portfolio
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: COMPANY VIEW */}
          {activeTab === 'company' && (
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))',
                gap: '36px',
                alignItems: 'center',
              }}
            >
              <div>
                <span
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.72rem',
                    color: 'var(--gold-bright)',
                    letterSpacing: '0.18em',
                    textTransform: 'uppercase',
                    display: 'block',
                    marginBottom: '8px',
                  }}
                >
                  FOR HIRING TEAMS // ENTERPRISE TALENT DISCOVERY
                </span>
                <FoldText
                  text="Discover Engineers Whose Ability Is Proven"
                  splitBy="word"
                  trigger="scroll"
                  foldStyle="paper"
                  fontSize="clamp(1.5rem, 2.7vw, 2.3rem)"
                  fontWeight={700}
                  color="var(--text-ivory)"
                  hoverRefold={true}
                  style={{ margin: '0 0 16px', lineHeight: 1.2 }}
                />
                <p
                  style={{
                    fontSize: '0.92rem',
                    color: 'var(--text-muted)',
                    lineHeight: 1.7,
                    marginBottom: '24px',
                  }}
                >
                  Hiring engineering talent shouldn’t require reading 5,000 PDF resumes and doing 6 rounds of generic leetcode.
                  With ARTIFURA, companies inspect pre-vetted student architectures, live test passes, and Git commits
                  directly from accredited academic institutions.
                </p>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginBottom: '32px' }}>
                  <div style={{ display: 'flex', gap: '14px', alignItems: 'flex-start' }}>
                    <div style={{ width: '28px', height: '28px', borderRadius: '4px', background: 'rgba(212, 175, 55, 0.1)', border: '1px solid var(--gold-border)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                      <ShieldCheck size={15} color="var(--gold-bright)" />
                    </div>
                    <div>
                      <h4 style={{ fontFamily: 'var(--font-heading)', fontSize: '0.95rem', color: 'var(--text-ivory)', margin: '0 0 4px' }}>Zero Resume Noise</h4>
                      <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', margin: 0, lineHeight: 1.5 }}>Every candidate profile is linked to live repositories evaluated by automated test runners.</p>
                    </div>
                  </div>

                  <div style={{ display: 'flex', gap: '14px', alignItems: 'flex-start' }}>
                    <div style={{ width: '28px', height: '28px', borderRadius: '4px', background: 'rgba(212, 175, 55, 0.1)', border: '1px solid var(--gold-border)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                      <Code2 size={15} color="var(--gold-bright)" />
                    </div>
                    <div>
                      <h4 style={{ fontFamily: 'var(--font-heading)', fontSize: '0.95rem', color: 'var(--text-ivory)', margin: '0 0 4px' }}>Direct Architecture Inspection</h4>
                      <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', margin: 0, lineHeight: 1.5 }}>Inspect commit messages, pull request debates, and code hygiene before scheduling a single interview.</p>
                    </div>
                  </div>

                  <div style={{ display: 'flex', gap: '14px', alignItems: 'flex-start' }}>
                    <div style={{ width: '28px', height: '28px', borderRadius: '4px', background: 'rgba(212, 175, 55, 0.1)', border: '1px solid var(--gold-border)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                      <Building2 size={15} color="var(--gold-bright)" />
                    </div>
                    <div>
                      <h4 style={{ fontFamily: 'var(--font-heading)', fontSize: '0.95rem', color: 'var(--text-ivory)', margin: '0 0 4px' }}>Hire in 48 Hours, Not 8 Weeks</h4>
                      <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', margin: 0, lineHeight: 1.5 }}>Bypass preliminary screenings. Filter candidates by proven mastery in Rust, Go, Distributed Systems, or React.</p>
                    </div>
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
                  <button
                    onClick={() => onNavigatePage('companies')}
                    className="btn-gold-primary gold-sweep-active"
                    style={{ padding: '12px 24px', fontSize: '0.82rem', display: 'inline-flex', alignItems: 'center', gap: '8px' }}
                  >
                    <span>EXPLORE THE 8-CHAPTER COMPANIES NOVEL</span>
                    <ArrowRight size={15} />
                  </button>

                  <button
                    onClick={() => handleOpenModal('business')}
                    className="btn-gold-secondary"
                    style={{ padding: '12px 20px', fontSize: '0.82rem', display: 'inline-flex', alignItems: 'center', gap: '8px' }}
                  >
                    <span>HIRE PRE-VETTED TALENT</span>
                    <ArrowUpRight size={15} />
                  </button>
                </div>
              </div>

              {/* Candidate Card Preview */}
              <div
                className="comic-frame"
                style={{
                  background: '#0d0d0e',
                  border: '1px solid var(--gold-border-bright)',
                  padding: '24px',
                  borderRadius: '4px',
                  boxShadow: '0 20px 50px rgba(0, 0, 0, 0.8), 0 0 30px rgba(212, 175, 55, 0.1)',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.78rem',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
                  <div>
                    <span style={{ color: 'var(--gold-bright)', fontSize: '0.72rem', letterSpacing: '0.12em' }}>
                      CANDIDATE // TIER 1 PROVEN
                    </span>
                    <h4 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.15rem', color: '#fff', margin: '4px 0 0' }}>
                      Systems & Distributed Systems Engineer
                    </h4>
                  </div>
                  <div
                    style={{
                      padding: '4px 10px',
                      borderRadius: '9999px',
                      background: 'rgba(212, 175, 55, 0.15)',
                      border: '1px solid var(--gold-border)',
                      color: 'var(--gold-bright)',
                      fontSize: '0.7rem',
                    }}
                  >
                    <ShinyText text="SCORE: 96.8 / 100" speed={2.5} shineColor="#ffffff" color="var(--gold-bright)" />
                  </div>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', lineHeight: 1.5, marginBottom: '20px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid rgba(255, 255, 255, 0.06)', paddingBottom: '6px' }}>
                    <span style={{ color: '#888' }}>Primary Stack:</span>
                    <span style={{ color: 'var(--text-ivory)' }}>Rust, Go, PostgreSQL, Raft</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid rgba(255, 255, 255, 0.06)', paddingBottom: '6px' }}>
                    <span style={{ color: '#888' }}>Verified Repos:</span>
                    <span style={{ color: 'var(--gold-bright)' }}>5 Production Architectures</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid rgba(255, 255, 255, 0.06)', paddingBottom: '6px' }}>
                    <span style={{ color: '#888' }}>Unit Test Pass:</span>
                    <span style={{ color: '#27c93f' }}>100% (412 tests verified)</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid rgba(255, 255, 255, 0.06)', paddingBottom: '6px' }}>
                    <span style={{ color: '#888' }}>Evaluation Hash:</span>
                    <span style={{ color: '#aaa' }}>#proof-99f2c81</span>
                  </div>
                </div>

                <div
                  style={{
                    background: 'rgba(212, 175, 55, 0.08)',
                    border: '1px solid rgba(212, 175, 55, 0.25)',
                    padding: '10px',
                    borderRadius: '4px',
                    textAlign: 'center',
                    color: 'var(--gold-bright)',
                    fontSize: '0.72rem',
                    letterSpacing: '0.1em',
                  }}
                >
                  <ShinyText text="✓ VERIFIED ACCREDITATION BY ARTIFURA EVALUATION ENGINE" speed={3} shineColor="#ffe08d" color="var(--gold-bright)" />
                </div>
              </div>
            </div>
          )}
        </section>

        <GoldDivider label="THE 3-STEP ENGINE" />

        {/* ============================================================ */}
        {/* SECTION 4 — HOW THE LMS CONNECTS BOTH SIDES (3-STEP PIPELINE) */}
        {/* ============================================================ */}
        <section
          style={{
            padding: '80px 24px',
            maxWidth: '1120px',
            margin: '0 auto',
            position: 'relative',
          }}
        >
          <div style={{ textAlign: 'center', marginBottom: '50px' }}>
            <span
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.72rem',
                color: 'var(--gold-bright)',
                letterSpacing: '0.2em',
                textTransform: 'uppercase',
                display: 'block',
                marginBottom: '8px',
              }}
            >
              <ShinyText text="ARCHITECTURE // THE CONTINUOUS LOOP" speed={3} shineColor="#ffffff" color="var(--gold-bright)" />
            </span>
            <ScrollFloat
              effect="wave"
              splitBy="words"
              stagger={0.035}
              distance={35}
              scrollStart="top bottom-=5%"
              scrollEnd="bottom center+=15%"
              style={{
                fontFamily: 'var(--font-heading)',
                fontSize: 'clamp(1.8rem, 3.5vw, 2.6rem)',
                color: 'var(--text-ivory)',
                margin: 0,
                textAlign: 'center',
              }}
            >
              How the LMS Connects Learning to Industry
            </ScrollFloat>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: '24px',
              position: 'relative',
            }}
          >
            {/* Step 1 */}
            <div
              className="comic-frame"
              style={{
                background: 'rgba(17, 17, 17, 0.7)',
                border: '1px solid var(--gold-border)',
                padding: '28px',
                clipPath: 'var(--panel-bevel-sm)',
                display: 'flex',
                flexDirection: 'column',
                gap: '12px',
              }}
            >
              <div
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.72rem',
                  color: 'var(--gold-bright)',
                  letterSpacing: '0.14em',
                }}
              >
                01 // SPRINT & BUILD
              </div>
              <SplitText
                text="Students Code Real Systems"
                effect="rise"
                delay={25}
                tag="h3"
                style={{ fontFamily: 'var(--font-heading)', fontSize: '1.25rem', color: 'var(--text-ivory)', margin: 0 }}
              />
              <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', lineHeight: 1.6, margin: 0 }}>
                In college labs, students develop actual microservices, database engines, and web architectures instead of memorizing definitions.
              </p>
            </div>

            {/* Step 2 */}
            <div
              className="comic-frame"
              style={{
                background: 'rgba(17, 17, 17, 0.7)',
                border: '1px solid var(--gold-border)',
                padding: '28px',
                clipPath: 'var(--panel-bevel-sm)',
                display: 'flex',
                flexDirection: 'column',
                gap: '12px',
              }}
            >
              <div
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.72rem',
                  color: 'var(--gold-bright)',
                  letterSpacing: '0.14em',
                }}
              >
                02 // AUTOMATED EVALUATION
              </div>
              <SplitText
                text="Test Runners Validate Code"
                effect="rise"
                delay={25}
                tag="h3"
                style={{ fontFamily: 'var(--font-heading)', fontSize: '1.25rem', color: 'var(--text-ivory)', margin: 0 }}
              />
              <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', lineHeight: 1.6, margin: 0 }}>
                Containerized test suites benchmark every commit for correctness, scalability, and code cleanliness, issuing cryptographic proof records.
              </p>
            </div>

            {/* Step 3 */}
            <div
              className="comic-frame"
              style={{
                background: 'rgba(17, 17, 17, 0.7)',
                border: '1px solid var(--gold-border)',
                padding: '28px',
                clipPath: 'var(--panel-bevel-sm)',
                display: 'flex',
                flexDirection: 'column',
                gap: '12px',
              }}
            >
              <div
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.72rem',
                  color: 'var(--gold-bright)',
                  letterSpacing: '0.14em',
                }}
              >
                03 // DIRECT DISCOVERY
              </div>
              <SplitText
                text="Companies Hire Proven Talent"
                effect="rise"
                delay={25}
                tag="h3"
                style={{ fontFamily: 'var(--font-heading)', fontSize: '1.25rem', color: 'var(--text-ivory)', margin: 0 }}
              />
              <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', lineHeight: 1.6, margin: 0 }}>
                Partner tech companies discover top-percentile engineering talent with complete code visibility, cutting time-to-hire by 12x.
              </p>
            </div>
          </div>
        </section>

        <GoldDivider label="DISCUSS & PARTNER" />

        {/* ============================================================ */}
        {/* SECTION 5 — INQUIRY & CONTACT SECTION */}
        {/* ============================================================ */}
        <section
          id="contact-section"
          style={{
            padding: '80px 24px 100px',
            maxWidth: '860px',
            margin: '0 auto',
            position: 'relative',
          }}
        >
          <div style={{ textAlign: 'center', marginBottom: '40px' }}>
            <span
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.72rem',
                color: 'var(--gold-bright)',
                letterSpacing: '0.2em',
                textTransform: 'uppercase',
                display: 'block',
                marginBottom: '8px',
              }}
            >
              <ShinyText text="DIRECT DISPATCH // ARTIFURA INQUIRY" speed={3} shineColor="#fff" color="var(--gold-bright)" />
            </span>
            <ScrollReveal
              mode="enter"
              effect="fade"
              enableBlur={true}
              blurStrength={6}
              duration={0.85}
              style={{
                fontFamily: 'var(--font-heading)',
                fontSize: 'clamp(1.8rem, 3.5vw, 2.5rem)',
                color: 'var(--text-ivory)',
                margin: '0 0 12px',
                textAlign: 'center',
              }}
            >
              Let’s Build the Verifiable Future Together
            </ScrollReveal>
            <div style={{ maxWidth: '580px', margin: '0 auto' }}>
              <BlurText
                text="Whether you’re a university leadership team seeking modern continuous evaluation or a hiring company hunting for real builders, dispatch your details below."
                delay={60}
                animateBy="words"
                direction="top"
                style={{
                  fontSize: '0.92rem',
                  color: 'var(--text-muted)',
                  justifyContent: 'center',
                  textAlign: 'center',
                }}
              />
            </div>
          </div>

          <div
            className="comic-frame"
            style={{
              background: 'rgba(17, 17, 17, 0.9)',
              backdropFilter: 'blur(16px)',
              border: '1px solid var(--gold-border-bright)',
              padding: '36px',
              clipPath: 'var(--panel-bevel)',
            }}
          >
            {contactSubmitted ? (
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
                  COMMUNICATION PREPARED
                </h4>
                <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', lineHeight: 1.6, maxWidth: '480px', margin: '0 auto 20px' }}>
                  Your email client was opened with your message addressed to our team. We look forward to connecting with you.
                </p>
                <button
                  onClick={() => setContactSubmitted(false)}
                  className="btn-gold-secondary"
                  style={{ padding: '8px 18px', fontSize: '0.78rem' }}
                >
                  EDIT INQUIRY
                </button>
              </div>
            ) : (
              <form onSubmit={handleContactSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                {/* Role Switcher */}
                <div>
                  <label
                    style={{
                      display: 'block',
                      fontFamily: 'var(--font-mono)',
                      fontSize: '0.72rem',
                      color: 'var(--gold-antique)',
                      marginBottom: '8px',
                      letterSpacing: '0.1em',
                    }}
                  >
                    I REPRESENT *
                  </label>
                  <div style={{ display: 'flex', gap: '12px' }}>
                    <button
                      type="button"
                      onClick={() => setContactRole('college')}
                      style={{
                        flex: 1,
                        padding: '10px',
                        background: contactRole === 'college' ? 'rgba(212, 175, 55, 0.2)' : '#141414',
                        border: contactRole === 'college' ? '1px solid var(--gold-bright)' : '1px solid rgba(255, 255, 255, 0.1)',
                        color: contactRole === 'college' ? 'var(--gold-bright)' : 'var(--text-muted)',
                        fontFamily: 'var(--font-mono)',
                        fontSize: '0.78rem',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '6px',
                      }}
                    >
                      <GraduationCap size={15} />
                      <span>COLLEGE / UNIVERSITY</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setContactRole('company')}
                      style={{
                        flex: 1,
                        padding: '10px',
                        background: contactRole === 'company' ? 'rgba(212, 175, 55, 0.2)' : '#141414',
                        border: contactRole === 'company' ? '1px solid var(--gold-bright)' : '1px solid rgba(255, 255, 255, 0.1)',
                        color: contactRole === 'company' ? 'var(--gold-bright)' : 'var(--text-muted)',
                        fontFamily: 'var(--font-mono)',
                        fontSize: '0.78rem',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '6px',
                      }}
                    >
                      <Building2 size={15} />
                      <span>TECH COMPANY / HIRING</span>
                    </button>
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '16px' }}>
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
                      YOUR NAME *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Dr. Jane Smith / Alex Vance"
                      value={contactName}
                      onChange={(e) => setContactName(e.target.value)}
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
                      placeholder="e.g. name@university.edu or name@company.com"
                      value={contactEmail}
                      onChange={(e) => setContactEmail(e.target.value)}
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
                    ORGANIZATION / INSTITUTION NAME *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Stanford University CS / Stripe Engineering"
                    value={contactOrg}
                    onChange={(e) => setContactOrg(e.target.value)}
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
                    MESSAGE / SCOPE OF COLLABORATION
                  </label>
                  <textarea
                    rows={3}
                    placeholder="Tell us about your campus department size, student cohort, or hiring targets..."
                    value={contactMessage}
                    onChange={(e) => setContactMessage(e.target.value)}
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
                  type="submit"
                  className="btn-gold-primary gold-sweep-active"
                  style={{ padding: '14px', width: '100%', marginTop: '6px' }}
                >
                  <span>INITIATE PARTNERSHIP DISCUSSION</span>
                  <Send size={15} />
                </button>
              </form>
            )}
          </div>
        </section>

        {/* Footer */}
        <footer
          style={{
            borderTop: '1px solid rgba(212, 175, 55, 0.2)',
            padding: '40px 24px',
            background: '#060606',
          }}
        >
          <div
            style={{
              maxWidth: '1160px',
              margin: '0 auto',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              flexWrap: 'wrap',
              gap: '20px',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
              <ArtifuraSymbol style={{ height: '22px', width: 'auto' }} />
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.74rem', color: 'var(--text-muted)' }}>
                © {currentYear} ARTIFURA INC. // THE VERIFIABLE LMS INFRASTRUCTURE
              </span>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '20px', fontFamily: 'var(--font-mono)', fontSize: '0.74rem' }}>
              <button
                onClick={() => onNavigatePage('colleges')}
                style={{ background: 'none', border: 'none', color: 'var(--gold-bright)', cursor: 'pointer' }}
              >
                FOR COLLEGE
              </button>
              <button
                onClick={() => onNavigatePage('companies')}
                style={{ background: 'none', border: 'none', color: 'var(--gold-bright)', cursor: 'pointer' }}
              >
                FOR COMPANIES
              </button>
              <button
                ref={returnTopBtnRef}
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                style={{
                  width: '32px',
                  height: '32px',
                  background: 'rgba(20, 20, 20, 0.8)',
                  border: '1px solid var(--gold-border)',
                  color: 'var(--gold-bright)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  borderRadius: '2px',
                }}
                aria-label="Scroll back to top"
              >
                <ArrowUp size={15} />
              </button>
            </div>
          </div>
        </footer>
      </main>

      {/* Project Modal */}
      <ProjectModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        initialType={modalType}
      />
    </div>
  );
}

export default HomePage;
