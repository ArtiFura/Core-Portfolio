import {
  createElement,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
  type CSSProperties
} from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import './SplitText.css';

gsap.registerPlugin(ScrollTrigger);

export type SplitTextEffect = 'rise' | 'fade' | 'blur' | 'flip' | 'pop' | 'skew' | 'wave';
export type SplitTextStaggerFrom = 'start' | 'center' | 'end' | 'edges' | 'random';
export type SplitTextTrigger = 'view' | 'load' | 'hover' | 'click';

export interface SplitTextProps {
  text: string;
  className?: string;
  delay?: number;
  duration?: number;
  ease?: string | ((t: number) => number);
  splitType?: 'chars' | 'words';
  from?: gsap.TweenVars;
  to?: gsap.TweenVars;
  threshold?: number;
  rootMargin?: string;
  tag?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'span';
  textAlign?: CSSProperties['textAlign'];
  staggerFrom?: SplitTextStaggerFrom;
  mask?: boolean;
  effect?: SplitTextEffect;
  trigger?: SplitTextTrigger;
  loop?: boolean;
  loopDelay?: number;
  hoverEffect?: 'none' | 'lift' | 'wave';
  color?: string;
  accentColor?: string;
  style?: CSSProperties;
  onLetterAnimationComplete?: () => void;
}

type Look = { from: gsap.TweenVars; to: gsap.TweenVars; ease: string | ((t: number) => number) };

const DEFAULT_FROM = { opacity: 0, y: 35 };
const DEFAULT_TO = { opacity: 1, y: 0 };

const useIsoLayoutEffect = typeof window !== 'undefined' ? useLayoutEffect : useEffect;

const waveEase = (t: number) => 1 - Math.cos(t * Math.PI * 1.5) * Math.pow(1 - t, 1.2);

const getEffect = (effect: SplitTextEffect, em: number): Look => {
  switch (effect) {
    case 'fade':
      return { from: { opacity: 0 }, to: { opacity: 1 }, ease: 'power2.inOut' };
    case 'blur':
      return {
        from: { opacity: 0, filter: `blur(${Math.round(em * 1.2) / 10}px)`, y: 15 },
        to: { opacity: 1, filter: 'blur(0px)', y: 0 },
        ease: 'power2.out'
      };
    case 'flip': {
      const setup = { transformPerspective: em * 6, transformOrigin: '50% 100%' };
      return {
        from: { ...setup, opacity: 0, rotationX: -90 },
        to: { ...setup, opacity: 1, rotationX: 0 },
        ease: 'power3.out'
      };
    }
    case 'pop':
      return { from: { opacity: 0, scale: 0.2 }, to: { opacity: 1, scale: 1 }, ease: 'back.out(1.8)' };
    case 'skew':
      return {
        from: { transformOrigin: '50% 100%', opacity: 0, x: -em * 0.4, skewX: -24 },
        to: { transformOrigin: '50% 100%', opacity: 1, x: 0, skewX: 0 },
        ease: 'expo.out'
      };
    case 'wave':
      return { from: { opacity: 0, y: em * 0.5 }, to: { opacity: 1, y: 0 }, ease: waveEase };
    case 'rise':
    default:
      return { from: { ...DEFAULT_FROM }, to: { ...DEFAULT_TO }, ease: 'power3.out' };
  }
};

