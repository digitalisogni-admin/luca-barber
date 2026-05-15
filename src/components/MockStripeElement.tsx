import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { CreditCard, Lock, ShieldCheck, Mail, Smartphone, Store } from 'lucide-react';
import { useLocale } from '../i18n/useLocale';

export const MockStripeElement = ({ onComplete, isSubmitting = false }: { onComplete: () => void, isSubmitting?: boolean }) => {
  const [paymentMethod, setPaymentMethod] = useState<'online' | 'spot'>('online');
  const [cardNumber, setCardNumber] = useState('');
  const [expiry, setExpiry] = useState('');
  const [cvc, setCvc] = useState('');
  const { t } = useLocale();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onComplete();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 w-full max-w-sm mx-auto">
      {/* Payment Method Selector */}
      <div className="flex bg-theme-main/60 p-1.5 rounded-2xl border border-theme-border/50 backdrop-blur-md">
        <button
          type="button"
          onClick={() => setPaymentMethod('online')}
          className={`flex-1 py-3.5 text-[10px] uppercase tracking-[0.2em] font-bold rounded-xl transition-all duration-300 flex items-center justify-center gap-2 ${
            paymentMethod === 'online' 
              ? 'bg-gold text-theme-main shadow-[0_0_20px_rgba(201,168,76,0.3)]' 
              : 'text-theme-text/40 hover:text-theme-text/70'
          }`}
        >
          <CreditCard size={14} /> {t.booking?.payment?.payOnline || 'Pay Online'}
        </button>
        <button
          type="button"
          onClick={() => setPaymentMethod('spot')}
          className={`flex-1 py-3.5 text-[10px] uppercase tracking-[0.2em] font-bold rounded-xl transition-all duration-300 flex items-center justify-center gap-2 ${
            paymentMethod === 'spot' 
              ? 'bg-gold text-theme-main shadow-[0_0_20px_rgba(201,168,76,0.3)]' 
              : 'text-theme-text/40 hover:text-theme-text/70'
          }`}
        >
          <Store size={14} /> {t.booking?.payment?.payOnSpot || 'Pay on Spot'}
        </button>
      </div>

      <AnimatePresence mode="wait">
        {paymentMethod === 'online' && (
          <motion.div 
            key="online"
            initial={{ opacity: 0, scale: 0.95, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -10 }}
            transition={{ duration: 0.3 }}
            className="space-y-6"
          >
            <div className="bg-theme-main/40 border border-theme-border rounded-3xl p-6 backdrop-blur-sm relative overflow-hidden group">
              <div className="flex items-center gap-2 mb-6 opacity-40">
                 <Lock size={10} className="text-gold" />
                 <span className="text-[9px] uppercase tracking-[0.2em]">{t.booking?.payment?.secureZone || 'Secure Payment Zone'}</span>
              </div>

              {/* Express Checkout */}
              <div className="flex gap-3 mb-6">
                <button type="button" className="flex-1 py-3.5 bg-black rounded-xl flex justify-center items-center gap-2 border border-white/10 hover:border-white/30 transition-all shadow-md group/apple">
                  <svg className="h-4 group-hover/apple:scale-110 transition-transform duration-300" viewBox="0 0 54 22" fill="none">
                    <path d="M22.95 14.88c0-3.32 2.72-4.94 5.96-5.09-.64-1.02-1.92-1.68-3.3-1.71-1.41-.14-2.77.83-3.48.83-.73 0-1.85-.81-3.02-.79-1.51.02-2.91.88-3.69 2.23-1.58 2.74-.4 6.78 1.13 8.98.75 1.08 1.63 2.28 2.8 2.24 1.13-.04 1.57-.73 2.94-.73 1.36 0 1.77.73 2.95.71 1.2-.02 1.96-1.08 2.7-2.16.86-1.25 1.22-2.47 1.24-2.53-.03-.02-2.31-.89-2.23-3.6" fill="#fff" />
                    <path d="M20.2 5.56c.62-.75 1.04-1.79.93-2.83-1.01.04-2.13.67-2.78 1.45-.58.68-1.08 1.74-.95 2.76 1.13.09 2.18-.58 2.8-1.38" fill="#fff" />
                    <path d="M36.19 0h2.51v15.34h-2.51zM42.23 6.94c-2.4 0-4.32 2.1-4.32 4.7 0 2.62 1.9 4.72 4.3 4.72 2.45 0 4.32-2.12 4.32-4.72.01-2.61-1.87-4.7-4.3-4.7m0 7.82c-1.37 0-2.37-1.12-2.37-3.12 0-1.97.98-3.08 2.37-3.08 1.37 0 2.37 1.12 2.37 3.1-.01 1.98-.98 3.1-2.37 3.1" fill="#fff" />
                    <path d="M49 6.94c-2.4 0-4.32 2.1-4.32 4.7 0 2.62 1.9 4.72 4.3 4.72 2.45 0 4.32-2.12 4.32-4.72.01-2.61-1.87-4.7-4.3-4.7m0 7.82c-1.37 0-2.37-1.12-2.37-3.12 0-1.97.98-3.08 2.37-3.08 1.37 0 2.37 1.12 2.37 3.1-.01 1.98-.98 3.1-2.37 3.1" fill="#fff" />
                  </svg>
                </button>
                <button type="button" className="flex-1 py-3.5 bg-white rounded-xl flex justify-center items-center gap-1.5 hover:bg-gray-100 transition-all shadow-md group/google">
                  <svg className="w-5 h-5 group-hover/google:scale-110 transition-transform duration-300" viewBox="0 0 24 24">
                    <path d="M21.35 11.1H12.18v2.73h5.15c-.23 1.27-.96 2.35-2.05 3.08v2.55h3.32c1.94-1.79 3.06-4.42 3.06-7.46 0-.64-.06-1.28-.18-1.89z" fill="#4285F4" />
                    <path d="M12.18 20.4c2.58 0 4.74-.85 6.32-2.31l-3.32-2.55c-.85.57-1.94.91-3.03.91-2.33 0-4.34-1.57-5.07-3.71H3.65v2.66c1.61 3.2 4.88 5.38 8.53 5.38z" fill="#34A853" />
                    <path d="M7.12 12.3c-.19-.57-.3-1.18-.3-1.8 0-.62.11-1.23.3-1.8V6.04H3.65A9.26 9.26 0 002.5 10.5c0 1.48.35 2.89.96 4.14l3.66-2.34z" fill="#FBBC05" />
                    <path d="M12.18 4.6c1.4 0 2.66.48 3.65 1.42l2.74-2.74A9.12 9.12 0 0012.18.6C8.52.6 5.25 2.78 3.65 6.04l3.47 2.66c.72-2.14 2.73-3.71 5.06-3.71z" fill="#EA4335" />
                  </svg>
                  <span className="text-black font-semibold tracking-wide text-sm font-inter">Pay</span>
                </button>
              </div>

              <div className="relative flex items-center gap-4 mb-6">
                <div className="h-px bg-theme-border/50 flex-1" />
                <span className="text-[9px] uppercase tracking-[0.3em] text-theme-text/30 font-bold bg-theme-main px-2">{t.booking?.payment?.orPayWithCard || 'or pay with card'}</span>
                <div className="h-px bg-theme-border/50 flex-1" />
              </div>

              <div className="space-y-5">
                {/* Card Number */}
                <div className="space-y-2">
                  <div className="flex justify-between items-center px-1">
                    <label className="text-[9px] uppercase tracking-[0.2em] text-theme-text/40">{t.booking?.payment?.cardNumber || 'Card Number'}</label>
                    <div className="flex gap-2">
                      <svg viewBox="0 0 24 16" className="w-6 h-4 opacity-70"><circle cx="7" cy="8" r="7" fill="#ea001b"/><circle cx="17" cy="8" r="7" fill="#f79e1b"/><path d="M12 1.343a7 7 0 000 13.314 7 7 0 000-13.314z" fill="#ff5f00"/></svg>
                      <svg viewBox="0 0 24 16" className="w-6 h-4 opacity-70"><path d="M9.8 14.8L12.5 1.5h3l-2.7 13.3h-3zm9.6-13c-.8-.2-2-.4-3.5-.4-3.1 0-5.4 1.7-5.4 4.1 0 1.9 1.7 2.9 2.9 3.5 1.3.6 1.7 1 1.7 1.6 0 .9-1.1 1.3-2.1 1.3-1.4 0-2.3-.2-3.1-.6l-.4-.2-.4 2.8c.8.4 2.3.7 3.8.7 3.3 0 5.6-1.6 5.6-4.2 0-1.4-1-.2-2.8-3.4h-.1c-.1-.3-.6-.7-.9-.8.7-.3 2.1-1 2.1-2.9 0-1.4-1.2-2.5-3.3-2.5-1.1 0-2.2.2-2.8.5l.3-.2.8-3.8h3l-1.3 6.3c.7-.3 1.5-.5 2.3-.5 1.7 0 3 .8 3 2.5 0 1.2-.7 2-1.9 2.5l2-6.5h3zm-14.8 0L2.2 11.4c-.2.7-.4.9-1 .1L.1 1.5h3l1.8 10L7.7 1.5H4.6z" fill="#fff"/></svg>
                    </div>
                  </div>
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="4242 4242 4242 4242"
                      value={cardNumber}
                      onChange={(e) => setCardNumber(e.target.value)}
                      maxLength={19}
                      className="w-full bg-theme-main/60 border border-theme-border rounded-xl px-4 py-3.5 text-sm text-theme-text font-mono focus:outline-none focus:border-gold/50 transition-colors placeholder:text-theme-text/10"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-[9px] uppercase tracking-[0.2em] text-theme-text/40 ml-1">{t.booking?.payment?.expiry || 'Expiry'}</label>
                    <input
                      type="text"
                      placeholder="MM / YY"
                      value={expiry}
                      onChange={(e) => setExpiry(e.target.value)}
                      className="w-full bg-theme-main/60 border border-theme-border rounded-xl px-4 py-3.5 text-sm text-theme-text font-mono focus:outline-none focus:border-gold/50 transition-colors placeholder:text-theme-text/10"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[9px] uppercase tracking-[0.2em] text-theme-text/40 ml-1">{t.booking?.payment?.cvc || 'CVC'}</label>
                    <input
                      type="text"
                      placeholder="123"
                      value={cvc}
                      onChange={(e) => setCvc(e.target.value)}
                      maxLength={3}
                      className="w-full bg-theme-main/60 border border-theme-border rounded-xl px-4 py-3.5 text-sm text-theme-text font-mono focus:outline-none focus:border-gold/50 transition-colors placeholder:text-theme-text/10"
                    />
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {paymentMethod === 'spot' && (
          <motion.div 
            key="spot"
            initial={{ opacity: 0, scale: 0.95, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -10 }}
            transition={{ duration: 0.3 }}
            className="space-y-6"
          >
            <div className="bg-theme-main/40 border border-theme-border rounded-3xl p-8 text-center backdrop-blur-sm shadow-xl">
               <div className="w-16 h-16 mx-auto mb-6 bg-gold/10 rounded-full flex items-center justify-center shadow-[0_0_30px_rgba(201,168,76,0.15)] relative">
                 <Store size={24} className="text-gold" />
                 <div className="absolute inset-0 bg-gold/20 rounded-full animate-ping opacity-20" />
               </div>
               <h4 className="font-cinzel text-xl text-theme-text tracking-wider mb-3">{t.booking?.payment?.bookNowPayLater || 'Book Now, Pay Later'}</h4>
               <p className="text-xs text-theme-text/40 leading-relaxed font-inter px-4">
                 {t.booking?.payment?.spotDescription || 'Your appointment will be secured instantly. Payment will be collected after your grooming session at the salon via Cash or Card.'}
               </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="flex flex-col gap-4">
        <button
          type="submit"
          disabled={isSubmitting || (paymentMethod === 'online' && !cardNumber)}
          className="w-full py-5 rounded-2xl bg-gold text-theme-main font-cinzel font-bold uppercase tracking-[0.3em] text-[11px] shadow-xl hover:bg-gold/90 disabled:opacity-30 transition-all flex items-center justify-center gap-2 overflow-hidden relative group/btn"
        >
          {isSubmitting ? (
            <>
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ repeat: Infinity, duration: 1, ease: 'linear' }}
                className="w-4 h-4 border-2 border-theme-main/30 border-t-theme-main rounded-full"
              />
              {t.booking?.payment?.authenticating || 'Processing...'}
            </>
          ) : (
            <>{paymentMethod === 'online' ? t.booking?.payment?.confirmPay || 'Confirm & Pay' : (t.booking?.payment?.confirmAppointment || 'Confirm Appointment')}</>
          )}
          
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-200%] group-hover/btn:translate-x-[200%] transition-transform duration-1000" />
        </button>
        
        {paymentMethod === 'online' && (
          <div className="flex items-center justify-center gap-4 opacity-40 transition-all">
            <ShieldCheck className="w-3 h-3 text-gold" />
            <span className="text-[8px] uppercase tracking-[0.1em]">{t.booking?.payment?.verified || 'Stripe Verified Secure'}</span>
          </div>
        )}

        <div className="mt-2 pt-4 border-t border-theme-border/20">
           <p className="text-[9px] text-theme-text/40 flex items-center justify-center gap-2">
              <Mail className="w-3 h-3 text-gold/40" />
              {t.booking?.payment?.receiptEmail || 'Receipt will be sent to your email'}
           </p>
           <p className="text-[9px] text-theme-text/40 flex items-center justify-center gap-2 mt-2">
              <Smartphone className="w-3 h-3 text-gold/40" />
              {t.booking?.payment?.smsConfirmation || 'Confirmation sent via SMS'}
           </p>
        </div>
      </div>
    </form>
  );
};
