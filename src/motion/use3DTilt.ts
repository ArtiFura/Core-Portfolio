import { useEffect, useRef } from 'react';
import gsap from 'gsap';

interface TiltOptions {
  maxRotation?: number; // max degrees, default 6
  perspective?: number; // default 1000
  scale?: number; // default 1.02
  disabled?: boolean;
}

/**
 * use3DTilt Hook
 * Controlled subtle 3D perspective card tilt on hover.
 * Preserves text clarity while providing tactile depth and lighting response.
 * Disabled on touch / coarse devices and prefers-reduced-motion.
 */
export function use3DTilt<T extends HTMLElement>(options: TiltOptions = {}) {
  const ref = useRef<T | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || options.disabled) return;

    const isTouch = window.matchMedia('(hover: none), (pointer: coarse)').matches;
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (isTouch || prefersReducedMotion) return;

    const { maxRotation = 5, perspective = 1000, scale = 1.015 } = options;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const normX = (x / rect.width - 0.5) * 2;
      const normY = (y / rect.height - 0.5) * 2;

      const rotX = -normY * maxRotation;
      const rotY = normX * maxRotation;

      gsap.to(el, {
        transform: `perspective(${perspective}px) rotateX(${rotX.toFixed(2)}deg) rotateY(${rotY.toFixed(2)}deg) scale3d(${scale}, ${scale}, 1)`,
        duration: 0.35,
        ease: 'power2.out',
        overwrite: 'auto',
      });
    };

    const handleMouseLeave = () => {
      gsap.to(el, {
        transform: `perspective(${perspective}px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`,
        duration: 0.6,
        ease: 'power3.out',
        overwrite: 'auto',
      });
    };

    el.addEventListener('mousemove', handleMouseMove);
    el.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      el.removeEventListener('mousemove', handleMouseMove);
      el.removeEventListener('mouseleave', handleMouseLeave);
      gsap.killTweensOf(el);
    };
  }, [options.maxRotation, options.perspective, options.scale, options.disabled]);

  return ref;
}
