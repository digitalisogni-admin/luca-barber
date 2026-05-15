import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';
import { translations, getDirection, type Locale, type Translations } from './translations';

interface LocaleContextType {
  locale: Locale;
  t: Translations;
  dir: 'ltr' | 'rtl';
  setLocale: (locale: Locale) => void;
}

const LocaleContext = createContext<LocaleContextType>({
  locale: 'en',
  t: translations.en,
  dir: 'ltr',
  setLocale: () => {},
});

export const LocaleProvider = ({ children }: { children: React.ReactNode }) => {
  const [locale, setLocaleState] = useState<Locale>(() => {
    const saved = localStorage.getItem('lucabarber-locale');
    return (saved as Locale) || 'en';
  });

  const setLocale = useCallback((newLocale: Locale) => {
    setLocaleState(newLocale);
    localStorage.setItem('lucabarber-locale', newLocale);
  }, []);

  const dir = getDirection(locale);
  const t = translations[locale];

  useEffect(() => {
    document.documentElement.dir = dir;
    document.documentElement.lang = locale;
  }, [dir, locale]);

  return (
    <LocaleContext.Provider value={{ locale, t, dir, setLocale }}>
      {children}
    </LocaleContext.Provider>
  );
};

export const useLocale = () => useContext(LocaleContext);
