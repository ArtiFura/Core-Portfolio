import React, { useState, useRef, useEffect } from 'react';
import {
  Code,
  FolderGit2,
  TrendingUp,
  Activity,
} from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { use3DTilt } from '../../motion/use3DTilt';

gsap.registerPlugin(ScrollTrigger);

export const Chapter04Evidence: React.FC = () => {
  const [activeEvidenceScene, setActiveEvidenceScene] = useState<'skills' | 'projects' | 'progress'>('skills');
  const [expandedProject, setExpandedProject] = useState<number | null>(0);
  const sectionRef = useRef<HTMLElement | null>(null);
  const headerRef = useRef<HTMLDivElement | null>(null);
  const switcherRef = useRef<HTMLDivElement | null>(null);
  const sceneContainerRef = useRef<HTMLDivElement | null>(null);

  const tiltCardARef = use3DTilt<HTMLDivElement>({ maxRotation: 5 });

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

      // 2. Interactive Scene Switcher
      if (switcherRef.current) {
        gsap.fromTo(
          switcherRef.current,
          { opacity: 0, y: 20 },
          {
            opacity: 1,
            y: 0,
            duration: 0.7,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: switcherRef.current,
              start: 'top 85%',
              once: true,
            },
          }
        );
      }

      // 3. Evidence Container
      if (sceneContainerRef.current) {
        gsap.fromTo(
          sceneContainerRef.current,
          { opacity: 0, scale: 0.98 },
          {
            opacity: 1,
            scale: 1,
            duration: 0.85,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: sceneContainerRef.current,
              start: 'top 82%',
              once: true,
            },
          }
        );
      }
    }, el);

    return () => ctx.revert();
  }, []);

  // Fictional Demonstration Projects
  const showcaseProjects = [
    {
      id: 0,
      title: 'Valkyrie Log-Engine',
      type: 'Distributed Systems & Storage Engine',
      tech: ['Go', 'mmap', 'CRC32', 'LSM-Tree', 'gRPC'],
      summary: 'Custom log-structured merge-tree storage engine designed for write-heavy telemetry workloads with zero GC pauses.',
      deepDive: 'Implemented memory-mapped append-only commit logs with background compaction threads. Verified against crash loops with zero data truncation.',
      metrics: {
        writeSpeed: '120,000 writes/sec',
        readLatency: '1.2ms (p99)',
        crashRecovery: '< 450ms',
        unitTests: '184 test assertions',
      },
    },
    {
      id: 1,
      title: 'Aegis WebAssembly VM',
      type: 'Compiler Internals & Sandboxing',
      tech: ['Rust', 'Wasm', 'LLVM', 'POSIX Isolation'],
      summary: 'Lightweight sandboxed runtime for executing untrusted user plugins within an edge gateway architecture.',
      deepDive: 'Constructed custom instruction dispatcher with strict memory limits (max 64MB) and CPU budget quotas preventing infinite execution loops.',
      metrics: {
        coldStart: '0.8ms startup',
        memoryFootprint: '4.2MB per worker',
        leakDetections: '0 memory leaks observed',
        fuzzTesting: '1,000,000 mutations verified',
      },
    },
    {
      id: 2,
      title: 'Helios Real-Time Audio Synthesizer',
      type: 'WebAudio & DSP Algorithms',
      tech: ['TypeScript', 'WebAudio API', 'AudioWorklet', 'FFT Analysis'],
      summary: 'Low-latency polyphonic synthesizer processing audio buffer chunks directly in dedicated audio worker threads.',
      deepDive: 'Custom additive harmonic oscillators with anti-aliasing Chebyshev filters and zero buffer underruns under 128-sample latency buffer.',
      metrics: {
        bufferLatency: '2.9ms round-trip',
        voicePolyphony: '32 voices simultaneously',
        cpuUtilization: '4.2% on single core',
        browserCompatibility: '100% WebAudio Level 2',
      },
    },
  ];

  return (
    <section
      ref={sectionRef}
      id="chapter-04"
      style={{
        position: 'relative',
        minHeight: '100vh',
        padding: '100px 24px 90px',
        background: 'radial-gradient(ellipse at 50% 60%, #131109 0%, var(--bg-obsidian) 85%)',
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
            marginBottom: '40px',
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
            SEE WHAT THEY CAN <span className="gold-gradient-text">ACTUALLY DO.</span>
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
            Explore real execution logs, git commit histories, and benchmark latency graphs that prove engineering capability before the first conversation.
          </p>
        </div>

        {/* Graphic Novel Cinematic Artwork: The Evidence */}
        <div
          className="comic-frame comic-corner-accents comic-artwork-container"
          style={{
            maxWidth: '1080px',
            margin: '0 auto 36px',
            position: 'relative',
            overflow: 'hidden',
            border: '1px solid var(--gold-border-bright)',
            boxShadow: '0 25px 70px rgba(0, 0, 0, 0.95), 0 0 45px rgba(212, 175, 55, 0.18)',
          }}
        >
          <div style={{ position: 'relative', width: '100%', aspectRatio: '16/9', overflow: 'hidden' }}>
            <img
              src="/assets/comic/company_ch4_evidence.jpg"
              alt="Tech lead examining interactive floating evidence displays: code execution terminal, benchmark latency graphs, git commit timeline, and cryptographic skill badges"
              style={{
                width: '100%',
                height: '106%',
                objectFit: 'cover',
                display: 'block',
                transition: 'transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
              }}
              loading="lazy"
            />

            {/* In-Scene Interactive Floating Audit Signal */}
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
                PROVEN ATTESTATION: VERIFIED [GIT + TESTS]
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
              CHRONICLE 04 // THE EVIDENCE VAULT
            </div>
          </div>
        </div>

        {/* 3-Scene Selector Bar (A. SKILLS, B. PROJECTS, C. PROGRESS) */}
        <div
          ref={switcherRef}
          style={{
            maxWidth: '820px',
            margin: '0 auto 32px',
            display: 'flex',
            justifyContent: 'center',
            gap: '12px',
            flexWrap: 'wrap',
          }}
        >
          <button
            onClick={() => setActiveEvidenceScene('skills')}
            className={activeEvidenceScene === 'skills' ? 'btn-gold-primary' : 'btn-gold-secondary'}
            style={{ padding: '10px 18px', fontSize: '0.78rem' }}
          >
            <Code size={14} />
            <span>SKILLS & ASSESSMENTS</span>
          </button>

          <button
            onClick={() => setActiveEvidenceScene('projects')}
            className={activeEvidenceScene === 'projects' ? 'btn-gold-primary' : 'btn-gold-secondary'}
            style={{ padding: '10px 18px', fontSize: '0.78rem' }}
          >
            <FolderGit2 size={14} />
            <span>PROJECT PORTFOLIO</span>
          </button>

          <button
            onClick={() => setActiveEvidenceScene('progress')}
            className={activeEvidenceScene === 'progress' ? 'btn-gold-primary' : 'btn-gold-secondary'}
            style={{ padding: '10px 18px', fontSize: '0.78rem' }}
          >
            <TrendingUp size={14} />
            <span>PROGRESS OVER TIME</span>
          </button>
        </div>

        {/* Scene Container */}
        <div
          ref={sceneContainerRef}
          className="comic-frame comic-corner-accents"
          style={{
            maxWidth: '1080px',
            margin: '0 auto',
            background: 'var(--bg-secondary)',
            border: '1px solid var(--gold-border-bright)',
            padding: '32px',
            boxShadow: '0 25px 65px rgba(0, 0, 0, 0.9), 0 0 35px rgba(212, 175, 55, 0.12)',
            minHeight: '520px',
          }}
        >
          {/* SCENE A: SKILLS & ASSESSMENT EVIDENCE */}
          {activeEvidenceScene === 'skills' && (
            <div>
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginBottom: '24px',
                  borderBottom: '1px solid rgba(212, 175, 55, 0.2)',
                  paddingBottom: '14px',
                  flexWrap: 'wrap',
                  gap: '10px',
                }}
              >
                <div>
                  <span
                    style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: '0.65rem',
                      color: 'var(--gold-bright)',
                      letterSpacing: '0.2em',
                      display: 'block',
                    }}
                  >
                    OBJECTIVE ASSESSMENT TELEMETRY
                  </span>
                  <h3
                    style={{
                      fontFamily: 'var(--font-heading)',
                      fontSize: '1.3rem',
                      color: 'var(--text-ivory)',
                      margin: '4px 0 0',
                    }}
                  >
                    Verified Algorithmic & Architectural Assessments
                  </h3>
                </div>
                <div
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.68rem',
                    color: 'var(--gold-bright)',
                    background: 'rgba(212, 175, 55, 0.1)',
                    padding: '6px 12px',
                    border: '1px solid var(--gold-border)',
                  }}
                >
                  SIMULATED DEMO PROFILE: DEV-4092
                </div>
              </div>

              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                  gap: '24px',
                }}
              >
                {/* Assessment Breakdown Bars */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  {[
                    { label: 'Algorithmic Problem Decomposition', score: 95, note: 'Solved dynamic graph cycle detection in O(V+E)' },
                    { label: 'Concurrency & Thread Safety', score: 92, note: 'Zero race conditions detected under Go -race detector' },
                    { label: 'Code Cleanliness & Documentation', score: 97, note: 'Follows idiomatic standard library conventions' },
                    { label: 'Error Handling & Edge Cases', score: 89, note: 'Handles network socket teardown gracefully' },
                  ].map((metric, idx) => (
                    <div
                      key={idx}
                      style={{
                        background: '#111',
                        border: '1px solid rgba(255, 255, 255, 0.08)',
                        padding: '14px',
                      }}
                    >
                      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                        <span style={{ fontSize: '0.84rem', color: 'var(--text-ivory)', fontWeight: 600 }}>
                          {metric.label}
                        </span>
                        <span style={{ fontFamily: 'var(--font-mono)', color: 'var(--gold-bright)', fontWeight: 700 }}>
                          {metric.score}%
                        </span>
                      </div>

                      {/* Progress meter */}
                      <div style={{ width: '100%', height: '6px', background: '#222', marginBottom: '8px' }}>
                        <div
                          style={{
                            width: `${metric.score}%`,
                            height: '100%',
                            background: 'var(--gold-gradient)',
                            boxShadow: '0 0 8px rgba(245, 215, 110, 0.6)',
                          }}
                        />
                      </div>

                      <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', color: 'var(--text-dim)' }}>
                        ↳ {metric.note}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Live Diagnostic Challenge Card */}
                <div
                  ref={tiltCardARef}
                  style={{
                    background: '#12100a',
                    border: '1px solid var(--gold-border-bright)',
                    padding: '20px',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                  }}
                >
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
                      <Activity size={16} color="var(--gold-bright)" />
                      <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.72rem', color: 'var(--gold-bright)' }}>
                        OBSERVED DIAGNOSTIC BENCHMARK
                      </span>
                    </div>

                    <h4 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.05rem', color: '#FFF', marginBottom: '8px' }}>
                      Challenge: Resolve Memory Leak in Async TCP Listener
                    </h4>

                    <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', lineHeight: 1.5, marginBottom: '14px' }}>
                      Candidate was presented with an obfuscated TCP server dropping connections after 15 minutes of load.
                    </p>

                    <div
                      style={{
                        background: '#090909',
                        padding: '12px',
                        border: '1px solid #222',
                        fontFamily: 'var(--font-mono)',
                        fontSize: '0.72rem',
                        color: '#98c379',
                        lineHeight: 1.5,
                        marginBottom: '14px',
                      }}
                    >
                      <div>RESOLUTION TIME: 11 minutes 42 seconds</div>
                      <div>TOOLING USED: pprof memory flamegraphs</div>
                      <div>ROOT CAUSE: Unclosed goroutine channel leak</div>
                      <div style={{ color: 'var(--gold-bright)' }}>PASS SCORE: 100% (Zero memory regression)</div>
                    </div>
                  </div>

                  <div
                    style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: '0.68rem',
                      color: 'var(--gold-antique)',
                      borderTop: '1px solid rgba(212, 175, 55, 0.2)',
                      paddingTop: '10px',
                    }}
                  >
                    STATUS: Verified through ARTIFURA Automated Sandbox Evaluation
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* SCENE B: PROJECTS PORTFOLIO */}
          {activeEvidenceScene === 'projects' && (
            <div>
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginBottom: '24px',
                  borderBottom: '1px solid rgba(212, 175, 55, 0.2)',
                  paddingBottom: '14px',
                  flexWrap: 'wrap',
                  gap: '10px',
                }}
              >
                <div>
                  <span
                    style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: '0.65rem',
                      color: 'var(--gold-bright)',
                      letterSpacing: '0.2em',
                      display: 'block',
                    }}
                  >
                    REAL-WORLD PROJECT ARTIFACTS
                  </span>
                  <h3
                    style={{
                      fontFamily: 'var(--font-heading)',
                      fontSize: '1.3rem',
                      color: 'var(--text-ivory)',
                      margin: '4px 0 0',
                    }}
                  >
                    Examine Independent Engineering Builds
                  </h3>
                </div>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', color: 'var(--text-dim)' }}>
                  CLICK A PROJECT CARD TO EXPAND ARCHITECTURAL PROOF
                </div>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                {showcaseProjects.map((proj) => {
                  const isExpanded = expandedProject === proj.id;
                  return (
                    <div
                      key={proj.id}
                      onClick={() => setExpandedProject(isExpanded ? null : proj.id)}
                      style={{
                        background: isExpanded ? 'rgba(212, 175, 55, 0.08)' : '#101010',
                        border: isExpanded ? '1px solid var(--gold-bright)' : '1px solid rgba(255, 255, 255, 0.09)',
                        padding: '20px',
                        cursor: 'pointer',
                        transition: 'all 0.3s ease',
                      }}
                      className="interactive-panel"
                    >
                      <div
                        style={{
                          display: 'flex',
                          justifyContent: 'space-between',
                          alignItems: 'flex-start',
                          marginBottom: '8px',
                          flexWrap: 'wrap',
                          gap: '8px',
                        }}
                      >
                        <div>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', color: 'var(--gold-bright)' }}>
                              PROJECT 0{proj.id + 1}
                            </span>
                            <span style={{ fontSize: '0.7rem', color: 'var(--text-dim)' }}>·</span>
                            <span style={{ fontSize: '0.74rem', color: 'var(--text-muted)' }}>{proj.type}</span>
                          </div>
                          <h4 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.15rem', color: '#FFF', margin: '4px 0' }}>
                            {proj.title}
                          </h4>
                        </div>

                        <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                          {proj.tech.map((t, idx) => (
                            <span
                              key={idx}
                              style={{
                                background: '#181818',
                                border: '1px solid rgba(255, 255, 255, 0.1)',
                                color: 'var(--gold-bright)',
                                fontFamily: 'var(--font-mono)',
                                fontSize: '0.65rem',
                                padding: '2px 8px',
                              }}
                            >
                              {t}
                            </span>
                          ))}
                        </div>
                      </div>

                      <p style={{ fontSize: '0.86rem', color: 'var(--text-muted)', lineHeight: 1.5, margin: '6px 0 10px' }}>
                        {proj.summary}
                      </p>

                      {isExpanded && (
                        <div
                          style={{
                            marginTop: '16px',
                            paddingTop: '16px',
                            borderTop: '1px solid rgba(212, 175, 55, 0.2)',
                          }}
                        >
                          <div style={{ fontSize: '0.84rem', color: 'var(--text-ivory)', marginBottom: '14px', lineHeight: 1.5 }}>
                            <strong>Architectural Deep Dive:</strong> {proj.deepDive}
                          </div>

                          <div
                            style={{
                              display: 'grid',
                              gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))',
                              gap: '10px',
                            }}
                          >
                            {Object.entries(proj.metrics).map(([key, val], idx) => (
                              <div
                                key={idx}
                                style={{
                                  background: '#090909',
                                  border: '1px solid rgba(212, 175, 55, 0.2)',
                                  padding: '10px',
                                  textAlign: 'center',
                                }}
                              >
                                <span style={{ fontSize: '0.64rem', color: 'var(--text-dim)', textTransform: 'uppercase', display: 'block' }}>
                                  {key.replace(/([A-Z])/g, ' $1')}
                                </span>
                                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.82rem', color: 'var(--gold-bright)', fontWeight: 700 }}>
                                  {val}
                                </span>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* SCENE C: PROGRESS OVER TIME */}
          {activeEvidenceScene === 'progress' && (
            <div>
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginBottom: '24px',
                  borderBottom: '1px solid rgba(212, 175, 55, 0.2)',
                  paddingBottom: '14px',
                  flexWrap: 'wrap',
                  gap: '10px',
                }}
              >
                <div>
                  <span
                    style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: '0.65rem',
                      color: 'var(--gold-bright)',
                      letterSpacing: '0.2em',
                      display: 'block',
                    }}
                  >
                    LEARNING VELOCITY & GROWTH TRAJECTORY
                  </span>
                  <h3
                    style={{
                      fontFamily: 'var(--font-heading)',
                      fontSize: '1.3rem',
                      color: 'var(--text-ivory)',
                      margin: '4px 0 0',
                    }}
                  >
                    Continuous Skill Evolution Over 6 Months
                  </h3>
                </div>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.68rem', color: 'var(--gold-bright)' }}>
                  GROWTH TRAJECTORY: TOP 3% VELOCITY
                </span>
              </div>

              {/* Timeline Roadmap */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '20px' }}>
                {[
                  {
                    stage: 'PHASE 01 // FOUNDATION',
                    duration: 'Months 1–2',
                    highlight: 'Syntax & Algorithmic Rigor',
                    details: 'Mastered memory models, pointers, and data structures. Solved 140+ algorithmic challenges with strict complexity guarantees.',
                    badge: '98% Pass Rate',
                  },
                  {
                    stage: 'PHASE 02 // SYSTEMS',
                    duration: 'Months 3–4',
                    highlight: 'Concurrency & Network Protocols',
                    details: 'Built socket-based protocols and multi-threaded daemons. Successfully resolved deadlocks and memory corruption under heavy stress simulations.',
                    badge: 'Zero Crash Regression',
                  },
                  {
                    stage: 'PHASE 03 // PRODUCTION',
                    duration: 'Months 5–6',
                    highlight: 'Distributed Architecture & SRE',
                    details: 'Shipped production-grade Raft engine with Dockerized cluster setups, continuous benchmarking, and automated telemetry.',
                    badge: 'Production Ready',
                  },
                ].map((phase, idx) => (
                  <div
                    key={idx}
                    style={{
                      background: '#111',
                      border: '1px solid rgba(212, 175, 55, 0.25)',
                      padding: '20px',
                      position: 'relative',
                    }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                      <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', color: 'var(--gold-bright)' }}>
                        {phase.stage}
                      </span>
                      <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.62rem', color: 'var(--text-dim)' }}>
                        {phase.duration}
                      </span>
                    </div>

                    <h4 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.05rem', color: '#FFF', marginBottom: '8px' }}>
                      {phase.highlight}
                    </h4>

                    <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', lineHeight: 1.5, marginBottom: '14px' }}>
                      {phase.details}
                    </p>

                    <div
                      style={{
                        background: 'rgba(212, 175, 55, 0.08)',
                        border: '1px solid var(--gold-border)',
                        color: 'var(--gold-bright)',
                        fontFamily: 'var(--font-mono)',
                        fontSize: '0.68rem',
                        padding: '4px 10px',
                        display: 'inline-block',
                      }}
                    >
                      ✓ {phase.badge}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
