import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useLocale } from '../i18n/useLocale';
import { MagneticButton } from './MagneticButton';
import { motion } from 'motion/react';

gsap.registerPlugin(ScrollTrigger);

export const Scrollytelling = () => {
  const { t } = useLocale();
  const containerRef = useRef<HTMLDivElement>(null);
  const heroImageRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const scrollPromptRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    const heroImage = heroImageRef.current;
    const title = titleRef.current;
    const scrollPrompt = scrollPromptRef.current;

    if (!container || !heroImage || !title || !scrollPrompt) return;

    // Parallax Effect for the Hero Image
    gsap.to(heroImage, {
      y: '20%',
      ease: 'none',
      scrollTrigger: {
        trigger: container,
        start: 'top top',
        end: 'bottom top',
        scrub: true
      }
    });

    // Fade out elements on scroll
    gsap.to([title, scrollPrompt], {
      opacity: 0,
      y: -50,
      ease: 'power2.inOut',
      scrollTrigger: {
        trigger: container,
        start: 'top top',
        end: '20% top',
        scrub: true
      }
    });

    // Initial appearance
    gsap.from(title, {
      opacity: 0,
      y: 100,
      duration: 1.5,
      ease: 'power4.out',
      delay: 0.5
    });

    return () => {
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, []);

  return (
    <div ref={containerRef} className="relative w-full h-[150vh] bg-theme-main overflow-hidden">
      {/* Hero Background with Parallax */}
      <div 
        ref={heroImageRef}
        className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat scale-110"
        style={{ 
          backgroundImage: 'url("/assets/images/hero/hero@1200.webp")',
          height: '140%'
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-theme-main/60 via-transparent to-theme-main" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(201,168,76,0.1),transparent_70%)]" />
      </div>

      {/* Cinematic Overlays */}
      <div className="absolute inset-0 z-[1] pointer-events-none opacity-20 bg-gradient-to-tr from-black/5 to-transparent" />

      {/* Content Overlay */}
      <div className="sticky top-0 w-full h-screen flex flex-col items-center justify-center z-10 pointer-events-none px-6">
        <div ref={titleRef} className="flex flex-col items-center justify-center w-full">
          {/* Identity & Subtitle Wrapper */}
          <div className="relative flex flex-col items-center">
            {/* Top Tagline Badge */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2, delay: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className="flex items-center gap-4 md:gap-6 mb-8 md:mb-12"
            >
              <div className="w-12 md:w-24 h-[1px] bg-gradient-to-r from-transparent to-gold/50" />
              <p className="font-inter text-[9px] md:text-[11px] tracking-[0.8em] md:tracking-[1em] uppercase text-gold font-black whitespace-nowrap">
                {t.hero.tagline}
              </p>
              <div className="w-12 md:w-24 h-[1px] bg-gradient-to-l from-transparent to-gold/50" />
            </motion.div>

            {/* Main Brand Title */}
            <h1 className="flex flex-col items-center font-cinzel text-7xl sm:text-8xl md:text-[10rem] lg:text-[13rem] xl:text-[15rem] leading-[0.85] text-theme-text tracking-tighter text-center mb-10 md:mb-16">
              <motion.span 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.9 }}
                className="block font-cormorant italic text-3xl md:text-5xl lg:text-6xl text-gold/60 tracking-[0.1em] md:tracking-[0.2em] mb-4 font-light relative z-10"
              >
                {t.hero.title1} <span className="font-semibold text-gold">{t.hero.title2}</span>
              </motion.span>
              <span className="shimmer-text block relative z-0 drop-shadow-2xl">
                LUCA BARBER
              </span>
            </h1>

            {/* Subtitle / Promise */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 1.1 }}
              className="relative max-w-2xl px-8 py-6 md:py-8 border border-theme-border/20 bg-theme-main/30 backdrop-blur-md rounded-3xl text-center shadow-2xl mx-4"
            >
              <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 flex gap-3">
                 <div className="w-1.5 h-1.5 rounded-full bg-gold/50 shadow-[0_0_10px_rgba(201,168,76,0.5)]" />
                 <div className="w-1.5 h-1.5 rounded-full bg-gold/80 shadow-[0_0_10px_rgba(201,168,76,0.8)]" />
                 <div className="w-1.5 h-1.5 rounded-full bg-gold/50 shadow-[0_0_10px_rgba(201,168,76,0.5)]" />
              </div>
              <p className="font-cormorant italic text-xl md:text-2xl lg:text-3xl text-theme-text/80 leading-relaxed font-light">
                {t.hero.subtitle}
              </p>
            </motion.div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div ref={scrollPromptRef} className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center">
          <div className="flex flex-col items-center gap-6">
            <span className="text-[9px] uppercase tracking-[0.5em] text-theme-text/30 font-bold whitespace-nowrap">
              {t.hero.scroll}
            </span>
            <div className="w-[1px] h-16 relative overflow-hidden bg-theme-border/30">
              <div className="absolute top-0 left-0 w-full h-full bg-gold animate-scroll-line" />
            </div>
          </div>
          </div>
        </div>
      </div>
    );
};
