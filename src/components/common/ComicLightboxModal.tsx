import React, { useState, useEffect, useRef } from 'react';
import { X, ZoomIn, ZoomOut, RotateCcw, MessageSquare, Maximize2 } from 'lucide-react';
import { useComicLightbox } from './ComicLightboxContext';

export const ComicLightboxModal: React.FC = () => {
  const { isOpen, activeImage, closeLightbox } = useComicLightbox();
  const [scale, setScale] = useState(1);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [showDialogue, setShowDialogue] = useState(true);

  // Touch tracking for pinch-to-zoom
  const touchStartDistRef = useRef<number | null>(null);
  const initialTouchScaleRef = useRef<number>(1);
  const lastTapRef = useRef<number>(0);

  // Reset transforms whenever a new image opens
  useEffect(() => {
    if (isOpen) {
      setScale(1);
      setPosition({ x: 0, y: 0 });
      setShowDialogue(true);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  // Keyboard shortcut: Escape to close, +/- to zoom
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        closeLightbox();
      } else if (e.key === '+' || e.key === '=') {
        setScale((prev) => Math.min(prev + 0.35, 4));
      } else if (e.key === '-' || e.key === '_') {
        setScale((prev) => {
          const next = Math.max(prev - 0.35, 1);
          if (next === 1) setPosition({ x: 0, y: 0 });
          return next;
        });
      } else if (e.key === '0') {
        setScale(1);
        setPosition({ x: 0, y: 0 });
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, closeLightbox]);

  if (!isOpen || !activeImage) return null;

  const handleZoomIn = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    setScale((prev) => Math.min(prev + 0.4, 3.8));
  };

  const handleZoomOut = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    setScale((prev) => {
      const next = Math.max(prev - 0.4, 1);
      if (next === 1) setPosition({ x: 0, y: 0 });
      return next;
    });
  };

  const handleResetZoom = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    setScale(1);
    setPosition({ x: 0, y: 0 });
  };

  // Double tap to toggle zoom on mobile
  const handleDoubleTap = (e: React.TouchEvent) => {
    const now = Date.now();
    if (now - lastTapRef.current < 300) {
      // Double tap triggered
      if (scale > 1.2) {
        handleResetZoom();
      } else {
        setScale(2.2);
        // Center around tap location
        if (e.touches.length > 0) {
          const touch = e.touches[0];
          const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
          const offsetX = (touch.clientX - rect.left - rect.width / 2) * -0.8;
          const offsetY = (touch.clientY - rect.top - rect.height / 2) * -0.8;
          setPosition({ x: offsetX, y: offsetY });
        }
      }
    }
    lastTapRef.current = now;
  };

  // Mouse drag handlers
  const handleMouseDown = (e: React.MouseEvent) => {
    if (scale <= 1) return;
    setIsDragging(true);
    setDragStart({ x: e.clientX - position.x, y: e.clientY - position.y });
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || scale <= 1) return;
    setPosition({
      x: e.clientX - dragStart.x,
      y: e.clientY - dragStart.y,
    });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  // Touch handlers for mobile pinch & pan
  const handleTouchStart = (e: React.TouchEvent) => {
    handleDoubleTap(e);
    if (e.touches.length === 2) {
      const dx = e.touches[0].clientX - e.touches[1].clientX;
      const dy = e.touches[0].clientY - e.touches[1].clientY;
      touchStartDistRef.current = Math.hypot(dx, dy);
      initialTouchScaleRef.current = scale;
    } else if (e.touches.length === 1 && scale > 1) {
      setIsDragging(true);
      setDragStart({
        x: e.touches[0].clientX - position.x,
        y: e.touches[0].clientY - position.y,
      });
    }
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (e.touches.length === 2 && touchStartDistRef.current !== null) {
      const dx = e.touches[0].clientX - e.touches[1].clientX;
      const dy = e.touches[0].clientY - e.touches[1].clientY;
      const dist = Math.hypot(dx, dy);
      const ratio = dist / touchStartDistRef.current;
      const newScale = Math.min(Math.max(initialTouchScaleRef.current * ratio, 1), 4);
      setScale(newScale);
      if (newScale === 1) setPosition({ x: 0, y: 0 });
    } else if (e.touches.length === 1 && isDragging && scale > 1) {
      setPosition({
        x: e.touches[0].clientX - dragStart.x,
        y: e.touches[0].clientY - dragStart.y,
      });
    }
  };

  const handleTouchEnd = () => {
    touchStartDistRef.current = null;
    setIsDragging(false);
  };

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 9999,
        background: 'rgba(5, 5, 5, 0.95)',
        backdropFilter: 'blur(16px)',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        userSelect: 'none',
        touchAction: scale > 1 ? 'none' : 'pan-y',
      }}
      onClick={closeLightbox}
    >
      {/* Top Header Bar */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '14px 20px',
          background: 'linear-gradient(180deg, rgba(10, 10, 10, 0.92) 0%, transparent 100%)',
          zIndex: 10,
          pointerEvents: 'auto',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
          {activeImage.chapterTag && (
            <span
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.68rem',
                color: 'var(--gold-bright)',
                letterSpacing: '0.14em',
                fontWeight: 700,
              }}
            >
              {activeImage.chapterTag}
            </span>
          )}
          <span
            style={{
              fontFamily: 'var(--font-heading)',
              fontSize: '1rem',
              color: 'var(--text-ivory)',
              fontWeight: 600,
            }}
          >
            {activeImage.title || 'Manga Artwork Inspector'}
          </span>
        </div>

        {/* Action Controls: Zoom in, Zoom out, Reset, Close */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <button
            onClick={handleZoomIn}
            title="Zoom In (+)"
            style={{
              width: '36px',
              height: '36px',
              borderRadius: '4px',
              background: 'rgba(20, 20, 20, 0.85)',
              border: '1px solid rgba(212, 175, 55, 0.4)',
              color: 'var(--gold-bright)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
            }}
          >
            <ZoomIn size={17} />
          </button>

          <button
            onClick={handleZoomOut}
            title="Zoom Out (-)"
            style={{
              width: '36px',
              height: '36px',
              borderRadius: '4px',
              background: 'rgba(20, 20, 20, 0.85)',
              border: '1px solid rgba(212, 175, 55, 0.4)',
              color: 'var(--gold-bright)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
            }}
          >
            <ZoomOut size={17} />
          </button>

          {scale > 1 && (
            <button
              onClick={handleResetZoom}
              title="Reset Zoom (0)"
              style={{
                padding: '0 10px',
                height: '36px',
                borderRadius: '4px',
                background: 'rgba(212, 175, 55, 0.15)',
                border: '1px solid var(--gold-bright)',
                color: 'var(--gold-bright)',
                fontFamily: 'var(--font-mono)',
                fontSize: '0.72rem',
                display: 'flex',
                alignItems: 'center',
                gap: '4px',
                cursor: 'pointer',
              }}
            >
              <RotateCcw size={13} />
              <span>{Math.round(scale * 100)}%</span>
            </button>
          )}

          <button
            onClick={closeLightbox}
            title="Close (Esc)"
            style={{
              width: '38px',
              height: '38px',
              borderRadius: '4px',
              background: 'rgba(30, 15, 15, 0.85)',
              border: '1px solid rgba(255, 85, 85, 0.6)',
              color: '#FFAAAA',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              marginLeft: '4px',
            }}
          >
            <X size={20} />
          </button>
        </div>
      </div>

      {/* Main Image Stage (Draggable & Zoomable) */}
      <div
        style={{
          flex: 1,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          overflow: 'hidden',
          position: 'relative',
          cursor: scale > 1 ? (isDragging ? 'grabbing' : 'grab') : 'zoom-in',
        }}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        onClick={(e) => {
          e.stopPropagation();
          if (scale === 1) {
            handleZoomIn();
          }
        }}
      >
        <img
          src={activeImage.src}
          alt={activeImage.alt || activeImage.title || 'Manga Panel View'}
          style={{
            maxWidth: '92vw',
            maxHeight: showDialogue && activeImage.dialogue ? '68vh' : '82vh',
            objectFit: 'contain',
            transform: `translate(${position.x}px, ${position.y}px) scale(${scale})`,
            transition: isDragging ? 'none' : 'transform 0.25s cubic-bezier(0.16, 1, 0.3, 1)',
            filter: 'drop-shadow(0 15px 40px rgba(0,0,0,0.95))',
            pointerEvents: 'auto',
          }}
          draggable={false}
        />

        {/* Mobile Pinch & Pan Hint Pill */}
        <div
          style={{
            position: 'absolute',
            bottom: '16px',
            left: '50%',
            transform: 'translateX(-50%)',
            background: 'rgba(10, 10, 10, 0.8)',
            border: '1px solid rgba(212, 175, 55, 0.3)',
            borderRadius: '20px',
            padding: '5px 14px',
            fontFamily: 'var(--font-mono)',
            fontSize: '0.66rem',
            color: 'var(--gold-bright)',
            pointerEvents: 'none',
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            boxShadow: '0 4px 14px rgba(0,0,0,0.8)',
          }}
        >
          <Maximize2 size={11} />
          <span>{scale > 1 ? 'DRAG TO PAN • DOUBLE TAP TO RESET' : 'PINCH OR DOUBLE TAP TO ZOOM'}</span>
        </div>
      </div>

      {/* Bottom Script / Dialogue Drawer */}
      {activeImage.dialogue && (
        <div
          style={{
            padding: '16px 20px',
            background: 'linear-gradient(0deg, rgba(8, 8, 8, 0.98) 70%, transparent 100%)',
            borderTop: '1px solid rgba(212, 175, 55, 0.25)',
            zIndex: 10,
            pointerEvents: 'auto',
          }}
          onClick={(e) => e.stopPropagation()}
        >
          <div style={{ maxWidth: '840px', margin: '0 auto' }}>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginBottom: '6px',
              }}
            >
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.68rem',
                  color: 'var(--gold-bright)',
                  letterSpacing: '0.12em',
                }}
              >
                <MessageSquare size={12} />
                <span>IN-PANEL DIALOGUE & NARRATIVE</span>
              </div>
              <button
                onClick={() => setShowDialogue(!showDialogue)}
                style={{
                  background: 'none',
                  border: 'none',
                  color: 'var(--text-muted)',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.65rem',
                  cursor: 'pointer',
                  textDecoration: 'underline',
                }}
              >
                {showDialogue ? 'Hide Text' : 'Show Text'}
              </button>
            </div>

            {showDialogue && (
              <p
                style={{
                  margin: 0,
                  fontFamily: 'var(--font-body)',
                  fontSize: '0.92rem',
                  color: 'var(--text-ivory)',
                  lineHeight: 1.5,
                  fontStyle: 'italic',
                }}
              >
                {activeImage.dialogue}
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
