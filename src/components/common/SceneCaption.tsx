import React from 'react';

interface SceneCaptionProps {
  label?: string;
  quote?: string;
  copy: string;
  authorOrContext?: string;
  maxWidth?: string;
  style?: React.CSSProperties;
}

export const SceneCaption: React.FC<SceneCaptionProps> = ({
  label,
  quote,
  copy,
  authorOrContext,
  maxWidth = '600px',
  style,
}) => {
  return (
    <div
      className="comic-caption-box comic-corner-accents"
      style={{
        maxWidth,
        background: 'rgba(16, 16, 16, 0.85)',
        backdropFilter: 'blur(8px)',
        borderLeft: '3px solid var(--gold-bright)',
        borderTop: '1px solid var(--gold-border)',
        borderRight: '1px solid var(--gold-border)',
        borderBottom: '1px solid var(--gold-border)',
        padding: '16px 20px',
        position: 'relative',
        boxShadow: '0 10px 25px rgba(0, 0, 0, 0.6)',
        ...style,
      }}
    >
      {label && (
        <div
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '0.72rem',
            color: 'var(--gold-bright)',
            letterSpacing: '0.15em',
            textTransform: 'uppercase',
            marginBottom: '6px',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
          }}
        >
          <span
            style={{
              display: 'inline-block',
              width: '6px',
              height: '6px',
              background: 'var(--gold-primary)',
            }}
          />
          {label}
        </div>
      )}

      {quote && (
        <p
          style={{
            fontFamily: 'var(--font-heading)',
            fontSize: '1.05rem',
            fontWeight: 700,
            color: '#FFF',
            marginBottom: '6px',
            lineHeight: 1.35,
          }}
        >
          “{quote}”
        </p>
      )}

      <p
        style={{
          fontFamily: 'var(--font-body)',
          fontSize: '0.92rem',
          color: 'var(--text-muted)',
          lineHeight: 1.6,
        }}
      >
        {copy}
      </p>

      {authorOrContext && (
        <div
          style={{
            marginTop: '8px',
            fontFamily: 'var(--font-mono)',
            fontSize: '0.75rem',
            color: 'var(--gold-antique)',
            letterSpacing: '0.05em',
          }}
        >
          — {authorOrContext}
        </div>
      )}
    </div>
  );
};
