import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useLocale } from '../i18n/useLocale';
import { motion } from 'motion/react';

gsap.registerPlugin(ScrollTrigger);

const GALLERY_IMAGES = [
  { src: 'https://images.unsplash.com/photo-1593702275687-f8b402bf1fb5?auto=format&fit=crop&q=80&w=1200', alt: 'Precision cut' },
  { src: 'https://images.unsplash.com/photo-1621605815971-fbc98d665033?auto=format&fit=crop&q=80&w=1200', alt: 'Traditional shaving' },
  { src: 'https://images.unsplash.com/photo-1585747860715-2ba37e788b70?auto=format&fit=crop&q=80&w=1200', alt: 'Master barber at work' },
  { src: 'https://images.unsplash.com/photo-1622286342621-4bd786c2447c?auto=format&fit=crop&q=80&w=1200', alt: 'Finishing touches' },
  { src: 'https://images.unsplash.com/photo-1532710093739-9470ac1d4ce1?auto=format&fit=crop&q=80&w=1200', alt: 'Haircut process' },
  { src: 'https://images.unsplash.com/photo-1503951914875-452162b0f3f1?auto=format&fit=crop&q=80&w=1200', alt: 'Barber tools' },
  { src: 'https://images.unsplash.com/photo-1599351431202-1e0f0137899a?auto=format&fit=crop&q=80&w=1200', alt: 'The final look' },
];

export const HorizontalGallery = () => {
  const { t } = useLocale();
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const section = sectionRef.current;
      const track = trackRef.current;
      const progressLine = progressRef.current;
      if (!section || !track || !progressLine) return;

      const totalScroll = track.scrollWidth - window.innerWidth;

      // Main horizontal scroll animation
      const st = ScrollTrigger.create({
        trigger: section,
        start: 'top top',
        end: () => `+=${Math.max(0, track.scrollWidth - window.innerWidth)}`,
        scrub: 1.5,
        pin: true,
        anticipatePin: 1,
        onUpdate: (self) => {
          const currentProgress = self.progress || 0;
          gsap.to(track, {
            x: -(track.scrollWidth - window.innerWidth) * currentProgress,
            duration: 0.5,
            ease: 'power2.out',
            overwrite: 'auto'
          });
          gsap.to(progressLine, {
            scaleX: currentProgress,
            duration: 0.3,
            ease: 'none',
            overwrite: 'auto'
          });
        }
      });

      // Individual image reveal and parallax
      const cards = track.querySelectorAll('.gallery-card');
      cards.forEach((card) => {
         const img = card.querySelector('img');
         if (img) {
           gsap.fromTo(img, 
             { scale: 1.4, x: -50 },
             {
               scale: 1,
               x: 0,
               ease: 'none',
               scrollTrigger: {
                 trigger: card,
                 containerAnimation: st.animation,
                 start: 'left right',
                 end: 'right left',
                 scrub: true
               }
             }
           );
         }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="gallery" className="relative overflow-hidden bg-theme-main h-screen">
      {/* Cinematic Background Gradient */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_0%_0%,rgba(201,168,76,0.03)_0%,transparent_50%)]" />

      {/* Header */}
      <div className="absolute top-0 left-0 right-0 z-20 flex items-end justify-between px-8 md:px-16 pt-24 pb-12">
        <div className="max-w-2xl">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-12 h-[1px] bg-gold/50" />
            <span className="text-[10px] tracking-[0.6em] uppercase text-gold font-bold">
              {t.gallery.label}
            </span>
          </div>
          <h2 className="font-cinzel text-5xl md:text-7xl lg:text-8xl text-theme-text tracking-tighter">
            {t.gallery.title}
          </h2>
        </div>
        <p className="hidden md:block text-2xl text-theme-text/30 max-w-sm text-right font-cormorant italic leading-relaxed">
          {t.gallery.subtitle}
        </p>
      </div>

      {/* Horizontal track */}
      <div ref={trackRef} className="flex items-center gap-10 px-8 md:px-16 h-full pt-48 pb-16" style={{ width: 'max-content' }}>
        {GALLERY_IMAGES.map((img, i) => (
          <div
            key={i}
            className="gallery-card relative group overflow-hidden rounded-3xl flex-shrink-0"
            style={{
              width: i % 3 === 0 ? '55vw' : i % 3 === 1 ? '40vw' : '32vw',
              aspectRatio: '16/10',
            }}
            data-cursor="Discover"
          >
            <img
              src={img.src}
              alt={img.alt}
              className="gallery-img w-full h-full object-cover grayscale brightness-75 group-hover:grayscale-0 group-hover:brightness-110 transition-all duration-[2s] ease-out"
              loading="lazy"
            />
            {/* Glass Overlays */}
            <div className="absolute inset-x-0 bottom-0 p-8 translate-y-full group-hover:translate-y-0 transition-transform duration-700 ease-parallax">
              <div className="glass-card-strong p-6 rounded-2xl border border-gold/20 flex items-center justify-between">
                <div>
                  <span className="text-[8px] tracking-[0.4em] uppercase text-gold font-bold block mb-2">{img.alt}</span>
                  <p className="font-cinzel text-xl text-theme-text">{String(i + 1).padStart(2, '0')}</p>
                </div>
                <div className="w-10 h-10 rounded-full border border-gold/30 flex items-center justify-center">
                  <svg className="w-4 h-4 text-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </div>
              </div>
            </div>
            {/* Vignette */}
            <div className="absolute inset-0 bg-gradient-to-t from-theme-main/80 via-transparent to-transparent opacity-40 group-hover:opacity-20 transition-opacity duration-700" />
          </div>
        ))}

        {/* End spacer with CTA */}
        <div className="flex-shrink-0 w-[45vw] h-full flex flex-col items-center justify-center">
          <div className="text-center group/follow">
             <div 
               className="mb-8 animate-pulse"
             >
               <span className="font-cinzel text-8xl md:text-[12rem] text-gold/10 font-bold select-none leading-none">@LUCA BARBER</span>
             </div>
            <p className="font-cormorant italic text-3xl text-theme-text/40 mb-10">{t.contact.followUs || 'Follow our journey'}</p>
            <a
              href="#"
              className="group inline-flex items-center gap-4 text-gold text-sm tracking-[0.4em] uppercase font-black"
              data-cursor="Instagram"
            >
              <span className="relative">
                 Instagram
                 <span className="absolute -bottom-2 left-0 w-full h-[1px] bg-gold scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
              </span>
              <div className="w-12 h-12 rounded-full border border-gold/30 flex items-center justify-center group-hover:bg-gold group-hover:text-theme-main transition-all duration-500">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>
              </div>
            </a>
          </div>
        </div>
      </div>

      {/* Progress tracking */}
      <div className="absolute bottom-16 left-8 right-8 flex items-center gap-10 px-8">
        <span className="text-[10px] uppercase tracking-[0.4em] text-theme-text/20 font-bold">01</span>
        <div className="relative flex-grow h-[1px] bg-theme-border/50 overflow-hidden">
          <div
            ref={progressRef}
            className="absolute top-0 left-0 w-full h-full bg-gold/50 origin-left"
            style={{ transform: 'scaleX(0)' }}
          />
        </div>
        <span className="text-[10px] uppercase tracking-[0.4em] text-theme-text/20 font-bold">{String(GALLERY_IMAGES.length).padStart(2, '0')}</span>
      </div>
    </section>
  );
};
