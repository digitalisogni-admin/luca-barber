import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Shield, Cookie, BarChart3, Target, ChevronDown, ChevronUp, Check, X } from 'lucide-react';
import { useLocale } from '../i18n/useLocale';

interface ConsentPrefs {
  necessary: boolean;    // Always true
  analytics: boolean;
  marketing: boolean;
  functional: boolean;
  timestamp: string;
  version: string;
}

const CONSENT_VERSION = '1.0.0';
const CONSENT_KEY = 'lucabarber-gdpr-consent';

const getStoredConsent = (): ConsentPrefs | null => {
  try {
    const raw = localStorage.getItem(CONSENT_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    // Invalidate if version changed
    if (parsed.version !== CONSENT_VERSION) return null;
    return parsed;
  } catch {
    return null;
  }
};

export const GDPRConsent = () => {
  const { t } = useLocale();
  const [visible, setVisible] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [prefs, setPrefs] = useState<ConsentPrefs>({
    necessary: true,
    analytics: false,
    marketing: false,
    functional: false,
    timestamp: '',
    version: CONSENT_VERSION,
  });

  useEffect(() => {
    const stored = getStoredConsent();
    if (!stored) {
      // Small delay so it doesn't flash on page load
      const timer = setTimeout(() => setVisible(true), 1500);
      return () => clearTimeout(timer);
    }
  }, []);

  const saveConsent = (consent: Partial<ConsentPrefs>) => {
    const final: ConsentPrefs = {
      ...prefs,
      ...consent,
      necessary: true,
      timestamp: new Date().toISOString(),
      version: CONSENT_VERSION,
    };
    localStorage.setItem(CONSENT_KEY, JSON.stringify(final));
    setVisible(false);
    
    // Dispatch event so other components can react
    window.dispatchEvent(new CustomEvent('gdpr-consent-updated', { detail: final }));
  };

  const acceptAll = () => saveConsent({ analytics: true, marketing: true, functional: true });
  const rejectOptional = () => saveConsent({ analytics: false, marketing: false, functional: false });
  const saveCustom = () => saveConsent(prefs);

  const categories = [
    {
      key: 'necessary' as const,
      icon: Shield,
      label: t.gdpr.categories.necessary.label,
      desc: t.gdpr.categories.necessary.desc,
      always: true,
    },
    {
      key: 'functional' as const,
      icon: Cookie,
      label: t.gdpr.categories.functional.label,
      desc: t.gdpr.categories.functional.desc,
      always: false,
    },
    {
      key: 'analytics' as const,
      icon: BarChart3,
      label: t.gdpr.categories.analytics.label,
      desc: t.gdpr.categories.analytics.desc,
      always: false,
    },
    {
      key: 'marketing' as const,
      icon: Target,
      label: t.gdpr.categories.marketing.label,
      desc: t.gdpr.categories.marketing.desc,
      always: false,
    },
  ];

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="fixed bottom-0 left-0 right-0 z-[1001] p-4 md:p-6"
          role="dialog"
          aria-label={t.gdpr.aria.consent}
        >
          <div className="max-w-5xl mx-auto glass-card-strong rounded-3xl border border-theme-border/40 overflow-hidden shadow-[0_-20px_80px_rgba(0,0,0,0.3)]">
            {/* Main Bar */}
            <div className="p-6 md:p-8">
              <div className="flex flex-col md:flex-row gap-6 md:items-start">
                {/* Icon & Text */}
                <div className="flex items-start gap-4 flex-1">
                  <div className="w-12 h-12 rounded-2xl bg-gold/10 border border-gold/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Cookie className="w-5 h-5 text-gold" />
                  </div>
                  <div>
                    <h3 className="font-cinzel text-lg text-theme-text tracking-wider mb-2">{t.gdpr.title}</h3>
                    <p className="text-xs text-theme-text/40 font-inter leading-relaxed max-w-2xl">
                      {t.gdpr.description}{' '}
                      <a href="/privacy" className="text-gold hover:underline">{t.gdpr.privacyPolicy}</a>{' '}
                      {t.common.and}{' '}
                      <a href="/cookies" className="text-gold hover:underline">{t.gdpr.cookiePolicy}</a>.
                      {t.gdpr.customiseMessage}
                    </p>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-3 flex-shrink-0">
                  <button
                    onClick={rejectOptional}
                    className="px-6 py-3 rounded-xl border border-theme-border/30 text-[9px] tracking-[0.3em] uppercase font-bold text-theme-text/40 hover:text-gold hover:border-gold/40 transition-all duration-500"
                  >
                    {t.gdpr.rejectOptional}
                  </button>
                  <button
                    onClick={() => setShowDetails(!showDetails)}
                    className="px-6 py-3 rounded-xl border border-theme-border/30 text-[9px] tracking-[0.3em] uppercase font-bold text-theme-text/60 hover:text-gold hover:border-gold/40 transition-all duration-500 flex items-center justify-center gap-2"
                  >
                    {t.gdpr.customise} {showDetails ? <ChevronUp size={12} /> : <ChevronDown size={12} />}
                  </button>
                  <button
                    onClick={acceptAll}
                    className="px-8 py-3 rounded-xl bg-gold text-theme-main text-[9px] tracking-[0.3em] uppercase font-bold hover:bg-white transition-all duration-500 shadow-lg shadow-gold/20"
                  >
                    {t.gdpr.acceptAll}
                  </button>
                </div>
              </div>
            </div>

            {/* Detailed Preferences */}
            <AnimatePresence>
              {showDetails && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                  className="overflow-hidden"
                >
                  <div className="px-6 md:px-8 pb-6 md:pb-8 border-t border-theme-border/20 pt-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {categories.map(({ key, icon: Icon, label, desc, always }) => (
                        <button
                          key={key}
                          onClick={() => !always && setPrefs(prev => ({ ...prev, [key]: !prev[key] }))}
                          className={`flex items-start gap-4 p-5 rounded-2xl border transition-all duration-500 text-left ${
                            prefs[key] 
                              ? 'bg-gold/[0.06] border-gold/25' 
                              : 'bg-transparent border-theme-border/20 hover:border-theme-border/40'
                          } ${always ? 'cursor-default' : 'cursor-pointer'}`}
                          role="switch"
                          aria-checked={prefs[key]}
                          aria-label={label}
                          disabled={always}
                        >
                          <div className={`w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 transition-all duration-500 ${
                            prefs[key] ? 'bg-gold/20 border border-gold/30' : 'bg-theme-main/30 border border-theme-border/20'
                          }`}>
                            <Icon size={16} className={prefs[key] ? 'text-gold' : 'text-theme-text/30'} />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className={`text-xs font-bold tracking-wider ${prefs[key] ? 'text-gold' : 'text-theme-text/60'}`}>{label}</p>
                            <p className="text-[9px] text-theme-text/20 mt-1 leading-relaxed">{desc}</p>
                          </div>
                          <div className={`w-10 h-5 rounded-full transition-all duration-500 relative flex-shrink-0 mt-1 ${prefs[key] ? 'bg-gold/30' : 'bg-theme-border/30'}`}>
                            <div className={`absolute top-0.5 w-4 h-4 rounded-full transition-all duration-500 shadow-sm ${
                              prefs[key] ? 'left-[22px] bg-gold' : 'left-0.5 bg-theme-text/20'
                            }`} />
                          </div>
                        </button>
                      ))}
                    </div>

                    <div className="flex justify-end mt-6">
                      <button
                        onClick={saveCustom}
                        className="px-10 py-3.5 rounded-xl bg-gold text-theme-main text-[9px] tracking-[0.3em] uppercase font-bold hover:bg-white transition-all duration-500 shadow-lg"
                      >
                        {t.gdpr.savePreferences}
                      </button>
                    </div>

                    {/* Legal footnote */}
                    <p className="text-[8px] text-theme-text/15 mt-6 text-center leading-relaxed">
                      {t.gdpr.legalFootnote}
                    </p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

/** Utility to check consent status from anywhere */
export const hasConsent = (category: 'analytics' | 'marketing' | 'functional'): boolean => {
  const stored = getStoredConsent();
  return stored ? stored[category] : false;
};
