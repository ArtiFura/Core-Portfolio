import React, { useState, useRef, useEffect } from 'react';
import {
  Lock,
  Unlock,
  ShieldCheck,
  UserCheck,
  Building,
  Eye,
  EyeOff,
} from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useParallax } from '../../motion/useScrollReveal';
import { getAssetUrl } from '../../utils/asset';

gsap.registerPlugin(ScrollTrigger);

export const Chapter05Opportunity: React.FC = () => {
  const [isAuthorized, setIsAuthorized] = useState(true);
  const sectionRef = useRef<HTMLElement | null>(null);
  const headerRef = useRef<HTMLDivElement | null>(null);
  const frameRef = useRef<HTMLDivElement | null>(null);
  const privacySwitchRef = useRef<HTMLDivElement | null>(null);
  const studentPanelRef = useRef<HTMLDivElement | null>(null);
  const recruiterPanelRef = useRef<HTMLDivElement | null>(null);
  const connectorLineRef = useRef<HTMLDivElement | null>(null);
  const recruiterElementsRef = useRef<HTMLDivElement | null>(null);

  const parallaxImgRef = useParallax<HTMLImageElement>(0.12);

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

      // Section 05 Split-Perspective Choreography
      // Triggered when entering the privacy demo
      if (studentPanelRef.current && recruiterPanelRef.current) {
        const splitTl = gsap.timeline({
          scrollTrigger: {
            trigger: studentPanelRef.current,
            start: 'top 82%',
            once: true,
          },
        });

        // 1. Consent permission bar highlight
        splitTl.fromTo(
          privacySwitchRef.current,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' }
        )
          // 2. Student panel slides subtly from LEFT
          .fromTo(
            studentPanelRef.current,
            { opacity: 0, x: -65 },
            { opacity: 1, x: 0, duration: 0.85, ease: 'power3.out' },
            '-=0.3'
          )
          // 3. Recruiter panel reveals from RIGHT
          .fromTo(
            recruiterPanelRef.current,
            { opacity: 0, x: 65 },
            { opacity: 1, x: 0, duration: 0.85, ease: 'power3.out' },
            '-=0.7'
          )
          // 4. Central connector line draws between perspectives
          .fromTo(
            connectorLineRef.current,
            { scaleX: 0, opacity: 0, transformOrigin: 'center' },
            { scaleX: 1, opacity: 1, duration: 0.75, ease: 'expo.out' },
            '-=0.4'
          )
          // 5. Recruiter interface items reveal in deliberate sequence
          .fromTo(
            recruiterElementsRef.current?.children || [],
            { opacity: 0, y: 12 },
            { opacity: 1, y: 0, duration: 0.5, stagger: 0.1, ease: 'power2.out' },
            '-=0.2'
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
        padding: '100px 24px 90px',
        position: 'relative',
        background: 'linear-gradient(180deg, #080808 0%, #0d0d0d 50%, #080808 100%)',
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
            POTENTIAL DESERVES{' '}
            <span className="gold-gradient-text">TO BE SEEN.</span>
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
            ARTIFURA is designed to help connect demonstrated skills with relevant opportunities, with student-authorized sharing at the center of the experience.
          </p>
        </div>

        {/* Split Cinematic Artwork Frame with Center Laser Beam */}
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


          <div style={{ position: 'relative', width: '100%', aspectRatio: '16/9', overflow: 'hidden' }}>
            <img
              ref={parallaxImgRef}
              src={getAssetUrl('/assets/comic/chapter5.jpg')}
              alt="Split-panel scene showing student authorizing skill profile and recruiter viewing verified candidate evidence"
              style={{
                width: '100%',
                height: '110%',
                objectFit: 'cover',
                display: 'block',
                willChange: 'transform',
              }}
              loading="lazy"
            />

            {/* Glowing Golden Dividing Beam in the Center */}
            <div
              className="beam-pulse"
              style={{
                position: 'absolute',
                top: 0,
                bottom: 0,
                left: '50%',
                width: '3px',
                transform: 'translateX(-50%)',
                background: 'linear-gradient(180deg, rgba(245, 215, 110, 0.2) 0%, #F5D76E 50%, rgba(245, 215, 110, 0.2) 100%)',
                boxShadow: '0 0 16px rgba(245, 215, 110, 0.8), 0 0 32px rgba(212, 175, 55, 0.6)',
                pointerEvents: 'none',
              }}
            />

            <div
              style={{
                position: 'absolute',
                inset: 0,
                background: 'linear-gradient(180deg, transparent 65%, rgba(8, 8, 8, 0.85) 100%)',
                pointerEvents: 'none',
              }}
            />
          </div>
        </div>

        {/* Interactive Student-Controlled Privacy Demonstration */}
        <div
          className="comic-frame"
          style={{
            background: '#0e0e0e',
            border: '1px solid var(--gold-border)',
            padding: '28px',
            position: 'relative',
          }}
        >
          {/* Permission Switch Control with Highlight */}
          <div
            ref={privacySwitchRef}
            className="gold-pulse"
            style={{
              background: '#161616',
              border: '1px solid rgba(212, 175, 55, 0.35)',
              padding: '16px 20px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              flexWrap: 'wrap',
              gap: '16px',
              marginBottom: '28px',
              borderRadius: '2px',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
              <div
                style={{
                  width: '36px',
                  height: '36px',
                  background: isAuthorized ? 'rgba(74, 222, 128, 0.15)' : 'rgba(239, 68, 68, 0.15)',
                  border: `1px solid ${isAuthorized ? '#4ade80' : '#ef4444'}`,
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: isAuthorized ? '#4ade80' : '#ef4444',
                  transition: 'all 0.3s ease',
                }}
              >
                {isAuthorized ? <Unlock size={18} /> : <Lock size={18} />}
              </div>
              <div>
                <div
                  style={{
                    fontFamily: 'var(--font-heading)',
                    fontSize: '1.05rem',
                    fontWeight: 700,
                    color: '#FFF',
                  }}
                >
                  STUDENT PERMISSION GATEWAY (SIMULATOR)
                </div>
                <div
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.72rem',
                    color: 'var(--text-muted)',
                  }}
                >
                  Toggle to test how student consent controls what recruiters are permitted to view:
                </div>
              </div>
            </div>

            <button
              onClick={() => setIsAuthorized(!isAuthorized)}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                padding: '10px 18px',
                background: isAuthorized ? 'var(--gold-gradient)' : '#222',
                color: isAuthorized ? '#080808' : 'var(--text-muted)',
                border: isAuthorized ? 'none' : '1px solid #444',
                fontFamily: 'var(--font-mono)',
                fontSize: '0.78rem',
                fontWeight: 700,
                cursor: 'pointer',
                transition: 'all 0.25s cubic-bezier(0.16, 1, 0.3, 1)',
                boxShadow: isAuthorized ? '0 0 14px rgba(245, 215, 110, 0.5)' : 'none',
              }}
            >
              {isAuthorized ? <Eye size={14} /> : <EyeOff size={14} />}
              <span>SHARING: {isAuthorized ? 'AUTHORIZED [ON]' : 'RESTRICTED [OFF]'}</span>
            </button>
          </div>

          {/* Thin Gold Connector Bar Between Perspectives with Animated Traveling Photon */}
          <div
            ref={connectorLineRef}
            style={{
              position: 'relative',
              width: '100%',
              height: '2px',
              background: 'linear-gradient(90deg, transparent, var(--gold-bright) 20%, var(--gold-bright) 80%, transparent)',
              marginBottom: '24px',
              boxShadow: '0 0 10px rgba(245, 215, 110, 0.5)',
            }}
          >
            <div className="connector-photon" />
          </div>

          {/* Interactive Split View: Student Perspective (From Left) vs Recruiter Perspective (From Right) */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
              gap: '24px',
              position: 'relative',
            }}
          >
            {/* Left: Student's Privacy Command Center (Slides from LEFT) */}
            <div
              ref={studentPanelRef}
              className="interactive-panel"
              style={{
                background: '#121212',
                border: '1px solid rgba(212, 175, 55, 0.25)',
                padding: '24px',
                boxShadow: '0 12px 30px rgba(0,0,0,0.7)',
              }}
            >
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  marginBottom: '16px',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.74rem',
                  color: 'var(--gold-bright)',
                }}
              >
                <UserCheck size={16} />
                <span>STUDENT VIEW // PRIVACY SELECTION</span>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '0.82rem' }}>
                <div
                  style={{
                    padding: '12px 14px',
                    background: '#181818',
                    borderLeft: '3px solid #4ade80',
                    display: 'flex',
                    justifyContent: 'space-between',
                  }}
                >
                  <span>Verified Capstone Repositories</span>
                  <span style={{ color: '#4ade80', fontFamily: 'var(--font-mono)' }}>Publicly Shared</span>
                </div>

                <div
                  style={{
                    padding: '12px 14px',
                    background: '#181818',
                    borderLeft: '3px solid #4ade80',
                    display: 'flex',
                    justifyContent: 'space-between',
                  }}
                >
                  <span>Algorithmic Benchmark Score</span>
                  <span style={{ color: '#4ade80', fontFamily: 'var(--font-mono)' }}>Publicly Shared</span>
                </div>

                <div
                  style={{
                    padding: '12px 14px',
                    background: '#181818',
                    borderLeft: '3px solid #ef4444',
                    display: 'flex',
                    justifyContent: 'space-between',
                  }}
                >
                  <span>Draft Code & Debugging Retries</span>
                  <span style={{ color: '#ef4444', fontFamily: 'var(--font-mono)' }}>Private to Student</span>
                </div>

                <div
                  style={{
                    padding: '12px 14px',
                    background: '#181818',
                    borderLeft: '3px solid #ef4444',
                    display: 'flex',
                    justifyContent: 'space-between',
                  }}
                >
                  <span>AI Learning Queries & Notes</span>
                  <span style={{ color: '#ef4444', fontFamily: 'var(--font-mono)' }}>Private to Student</span>
                </div>
              </div>
            </div>

            {/* Right: Recruiter's Evidence-Based Screen (Reveals from RIGHT) */}
            <div
              ref={recruiterPanelRef}
              className="interactive-panel"
              style={{
                background: '#121212',
                border: isAuthorized
                  ? '1px solid rgba(212, 175, 55, 0.35)'
                  : '1px solid rgba(255, 255, 255, 0.1)',
                padding: '24px',
                boxShadow: isAuthorized
                  ? '0 12px 30px rgba(0,0,0,0.7), 0 0 20px rgba(212, 175, 55, 0.15)'
                  : '0 12px 30px rgba(0,0,0,0.7)',
                transition: 'all 0.35s ease',
              }}
            >
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  marginBottom: '16px',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.74rem',
                  color: isAuthorized ? 'var(--gold-bright)' : 'var(--text-muted)',
                }}
              >
                <Building size={16} />
                <span>RECRUITER AUDIT SCREEN // EVIDENCE LEDGER</span>
              </div>

              {isAuthorized ? (
                <div ref={recruiterElementsRef}>
                  <div
                    style={{
                      background: 'rgba(74, 222, 128, 0.1)',
                      border: '1px solid rgba(74, 222, 128, 0.3)',
                      color: '#4ade80',
                      padding: '8px 12px',
                      fontFamily: 'var(--font-mono)',
                      fontSize: '0.72rem',
                      marginBottom: '14px',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                    }}
                  >
                    <ShieldCheck size={14} />
                    <span>STUDENT-AUTHORIZED EVIDENCE ACTIVE</span>
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '0.82rem' }}>
                    <div style={{ background: '#181818', padding: '10px', color: 'var(--text-ivory)' }}>
                      <strong>Audit Item 01:</strong> Distributed Cache Implementation
                      <div style={{ fontSize: '0.72rem', color: 'var(--gold-bright)', marginTop: '2px' }}>
                        Consistent hashing with virtual nodes • 100% test coverage
                      </div>
                    </div>

                    <div style={{ background: '#181818', padding: '10px', color: 'var(--text-ivory)' }}>
                      <strong>Audit Item 02:</strong> Real-Time Telemetry Pipeline
                      <div style={{ fontSize: '0.72rem', color: 'var(--gold-bright)', marginTop: '2px' }}>
                        WebSocket ingest at 50,000 events/sec • Backpressure tested
                      </div>
                    </div>

                    <div style={{ background: '#181818', padding: '10px', color: 'var(--text-ivory)' }}>
                      <strong>Overall Verified Score:</strong> 94.8% Algorithmic Mastery
                      <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', marginTop: '2px' }}>
                        Evaluated across 47 standardized unit benchmark suites
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div
                  style={{
                    padding: '36px 20px',
                    textAlign: 'center',
                    background: '#151515',
                    border: '1px dashed rgba(255, 255, 255, 0.15)',
                  }}
                >
                  <Lock size={28} color="#ef4444" style={{ margin: '0 auto 10px' }} />
                  <div
                    style={{
                      fontFamily: 'var(--font-heading)',
                      fontSize: '0.96rem',
                      color: '#FFF',
                      marginBottom: '6px',
                    }}
                  >
                    CANDIDATE DOSSIER RESTRICTED
                  </div>
                  <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', margin: 0, lineHeight: 1.5 }}>
                    The student has not authorized public recruiter indexing. Student consent is required before competency metrics or code repositories can be inspected.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