export const SplitText = ({
  text,
  className = '',
  delay = 35,
  duration = 0.9,
  ease,
  splitType = 'chars',
  from,
  to,
  threshold = 0.1,
  rootMargin = '-50px',
  textAlign = 'left',
  tag = 'p',
  staggerFrom = 'start',
  mask = false,
  effect = 'rise',
  trigger = 'view',
  loop = false,
  loopDelay = 2,
  hoverEffect: _hoverEffect = 'none',
  color,
  accentColor,
  style,
  onLetterAnimationComplete
}: SplitTextProps) => {
  const ref = useRef<HTMLElement>(null);
  const completedTextRef = useRef<string | null>(null);
  const onCompleteRef = useRef(onLetterAnimationComplete);
  const [ready, setReady] = useState(false);

  useIsoLayoutEffect(() => {
    onCompleteRef.current = onLetterAnimationComplete;
  });

  const parsedWords = useMemo(() => {
    return text.split(/(\s+)/).map((segment, wordIndex) => {
      if (segment.trim() === '') {
        return { isSpace: true, content: segment, key: `space-${wordIndex}` };
      }
      return {
        isSpace: false,
        content: segment,
        chars: Array.from(segment),
        key: `word-${wordIndex}`
      };
    });
  }, [text]);

  useIsoLayoutEffect(() => {
    const el = ref.current;
    if (!el || !text) return;

    if (window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) {
      setReady(true);
      return;
    }

    const pieces = el.querySelectorAll<HTMLElement>(splitType === 'words' ? '.split-word' : '.split-char');
    if (!pieces.length) return;

    const em = parseFloat(getComputedStyle(el).fontSize) || 16;
    const custom = from !== undefined || to !== undefined;
    const look = getEffect(effect, em);
    const fromVars: gsap.TweenVars = custom ? { ...(from || DEFAULT_FROM) } : look.from;
    const toVars: gsap.TweenVars = custom ? { ...(to || DEFAULT_TO) } : look.to;
    const easing = ease || (custom ? 'power3.out' : look.ease);
    const staggerTime = delay / 1000;

    let tl: gsap.core.Timeline | null = null;
    let loopCall: gsap.core.Tween | null = null;

    const animateIn = () => {
      tl?.kill();
      tl = gsap.timeline({
        onComplete: () => {
          completedTextRef.current = text;
          onCompleteRef.current?.();
          if (loop) {
            loopCall = gsap.delayedCall(loopDelay, () => {
              gsap.to(pieces, {
                opacity: 0,
                duration: 0.35,
                stagger: { each: staggerTime * 0.5, from: staggerFrom },
                onComplete: animateIn
              });
            });
          }
        }
      });

      tl.fromTo(
        pieces,
        { ...fromVars, willChange: 'transform, opacity' },
        {
          ...toVars,
          duration,
          ease: easing,
          stagger: { each: staggerTime, from: staggerFrom }
        }
      );

      if (accentColor) {
        tl.fromTo(
          pieces,
          { color: accentColor },
          {
            color: color || getComputedStyle(el).color,
            duration: duration * 0.8,
            ease: 'power1.inOut',
            stagger: { each: staggerTime, from: staggerFrom }
          },
          duration * 0.2
        );
      }
    };

    let scrollTrigger: ScrollTrigger | null = null;

    if (trigger === 'load') {
      animateIn();
    } else if (trigger === 'hover') {
      const handleEnter = () => animateIn();
      el.addEventListener('mouseenter', handleEnter);
      animateIn();
      setReady(true);
      return () => {
        el.removeEventListener('mouseenter', handleEnter);
        tl?.kill();
        loopCall?.kill();
      };
    } else {
      // 'view' or default
      scrollTrigger = ScrollTrigger.create({
        trigger: el,
        start: 'top 88%',
        once: !loop,
        onEnter: () => animateIn()
      });
    }

    setReady(true);

    return () => {
      tl?.kill();
      loopCall?.kill();
      scrollTrigger?.kill();
      gsap.killTweensOf(pieces);
    };
  }, [
    text,
    delay,
    duration,
    ease,
    splitType,
    from,
    to,
    threshold,
    rootMargin,
    staggerFrom,
    effect,
    trigger,
    loop,
    loopDelay,
    color,
    accentColor
  ]);

  const clip = mask || effect === 'rise';

  return createElement(
    tag,
    {
      ref,
      className: `split-parent ${className}`,
      style: {
        textAlign,
        overflow: clip ? 'hidden' : 'visible',
        display: 'inline-block',
        color,
        cursor: trigger === 'click' ? 'pointer' : undefined,
        visibility: ready ? undefined : 'visible',
        ...style
      }
    },
    parsedWords.map(item => {
      if (item.isSpace) {
        return item.content;
      }
      return (
        <span className="split-word" key={item.key}>
          {splitType === 'words' ? (
            item.content
          ) : (
            item.chars?.map((char, charIdx) => (
              <span className="split-char" key={`${item.key}-char-${charIdx}`}>
                {char}
              </span>
            ))
          )}
        </span>
      );
    })
  );
};

export default SplitText;
