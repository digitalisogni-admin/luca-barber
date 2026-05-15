import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

interface TextRevealProps {
  children: string;
  className?: string;
  tag?: 'h1' | 'h2' | 'h3' | 'h4' | 'p' | 'span';
  delay?: number;
  stagger?: number;
  splitBy?: 'words' | 'chars';
}

export const TextReveal = ({
  children,
  className = '',
  tag: Tag = 'h2',
  delay = 0,
  stagger = 0.04,
  splitBy = 'words',
}: TextRevealProps) => {
  const containerRef = useRef<HTMLElement>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true;
          const spans = el.querySelectorAll('.reveal-unit');
          gsap.fromTo(
            spans,
            {
              y: 60,
              opacity: 0,
              rotateX: -40,
            },
            {
              y: 0,
              opacity: 1,
              rotateX: 0,
              duration: 0.9,
              stagger,
              delay,
              ease: 'power3.out',
            }
          );
        }
      },
      { threshold: 0.2 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [delay, stagger]);

  const units = splitBy === 'words' ? children.split(' ') : children.split('');

  return (
    <Tag
      ref={containerRef as any}
      className={`${className}`}
      style={{ perspective: '600px', overflow: 'hidden' }}
    >
      {units.map((unit, i) => (
        <span
          key={i}
          className="reveal-unit inline-block"
          style={{
            opacity: 0,
            transformOrigin: 'bottom',
            willChange: 'transform, opacity',
          }}
        >
          {unit}
          {splitBy === 'words' && i < units.length - 1 ? '\u00A0' : ''}
        </span>
      ))}
    </Tag>
  );
};
