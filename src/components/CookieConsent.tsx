import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Cookie, X, Check, ShieldCheck } from 'lucide-react';
import { useLocale } from '../i18n/useLocale';

export const CookieConsent = () => {
  const { t } = useLocale();
  const [show, setShow] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem('lucabarber-cookie-consent');
    if (!consent) {
      const timer = setTimeout(() => setShow(true), 2000);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAccept = (type: 'all' | 'essential') => {
    localStorage.setItem('lucabarber-cookie-consent', type);
    setShow(false);
  };

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.95 }}
          className="fixed bottom-6 left-6 right-6 md:left-auto md:right-8 md:max-w-md z-[2000]"
        >
          <div className="glass-card-strong p-8 rounded-3xl shadow-2xl relative overflow-hidden group border border-theme-border/50">
            {/* Ambient Glow */}
            <div className="absolute -top-12 -right-12 w-32 h-32 bg-gold/10 rounded-full blur-3xl pointer-events-none group-hover:bg-gold/20 transition-all duration-1000" />
            
            <div className="relative z-10">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-10 h-10 rounded-xl bg-gold/10 border border-gold/20 flex items-center justify-center flex-shrink-0">
                  <Cookie className="w-5 h-5 text-gold" />
                </div>
                <h3 className="font-cinzel text-base tracking-widest text-theme-text uppercase">
                  {t.cookies.title}
                </h3>
              </div>
              
              <p className="text-xs text-theme-text/40 leading-relaxed mb-8 font-inter">
                {t.cookies.message}
              </p>
              
              <div className="flex flex-col gap-3">
                <button
                  onClick={() => handleAccept('all')}
                  className="w-full py-4 rounded-xl bg-gold text-theme-main text-[10px] tracking-[0.3em] uppercase font-bold hover:bg-white transition-all duration-500 flex items-center justify-center gap-3 shadow-lg shadow-gold/10"
                >
                  <Check className="w-4 h-4" />
                  {t.cookies.accept}
                </button>
                <button
                  onClick={() => handleAccept('essential')}
                  className="w-full py-4 rounded-xl bg-theme-main/40 border border-theme-border text-theme-text/40 text-[10px] tracking-[0.3em] uppercase font-bold hover:bg-theme-main/60 hover:text-theme-text transition-all duration-500"
                >
                  {t.cookies.decline}
                </button>
              </div>

              {/* Legal Links */}
              <div className="mt-8 pt-6 border-t border-theme-border/30 flex items-center justify-between">
                <button 
                  onClick={() => window.dispatchEvent(new CustomEvent('open-legal', { detail: 'privacy' }))}
                  className="text-[9px] tracking-[0.2em] uppercase text-gold/60 hover:text-gold transition-colors duration-300 font-bold"
                >
                  {t.cookies.privacy}
                </button>
                <div className="flex items-center gap-2 opacity-20">
                  <ShieldCheck className="w-3 h-3 text-gold" />
                  <span className="text-[8px] tracking-[0.2em] uppercase">{t.cookies.secure}</span>
                </div>
              </div>
            </div>

            <button 
              onClick={() => setShow(false)}
              className="absolute top-6 right-6 text-theme-text/10 hover:text-gold transition-colors duration-300"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
