import React, { useState } from 'react';
import { useLocale } from '../i18n/useLocale';
import type { Locale } from '../i18n/translations';

const LANGUAGES: { code: Locale; label: string; flag: string }[] = [
  { code: 'en', label: 'EN', flag: '🇬🇧' },
  { code: 'fr', label: 'FR', flag: '🇫🇷' },
  { code: 'it', label: 'IT', flag: '🇮🇹' },
  { code: 'ar', label: 'ع', flag: '🇸🇦' },
];

export const LanguageSwitcher = () => {
  const { locale, setLocale } = useLocale();
  const [open, setOpen] = useState(false);
  const current = LANGUAGES.find(l => l.code === locale)!;

  return (
    <div className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-1.5 px-3 py-1.5 text-xs tracking-[0.2em] uppercase font-medium text-theme-text/70 hover:text-gold transition-colors duration-300 border border-theme-border rounded-full hover:border-gold/30"
        data-cursor="Lang"
      >
        <span>{current.flag}</span>
        <span>{current.label}</span>
        <svg className={`w-3 h-3 transition-transform duration-300 ${open ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {open && (
        <>
          <div className="fixed inset-0 z-40" onClick={() => setOpen(false)} />
          <div className="absolute top-full right-0 mt-2 z-50 bg-theme-glass backdrop-blur-2xl border border-theme-border rounded-xl overflow-hidden min-w-[120px] shadow-2xl">
            {LANGUAGES.map(lang => (
              <button
                key={lang.code}
                onClick={() => { setLocale(lang.code); setOpen(false); }}
                className={`w-full flex items-center gap-2.5 px-4 py-2.5 text-xs tracking-[0.15em] uppercase transition-all duration-300 ${
                  locale === lang.code
                    ? 'text-gold bg-gold/10'
                    : 'text-theme-text/60 hover:text-theme-text hover:bg-theme-bg-hover'
                }`}
              >
                <span className="text-base">{lang.flag}</span>
                <span>{lang.label}</span>
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
};
