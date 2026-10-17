import { useEffect, useRef } from 'react';

interface SpotlightOptions {
  radius?: number; // spotlight radius in px
  opacity?: number; // peak opacity
  color?: string; // hex or rgb
  disabled?: boolean;
}

/**
 * useMouseSpotlight Hook
 * Creates a soft radial gold spotlight that follows the pointer within selected visual containers.
 * Mutates CSS custom properties directly on the element (--spot-x, --spot-y, --spot-opacity)
 * without triggering React re-renders.
 * Automatically disabled on touch / coarse pointer devices and prefers-reduced-motion.
 */
export function useMouseSpotlight<T extends HTMLElement>(options: SpotlightOptions = {}) {
  const ref = useRef<T | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || options.disabled) return;

    const isTouch = window.matchMedia('(hover: none), (pointer: coarse)').matches;
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (isTouch || prefersReducedMotion) return;

    const { opacity = 0.09 } = options;

    const handlePointerMove = (e: PointerEvent) => {
      const rect = el.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      el.style.setProperty('--spot-x', `${x}px`);
      el.style.setProperty('--spot-y', `${y}px`);
      el.style.setProperty('--spot-opacity', `${opacity}`);
    };

    const handlePointerLeave = () => {
      el.style.setProperty('--spot-opacity', '0');
    };

    el.addEventListener('pointermove', handlePointerMove, { passive: true });
    el.addEventListener('pointerleave', handlePointerLeave, { passive: true });

    return () => {
      el.removeEventListener('pointermove', handlePointerMove);
      el.removeEventListener('pointerleave', handlePointerLeave);
    };
  }, [options.radius, options.opacity, options.color, options.disabled]);

  return ref;
}
