import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { MagneticButton } from './MagneticButton';

const SERVICES = [
  { name: "Gentleman's Cut", price: "€35", desc: "Precision scissor-over-comb tapering" },
  { name: "Beard Sculpture", price: "€25", desc: "Contoured shaping & oil treatment" },
  { name: "The Luca Barber Ritual", price: "€65", desc: "90-min flagship experience" },
  { name: "Master Skin Fade", price: "€38", desc: "Seamless zero-to-length blend" },
  { name: "Artisanal Shave", price: "€30", desc: "Straight-razor hot towel ceremony" },
  { name: "Executive Styling", price: "€22", desc: "Wash, treat & artisanal blowout" },
];

export const ScrollytellingMenu = () => {
  const totalFrames = 153;
  const [loadedCount, setLoadedCount] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const framesRef = useRef<HTMLImageElement[]>([]);

  // Overlay refs
  const titleRef = useRef<HTMLDivElement>(null);
  const cardsContainerRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  // Preload frames
  useEffect(() => {
    let loaded = 0;
    const frames: HTMLImageElement[] = [];

    for (let i = 1; i <= totalFrames; i++) {
      const img = new Image();
      const frameIndex = String(i).padStart(3, '0');
      img.src = `/frames2/ezgif-frame-${frameIndex}.jpg`;
      img.onload = () => {
        loaded++;
        setLoadedCount(loaded);
      };
      frames.push(img);
    }
    framesRef.current = frames;
  }, []);

  // IntersectionObserver to track visibility
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting),
      { threshold: 0.05 }
    );
    if (containerRef.current) observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  // Main render loop
  useEffect(() => {
    if (loadedCount < totalFrames) return;

    let animationFrameId: number;

    const handleResize = () => {
      if (canvasRef.current) {
        canvasRef.current.width = window.innerWidth;
        canvasRef.current.height = window.innerHeight;
      }
    };

    const drawFrame = (index: number) => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext('2d');
      const img = framesRef.current[index];
      if (!ctx || !img) return;

      const canvasRatio = canvas.width / canvas.height;
      const imgRatio = img.width / img.height;

      let renderWidth = canvas.width;
      let renderHeight = canvas.height;
      const ZOOM = 1.3;

      if (canvasRatio > imgRatio) {
        renderHeight = canvas.width / imgRatio;
      } else {
        renderWidth = canvas.height * imgRatio;
      }

      renderWidth *= ZOOM;
      renderHeight *= ZOOM;

      const offsetX = (canvas.width - renderWidth) / 2;
      const offsetY = (canvas.height - renderHeight) / 2;

      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(img, offsetX, offsetY, renderWidth, renderHeight);
    };

    const renderLoop = () => {
      if (containerRef.current && isVisible) {
        const rect = containerRef.current.getBoundingClientRect();
        const scrollableHeight = rect.height - window.innerHeight;
        let scrollFraction = -rect.top / scrollableHeight;
        scrollFraction = Math.max(0, Math.min(1, scrollFraction));

        // Map scroll to frame
        const frameIndex = Math.min(
          Math.floor(scrollFraction * (totalFrames - 1)),
          totalFrames - 1
        );
        drawFrame(frameIndex);

        // --- 3D Overlay Animations ---

        // Phase 1 (0–15%): Title flies in with 3D rotation
        if (titleRef.current) {
          const titleProgress = Math.min(1, scrollFraction / 0.15);
          const titleExit = scrollFraction > 0.3 ? Math.min(1, (scrollFraction - 0.3) / 0.1) : 0;
          const opacity = Math.min(titleProgress, 1 - titleExit);
          const rotateX = (1 - titleProgress) * 30;
          const translateZ = (1 - titleProgress) * -200;
          const exitY = titleExit * -120;
          titleRef.current.style.opacity = String(Math.max(0, opacity));
          titleRef.current.style.transform = `perspective(1200px) rotateX(${rotateX}deg) translateZ(${translateZ}px) translateY(${exitY}px)`;
        }

        // Phase 2 (20–85%): Service cards stagger in with 3D depth
        if (cardsContainerRef.current) {
          const cards = cardsContainerRef.current.children;
          const cardCount = cards.length;

          for (let i = 0; i < cardCount; i++) {
            const card = cards[i] as HTMLElement;
            const cardStart = 0.15 + (i * 0.08);
            const cardEnd = cardStart + 0.15;
            const cardExitStart = 0.75;

            let cardProgress = 0;
            if (scrollFraction >= cardStart && scrollFraction <= cardEnd) {
              cardProgress = (scrollFraction - cardStart) / (cardEnd - cardStart);
            } else if (scrollFraction > cardEnd) {
              cardProgress = 1;
            }

            let exitProgress = 0;
            if (scrollFraction > cardExitStart) {
              exitProgress = Math.min(1, (scrollFraction - cardExitStart) / 0.15);
            }

            const opacity = Math.min(cardProgress, 1 - exitProgress);
            const translateY = (1 - cardProgress) * 80 + exitProgress * -100;
            const translateZ = (1 - cardProgress) * -150;
            const rotateY = (1 - cardProgress) * (i % 2 === 0 ? -8 : 8);
            const scale = 0.85 + cardProgress * 0.15 - exitProgress * 0.1;

            card.style.opacity = String(Math.max(0, opacity));
            card.style.transform = `perspective(1000px) translateY(${translateY}px) translateZ(${translateZ}px) rotateY(${rotateY}deg) scale(${scale})`;
          }
        }

        // Phase 3 (85–100%): CTA appears
        if (ctaRef.current) {
          const ctaProgress = scrollFraction > 0.85 ? Math.min(1, (scrollFraction - 0.85) / 0.12) : 0;
          const scale = 0.8 + ctaProgress * 0.2;
          const rotateX = (1 - ctaProgress) * 20;
          ctaRef.current.style.opacity = String(ctaProgress);
          ctaRef.current.style.transform = `perspective(800px) rotateX(${rotateX}deg) scale(${scale})`;
        }
      }
      animationFrameId = requestAnimationFrame(renderLoop);
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    drawFrame(0);
    animationFrameId = requestAnimationFrame(renderLoop);

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [loadedCount, isVisible]);

  // Mouse parallax on canvas
  useEffect(() => {
    if (loadedCount < totalFrames) return;

    const handleMouseMove = (e: MouseEvent) => {
      if (!canvasRef.current) return;
      const xPos = (e.clientX / window.innerWidth - 0.5) * -15;
      const yPos = (e.clientY / window.innerHeight - 0.5) * -15;
      gsap.to(canvasRef.current, { x: xPos, y: yPos, duration: 0.6, ease: 'power2.out' });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [loadedCount]);

  // Don't render the section until frames are loaded (no full-screen loader this time)
  if (loadedCount < totalFrames) {
    const percent = Math.floor((loadedCount / totalFrames) * 100);
    return (
      <div className="relative w-full h-[300vh] bg-theme-main">
        <div className="sticky top-0 w-full h-screen flex flex-col items-center justify-center">
          <div className="font-bebas text-3xl text-gold/50 tracking-[0.4em] mb-6 uppercase">Loading Menu Experience</div>
          <div className="w-48 h-[2px] bg-theme-text/10 rounded-full overflow-hidden">
            <div className="h-full bg-gold/60 transition-all duration-200" style={{ width: `${percent}%` }} />
          </div>
          <div className="font-inter text-theme-text/30 text-xs mt-4">{percent}%</div>
        </div>
      </div>
    );
  }

  return (
    <div ref={containerRef} className="relative w-full h-[350vh] bg-theme-main">
      <div className="sticky top-0 w-full h-screen overflow-hidden">
        {/* Canvas Background */}
        <canvas
          ref={canvasRef}
          className="w-full h-full scale-[1.08]"
        />

        {/* Theme-aware overlay for readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-theme-main/40 via-theme-main/60 to-theme-main/80 pointer-events-none z-[1]" />

        {/* Cinematic letterbox bars */}
        <div className="absolute top-0 left-0 w-full h-16 bg-gradient-to-b from-theme-main to-transparent pointer-events-none z-[2]" />
        <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-theme-main to-transparent pointer-events-none z-[2]" />

        {/* --- Title Overlay --- */}
        <div
          ref={titleRef}
          className="absolute inset-0 z-10 flex flex-col items-center justify-center pointer-events-none"
          style={{ transformStyle: 'preserve-3d', opacity: 0 }}
        >
          <div className="mb-4 p-3 rounded-full border border-gold/30 bg-gold/10 backdrop-blur-sm">
            <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gold">
              <path d="M12 2L12 22" /><path d="M2 12L22 12" /><path d="m4 4 16 16" /><path d="m20 4-16 16" />
            </svg>
          </div>
          <h2 className="font-bebas text-2xl md:text-3xl text-gold tracking-[0.5em] uppercase mb-2">The Menu</h2>
          <h3 className="font-bebas text-6xl md:text-[8rem] leading-none text-theme-text tracking-widest text-center drop-shadow-2xl">
            Premium Services
          </h3>
          <p className="font-inter text-theme-text/50 text-sm md:text-base mt-4 tracking-widest uppercase">
            Scroll to explore our craft
          </p>
        </div>

        {/* --- Service Cards Grid --- */}
        <div
          ref={cardsContainerRef}
          className="absolute inset-0 z-10 flex flex-wrap items-center justify-center gap-4 md:gap-6 px-4 md:px-16 pointer-events-none"
          style={{ transformStyle: 'preserve-3d' }}
        >
          {SERVICES.map((service, i) => (
            <div
              key={i}
              className="pointer-events-auto w-[calc(50%-1rem)] md:w-[calc(33.333%-1.5rem)] max-w-[340px]"
              style={{
                opacity: 0,
                transformStyle: 'preserve-3d',
                willChange: 'transform, opacity',
              }}
            >
              <div className="relative group backdrop-blur-xl bg-theme-glass border border-theme-border rounded-2xl p-5 md:p-6 hover:bg-theme-bg-hover hover:border-gold/40 transition-all duration-500 cursor-pointer overflow-hidden">
                {/* Shimmering edge highlight */}
                <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-gold/40 to-transparent" />
                <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-gold/20 to-transparent" />

                <div className="flex items-center justify-between mb-3">
                  <h4 className="font-bebas text-xl md:text-2xl tracking-wider text-theme-text">{service.name}</h4>
                  <span className="font-bebas text-2xl md:text-3xl text-gold">{service.price}</span>
                </div>
                <p className="text-theme-text/40 text-[10px] md:text-xs uppercase tracking-widest leading-relaxed">{service.desc}</p>

                {/* Hover glow */}
                <div className="absolute -inset-1 bg-gold/5 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 -z-10" />
              </div>
            </div>
          ))}
        </div>

        <div
          ref={ctaRef}
          className="absolute inset-0 z-10 flex flex-col items-center justify-center pointer-events-none"
          style={{ opacity: 0, transformStyle: 'preserve-3d' }}
        >
          <div className="backdrop-blur-2xl bg-theme-glass border border-theme-border rounded-3xl p-10 md:p-16 text-center max-w-lg mx-4 shadow-[0_0_80px_rgba(201,168,76,0.15)]">
            <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-gold/10 border border-gold/30 flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gold">
                <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/>
              </svg>
            </div>
            <h3 className="font-bebas text-4xl md:text-5xl shimmer-text mb-4 tracking-wider">Ready to Experience?</h3>
            <p className="text-theme-text/50 text-sm mb-8 leading-relaxed font-inter">
              Book your session and discover why Turin's most discerning gentlemen trust Luca Barber for their grooming.
            </p>
            <MagneticButton
              href="#booking"
              className="pointer-events-auto inline-block bg-gradient-to-r from-gold to-gold-dark text-theme-main px-10 py-4 rounded-xl font-bold uppercase tracking-[0.2em] text-sm shadow-xl hover:shadow-2xl hover:scale-105 active:scale-95 transition-all"
            >
              Book Your Chair
            </MagneticButton>
          </div>
        </div>

        {/* Scroll progress indicator */}
        <div className="absolute right-6 top-1/2 -translate-y-1/2 z-20 hidden md:flex flex-col items-center gap-2">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="w-1 h-8 rounded-full bg-white/10 overflow-hidden">
              <div className="w-full bg-gold rounded-full transition-all duration-300" style={{ height: '0%' }} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
