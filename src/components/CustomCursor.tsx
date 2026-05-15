import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

export const CustomCursor = () => {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLDivElement>(null);
  const [label, setLabel] = useState('');

  useEffect(() => {
    const dot = dotRef.current;
    const ring = ringRef.current;
    const labelEl = labelRef.current;
    if (!dot || !ring || !labelEl) return;

    let mouseX = 0, mouseY = 0;

    const onMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;

      gsap.to(dot, { x: mouseX, y: mouseY, duration: 0.1, ease: 'power2.out' });
      gsap.to(ring, { x: mouseX, y: mouseY, duration: 0.35, ease: 'power2.out' });
      gsap.to(labelEl, { x: mouseX, y: mouseY, duration: 0.3, ease: 'power2.out' });
    };

    const onMouseEnterInteractive = (e: Event) => {
      const el = e.target as HTMLElement;
      const cursorLabel = el.dataset.cursor || '';
      setLabel(cursorLabel);

      gsap.to(ring, { scale: cursorLabel ? 2.5 : 1.8, opacity: cursorLabel ? 0.15 : 0.3, duration: 0.4 });
      gsap.to(dot, { scale: cursorLabel ? 0 : 0.5, duration: 0.3 });
    };

    const onMouseLeaveInteractive = () => {
      setLabel('');
      gsap.to(ring, { scale: 1, opacity: 0.5, duration: 0.4 });
      gsap.to(dot, { scale: 1, duration: 0.3 });
    };

    const onMouseDown = () => {
      gsap.to(ring, { scale: 0.8, duration: 0.15 });
      gsap.to(dot, { scale: 0.6, duration: 0.15 });
    };

    const onMouseUp = () => {
      gsap.to(ring, { scale: 1, duration: 0.3 });
      gsap.to(dot, { scale: 1, duration: 0.3 });
    };

    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mouseup', onMouseUp);

    // Watch for interactive elements
    const interactives = document.querySelectorAll('a, button, [data-cursor], input, textarea, select');
    interactives.forEach(el => {
      el.addEventListener('mouseenter', onMouseEnterInteractive);
      el.addEventListener('mouseleave', onMouseLeaveInteractive);
    });

    // MutationObserver to catch dynamically added elements
    const observer = new MutationObserver(() => {
      const newInteractives = document.querySelectorAll('a, button, [data-cursor], input, textarea, select');
      newInteractives.forEach(el => {
        el.removeEventListener('mouseenter', onMouseEnterInteractive);
        el.removeEventListener('mouseleave', onMouseLeaveInteractive);
        el.addEventListener('mouseenter', onMouseEnterInteractive);
        el.addEventListener('mouseleave', onMouseLeaveInteractive);
      });
    });
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mouseup', onMouseUp);
      observer.disconnect();
    };
  }, []);

  // Hide on mobile
  const isMobile = typeof window !== 'undefined' && window.matchMedia('(max-width: 768px)').matches;
  if (isMobile) return null;

  return (
    <>
      <div
        ref={dotRef}
        className="fixed top-0 left-0 z-[10000] pointer-events-none mix-blend-difference"
        style={{
          width: 8,
          height: 8,
          marginLeft: -4,
          marginTop: -4,
          borderRadius: '50%',
          background: 'var(--theme-text)',
        }}
      />
      <div
        ref={ringRef}
        className="fixed top-0 left-0 z-[10000] pointer-events-none"
        style={{
          width: 40,
          height: 40,
          marginLeft: -20,
          marginTop: -20,
          borderRadius: '50%',
          border: '1px solid rgba(201, 168, 76, 0.5)',
          opacity: 0.5,
        }}
      />
      <div
        ref={labelRef}
        className="fixed top-0 left-0 z-[10000] pointer-events-none flex items-center justify-center"
        style={{
          width: 80,
          height: 80,
          marginLeft: -40,
          marginTop: -40,
          opacity: label ? 1 : 0,
          transition: 'opacity 0.3s ease',
        }}
      >
        <span className="text-[9px] font-bold uppercase tracking-[0.3em] text-gold">
          {label}
        </span>
      </div>
    </>
  );
};
