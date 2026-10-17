import React, { useState, useRef, useEffect } from 'react';
import {
  Code2,
  Sparkles,
} from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const Chapter03Solution: React.FC = () => {
  const [selectedCandidate, setSelectedCandidate] = useState(0);
  const [activeFilter, setActiveFilter] = useState<'all' | 'systems' | 'web' | 'cloud'>('all');
  const sectionRef = useRef<HTMLElement | null>(null);
  const headerRef = useRef<HTMLDivElement | null>(null);
  const interfaceContainerRef = useRef<HTMLDivElement | null>(null);
  const leftCardsRef = useRef<HTMLDivElement | null>(null);
  const rightPreviewRef = useRef<HTMLDivElement | null>(null);

  const candidates = [
    {
      id: 0,
      name: 'Aarav Sharma',
      role: 'Systems & Distributed Engineering',
      institution: 'Regional Engineering Institute · Class of 2025',
      domain: 'systems',
      avatarLabel: 'AS',
      score: '96% RIGOR',
      headlineProof: 'Built Distributed Raft Consensus Engine from Scratch in Rust & Go',
      verifiedSkills: [
        { name: 'Raft Consensus', level: 'Level 4 / Production' },
        { name: 'Concurrent Go & Rust', level: 'Level 4 / Expert' },
        { name: 'Linux Network Sockets', level: 'Level 3 / Proficient' },
      ],
      project: {
        title: 'Chronos-DB // Distributed In-Memory Storage',
        repo: 'github.com/artifura-eval/chronos-db-verified',
        tech: ['Go', 'Raft Algorithm', 'gRPC', 'Prometheus', 'Docker'],
        description: 'Multi-node key-value store with leader election, WAL replication, and automatic crash recovery under simulated split-brain conditions.',
        metrics: [
          { label: 'Throughput', value: '14,200 ops/s' },
          { label: 'P99 Latency', value: '3.1 ms' },
          { label: 'Test Coverage', value: '98.4%' },
          { label: 'Jepsen Tests', value: '12 / 12 Pass' },
        ],
        codeSnippet: `// Raft state machine transaction commit
func (n *RaftNode) CommitLogEntry(entry *LogEntry) error {
    n.mu.Lock()
    defer n.mu.Unlock()
    if n.state != Leader {
        return ErrNotLeader
    }
    // Replicate across quorum before acknowledging
    return n.replicateToQuorum(entry)
}`,
      },
    },
    {
      id: 1,
      name: 'Elena Rostova',
      role: 'Frontend Systems & Real-Time Architecture',
      institution: 'State Technical University · Class of 2025',
      domain: 'web',
      avatarLabel: 'ER',
      score: '94% RIGOR',
      headlineProof: 'High-Performance 60FPS Canvas Node Graph Engine with Zero Dependencies',
      verifiedSkills: [
        { name: 'WebGL & Canvas 2D', level: 'Level 4 / Expert' },
        { name: 'CRDT Collaborative Sync', level: 'Level 3 / Proficient' },
        { name: 'TypeScript Architecture', level: 'Level 4 / Expert' },
      ],
      project: {
        title: 'Nexus Canvas // Real-Time Graph Visualizer',
        repo: 'github.com/artifura-eval/nexus-canvas-crdt',
        tech: ['TypeScript', 'WebGL', 'WebSockets', 'CRDT', 'Vite'],
        description: 'Collaborative architectural canvas rendering 50,000 interactive nodes at 60 FPS with spatial indexing and multi-cursor conflict resolution.',
        metrics: [
          { label: 'Framerate', value: '60 FPS Solid' },
          { label: 'Render Nodes', value: '50,000+' },
          { label: 'Sync Delay', value: '< 22 ms' },
          { label: 'Bundle Size', value: '18 KB gzipped' },
        ],
        codeSnippet: `// Spatial indexing for 50k nodes with QuadTree
export class SpatialIndex {
  insert(node: GraphNode): void {
    if (!this.boundary.contains(node.point)) return;
    if (this.nodes.length < CAPACITY) {
      this.nodes.push(node);
    } else {
      if (!this.divided) this.subdivide();
      this.northWest.insert(node);
    }
  }
}`,
      },
    },
    {
      id: 2,
      name: 'Devon Vance',
      role: 'Cloud Native & SRE Infrastructure',
      institution: 'Polytechnic Engineering College · Class of 2024',
      domain: 'cloud',
      avatarLabel: 'DV',
      score: '95% RIGOR',
      headlineProof: 'Automated Chaos Engineering Mesh with Zero-Trust Service Discovery',
      verifiedSkills: [
        { name: 'Kubernetes Operators', level: 'Level 4 / Expert' },
        { name: 'Terraform & IaC', level: 'Level 4 / Production' },
        { name: 'Chaos Engineering', level: 'Level 3 / Proficient' },
      ],
      project: {
        title: 'Vanguard // Chaos Mesh & Failure Injector',
        repo: 'github.com/artifura-eval/vanguard-chaos-operator',
        tech: ['Go', 'Kubernetes CRD', 'eBPF', 'Terraform', 'Grafana'],
        description: 'Autonomous Kubernetes operator that periodically injects packet loss, CPU throttling, and DNS partition events to verify cluster resiliency.',
        metrics: [
          { label: 'MTTR Reduc.', value: '-72%' },
          { label: 'Simulations', value: '1,400+ runs' },
          { label: 'Cluster Scale', value: '64 nodes' },
          { label: 'Observability', value: '100% eBPF trace' },
        ],
        codeSnippet: `// Injects packet loss directly via eBPF kernel hook
func (o *ChaosOperator) InjectNetworkDrop(pod *v1.Pod, dropPct int) error {
    filter := ebpf.NewDropFilter(pod.IP, dropPct)
    return o.attachTCFilter(pod.InterfaceName, filter)
}`,
      },
    },
  ];

  const filteredCandidates = activeFilter === 'all'
    ? candidates
    : candidates.filter((c) => c.domain === activeFilter);

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

      // 2. Coordinated Platform Assembly
      if (interfaceContainerRef.current) {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: interfaceContainerRef.current,
            start: 'top 80%',
            once: true,
          },
        });

        tl.fromTo(
          interfaceContainerRef.current,
          { opacity: 0, y: 40, scale: 0.98 },
          { opacity: 1, y: 0, scale: 1, duration: 0.9, ease: 'power3.out' }
        )
          .fromTo(
            leftCardsRef.current?.children || [],
            { opacity: 0, x: -20 },
            { opacity: 1, x: 0, stagger: 0.1, duration: 0.6, ease: 'power2.out' },
            '-=0.4'
          )
          .fromTo(
            rightPreviewRef.current,
            { opacity: 0, x: 20 },
            { opacity: 1, x: 0, duration: 0.7, ease: 'power2.out' },
            '-=0.4'
          );
      }
    }, el);

    return () => ctx.revert();
  }, []);

  const activeCandidate = candidates[selectedCandidate] || candidates[0];

  return (
    <section
      ref={sectionRef}
      id="chapter-03"
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
        {/* Section Header */}
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
            LOOK BEYOND WHAT <span className="gold-gradient-text">CANDIDATES SAY.</span>
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
            Meet ARTIFURA — where engineering leads replace speculative resume claims with continuous test runners and undeniable executed proof.
          </p>
        </div>

        {/* Graphic Novel Cinematic Artwork: The Solution */}
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
              src="/assets/comic/company_ch3_solution.jpg"
              alt="Tech lead and hiring manager reviewing holographic candidate telemetry with 48/48 passed test suites"
              style={{
                width: '100%',
                height: '106%',
                objectFit: 'cover',
                display: 'block',
                transition: 'transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
              }}
              loading="lazy"
            />

            {/* In-Scene Interactive Floating Recruiter Signal */}
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
                BENCHMARK: 48/48 PASSED [VERIFIED]
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
              CHRONICLE 03 // THE VERIFIED SOLUTION
            </div>
          </div>
        </div>

        {/* ARTIFURA Candidate Discovery Studio Interface */}
        <div
          ref={interfaceContainerRef}
          className="comic-frame comic-corner-accents"
          style={{
            maxWidth: '1100px',
            margin: '0 auto',
            background: '#0d0d0d',
            border: '1px solid var(--gold-border-bright)',
            boxShadow: '0 25px 70px rgba(0, 0, 0, 0.95), 0 0 40px rgba(212, 175, 55, 0.15)',
            position: 'relative',
          }}
        >
          {/* Studio Top OS Bar */}
          <div
            style={{
              padding: '12px 20px',
              background: '#121212',
              borderBottom: '1px solid var(--gold-border)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              flexWrap: 'wrap',
              gap: '12px',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <div
                style={{
                  width: '10px',
                  height: '10px',
                  background: 'var(--gold-bright)',
                  borderRadius: '50%',
                  boxShadow: '0 0 10px var(--gold-bright)',
                }}
              />
              <span
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.74rem',
                  color: 'var(--gold-bright)',
                  fontWeight: 700,
                  letterSpacing: '0.15em',
                }}
              >
                ARTIFURA CANDIDATE DISCOVERY
              </span>
            </div>

            {/* Interactive Domain Filter Pills */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', color: 'var(--text-dim)', marginRight: '4px' }}>
                FILTER EVIDENCE:
              </span>
              {(['all', 'systems', 'web', 'cloud'] as const).map((domain) => (
                <button
                  key={domain}
                  onClick={() => setActiveFilter(domain)}
                  style={{
                    background: activeFilter === domain ? 'var(--gold-gradient)' : 'rgba(25, 25, 25, 0.9)',
                    color: activeFilter === domain ? '#080808' : 'var(--text-muted)',
                    border: '1px solid var(--gold-border)',
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.66rem',
                    fontWeight: activeFilter === domain ? 700 : 500,
                    padding: '4px 10px',
                    cursor: 'pointer',
                    textTransform: 'uppercase',
                  }}
                >
                  {domain}
                </button>
              ))}
            </div>
          </div>

          {/* Main 2-Column Split: Candidate List & Verifiable Evidence Inspection */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'minmax(280px, 340px) 1fr',
              minHeight: '520px',
            }}
            className="solution-grid-responsive"
          >
            {/* Left Column: Discovered Candidates List */}
            <div
              ref={leftCardsRef}
              style={{
                borderRight: '1px solid rgba(212, 175, 55, 0.2)',
                background: '#090909',
                padding: '16px',
                display: 'flex',
                flexDirection: 'column',
                gap: '12px',
              }}
            >
              <div
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.65rem',
                  color: 'var(--gold-antique)',
                  letterSpacing: '0.18em',
                  marginBottom: '4px',
                }}
              >
                VERIFIED PROFILES ({filteredCandidates.length})
              </div>

              {filteredCandidates.map((cand) => {
                const isSelected = selectedCandidate === cand.id;
                return (
                  <div
                    key={cand.id}
                    onClick={() => setSelectedCandidate(cand.id)}
                    style={{
                      background: isSelected ? 'rgba(212, 175, 55, 0.1)' : 'rgba(18, 18, 18, 0.7)',
                      border: isSelected
                        ? '1px solid var(--gold-bright)'
                        : '1px solid rgba(255, 255, 255, 0.08)',
                      padding: '14px',
                      cursor: 'pointer',
                      transition: 'all 0.25s ease',
                      clipPath: 'polygon(0 0, calc(100% - 8px) 0, 100% 8px, 100% 100%, 8px 100%, 0 calc(100% - 8px))',
                    }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '6px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <div
                          style={{
                            width: '28px',
                            height: '28px',
                            background: isSelected ? 'var(--gold-bright)' : '#222',
                            color: isSelected ? '#080808' : 'var(--gold-bright)',
                            fontFamily: 'var(--font-mono)',
                            fontWeight: 700,
                            fontSize: '0.7rem',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                          }}
                        >
                          {cand.avatarLabel}
                        </div>
                        <div>
                          <h4
                            style={{
                              fontFamily: 'var(--font-heading)',
                              fontSize: '0.95rem',
                              color: 'var(--text-ivory)',
                              margin: 0,
                            }}
                          >
                            {cand.name}
                          </h4>
                          <span style={{ fontSize: '0.72rem', color: 'var(--text-dim)', display: 'block' }}>
                            {cand.role}
                          </span>
                        </div>
                      </div>

                      <span
                        style={{
                          fontFamily: 'var(--font-mono)',
                          fontSize: '0.62rem',
                          color: 'var(--gold-bright)',
                          background: 'rgba(212, 175, 55, 0.15)',
                          padding: '2px 6px',
                          border: '1px solid var(--gold-border)',
                        }}
                      >
                        {cand.score}
                      </span>
                    </div>

                    <div
                      style={{
                        fontFamily: 'var(--font-mono)',
                        fontSize: '0.7rem',
                        color: isSelected ? 'var(--gold-bright)' : 'var(--text-muted)',
                        marginTop: '8px',
                        lineHeight: 1.35,
                      }}
                    >
                      ↳ {cand.headlineProof}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Right Column: Verifiable Project & Skill Evidence Workbench */}
            <div
              ref={rightPreviewRef}
              style={{
                background: '#0e0e0e',
                padding: '24px',
                display: 'flex',
                flexDirection: 'column',
                gap: '20px',
              }}
            >
              {/* Candidate Bio Header */}
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'flex-start',
                  borderBottom: '1px solid rgba(212, 175, 55, 0.2)',
                  paddingBottom: '16px',
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
                      marginBottom: '2px',
                    }}
                  >
                    ARTIFURA VERIFIED PROFILE DOSSIER
                  </div>
                  <h3
                    style={{
                      fontFamily: 'var(--font-heading)',
                      fontSize: '1.4rem',
                      color: 'var(--text-ivory)',
                      margin: '0 0 4px',
                    }}
                  >
                    {activeCandidate.name}
                  </h3>
                  <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                    {activeCandidate.institution} · {activeCandidate.role}
                  </span>
                </div>

                <div
                  style={{
                    background: 'rgba(212, 175, 55, 0.08)',
                    border: '1px solid var(--gold-border)',
                    padding: '8px 14px',
                    textAlign: 'right',
                  }}
                >
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', color: 'var(--text-dim)', display: 'block' }}>
                    BENCHMARK STATUS
                  </span>
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.85rem', color: 'var(--gold-bright)', fontWeight: 700 }}>
                    VERIFIED ARTIFACTS
                  </span>
                </div>
              </div>

              {/* Verified Skill Matrix */}
              <div>
                <span
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.68rem',
                    color: 'var(--gold-antique)',
                    letterSpacing: '0.15em',
                    display: 'block',
                    marginBottom: '8px',
                  }}
                >
                  ASSESSED SKILL DEPTH (OBSERVED IN CODE REPOSITORIES):
                </span>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '10px' }}>
                  {activeCandidate.verifiedSkills.map((sk, idx) => (
                    <div
                      key={idx}
                      style={{
                        background: '#141414',
                        border: '1px solid rgba(212, 175, 55, 0.25)',
                        padding: '8px 12px',
                      }}
                    >
                      <div style={{ fontSize: '0.78rem', color: 'var(--text-ivory)', fontWeight: 600 }}>
                        {sk.name}
                      </div>
                      <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.68rem', color: 'var(--gold-bright)' }}>
                        {sk.level}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Featured Verifiable Project Sandbox */}
              <div
                style={{
                  background: '#121212',
                  border: '1px solid var(--gold-border-bright)',
                  padding: '18px',
                  borderRadius: '2px',
                }}
              >
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginBottom: '10px',
                    flexWrap: 'wrap',
                    gap: '8px',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <Code2 size={16} color="var(--gold-bright)" />
                    <span style={{ fontFamily: 'var(--font-heading)', fontSize: '1.05rem', color: '#FFF' }}>
                      {activeCandidate.project.title}
                    </span>
                  </div>
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.68rem', color: 'var(--gold-antique)' }}>
                    {activeCandidate.project.repo}
                  </span>
                </div>

                <p style={{ fontSize: '0.84rem', color: 'var(--text-muted)', lineHeight: 1.5, marginBottom: '14px' }}>
                  {activeCandidate.project.description}
                </p>

                {/* Performance Metrics Bar */}
                <div
                  style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(110px, 1fr))',
                    gap: '8px',
                    marginBottom: '14px',
                  }}
                >
                  {activeCandidate.project.metrics.map((m, idx) => (
                    <div
                      key={idx}
                      style={{
                        background: '#080808',
                        border: '1px solid rgba(255, 255, 255, 0.08)',
                        padding: '8px',
                        textAlign: 'center',
                      }}
                    >
                      <span style={{ fontSize: '0.64rem', color: 'var(--text-dim)', display: 'block' }}>
                        {m.label}
                      </span>
                      <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.82rem', color: 'var(--gold-bright)', fontWeight: 700 }}>
                        {m.value}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Code Snapshot Box */}
                <div
                  style={{
                    background: '#080808',
                    border: '1px solid #222',
                    padding: '12px',
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.72rem',
                    color: '#abb2bf',
                    overflowX: 'auto',
                    whiteSpace: 'pre',
                  }}
                >
                  {activeCandidate.project.codeSnippet}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Takeaway */}
        <div
          style={{
            maxWidth: '900px',
            margin: '36px auto 0',
            textAlign: 'center',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '10px',
              background: 'rgba(212, 175, 55, 0.08)',
              border: '1px solid var(--gold-border)',
              padding: '8px 18px',
            }}
          >
            <Sparkles size={14} color="var(--gold-bright)" />
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.76rem', color: 'var(--gold-bright)' }}>
              LESS GUESSWORK. VERIFIABLE EVIDENCE DIRECT FROM WORKING CODE.
            </span>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 820px) {
          .solution-grid-responsive {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
};
