import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Shield, FileText } from 'lucide-react';
import { useLocale } from '../i18n/useLocale';

interface LegalModalProps {
  isOpen: boolean;
  type: 'privacy' | 'terms';
  onClose: () => void;
}

export const LegalModal: React.FC<LegalModalProps> = ({ isOpen, type, onClose }) => {
  const { t, dir } = useLocale();

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[3000] flex items-center justify-center p-6">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-theme-main/95 backdrop-blur-sm"
          />
          
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="relative w-full max-w-2xl bg-theme-surface border border-theme-border rounded-3xl overflow-hidden shadow-2xl"
          >
            {/* Header */}
            <div className="p-8 border-b border-theme-border flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-gold/10 border border-gold/20 flex items-center justify-center">
                  {type === 'privacy' ? (
                    <Shield className="w-6 h-6 text-gold" />
                  ) : (
                    <FileText className="w-6 h-6 text-gold" />
                  )}
                </div>
                <div>
                  <h2 className="font-cinzel text-xl text-theme-text">
                    {type === 'privacy' ? t.legal.privacyTitle : t.legal.termsTitle}
                  </h2>
                  <p className="text-[10px] tracking-[0.2em] uppercase text-theme-text/30 mt-1">
                    Luca Barber Barber Shop · Turin
                  </p>
                </div>
              </div>
              
              <button
                onClick={onClose}
                className="w-10 h-10 rounded-full bg-theme-glass border border-theme-border flex items-center justify-center text-theme-text/40 hover:text-gold hover:border-gold/40 transition-all duration-300"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Content */}
            <div className={`p-8 md:p-12 max-h-[60vh] overflow-y-auto ${dir === 'rtl' ? 'text-right' : ''}`}>
              <div className="prose prose-invert lg:prose-xl font-cormorant text-theme-text/70 italic leading-relaxed">
                {type === 'privacy' ? t.legal.privacyContent : t.legal.termsContent}
              </div>
              
              <div className="mt-12 p-8 rounded-2xl bg-theme-main/50 border border-theme-border/50">
                <h3 className="font-cinzel text-sm text-gold mb-4 uppercase tracking-[0.2em]">{t.legal.inquiriesTitle}</h3>
                <p className="text-xs text-theme-text/40 font-inter">
                  {t.legal.email}<br />
                  {t.legal.phone}<br />
                  {t.legal.address}
                </p>
              </div>
            </div>

            {/* Footer */}
            <div className="p-8 border-t border-theme-border bg-theme-main/30 flex justify-end">
              <button
                onClick={onClose}
                className="px-8 py-3 rounded-full border border-gold/40 text-[10px] tracking-[0.3em] uppercase text-gold hover:bg-gold hover:text-theme-main font-bold transition-all duration-500"
              >
                {t.legal.close}
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
