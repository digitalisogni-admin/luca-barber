import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Accessibility, X, Eye, Type, Zap, Focus, BookOpen } from 'lucide-react';
import { useLocale } from '../i18n/useLocale';

interface A11yPrefs {
  highContrast: boolean;
  largeText: boolean;
  reducedMotion: boolean;
  focusOutlines: boolean;
  dyslexiaFont: boolean;
}

const defaultPrefs: A11yPrefs = {
  highContrast: false,
  largeText: false,
  reducedMotion: false,
  focusOutlines: false,
  dyslexiaFont: false,
};

export const AccessibilityWidget = () => {
  const { t } = useLocale();
  const [open, setOpen] = useState(false);
  const [prefs, setPrefs] = useState<A11yPrefs>(() => {
    try {
      const saved = localStorage.getItem('lucabarber-a11y');
      return saved ? { ...defaultPrefs, ...JSON.parse(saved) } : defaultPrefs;
    } catch {
      return defaultPrefs;
    }
  });
  const panelRef = useRef<HTMLDivElement>(null);

  // Apply prefs to DOM
  useEffect(() => {
    const root = document.documentElement;
    root.classList.toggle('a11y-high-contrast', prefs.highContrast);
    root.classList.toggle('a11y-large-text', prefs.largeText);
    root.classList.toggle('a11y-reduced-motion', prefs.reducedMotion);
    root.classList.toggle('a11y-focus-outlines', prefs.focusOutlines);
    root.classList.toggle('a11y-dyslexia', prefs.dyslexiaFont);
    
    localStorage.setItem('lucabarber-a11y', JSON.stringify(prefs));
  }, [prefs]);

  // Close on outside click
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (panelRef.current && !panelRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    if (open) document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, [open]);

  const toggle = (key: keyof A11yPrefs) => {
    setPrefs(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const resetAll = () => setPrefs(defaultPrefs);

  const options = [
    { key: 'highContrast' as const, icon: Eye, label: t.accessibility.highContrast.label, desc: t.accessibility.highContrast.desc },
    { key: 'largeText' as const, icon: Type, label: t.accessibility.largeText.label, desc: t.accessibility.largeText.desc },
    { key: 'reducedMotion' as const, icon: Zap, label: t.accessibility.reducedMotion.label, desc: t.accessibility.reducedMotion.desc },
    { key: 'focusOutlines' as const, icon: Focus, label: t.accessibility.focusOutlines.label, desc: t.accessibility.focusOutlines.desc },
    { key: 'dyslexiaFont' as const, icon: BookOpen, label: t.accessibility.dyslexiaFont.label, desc: t.accessibility.dyslexiaFont.desc },
  ];

  const activeCount = Object.values(prefs).filter(Boolean).length;

  return (
    <div ref={panelRef} className="fixed bottom-8 left-8 z-[1002]">
      {/* Toggle Button */}
      <button
        onClick={() => setOpen(!open)}
        className="relative w-14 h-14 rounded-full bg-theme-surface border border-theme-border/50 flex items-center justify-center shadow-2xl hover:scale-110 transition-all duration-500 group"
        aria-label={t.accessibility.aria.open}
        aria-expanded={open}
        data-cursor="Accessibility"
      >
        <Accessibility className="w-6 h-6 text-gold group-hover:scale-110 transition-transform" />
        {activeCount > 0 && (
          <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-gold text-theme-main text-[9px] font-bold flex items-center justify-center shadow-lg">
            {activeCount}
          </span>
        )}
      </button>

      {/* Panel */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="absolute bottom-[72px] left-0 w-[320px] glass-card-strong rounded-3xl border border-theme-border/40 overflow-hidden shadow-[0_30px_80px_rgba(0,0,0,0.3)]"
            role="dialog"
            aria-label={t.accessibility.aria.settings}
          >
            {/* Header */}
            <div className="p-6 border-b border-theme-border/20 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-gold/10 border border-gold/20 flex items-center justify-center">
                  <Accessibility className="w-4 h-4 text-gold" />
                </div>
                <div>
                  <h3 className="font-cinzel text-sm tracking-widest text-theme-text uppercase">{t.accessibility.title}</h3>
                  <p className="text-[8px] tracking-[0.2em] uppercase text-theme-text/20">{t.accessibility.subtitle}</p>
                </div>
              </div>
              <button
                onClick={() => setOpen(false)}
                className="w-8 h-8 rounded-full bg-theme-main/40 border border-theme-border/30 flex items-center justify-center text-theme-text/20 hover:text-gold transition-colors"
                aria-label={t.accessibility.aria.close}
              >
                <X size={14} />
              </button>
            </div>

            {/* Options */}
            <div className="p-4 space-y-1.5">
              {options.map(({ key, icon: Icon, label, desc }) => (
                <button
                  key={key}
                  onClick={() => toggle(key)}
                  className={`w-full flex items-center gap-4 p-4 rounded-2xl border transition-all duration-500 text-left group ${
                    prefs[key]
                      ? 'bg-gold/[0.08] border-gold/30 shadow-[0_0_20px_rgba(201,168,76,0.05)]'
                      : 'bg-transparent border-transparent hover:bg-theme-surface/30 hover:border-theme-border/20'
                  }`}
                  role="switch"
                  aria-checked={prefs[key]}
                  aria-label={label}
                >
                  <div className={`w-9 h-9 rounded-xl flex items-center justify-center transition-all duration-500 ${
                    prefs[key] ? 'bg-gold/20 border border-gold/30' : 'bg-theme-main/30 border border-theme-border/20'
                  }`}>
                    <Icon size={16} className={prefs[key] ? 'text-gold' : 'text-theme-text/30'} />
                  </div>
                  <div className="flex-1">
                    <p className={`text-xs font-bold tracking-wider transition-colors ${prefs[key] ? 'text-gold' : 'text-theme-text/70'}`}>{label}</p>
                    <p className="text-[9px] text-theme-text/20 mt-0.5">{desc}</p>
                  </div>
                  <div className={`w-10 h-5 rounded-full transition-all duration-500 relative ${prefs[key] ? 'bg-gold/30' : 'bg-theme-border/30'}`}>
                    <div className={`absolute top-0.5 w-4 h-4 rounded-full transition-all duration-500 shadow-sm ${
                      prefs[key] ? 'left-[22px] bg-gold' : 'left-0.5 bg-theme-text/20'
                    }`} />
                  </div>
                </button>
              ))}
            </div>

            {/* Reset */}
            <div className="p-4 pt-0">
              <button
                onClick={resetAll}
                className="w-full py-3 rounded-xl border border-theme-border/20 text-[9px] tracking-[0.3em] uppercase text-theme-text/30 hover:text-gold hover:border-gold/30 transition-all duration-500 font-bold"
              >
                {t.accessibility.reset}
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
