import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface GoldDividerProps {
  label?: string;
  variant?: 'simple' | 'ornate' | 'comic-gutter';
}

export const GoldDivider: React.FC<GoldDividerProps> = ({
  label,
  variant = 'ornate',
}) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const leftLineRef = useRef<HTMLDivElement | null>(null);
  const rightLineRef = useRef<HTMLDivElement | null>(null);
  const centerNodeRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: el,
          start: 'top 92%',
          once: true,
        },
      });

      if (centerNodeRef.current) {
        tl.fromTo(
          centerNodeRef.current,
          { scale: 0.5, opacity: 0 },
          { scale: 1, opacity: 1, duration: 0.5, ease: 'back.out(1.7)' }
        );
      }

      if (leftLineRef.current && rightLineRef.current) {
        tl.fromTo(
          leftLineRef.current,
          { scaleX: 0, transformOrigin: 'right center' },
          { scaleX: 1, duration: 0.75, ease: 'power3.out' },
          '-=0.25'
        );
        tl.fromTo(
          rightLineRef.current,
          { scaleX: 0, transformOrigin: 'left center' },
          { scaleX: 1, duration: 0.75, ease: 'power3.out' },
          '<'
        );
      }
    }, el);

    return () => ctx.revert();
  }, []);

  if (variant === 'comic-gutter') {
    return (
      <div
        ref={containerRef}
        style={{
          width: '100%',
          height: '24px',
          background: '#080808',
          borderTop: '1px solid rgba(212, 175, 55, 0.2)',
          borderBottom: '1px solid rgba(212, 175, 55, 0.2)',
          position: 'relative',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          margin: '2rem 0',
        }}
        aria-hidden="true"
      >
        <div
          style={{
            position: 'absolute',
            width: '60px',
            height: '2px',
            background: 'var(--gold-primary)',
          }}
        />
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '20px',
        width: '100%',
        maxWidth: '1200px',
        margin: '4rem auto',
        padding: '0 24px',
        position: 'relative',
      }}
    >
      <div
        ref={leftLineRef}
        style={{
          flex: 1,
          height: '1px',
          background:
            'linear-gradient(90deg, transparent, rgba(212, 175, 55, 0.4), rgba(245, 215, 110, 0.8))',
        }}
      />

      <div
        ref={centerNodeRef}
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
        }}
      >
        <div
          style={{
            width: '6px',
            height: '6px',
            background: 'var(--gold-bright)',
            transform: 'rotate(45deg)',
            boxShadow: '0 0 10px rgba(245, 215, 110, 0.8)',
          }}
        />
        {label ? (
          <span
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.72rem',
              color: 'var(--gold-bright)',
              letterSpacing: '0.25em',
              textTransform: 'uppercase',
              padding: '0 8px',
            }}
          >
            {label}
          </span>
        ) : (
          <div
            style={{
              width: '12px',
              height: '12px',
              border: '1px solid var(--gold-primary)',
              transform: 'rotate(45deg)',
              background: '#080808',
            }}
          />
        )}
        <div
          style={{
            width: '6px',
            height: '6px',
            background: 'var(--gold-bright)',
            transform: 'rotate(45deg)',
            boxShadow: '0 0 10px rgba(245, 215, 110, 0.8)',
          }}
        />
      </div>

      <div
        ref={rightLineRef}
        style={{
          flex: 1,
          height: '1px',
          background:
            'linear-gradient(90deg, rgba(245, 215, 110, 0.8), rgba(212, 175, 55, 0.4), transparent)',
        }}
      />
    </div>
  );
};
