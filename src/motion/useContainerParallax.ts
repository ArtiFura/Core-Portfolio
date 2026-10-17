import { useEffect, useRef } from 'react';

interface ParallaxLayerConfig {
  selector: string;
  depth: number; // e.g. 0.02 for bg, 0.05 for mid, 0.08 for fg
}

interface ContainerParallaxOptions {
  layers: ParallaxLayerConfig[];
  lerp?: number; // interpolation factor 0.08 - 0.15
  disabled?: boolean;
}

/**
 * useContainerParallax Hook
 * Multi-layer pointer parallax within a specific container (e.g., Hero living cover).
 * Tracks cursor position relative to the container center, applies layered translation
 * to matched child layers using smooth rAF interpolation (lerp).
 * Returns gently to center on mouse leave.
 * Completely disabled on touch / coarse pointer devices and prefers-reduced-motion.
 */
export function useContainerParallax<T extends HTMLElement>(options: ContainerParallaxOptions) {
  const containerRef = useRef<T | null>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container || options.disabled) return;

    const isTouch = window.matchMedia('(hover: none), (pointer: coarse)').matches;
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (isTouch || prefersReducedMotion) return;

    const { layers, lerp = 0.08 } = options;

    let targetX = 0;
    let targetY = 0;
    let currentX = 0;
    let currentY = 0;
    let animationFrameId: number | null = null;
    let isHovered = false;

    // Cache elements
    const layerElements: { el: HTMLElement; depth: number }[] = [];
    layers.forEach((cfg) => {
      const els = container.querySelectorAll<HTMLElement>(cfg.selector);
      els.forEach((el) => {
        layerElements.push({ el, depth: cfg.depth });
      });
    });

    if (layerElements.length === 0) return;

    const animate = () => {
      // Lerp current towards target
      currentX += (targetX - currentX) * lerp;
      currentY += (targetY - currentY) * lerp;

      layerElements.forEach(({ el, depth }) => {
        const transX = currentX * depth * 100;
        const transY = currentY * depth * 100;
        el.style.transform = `translate3d(${transX.toFixed(2)}px, ${transY.toFixed(2)}px, 0)`;
      });

      // Continue animating while hovered or until returning close to 0
      const distance = Math.abs(targetX - currentX) + Math.abs(targetY - currentY);
      if (isHovered || distance > 0.005) {
        animationFrameId = requestAnimationFrame(animate);
      } else {
        // Snap to zero at rest
        layerElements.forEach(({ el }) => {
          el.style.transform = 'translate3d(0, 0, 0)';
        });
        animationFrameId = null;
      }
    };

    const handlePointerMove = (e: PointerEvent) => {
      const rect = container.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      // Normalized coordinates (-1 to 1)
      targetX = (e.clientX - centerX) / (rect.width / 2);
      targetY = (e.clientY - centerY) / (rect.height / 2);

      // Clamp between -1 and 1
      targetX = Math.max(-1, Math.min(1, targetX));
      targetY = Math.max(-1, Math.min(1, targetY));

      if (!animationFrameId) {
        animationFrameId = requestAnimationFrame(animate);
      }
    };

    const handlePointerEnter = () => {
      isHovered = true;
      if (!animationFrameId) {
        animationFrameId = requestAnimationFrame(animate);
      }
    };

    const handlePointerLeave = () => {
      isHovered = false;
      targetX = 0;
      targetY = 0;
      if (!animationFrameId) {
        animationFrameId = requestAnimationFrame(animate);
      }
    };

    container.addEventListener('pointerenter', handlePointerEnter);
    container.addEventListener('pointermove', handlePointerMove, { passive: true });
    container.addEventListener('pointerleave', handlePointerLeave);

    return () => {
      container.removeEventListener('pointerenter', handlePointerEnter);
      container.removeEventListener('pointermove', handlePointerMove);
      container.removeEventListener('pointerleave', handlePointerLeave);
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
      layerElements.forEach(({ el }) => {
        el.style.transform = '';
      });
    };
  }, [options.layers, options.lerp, options.disabled]);

  return containerRef;
}
