import React, { useState } from 'react';
import { ArrowDown } from 'lucide-react';
import { ArtifuraIntro, hasIntroPlayed, markIntroAsPlayed } from '../ArtifuraIntro';

interface Chapter00CoverProps {
  onExploreStory: () => void;
  onOpenProjectModal?: () => void;
}

export const Chapter00Cover: React.FC<Chapter00CoverProps> = ({
  onExploreStory,
}) => {
  const [hasInteracted, setHasInteracted] = useState(false);
  const [isIntroComplete, setIsIntroComplete] = useState<boolean>(() => hasIntroPlayed());

  const handleProceed = () => {
    if (hasInteracted) return;
    setHasInteracted(true);
    markIntroAsPlayed();
    setIsIntroComplete(true);
    onExploreStory();
  };

  const handleIntroComplete = () => {
    setIsIntroComplete(true);
    markIntroAsPlayed();
  };

  return (
    <section
      id="chapter-00"
      style={{
        position: 'relative',
        width: '100%',
        height: '100vh',
        minHeight: '640px',
        overflow: 'hidden',
        userSelect: 'none',
        zIndex: 30,
        padding: 0,
        margin: 0,
        background: '#080808',
      }}
    >
      {/* Ambient background breathing glow */}
      <div
        className="ambient-breathing-glow"
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 'clamp(320px, 60vw, 780px)',
          height: 'clamp(240px, 45vh, 440px)',
          background: 'rgba(255, 224, 141, 0.1)',
          borderRadius: '9999px',
          filter: 'blur(100px)',
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
      {/* Top-Left: ARTIFURA // TECHNOLOGY COMPANY */}
      <div
        className="hud-corner-tl"
        style={{
          position: 'absolute',
          top: '32px',
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
            TECHNOLOGY COMPANY
          </span>
        </div>
      </div>

      {/* Top-Right: EST. 2026 */}
      <div
        className="hud-corner-tr"
        style={{
          position: 'absolute',
          top: '32px',
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
        <span>EST. 2026</span>
      </div>

      {/* Bottom-Left: IDEAS / TECHNOLOGY / CREATION / FUTURE */}
      <div
        className="hud-corner-bl"
        style={{
          position: 'absolute',
          bottom: '36px',
          left: '32px',
          zIndex: 20,
          display: 'flex',
          alignItems: 'flex-start',
          gap: '10px',
          fontFamily: 'var(--font-mono, monospace)',
          fontSize: '9.5px',
          color: '#887e6d',
          letterSpacing: '0.16em',
          lineHeight: 1.5,
          pointerEvents: 'none',
          userSelect: 'none',
        }}
      >
        <span
          style={{
            width: '18px',
            height: '1.5px',
            background: '#a38c53',
            marginTop: '5px',
            flexShrink: 0,
          }}
        />
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <span>IDEAS</span>
          <span>TECHNOLOGY</span>
          <span>CREATION</span>
          <span>FUTURE</span>
        </div>
      </div>

      {/* Bottom-Right: Reticle viewfinder HUD */}
      <div
        className="hud-corner-br"
        style={{
          position: 'absolute',
          bottom: '36px',
          right: '32px',
          zIndex: 20,
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
          fontFamily: 'var(--font-mono, monospace)',
          pointerEvents: 'none',
          userSelect: 'none',
        }}
      >
        <span
          style={{
            width: '45px',
            height: '1px',
            background: 'rgba(163, 140, 83, 0.6)',
            flexShrink: 0,
          }}
        />
        <div
          style={{
            position: 'relative',
            width: '20px',
            height: '20px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            border: '1px solid rgba(163, 140, 83, 0.7)',
            borderRadius: '2px',
          }}
        >
          <div
            style={{
              width: '4px',
              height: '4px',
              background: '#ffe08d',
              borderRadius: '50%',
            }}
          />
        </div>
      </div>

      {/* Atmospheric Faint Crosshair Reticles (+) */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          pointerEvents: 'none',
          userSelect: 'none',
          zIndex: 10,
          overflow: 'hidden',
          opacity: 0.35,
        }}
      >
        <span
          style={{
            position: 'absolute',
            top: '26%',
            left: '18%',
            fontFamily: 'var(--font-mono, monospace)',
            fontSize: '12px',
            color: 'rgba(255, 224, 141, 0.35)',
          }}
        >
          +
        </span>
        <span
          style={{
            position: 'absolute',
            top: '24%',
            right: '22%',
            fontFamily: 'var(--font-mono, monospace)',
            fontSize: '12px',
            color: 'rgba(255, 224, 141, 0.35)',
          }}
        >
          +
        </span>
        <span
          style={{
            position: 'absolute',
            bottom: '30%',
            left: '22%',
            fontFamily: 'var(--font-mono, monospace)',
            fontSize: '12px',
            color: 'rgba(255, 224, 141, 0.35)',
          }}
        >
          +
        </span>
        <span
          style={{
            position: 'absolute',
            bottom: '32%',
            right: '26%',
            fontFamily: 'var(--font-mono, monospace)',
            fontSize: '12px',
            color: 'rgba(255, 224, 141, 0.35)',
          }}
        >
          +
        </span>
      </div>

      {/* Centerpiece: Physical Typographic Intro occupying the FULL viewport */}
      <div style={{ position: 'absolute', inset: 0, zIndex: 20, width: '100%', height: '100%' }}>
        <ArtifuraIntro
          onIntroComplete={handleIntroComplete}
          className="w-full h-full"
        />
      </div>

      {/* Bottom Explore Trigger */}
      <div
        style={{
          position: 'absolute',
          bottom: '32px',
          left: '50%',
          transform: 'translateX(-50%)',
          zIndex: 30,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '10px',
          transition: 'all 0.7s cubic-bezier(0.16, 1, 0.3, 1)',
          opacity: isIntroComplete ? 1 : 0,
          pointerEvents: isIntroComplete ? 'auto' : 'none',
        }}
      >
        <button
          onClick={handleProceed}
          className="btn-interactive"
          style={{
            padding: '10px 24px',
            borderRadius: '9999px',
            background: 'rgba(24, 24, 25, 0.92)',
            backdropFilter: 'blur(8px)',
            border: '1px solid rgba(77, 70, 55, 0.45)',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            fontSize: '11px',
            fontFamily: 'var(--font-mono, monospace)',
            letterSpacing: '0.14em',
            color: '#ffe08d',
            cursor: 'pointer',
            boxShadow: '0 6px 20px rgba(0, 0, 0, 0.6)',
            transition: 'all 0.3s ease',
          }}
          aria-label="Explore Story"
        >
          <span>EXPLORE</span>
          <ArrowDown size={13} />
        </button>
      </div>

      <style>{`
        @media (max-width: 640px) {
          .hud-corner-tl, .hud-corner-tr, .hud-corner-bl, .hud-corner-br {
            display: none !important;
          }
        }
      `}</style>
    </section>
  );
};
