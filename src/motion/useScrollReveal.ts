import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface ScrollRevealOptions {
  animation?: 'fade-up' | 'fade-down' | 'fade-left' | 'fade-right' | 'scale-up' | 'clip-up';
  duration?: number;
  delay?: number;
  stagger?: number;
  triggerHook?: string;
  childSelector?: string;
}

export function useScrollReveal<T extends HTMLElement>(options: ScrollRevealOptions = {}) {
  const elementRef = useRef<T | null>(null);

  useEffect(() => {
    const el = elementRef.current;
    if (!el) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      // Keep visible without animation if reduced motion
      gsap.set(el, { opacity: 1, visibility: 'visible' });
      return;
    }

    const {
      animation = 'fade-up',
      duration = 0.85,
      delay = 0,
      stagger = 0.12,
      triggerHook = 'top 85%',
      childSelector,
    } = options;

    const ctx = gsap.context(() => {
      const targets = childSelector ? el.querySelectorAll(childSelector) : el;

      let fromVars: gsap.TweenVars = { opacity: 0 };
      let toVars: gsap.TweenVars = {
        opacity: 1,
        duration,
        delay,
        ease: 'power3.out',
        stagger: childSelector ? stagger : undefined,
        scrollTrigger: {
          trigger: el,
          start: triggerHook,
          toggleActions: 'play none none none',
          once: true,
        },
      };

      switch (animation) {
        case 'fade-up':
          fromVars.y = 35;
          toVars.y = 0;
          break;
        case 'fade-down':
          fromVars.y = -35;
          toVars.y = 0;
          break;
        case 'fade-left':
          fromVars.x = -40;
          toVars.x = 0;
          break;
        case 'fade-right':
          fromVars.x = 40;
          toVars.x = 0;
          break;
        case 'scale-up':
          fromVars.scale = 0.94;
          toVars.scale = 1;
          break;
        case 'clip-up':
          fromVars.clipPath = 'polygon(0 100%, 100% 100%, 100% 100%, 0 100%)';
          toVars.clipPath = 'polygon(0 0%, 100% 0%, 100% 100%, 0 100%)';
          toVars.duration = duration * 1.1;
          toVars.ease = 'power4.out';
          break;
      }

      gsap.fromTo(targets, fromVars, toVars);
    }, el);

    return () => ctx.revert();
  }, [options.animation, options.duration, options.delay, options.stagger]);

  return elementRef;
}

export function useParallax<T extends HTMLElement>(speed: number = 0.2) {
  const ref = useRef<T | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion || window.innerWidth < 768) {
      return;
    }

    const ctx = gsap.context(() => {
      gsap.to(el, {
        y: () => -100 * speed,
        ease: 'none',
        scrollTrigger: {
          trigger: el,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true,
        },
      });
    }, el);

    return () => ctx.revert();
  }, [speed]);

  return ref;
}
