import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

export const CustomCursor = () => {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLDivElement>(null);
  const [label, setLabel] = useState('');

  useEffect(() => {
    const dot = dotRef.current;
    const ring = ringRef.current;
    const glow = glowRef.current;
    const labelEl = labelRef.current;
    if (!dot || !ring || !glow || !labelEl) return;

    let mouseX = 0, mouseY = 0;

    const onMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;

      gsap.to(dot, { x: mouseX, y: mouseY, duration: 0.1, ease: 'power2.out' });
      gsap.to(ring, { x: mouseX, y: mouseY, duration: 0.35, ease: 'power2.out' });
      gsap.to(glow, { x: mouseX, y: mouseY, duration: 0.4, ease: 'power2.out' });
      gsap.to(labelEl, { x: mouseX, y: mouseY, duration: 0.3, ease: 'power2.out' });
    };

    const onMouseEnterInteractive = (e: Event) => {
      const el = e.target as HTMLElement;
      const cursorLabel = el.dataset.cursor || '';
      setLabel(cursorLabel);

      gsap.to(ring, { scale: cursorLabel ? 3 : 2.2, duration: 0.4 });
      gsap.to(dot, { scale: cursorLabel ? 0.3 : 0.6, duration: 0.3 });
      gsap.to(glow, { scale: 1.6, opacity: 0.35, duration: 0.4 });
    };

    const onMouseLeaveInteractive = () => {
      setLabel('');
      gsap.to(ring, { scale: 1, duration: 0.4 });
      gsap.to(dot, { scale: 1, duration: 0.3 });
      gsap.to(glow, { scale: 1, opacity: 0.2, duration: 0.4 });
    };

    const onMouseDown = () => {
      gsap.to(ring, { scale: 0.8, duration: 0.15 });
      gsap.to(dot, { scale: 0.5, duration: 0.15 });
    };

    const onMouseUp = () => {
      gsap.to(ring, { scale: 1, duration: 0.3 });
      gsap.to(dot, { scale: 1, duration: 0.3 });
    };

    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mouseup', onMouseUp);

    const interactives = document.querySelectorAll('a, button, [data-cursor], input, textarea, select');
    interactives.forEach(el => {
      el.addEventListener('mouseenter', onMouseEnterInteractive);
      el.addEventListener('mouseleave', onMouseLeaveInteractive);
    });

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
      {/* Ambient glow */}
      <div
        ref={glowRef}
        className="fixed top-0 left-0 pointer-events-none"
        style={{
          width: 80,
          height: 80,
          marginLeft: -40,
          marginTop: -40,
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(201, 168, 76, 0.18) 0%, transparent 65%)',
          zIndex: 9998,
          opacity: 0.2,
        }}
      />

      {/* Main gold ring */}
      <div
        ref={ringRef}
        className="fixed top-0 left-0 pointer-events-none"
        style={{
          width: 56,
          height: 56,
          marginLeft: -28,
          marginTop: -28,
          borderRadius: '50%',
          border: '2px solid rgba(201, 168, 76, 0.85)',
          boxShadow: '0 0 16px rgba(201, 168, 76, 0.3), inset 0 0 10px rgba(201, 168, 76, 0.1)',
          zIndex: 9999,
        }}
      />

      {/* Center dot */}
      <div
        ref={dotRef}
        className="fixed top-0 left-0 pointer-events-none"
        style={{
          width: 12,
          height: 12,
          marginLeft: -6,
          marginTop: -6,
          borderRadius: '50%',
          background: '#C9A84C',
          boxShadow: '0 0 8px rgba(201, 168, 76, 0.6)',
          zIndex: 10000,
        }}
      />

      {/* Label on hover */}
      <div
        ref={labelRef}
        className="fixed top-0 left-0 pointer-events-none flex items-center justify-center"
        style={{
          width: 120,
          height: 120,
          marginLeft: -60,
          marginTop: -60,
          opacity: label ? 1 : 0,
          transition: 'opacity 0.3s ease',
          zIndex: 10001,
        }}
      >
        <span className="text-[8px] font-bold uppercase tracking-[0.35em] text-gold">
          {label}
        </span>
      </div>
    </>
  );
};
