import { useEffect, useRef } from 'react';
import gsap from 'gsap';

interface MagneticOptions {
  strength?: number; // 0.1 to 0.5 (multiplier of distance from center)
  maxDistance?: number; // max px offset
  disabled?: boolean;
}

/**
 * useMagnetic Hook
 * Adds subtle magnetic attraction to primary CTA buttons on desktop.
 * Smoothly follows pointer within hit area and snaps back with elastic ease on leave.
 * Automatically disabled on touch / coarse pointer devices and prefers-reduced-motion.
 */
export function useMagnetic<T extends HTMLElement>(options: MagneticOptions = {}) {
  const ref = useRef<T | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || options.disabled) return;

    // Check touch or reduced motion
    const isTouch = window.matchMedia('(hover: none), (pointer: coarse)').matches;
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (isTouch || prefersReducedMotion) return;

    const { strength = 0.28, maxDistance = 14 } = options;

    const xTo = gsap.quickTo(el, 'x', { duration: 0.45, ease: 'power3.out' });
    const yTo = gsap.quickTo(el, 'y', { duration: 0.45, ease: 'power3.out' });

    const handleMouseMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      const deltaX = (e.clientX - centerX) * strength;
      const deltaY = (e.clientY - centerY) * strength;

      // Clamp distance
      const clampedX = Math.max(-maxDistance, Math.min(maxDistance, deltaX));
      const clampedY = Math.max(-maxDistance, Math.min(maxDistance, deltaY));

      xTo(clampedX);
      yTo(clampedY);
    };

    const handleMouseLeave = () => {
      gsap.to(el, {
        x: 0,
        y: 0,
        duration: 0.6,
        ease: 'elastic.out(1, 0.4)',
      });
    };

    el.addEventListener('mousemove', handleMouseMove);
    el.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      el.removeEventListener('mousemove', handleMouseMove);
      el.removeEventListener('mouseleave', handleMouseLeave);
      gsap.killTweensOf(el);
    };
  }, [options.strength, options.maxDistance, options.disabled]);

  return ref;
}
