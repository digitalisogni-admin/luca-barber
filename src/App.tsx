import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Scrollytelling } from './components/Scrollytelling';
import { CustomCursor } from './components/CustomCursor';
import { TextReveal } from './components/TextReveal';
import { MagneticButton } from './components/MagneticButton';
import { MarqueeText } from './components/MarqueeText';
import { HorizontalGallery } from './components/HorizontalGallery';
import { LanguageSwitcher } from './components/LanguageSwitcher';
import { BookingSystem } from './components/BookingSystem';
import { TeamSection } from './components/TeamSection';
import { ThemeToggle } from './components/ThemeToggle';
import { GDPRConsent } from './components/GDPRConsent';
import { AccessibilityWidget } from './components/AccessibilityWidget';
import { LegalModal } from './components/LegalModal';
import { useLocale } from './i18n/useLocale';
import { useTheme } from './context/ThemeProvider';
import { motion, AnimatePresence } from 'motion/react';

gsap.registerPlugin(ScrollTrigger);

/* ─── Navigation ─── */
const Navigation = ({ onBook }: { onBook: () => void }) => {
  const { t } = useLocale();
  const { theme, toggleTheme } = useTheme();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 80);
    };
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const links = [
    { href: '#services', label: t.nav.services },
    { href: '#gallery', label: t.nav.gallery },
    { href: '#about', label: t.nav.about },
    { href: '#contact', label: t.nav.contact },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-[1000] transition-all duration-700 ${
        scrolled
          ? 'py-4 bg-theme-main/80 backdrop-blur-2xl border-b border-theme-border/50'
          : 'py-8 bg-transparent'
      }`}
    >
      <div className="max-w-[1600px] mx-auto px-8 md:px-16 flex items-center justify-between">
        {/* Logo */}
        <a href="#" className="flex items-center gap-4 group" data-cursor="Luca Barber">
          <div className="relative overflow-hidden">
            <span className="font-cinzel text-xl md:text-2xl font-bold tracking-[0.3em] text-theme-text group-hover:text-gold transition-colors duration-500">
              LUCA BARBER
            </span>
            <div className="absolute -bottom-1 left-0 w-full h-[1px] bg-gold scale-x-0 group-hover:scale-x-100 transition-transform duration-700 origin-left" />
          </div>
        </a>

        {/* Desktop links */}
        <div className="hidden lg:flex items-center gap-12">
          {links.map((link, i) => (
            <a
              key={link.href}
              href={link.href}
              className="text-[10px] tracking-[0.4em] uppercase text-theme-text/40 hover:text-gold transition-all duration-400 font-bold relative group"
            >
              <span className="relative z-10">{link.label}</span>
              <span className="absolute -bottom-2 left-0 w-0 h-[1px] bg-gold group-hover:w-full transition-all duration-500" />
            </a>
          ))}
        </div>

        {/* Right side */}
        <div className="flex items-center gap-6">
          <div className="hidden sm:flex items-center gap-6">
            <LanguageSwitcher />
            <div className="w-px h-4 bg-theme-border/50" />
            <ThemeToggle />
          </div>

          <MagneticButton
            onClick={onBook}
            className="hidden md:inline-flex px-8 py-3 rounded-full bg-gold/10 border border-gold/30 text-[10px] tracking-[0.4em] uppercase text-gold hover:bg-gold hover:text-theme-main font-bold transition-all duration-500 shadow-lg shadow-gold/5"
          >
            {t.nav.book}
          </MagneticButton>

          {/* Mobile burger */}
          <button
            className="lg:hidden w-10 h-10 flex flex-col items-center justify-center gap-1.5 rounded-full border border-theme-border/50 bg-theme-main/20 backdrop-blur-sm"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            <span className={`block h-[1px] bg-theme-text transition-all duration-500 ${menuOpen ? 'w-6 rotate-45 translate-y-[4px]' : 'w-5'}`} />
            <span className={`block h-[1px] bg-theme-text transition-all duration-500 ${menuOpen ? 'opacity-0' : 'w-3'}`} />
            <span className={`block h-[1px] bg-theme-text transition-all duration-500 ${menuOpen ? 'w-6 -rotate-45 -translate-y-[4px]' : 'w-5'}`} />
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="lg:hidden absolute top-full left-0 right-0 glass-card-strong border-b border-theme-border/50 overflow-hidden"
          >
            <div className="flex flex-col items-center gap-8 py-12">
              {links.map((link, i) => (
                <motion.a
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  key={link.href}
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  className="text-xs tracking-[0.5em] uppercase text-theme-text/60 hover:text-gold transition-colors duration-300 font-bold"
                >
                  {link.label}
                </motion.a>
              ))}
              <div className="flex items-center gap-8 pt-4 border-t border-theme-border/30 w-full justify-center">
                <LanguageSwitcher />
                <ThemeToggle />
              </div>
              <MagneticButton
                onClick={onBook}
                className="px-12 py-4 rounded-full bg-gold text-theme-main text-[11px] tracking-[0.4em] uppercase font-bold"
              >
                {t.nav.book}
              </MagneticButton>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

/* ─── Services Section ─── */
const ServicesSection = ({ onBook }: { onBook: () => void }) => {
  const { t, dir } = useLocale();
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const cards = sectionRef.current?.querySelectorAll('.service-card');
    if (!cards) return;

    cards.forEach((card, i) => {
      gsap.fromTo(
        card,
        { y: 80, opacity: 0, rotateX: -8 },
        {
          y: 0,
          opacity: 1,
          rotateX: 0,
          duration: 1.2,
          delay: i * 0.1,
          ease: 'power4.out',
          scrollTrigger: {
            trigger: card,
            start: 'top 90%',
            toggleActions: 'play none none none',
          },
        }
      );
    });
  }, []);

  return (
    <section ref={sectionRef} id="services" className="relative py-32 md:py-56 bg-theme-main overflow-hidden">
      {/* Background radial glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-[radial-gradient(circle_at_50%_0%,rgba(201,168,76,0.05)_0%,transparent_70%)] pointer-events-none" />

      <div className="max-w-[1400px] mx-auto px-8 md:px-16">
        {/* Header */}
        <div className={`mb-32 ${dir === 'rtl' ? 'text-right' : ''}`}>
          <div className="flex items-center gap-4 mb-6">
            <div className="w-12 h-[1px] bg-gold/50" />
            <span className="text-[10px] tracking-[0.6em] uppercase text-gold font-bold">
              {t.services.label}
            </span>
          </div>
          <TextReveal
            tag="h2"
            className="font-cinzel text-5xl md:text-7xl lg:text-8xl text-theme-text mb-8 tracking-tighter"
          >
            {t.services.title}
          </TextReveal>
          <p className="font-cormorant italic text-2xl md:text-3xl text-theme-text/30 max-w-2xl leading-relaxed">
            {t.services.subtitle}
          </p>
        </div>

        {/* Service cards grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {t.services.items.map((service, i) => (
            <div
              key={i}
              className="service-card glass-card rounded-3xl p-10 group hover:border-gold/30 transition-all duration-700 relative overflow-hidden"
              data-cursor="Book Now"
            >
              {/* Background Number */}
              <span className="absolute -top-4 -right-4 font-cinzel text-[10rem] font-bold text-theme-text/[0.02] group-hover:text-gold/[0.05] transition-colors duration-700 leading-none select-none pointer-events-none">
                {i + 1}
              </span>

              <div className="relative z-10">
                {/* Image Wrap */}
                <div className="relative h-64 mb-10 overflow-hidden rounded-2xl group/img">
                  <img 
                    src={[
                      '/assets/images/services/process@1200.webp',
                      '/assets/images/services/interior@1200.webp',
                      '/assets/images/services/process@1200.webp',
                      '/assets/images/services/interior@1200.webp',
                      '/assets/images/services/process@1200.webp',
                      '/assets/images/services/interior@1200.webp'
                    ][i % 6]} 
                    alt={service.name}
                    className="w-full h-full object-cover grayscale brightness-75 group-hover:grayscale-0 group-hover:brightness-100 group-hover:scale-110 transition-all duration-[1.5s] ease-out"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-theme-main/80 via-transparent to-transparent opacity-60" />
                  
                  {/* Price Tag Overlay */}
                  <div className="absolute top-6 right-6 px-4 py-2 rounded-lg bg-gold text-theme-main font-cinzel font-bold text-lg shadow-xl shadow-gold/20 transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                    {service.price}
                  </div>
                </div>

                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-cinzel text-xl text-theme-text group-hover:text-gold transition-colors duration-500 tracking-wider">
                    {service.name}
                  </h3>
                </div>

                <p className="text-xs text-theme-text/40 leading-relaxed mb-10 font-inter uppercase tracking-[0.1em]">
                  {service.desc}
                </p>

                <div className="flex items-center justify-between mt-auto">
                   <span className="text-[10px] tracking-[0.3em] uppercase text-theme-text/30 font-bold">
                    {service.duration}
                  </span>
                  <button
                    onClick={onBook}
                    className="flex items-center gap-3 text-[10px] tracking-[0.4em] uppercase text-gold font-black transition-all duration-300 group/cta"
                  >
                    <span>{t.services.bookCta}</span>
                    <div className="w-8 h-[1px] bg-gold scale-x-50 group-hover/cta:scale-x-100 transition-transform duration-500 origin-left" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

/* ─── About Section ─── */
const AboutSection = () => {
  const { t, dir } = useLocale();
  const sectionRef = useRef<HTMLElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    gsap.fromTo(section.querySelector('.about-image'),
      { scale: 1.2, filter: 'blur(20px)' },
      {
        scale: 1,
        filter: 'blur(0px)',
        duration: 1.5,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: section,
          start: 'top 80%',
        }
      }
    );

    const els = statsRef.current?.querySelectorAll('.stat-item');
    if (els) {
      els.forEach((el, i) => {
        gsap.fromTo(el,
          { y: 60, opacity: 0, skewY: 5 },
          {
            y: 0,
            opacity: 1,
            skewY: 0,
            duration: 1,
            delay: i * 0.1,
            ease: 'expo.out',
            scrollTrigger: {
              trigger: el,
              start: 'top 95%',
            }
          }
        );
      });
    }
  }, []);

  return (
    <section ref={sectionRef} id="about" className="relative py-44 bg-theme-surface overflow-hidden">
      {/* Cinematic Background Gradient */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_100%_0%,rgba(201,168,76,0.05)_0%,transparent_50%)]" />
      
      <div className="max-w-[1400px] mx-auto px-8 md:px-16 relative z-10">
        <div className={`grid grid-cols-1 lg:grid-cols-2 gap-24 items-center ${dir === 'rtl' ? 'direction-rtl' : ''}`}>
          {/* Image column with parallax effect */}
          <div className="relative group" data-cursor="Since 2018">
            <div className="relative overflow-hidden rounded-[3rem] aspect-[4/5] shadow-2xl border border-theme-border/50">
              <img
                src="/assets/images/hero/hero@1200.webp"
                alt="Luca Barber barber shop interior"
                className="about-image w-full h-full object-cover transition-transform duration-[2s] group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-theme-main/60 via-transparent to-transparent opacity-40" />
            </div>
            
            {/* Floating Achievement Badges */}
            <div className="absolute -bottom-10 -right-10 md:right-12 z-20">
              <div className="glass-card-strong p-8 rounded-3xl border border-gold/30 shadow-[0_20px_50px_rgba(201,168,76,0.15)] flex flex-col items-center">
                <div className="shimmer-text font-cinzel text-5xl font-black mb-2 tracking-tighter">4.9</div>
                <div className="flex gap-1 mb-2">
                  {[1,2,3,4,5].map(s => <svg key={s} className="w-3 h-3 text-gold fill-current" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>)}
                </div>
                <div className="text-[9px] tracking-[0.4em] uppercase text-theme-text/40 font-bold">Google Reviews</div>
              </div>
            </div>

            <div className="absolute -top-10 -left-10 w-48 h-48 bg-gold/[0.03] rounded-full blur-3xl" />
          </div>

          {/* Text column */}
          <div className={dir === 'rtl' ? 'text-right' : ''}>
            <div className="flex items-center gap-4 mb-8">
              <div className="w-12 h-[1px] bg-gold/50" />
              <span className="text-[10px] tracking-[0.6em] uppercase text-gold font-bold">
                {t.about.label}
              </span>
            </div>
            
            <h2 className="font-cinzel text-5xl md:text-7xl text-theme-text mb-12 leading-tight tracking-tighter">
              {t.about.title}
            </h2>
            
            <p className="font-cormorant text-2xl md:text-3xl text-theme-text/50 leading-relaxed mb-10 italic">
              {t.about.p1}
            </p>
            
            <p className="text-sm text-theme-text/30 leading-loose font-inter mb-16 max-w-xl uppercase tracking-wider">
              {t.about.p2}
            </p>

            <div className="w-full h-px bg-theme-border/50 mb-16 relative">
              <div className="absolute top-0 left-0 w-24 h-full bg-gold" />
            </div>

            {/* Stats Grid */}
            <div ref={statsRef} className="grid grid-cols-2 gap-12">
              {t.about.stats.map((stat, i) => (
                <div key={i} className="stat-item">
                  <div className="shimmer-text font-cinzel text-4xl md:text-5xl font-black mb-3">
                    {stat.value}
                  </div>
                  <div className="text-[9px] tracking-[0.4em] uppercase text-theme-text/20 font-black">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

/* ─── Premium CTA Section ─── */
const CTASection = () => {
  const { t } = useLocale();
  return (
    <section className="relative py-44 bg-theme-surface overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(201,168,76,0.1)_0%,transparent_60%)]" />
      <div className="max-w-[1400px] mx-auto px-8 md:px-16 relative z-10">
        <div className="glass-card-strong p-16 md:p-32 rounded-[4rem] border border-gold/20 flex flex-col items-center text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1 }}
            className="mb-12"
          >
            <div className="w-20 h-20 rounded-full border border-gold/30 flex items-center justify-center mb-10 mx-auto">
              <svg className="w-8 h-8 text-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h2 className="font-cinzel text-6xl md:text-8xl text-theme-text mb-10 tracking-tighter">
              {t.ctaSection.title}
            </h2>
            <p className="font-cormorant italic text-2xl md:text-3xl text-theme-text/40 max-w-2xl mx-auto leading-relaxed">
              {t.ctaSection.subtitle}
            </p>
          </motion.div>
          
          <MagneticButton
            href="#booking"
            onClick={() => window.dispatchEvent(new CustomEvent('open-booking'))}
            className="px-16 py-6 rounded-full bg-gold text-theme-main text-xs tracking-[0.5em] uppercase font-black hover:scale-105 transition-transform duration-500 shadow-[0_20px_50px_rgba(201,168,76,0.2)]"
          >
            {t.ctaSection.button}
          </MagneticButton>
        </div>
      </div>
    </section>
  );
};

/* ─── Premium Contact Section ─── */
const ContactSection = () => {
  const { t, dir } = useLocale();
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('submitting');
    
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setStatus('success');
        setFormData({ name: '', email: '', message: '' });
        setTimeout(() => setStatus('idle'), 5000);
      } else {
        throw new Error('Failed to send');
      }
    } catch (err) {
      console.error('Contact error:', err);
      setStatus('error');
      setTimeout(() => setStatus('idle'), 3000);
    }
  };

  return (
    <section id="contact" className="relative py-44 bg-theme-main overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom,rgba(201,168,76,0.03)_0%,transparent_70%)]" />
      <div className="max-w-[1400px] mx-auto px-8 md:px-16 grid grid-cols-1 lg:grid-cols-2 gap-24 relative z-10">
        <div className={dir === 'rtl' ? 'direction-rtl text-right' : 'text-left'}>
          <div className="flex items-center gap-4 mb-8">
             <div className="w-10 h-px bg-gold/50" />
             <span className="text-[10px] tracking-[0.5em] uppercase text-gold font-bold">{t.contact.label}</span>
          </div>
          <h2 className="font-cinzel text-6xl md:text-8xl text-theme-text mb-12 tracking-tighter">
            {t.contact.title}
          </h2>
          <div className="space-y-12">
             <div>
                <h4 className="text-[9px] tracking-[0.4em] uppercase text-gold font-black mb-4">Location</h4>
                <p className="font-cormorant italic text-3xl text-theme-text/50">{t.contact.address}</p>
             </div>
             <div>
                <h4 className="text-[9px] tracking-[0.4em] uppercase text-gold font-black mb-4">Inquiry</h4>
                <p className="font-cinzel text-3xl text-theme-text">{t.contact.phone}</p>
             </div>
             <div>
                <h4 className="text-[9px] tracking-[0.4em] uppercase text-gold font-black mb-4">{t.contact.hours}</h4>
                <p className="font-cormorant italic text-2xl text-theme-text/40">{t.contact.hoursDetail}</p>
             </div>
          </div>
        </div>

        <div className="glass-card-strong p-12 md:p-16 rounded-[3rem] border border-gold/10">
          <form onSubmit={handleSubmit} className="space-y-10">
            <div className="space-y-2">
              <label className="text-[9px] tracking-[0.3em] uppercase text-gold font-black">{t.contact.form.name}</label>
              <input 
                type="text" 
                required
                value={formData.name}
                onChange={e => setFormData({...formData, name: e.target.value})}
                className="w-full bg-theme-surface/30 border-b border-theme-border/50 py-4 text-theme-text focus:outline-none focus:border-gold transition-colors duration-500" 
              />
            </div>
            <div className="space-y-2">
              <label className="text-[9px] tracking-[0.3em] uppercase text-gold font-black">{t.contact.form.email}</label>
              <input 
                type="email" 
                required
                value={formData.email}
                onChange={e => setFormData({...formData, email: e.target.value})}
                className="w-full bg-theme-surface/30 border-b border-theme-border/50 py-4 text-theme-text focus:outline-none focus:border-gold transition-colors duration-500" 
              />
            </div>
            <div className="space-y-2">
              <label className="text-[9px] tracking-[0.3em] uppercase text-gold font-black">{t.contact.form.message}</label>
              <textarea 
                rows={4}
                required
                value={formData.message}
                onChange={e => setFormData({...formData, message: e.target.value})}
                className="w-full bg-theme-surface/30 border-b border-theme-border/50 py-4 text-theme-text focus:outline-none focus:border-gold transition-colors duration-500 resize-none" 
              />
            </div>
            <AnimatePresence mode="wait">
              {status === 'success' ? (
                <motion.div initial={{opacity:0}} animate={{opacity:1}} className="text-gold font-cinzel text-sm text-center py-4">Message Sent Perfectly.</motion.div>
              ) : status === 'error' ? (
                <motion.div initial={{opacity:0}} animate={{opacity:1}} className="text-red-500 font-cinzel text-sm text-center py-4">Something went wrong. Try again.</motion.div>
              ) : (
                <button type="submit" disabled={status === 'submitting'} className="w-full py-6 rounded-2xl bg-gold text-theme-main text-[10px] tracking-[0.5em] uppercase font-black hover:scale-[1.02] transition-transform duration-500 shadow-xl shadow-gold/20">
                  {status === 'submitting' ? '...' : t.contact.form.send}
                </button>
              )}
            </AnimatePresence>
          </form>
        </div>
      </div>
    </section>
  );
};


/* ─── Cinematic Footer ─── */
const Footer = () => {
  const { t } = useLocale();
  return (
    <footer className="py-20 border-t border-theme-border/50">
      <div className="max-w-[1400px] mx-auto px-8 md:px-16">
        <div className="flex flex-col md:flex-row items-center justify-between gap-12">
          <div className="flex items-center gap-6">
            {[
              { label: 'Instagram', href: 'https://instagram.com/lucabarber' },
              { label: 'TikTok', href: 'https://tiktok.com/@lucabarber' },
              { label: 'WhatsApp', href: 'https://wa.me/39123456789' }
            ].map(social => (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[10px] tracking-[0.2em] uppercase text-theme-text/30 hover:text-gold transition-colors duration-300"
                data-cursor=""
              >
                {social.label}
              </a>
            ))}
            <span className="text-theme-border w-px h-3 mx-2 hidden md:block" />
            <button 
              onClick={() => window.dispatchEvent(new CustomEvent('open-legal', { detail: 'privacy' }))}
              className="text-[9px] tracking-[0.2em] uppercase text-theme-text/30 hover:text-gold transition-colors duration-300"
            >
              Privacy
            </button>
            <button 
              onClick={() => window.dispatchEvent(new CustomEvent('open-legal', { detail: 'terms' }))}
              className="text-[9px] tracking-[0.2em] uppercase text-theme-text/30 hover:text-gold transition-colors duration-300"
            >
              Terms
            </button>
          </div>

          <p className="text-[10px] tracking-[0.15em] uppercase text-theme-text/20">
            {t.footer.rights}
          </p>
        </div>
      </div>
    </footer>
  );
};

/* ─── Main App ─── */
const App = () => {
  const { t, dir } = useLocale();
  const [showBooking, setShowBooking] = useState(false);
  const [legalState, setLegalState] = useState<{ open: boolean; type: 'privacy' | 'terms' }>({
    open: false,
    type: 'privacy',
  });

  useEffect(() => {
    const handleOpenLegal = (e: any) => {
      setLegalState({ open: true, type: e.detail });
    };
    window.addEventListener('open-legal', handleOpenLegal);
    
    const handleOpenBooking = () => setShowBooking(true);
    window.addEventListener('open-booking', handleOpenBooking);

    return () => {
      window.removeEventListener('open-legal', handleOpenLegal);
      window.removeEventListener('open-booking', handleOpenBooking);
    };
  }, []);

  return (
    <div dir={dir} className="relative">
      <svg style={{ visibility: 'hidden', position: 'absolute' }} width="0" height="0">
        <defs>
          <filter id="liquid-goo">
            <feGaussianBlur in="SourceGraphic" stdDeviation="10" result="blur" />
            <feColorMatrix
              in="blur"
              mode="matrix"
              values="1 0 0 0 0  
                      0 1 0 0 0  
                      0 0 1 0 0  
                      0 0 0 19 -9"
              result="goo"
            />
            <feComposite in="SourceGraphic" in2="goo" operator="atop" />
          </filter>
        </defs>
      </svg>
      <div className="premium-grain" />
      
      {/* WhatsApp Button */}
      <a 
        href="https://wa.me/39123456789"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed z-[1001] w-14 h-14 rounded-full bg-[#25D366] text-white flex items-center justify-center shadow-2xl hover:scale-110 transition-transform duration-500 group"
        style={{ bottom: 'max(env(safe-area-inset-bottom, 2rem), 2rem)', right: 'max(env(safe-area-inset-right, 2rem), 1.5rem)' }}
        data-cursor="WhatsApp"
      >
        <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
        </svg>
        <span className="absolute right-full mr-4 bg-theme-surface border border-gold/30 px-4 py-2 rounded-xl text-[10px] tracking-[0.2em] uppercase text-gold opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap pointer-events-none">
          Concierge Link
        </span>
      </a>

      <CustomCursor />
      <Navigation onBook={() => setShowBooking(true)} />

      {/* Hero — Frame Scrollytelling */}
      <Scrollytelling />

      {/* Marquee Divider */}
      <MarqueeText
        text={t.marquee}
        speed={35}
        className="text-xl md:text-3xl text-theme-text/[0.06] border-y border-theme-border"
        rtl={dir === 'rtl'}
      />

      {/* Services */}
      <ServicesSection onBook={() => setShowBooking(true)} />

      {/* Marquee Divider 2 */}
      <MarqueeText
        text="LUCA BARBER  ·  PREMIUM GROOMING  ·  TURIN  ·  EST. 2018  ·  "
        speed={40}
        className="text-4xl md:text-6xl text-theme-text/[0.03] py-8"
        rtl={dir === 'rtl'}
      />

      {/* Horizontal Gallery */}
      <HorizontalGallery />

      {/* Team */}
      <TeamSection />

      {/* About */}
      <AboutSection />

      {/* CTA Section */}
      <CTASection />

      {/* Marquee Divider 3 */}
      <MarqueeText
        text="EXCELLENCE · TRADITION · INNOVATION · LUCA BARBER · "
        speed={25}
        className="text-2xl md:text-4xl text-gold/[0.08] py-4 bg-theme-surface"
        rtl={dir === 'rtl'}
      />

      {/* Contact */}
      <ContactSection />

      {/* Footer */}
      <Footer />

      {/* GDPR Consent & Accessibility */}
      <GDPRConsent />
      <AccessibilityWidget />

      <AnimatePresence>
        {showBooking && <BookingSystem onClose={() => setShowBooking(false)} />}
      </AnimatePresence>

      <LegalModal 
        isOpen={legalState.open} 
        type={legalState.type} 
        onClose={() => setLegalState(prev => ({ ...prev, open: false }))} 
      />
    </div>
  );
};

export default App;
