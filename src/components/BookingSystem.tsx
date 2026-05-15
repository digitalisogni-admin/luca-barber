import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import gsap from 'gsap';
import { Check, Calendar, Clock, User, Phone, Scissors, ChevronRight, ChevronLeft, Star, X, ShieldCheck, CreditCard, ArrowLeft } from 'lucide-react';
import { teamMembers } from './TeamSection';
import { MagneticButton } from './MagneticButton';
import { MockStripeElement } from './MockStripeElement';
import { useLocale } from '../i18n/useLocale';

export const BookingSystem = ({ onClose }: { onClose: () => void }) => {
  const [step, setStep] = useState(0);
  const [direction, setDirection] = useState(1);
  const [selectedService, setSelectedService] = useState<any>(null);
  const [selectedBarber, setSelectedBarber] = useState<any>(null);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [guestDetails, setGuestDetails] = useState({ name: '', email: '', phone: '' });
  const [agreedToPolicy, setAgreedToPolicy] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  
  const { t, dir, locale } = useLocale();
  const modalRef = useRef<HTMLDivElement>(null);
  const goldEndRef = useRef<HTMLDivElement>(null);
  const dateScrollRef = useRef<HTMLDivElement>(null);

  const steps = [
    { title: t.booking?.steps?.service || 'Select Service', icon: Scissors },
    { title: t.booking?.steps?.barber || 'Your Master', icon: User },
    { title: t.booking?.steps?.timing || 'Date & Time', icon: Calendar },
    { title: t.booking?.steps?.details || 'Guest Details', icon: Phone },
    { title: t.booking?.steps?.payment || 'Secure Payment', icon: CreditCard },
    { title: t.booking?.steps?.success || 'Confirmed', icon: Check }
  ];

  const dates = Array.from({ length: 21 }, (_, i) => {
    const d = new Date();
    d.setDate(d.getDate() + i);
    return d;
  });

  const times = ['09:00', '09:30', '10:00', '10:30', '11:00', '11:30', '12:00', '14:00', '14:30', '15:00', '15:30', '16:00', '16:30', '17:00', '17:30', '18:00'];

  useEffect(() => {
    if (step === 5) {
      const ctx = gsap.context(() => {
        gsap.from('.gold-seal', {
          scale: 0.5,
          opacity: 0,
          rotate: -20,
          duration: 1.5,
          ease: 'elastic.out(1, 0.3)',
        });
        
        gsap.to('.gold-glow', {
          keyframes: [
            { opacity: 0.1, duration: 2 },
            { opacity: 0.4, duration: 2 },
            { opacity: 0.1, duration: 2 },
          ],
          repeat: -1,
          ease: 'sine.inOut'
        });
      });
      return () => ctx.revert();
    }
  }, [step]);

  // Lock body scroll when modal is open
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = ''; };
  }, []);

  const handleNext = () => {
    setDirection(1);
    setStep(s => Math.min(steps.length - 1, s + 1));
  };

  const handleBack = () => {
    setDirection(-1);
    setStep(s => Math.max(0, s - 1));
  };

  const scrollDates = (dir: 'left' | 'right') => {
    if (!dateScrollRef.current) return;
    const scrollAmount = 320;
    dateScrollRef.current.scrollBy({
      left: dir === 'left' ? -scrollAmount : scrollAmount,
      behavior: 'smooth'
    });
  };

  const handlePaymentComplete = async () => {
    setIsSubmitting(true);
    setSubmitError(null);
    try {
      const response = await fetch('/api/bookings', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          service: selectedService.name,
          barber: selectedBarber.name,
          date: selectedDate?.toLocaleDateString(),
          time: selectedTime,
          price: selectedService.price,
          name: guestDetails.name,
          email: guestDetails.email,
          phone: guestDetails.phone,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to confirm booking on server');
      }

      await response.json();
      handleNext();
    } catch (err: any) {
      setSubmitError(err.message || t.booking?.errors?.payment || 'Payment failed.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const isToday = (d: Date) => {
    const today = new Date();
    return d.toDateString() === today.toDateString();
  };

  return (
    <div className="fixed inset-0 z-[2000] flex items-center justify-center" role="dialog" aria-modal="true" aria-label={t.booking?.aria?.system || 'Booking System'}>
      {/* Backdrop */}
      <motion.div 
        initial={{ opacity: 0 }} 
        animate={{ opacity: 1 }} 
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="absolute inset-0 bg-black/80 backdrop-blur-xl"
      />

      {/* Modal Container — FULLSCREEN on mobile, 95vh on desktop */}
      <motion.div
        ref={modalRef}
        initial={{ opacity: 0, scale: 0.92, y: 30 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.92, y: 30 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="relative w-full h-full md:w-[96vw] md:max-w-[1400px] md:h-[95vh] md:max-h-[920px] flex flex-col md:flex-row bg-theme-main md:rounded-[2.5rem] overflow-hidden shadow-[0_50px_150px_rgba(0,0,0,0.5)] border-0 md:border border-theme-border/30"
      >
        {/* Progress Sidebar — Desktop */}
        <div className="hidden md:flex w-[300px] bg-theme-surface/50 border-r border-theme-border/30 p-10 flex-col justify-between flex-shrink-0">
          <div>
            <div className="mb-16">
              <span className="font-cinzel text-2xl font-bold tracking-[0.3em] text-gold block">LUCA BARBER</span>
              <span className="text-[9px] tracking-[0.4em] uppercase text-theme-text/20 mt-2 block">{t.booking?.labels?.luxuryGrooming || 'Luxury Grooming'}</span>
            </div>
            
            <div className="space-y-6">
              {steps.map((s, i) => {
                const Icon = s.icon;
                return (
                  <div key={i} className={`flex items-center gap-5 group transition-all duration-500 ${step === i ? 'translate-x-2' : ''}`}>
                    <div className="relative flex items-center justify-center">
                      <div className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-700 ${
                        step > i ? 'bg-gold/20 border border-gold/40' : 
                        step === i ? 'bg-gold/10 border border-gold/30 shadow-[0_0_20px_rgba(201,168,76,0.2)]' : 
                        'bg-theme-main/30 border border-theme-border/30'
                      }`}>
                        {step > i ? (
                          <Check size={14} className="text-gold" />
                        ) : (
                          <Icon size={14} className={step === i ? 'text-gold' : 'text-theme-text/20'} />
                        )}
                      </div>
                    </div>
                    <div className="flex flex-col">
                      <span className={`text-[9px] uppercase tracking-[0.3em] mb-0.5 transition-colors duration-500 ${step === i ? 'text-gold' : 'text-theme-text/10'}`}>
                        {t.booking?.labels?.stepLabel || 'Step'} 0{i + 1}
                      </span>
                      <span className={`font-cinzel text-xs tracking-wider transition-colors duration-500 ${step >= i ? 'text-theme-text' : 'text-theme-text/25'}`}>{s.title}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Concierge card */}
          <div className="p-6 rounded-2xl bg-theme-main/40 border border-theme-border/30">
            <p className="text-[9px] uppercase tracking-[0.3em] text-theme-text/20 mb-2">{t.booking?.labels?.concierge || 'Concierge'}</p>
            <p className="text-xs text-theme-text/50 font-inter">+39 011 234 5678</p>
          </div>
        </div>

        {/* Content Area */}
        <div className="flex-1 flex flex-col min-h-0 relative">
          {/* Header */}
          <div 
            className="px-6 md:px-12 py-5 md:py-6 border-b border-theme-border/20 flex items-center justify-between flex-shrink-0 bg-theme-main/50 backdrop-blur-md"
            style={{ paddingTop: 'max(env(safe-area-inset-top, 20px), 1.25rem)' }}
          >
            {/* Mobile progress */}
            <div className="md:hidden flex-1">
              <div className="flex items-center gap-3 mb-1">
                {steps.map((_, i) => (
                  <div key={i} className={`h-1 flex-1 rounded-full transition-all duration-500 ${i <= step ? 'bg-gold' : 'bg-theme-border/30'}`} />
                ))}
              </div>
              <span className="text-[9px] tracking-[0.3em] uppercase text-gold/60 font-bold">
                {(t.booking?.labels?.stepOf || 'Step {current} of {total}').replace('{current}', (step + 1).toString()).replace('{total}', '6')}
              </span>
              <h3 className="font-cinzel text-sm text-theme-text mt-0.5">{steps[step].title}</h3>
            </div>
            
            {/* Desktop title */}
            <div className="hidden md:block">
              <span className="text-[9px] tracking-[0.3em] uppercase text-gold/60 font-bold">
                {steps[step].title}
              </span>
            </div>

            <button
              onClick={onClose}
              className="w-11 h-11 rounded-full glass-card border border-theme-border/30 flex items-center justify-center text-theme-text/30 hover:text-gold hover:border-gold/40 transition-all duration-500 z-50 group flex-shrink-0"
              aria-label={t.booking?.aria?.close || 'Close booking'}
            >
              <X className="w-5 h-5 group-hover:rotate-90 transition-transform duration-500" />
            </button>
          </div>

          {/* Scrollable Content */}
          <div className={`flex-1 overflow-y-auto p-6 md:p-12 lg:p-16 custom-scrollbar ${dir === 'rtl' ? 'text-right' : ''}`}>
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={step}
                custom={direction}
                initial={{ opacity: 0, x: direction > 0 ? 40 : -40 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: direction > 0 ? -40 : 40 }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                className="h-full"
              >
                {/* Step 1: Service Selection */}
                {step === 0 && (
                  <div className="space-y-10">
                    <header>
                      <span className="text-[10px] uppercase tracking-[0.5em] text-gold/60 block mb-3">{t.booking?.labels?.theCollection || 'The Collection'}</span>
                      <h2 className="font-cinzel text-3xl md:text-5xl text-theme-text tracking-widest">{t.booking?.labels?.tailoredExperiences || 'Tailored Experiences'}</h2>
                    </header>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {t.services.items.map((service, i) => (
                        <button
                          key={i}
                          onClick={() => { setSelectedService(service); handleNext(); }}
                          className={`group p-6 md:p-8 rounded-2xl md:rounded-3xl border text-left transition-all duration-700 relative overflow-hidden ${
                            selectedService?.name === service.name
                              ? 'border-gold bg-gold/[0.08] shadow-[0_0_40px_rgba(201,168,76,0.1)]'
                              : 'border-theme-border/30 bg-theme-surface/30 hover:border-gold/30 hover:bg-theme-surface/60'
                          }`}
                        >
                          <div className="relative z-10 flex flex-col h-full justify-between">
                            <div>
                              <h4 className={`font-cinzel text-lg md:text-xl mb-2 transition-colors duration-500 ${selectedService?.name === service.name ? 'text-gold' : 'text-theme-text'}`}>
                                {service.name}
                              </h4>
                              <p className="text-xs text-theme-text/30 font-inter leading-relaxed line-clamp-2 mb-6">
                                {service.desc}
                              </p>
                            </div>
                            <div className="flex items-baseline justify-between pt-4 border-t border-theme-border/20">
                              <span className="font-cinzel text-xl md:text-2xl font-bold text-gold">
                                {service.price}
                              </span>
                              <span className="text-[9px] tracking-[0.3em] uppercase text-theme-text/20">
                                {service.duration}
                              </span>
                            </div>
                          </div>
                          <div className="absolute inset-0 bg-gradient-to-br from-gold/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Step 2: Barber Selection */}
                {step === 1 && (
                  <div className="space-y-10">
                    <header>
                      <button onClick={handleBack} className="flex items-center gap-2 text-[10px] uppercase tracking-[0.4em] text-gold/60 hover:text-gold transition-colors mb-6 group">
                        <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" /> {t.booking?.controls?.back || 'Back'}
                      </button>
                      <h2 className="font-cinzel text-3xl md:text-5xl text-theme-text tracking-widest">{t.booking?.labels?.masterArtisans || 'Master Artisans'}</h2>
                    </header>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                      {teamMembers.map((member) => (
                        <button
                          key={member.id}
                          onClick={() => { setSelectedBarber(member); handleNext(); }}
                          className={`group p-6 rounded-[2rem] border transition-all duration-700 flex flex-col items-center text-center gap-5 ${
                            selectedBarber?.id === member.id
                              ? 'border-gold bg-gold/[0.08] shadow-[0_0_40px_rgba(201,168,76,0.1)]'
                              : 'border-theme-border/30 bg-theme-surface/30 hover:border-gold/30 hover:bg-theme-surface/60'
                          }`}
                        >
                          <div className="relative">
                            <div className="w-20 h-20 rounded-full overflow-hidden border border-theme-border/30 p-0.5">
                              <img src={member.image} alt={member.name} className="w-full h-full object-cover rounded-full grayscale group-hover:grayscale-0 transition-all duration-1000" />
                            </div>
                            <div className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-gold flex items-center justify-center text-theme-main">
                              <Star size={8} className="fill-current" />
                            </div>
                          </div>
                          <div>
                            <h4 className="font-cinzel text-base text-theme-text tracking-wider">{member.name}</h4>
                            <p className="text-[9px] text-gold uppercase tracking-[0.3em] mt-1 font-bold">
                              {t.team.roles[member.id as keyof typeof t.team.roles]}
                            </p>
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Step 3: Schedule Selection — with slide-scroll calendar */}
                {step === 2 && (
                  <div className="space-y-10">
                    <header>
                      <button onClick={handleBack} className="flex items-center gap-2 text-[10px] uppercase tracking-[0.4em] text-gold/60 hover:text-gold transition-colors mb-6 group">
                        <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" /> {t.booking?.controls?.back || 'Back'}
                      </button>
                      <h2 className="font-cinzel text-3xl md:text-5xl text-theme-text tracking-widest">{t.booking?.labels?.chronosPrecision || 'Chronos & Precision'}</h2>
                    </header>
                    
                    <div className="space-y-10">
                      {/* Date Carousel with Arrow Controls */}
                      <div>
                        <label className="text-[10px] uppercase tracking-[0.4em] text-theme-text/20 block mb-5 px-1">{t.booking?.labels?.chooseDay || 'Choose your day'}</label>
                        
                        <div className="relative group/dates">
                          {/* Left Arrow */}
                          <button 
                            onClick={() => scrollDates('left')}
                            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-theme-main/90 border border-theme-border/40 flex items-center justify-center text-theme-text/40 hover:text-gold hover:border-gold/40 transition-all duration-300 shadow-lg backdrop-blur-md opacity-0 group-hover/dates:opacity-100 -translate-x-2 group-hover/dates:translate-x-0"
                            aria-label={t.booking?.aria?.scrollLeft || 'Scroll dates left'}
                          >
                            <ChevronLeft size={18} />
                          </button>
                          
                          {/* Right Arrow */}
                          <button 
                            onClick={() => scrollDates('right')}
                            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-theme-main/90 border border-theme-border/40 flex items-center justify-center text-theme-text/40 hover:text-gold hover:border-gold/40 transition-all duration-300 shadow-lg backdrop-blur-md opacity-0 group-hover/dates:opacity-100 translate-x-2 group-hover/dates:translate-x-0"
                            aria-label={t.booking?.aria?.scrollRight || 'Scroll dates right'}
                          >
                            <ChevronRight size={18} />
                          </button>
                          
                          {/* Fade edges */}
                          <div className="absolute left-0 top-0 bottom-0 w-12 bg-gradient-to-r from-theme-main to-transparent z-[5] pointer-events-none" />
                          <div className="absolute right-0 top-0 bottom-0 w-12 bg-gradient-to-l from-theme-main to-transparent z-[5] pointer-events-none" />
                          
                          {/* Scrollable Date Cards */}
                          <div 
                            ref={dateScrollRef}
                            className="flex gap-3 overflow-x-auto pb-4 px-4 scroll-smooth snap-x snap-mandatory no-scrollbar"
                            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                          >
                            {dates.map((d, i) => {
                              const selected = selectedDate?.toDateString() === d.toDateString();
                              const today = isToday(d);
                              return (
                                <button
                                  key={i}
                                  onClick={() => {
                                    setSelectedDate(d);
                                    if (selectedTime) handleNext();
                                  }}
                                  className={`snap-start flex-shrink-0 w-[80px] h-[110px] rounded-2xl border flex flex-col items-center justify-center transition-all duration-500 relative overflow-hidden group/date ${
                                    selected
                                      ? 'border-gold bg-gold/[0.12] shadow-[0_0_30px_rgba(201,168,76,0.15)] scale-105'
                                      : 'border-theme-border/20 bg-theme-surface/20 hover:border-gold/30 hover:bg-theme-surface/40'
                                  }`}
                                >
                                  {today && (
                                    <span className="absolute top-2 left-1/2 -translate-x-1/2 text-[7px] uppercase tracking-[0.2em] text-gold font-bold bg-gold/10 px-2 py-0.5 rounded-full">
                                      {t.booking.labels.today}
                                    </span>
                                  )}
                                  <span className={`text-[10px] uppercase tracking-[0.2em] mb-1 transition-colors duration-500 ${selected ? 'text-gold' : 'text-theme-text/25'} ${today ? 'mt-3' : ''}`}>
                                    {d.toLocaleString(locale, { weekday: 'short' })}
                                  </span>
                                  <span className={`font-cinzel text-2xl font-bold transition-colors duration-500 ${selected ? 'text-gold' : 'text-theme-text/70'}`}>
                                    {d.getDate()}
                                  </span>
                                  <span className="text-[8px] uppercase tracking-[0.2em] mt-1 text-theme-text/20">
                                    {d.toLocaleString(locale, { month: 'short' })}
                                  </span>
                                  {selected && <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-6 h-0.5 rounded-full bg-gold" />}
                                </button>
                              );
                            })}
                          </div>
                        </div>
                      </div>

                      {/* Time Grid */}
                      <div className="space-y-5">
                        <label className="text-[10px] uppercase tracking-[0.4em] text-theme-text/20 block px-1">{t.booking?.labels?.availableHours || 'Available Hours'}</label>
                        <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-2.5">
                          {times.map((time, i) => (
                            <button
                              key={i}
                              onClick={() => {
                                setSelectedTime(time);
                                if (selectedDate) handleNext();
                              }}
                              className={`py-4 rounded-xl border text-[11px] tracking-[0.2em] font-bold transition-all duration-500 ${
                                selectedTime === time
                                  ? 'bg-gold text-theme-main border-gold shadow-lg shadow-gold/20 scale-105'
                                  : 'bg-theme-surface/20 border-theme-border/20 text-theme-text/40 hover:border-gold/30 hover:text-theme-text/70'
                              }`}
                            >
                              {time}
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Step 4: Guest Details */}
                {step === 3 && (
                  <div className="space-y-10">
                    <header>
                      <button onClick={handleBack} className="flex items-center gap-2 text-[10px] uppercase tracking-[0.4em] text-gold/60 hover:text-gold transition-colors mb-6 group">
                        <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" /> {t.booking?.controls?.back || 'Back'}
                      </button>
                      <h2 className="font-cinzel text-3xl md:text-5xl text-theme-text tracking-widest">{t.booking?.labels?.legacyRegistration || 'Legacy Registration'}</h2>
                    </header>
                    
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
                      <div className="space-y-5">
                        <div className="space-y-2">
                          <label className="text-[9px] uppercase tracking-[0.4em] text-theme-text/30 px-1">{t.booking?.placeholders?.name || 'Full Name'}</label>
                          <input
                            type="text"
                            placeholder={t.booking?.placeholders?.name || 'Full Name'}
                            value={guestDetails.name}
                            onChange={e => setGuestDetails({...guestDetails, name: e.target.value})}
                            className="glass-input w-full"
                            aria-label={t.booking?.placeholders?.name || 'Full Name'}
                            autoComplete="name"
                          />
                        </div>
                        <div className="space-y-2">
                          <label className="text-[9px] uppercase tracking-[0.4em] text-theme-text/30 px-1">{t.booking?.placeholders?.email || 'Email Address'}</label>
                          <input
                            type="email"
                            placeholder={t.booking?.placeholders?.email || 'Email Address'}
                            value={guestDetails.email}
                            onChange={e => setGuestDetails({...guestDetails, email: e.target.value})}
                            className="glass-input w-full"
                            aria-label={t.booking?.placeholders?.email || 'Email Address'}
                            autoComplete="email"
                          />
                        </div>
                        <div className="space-y-2">
                          <label className="text-[9px] uppercase tracking-[0.4em] text-theme-text/30 px-1">{t.booking?.placeholders?.phone || 'Phone Number'}</label>
                          <input
                            type="tel"
                            placeholder={t.booking?.placeholders?.phone || 'Phone Number'}
                            value={guestDetails.phone}
                            onChange={e => setGuestDetails({...guestDetails, phone: e.target.value})}
                            className="glass-input w-full"
                            aria-label={t.booking?.placeholders?.phone || 'Phone Number'}
                            autoComplete="tel"
                          />
                        </div>
                        
                        {/* GDPR consent checkbox */}
                        <div className="pt-4">
                          <label className="flex items-start gap-4 cursor-pointer group">
                            <div className="relative mt-1">
                              <input 
                                type="checkbox" 
                                checked={agreedToPolicy}
                                onChange={e => setAgreedToPolicy(e.target.checked)}
                                className="sr-only"
                                aria-label={t.booking?.aria?.acceptLegal || 'Accept privacy policy and terms'}
                              />
                              <div className={`w-5 h-5 rounded border transition-all duration-500 flex items-center justify-center ${agreedToPolicy ? 'bg-gold border-gold' : 'bg-theme-main/50 border-theme-border group-hover:border-gold/40'}`}>
                                {agreedToPolicy && <Check size={12} className="text-theme-main font-bold" />}
                              </div>
                            </div>
                            <span className="text-[10px] text-theme-text/30 leading-relaxed font-inter transition-colors group-hover:text-theme-text/50">
                              {t.booking?.legal?.agreement || 'I accept the privacy policy and terms of service. Your data is processed per GDPR Art. 6(1)(b) for service delivery.'}
                            </span>
                          </label>
                        </div>
                      </div>

                      {/* Summary Card */}
                      <div className="glass-card-strong p-8 md:p-10 rounded-[2rem] border border-theme-border/30 relative overflow-hidden h-fit">
                        <div className="absolute top-0 right-0 p-6 opacity-5">
                          <Scissors size={80} className="text-gold" />
                        </div>
                        <h4 className="font-cinzel text-xs text-gold uppercase tracking-[0.4em] mb-8 flex items-center gap-3">
                          <span className="w-1.5 h-1.5 rounded-full bg-gold animate-pulse" /> {t.booking?.summary?.title || 'Final Summary'}
                        </h4>
                        <div className="space-y-6">
                          <div className="flex justify-between items-baseline">
                            <span className="text-[9px] uppercase tracking-[0.3em] text-theme-text/20">{t.booking?.summary?.service || 'Ritual'}</span>
                            <span className="font-cinzel text-base text-theme-text text-right max-w-[180px]">{selectedService?.name}</span>
                          </div>
                          <div className="flex justify-between items-baseline">
                            <span className="text-[9px] uppercase tracking-[0.3em] text-theme-text/20">{t.booking?.summary?.master || 'Master'}</span>
                            <span className="font-cinzel text-base text-theme-text">{selectedBarber?.name}</span>
                          </div>
                          <div className="flex justify-between items-baseline">
                            <span className="text-[9px] uppercase tracking-[0.3em] text-theme-text/20">{t.booking?.summary?.schedule || 'Schedule'}</span>
                            <span className="text-gold font-cinzel text-base">{selectedDate?.toLocaleDateString(locale)} @ {selectedTime}</span>
                          </div>
                          <div className="pt-8 border-t border-theme-border/20 flex justify-between items-center">
                            <span className="text-[10px] uppercase tracking-[0.2em] text-theme-text/40">{t.booking?.summary?.total || 'Total'}</span>
                            <span className="text-gold font-cinzel text-3xl font-bold shimmer-text">{selectedService?.price}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Step 5: Secure Payment */}
                {step === 4 && (
                  <div className="space-y-10">
                    <header className="text-center">
                      <button onClick={handleBack} className="mx-auto flex items-center gap-2 text-[10px] uppercase tracking-[0.4em] text-gold/60 hover:text-gold transition-colors mb-6 group">
                        <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" /> {t.booking?.controls?.back || 'Back'}
                      </button>
                      <h2 className="font-cinzel text-3xl md:text-5xl text-theme-text tracking-widest">{t.booking?.steps?.payment || 'Secure Payment'}</h2>
                      <p className="text-[10px] uppercase tracking-[0.3em] text-theme-text/20 mt-4 flex items-center justify-center gap-3">
                        <ShieldCheck size={14} className="text-gold/50" /> {t.booking?.labels?.encrypted || 'Fully Encrypted Transaction'}
                      </p>
                    </header>
                    
                    <div className="max-w-xl mx-auto py-6">
                      <MockStripeElement onComplete={handlePaymentComplete} isSubmitting={isSubmitting} />
                      {submitError && (
                        <p className="text-red-400 text-center text-sm mt-4">{submitError}</p>
                      )}
                    </div>
                  </div>
                )}

                {/* Step 6: Confirmation */}
                {step === 5 && (
                  <div ref={goldEndRef} className="h-full flex flex-col items-center justify-center text-center space-y-10">
                    <div className="relative">
                      <div className="gold-seal w-40 h-40 md:w-56 md:h-56 rounded-full bg-gradient-to-tr from-gold-dark via-gold to-gold-light p-1 shadow-2xl relative z-10">
                        <div className="w-full h-full rounded-full bg-theme-main flex items-center justify-center border-2 border-gold/20">
                          <Check size={64} className="text-gold stroke-[3]" />
                        </div>
                      </div>
                      <div className="gold-glow absolute inset-0 bg-gold blur-[100px] opacity-10 rounded-full" />
                    </div>

                    <div className="max-w-2xl space-y-6">
                      <h2 className="font-cinzel text-4xl md:text-6xl text-gold tracking-widest shimmer-text uppercase">{t.booking?.success?.title || 'Confirmed'}</h2>
                      <p className="font-cormorant italic text-xl md:text-2xl text-theme-text/50 leading-relaxed">
                        {(t.booking?.success?.subtitle || 'The chair is yours. Welcome to the elite society of Luca Barber. Your master {master} awaits your arrival.').replace('{master}', selectedBarber?.name)}
                      </p>
                      <div className="pt-8">
                        <button
                          onClick={onClose}
                          className="px-16 py-5 bg-gold text-theme-main rounded-full font-cinzel font-bold text-sm tracking-[0.4em] uppercase hover:bg-white hover:scale-105 transition-all duration-700 shadow-2xl"
                        >
                          {t.booking?.controls?.close || 'Legacy Continues'}
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Navigation Bar */}
          {step < 5 && (
            <div 
              className="px-6 md:px-12 py-5 md:py-6 border-t border-theme-border/20 bg-theme-main/50 backdrop-blur-md flex items-center justify-between flex-shrink-0"
              style={{ paddingBottom: 'max(env(safe-area-inset-bottom, 20px), 1.25rem)' }}
            >
              <button
                onClick={handleBack}
                disabled={step === 0}
                className={`text-[10px] tracking-[0.4em] uppercase font-bold text-theme-text/30 hover:text-gold transition-colors flex items-center gap-3 disabled:opacity-0 ${step === 0 ? 'pointer-events-none' : ''}`}
                aria-label={t.booking?.aria?.back || 'Go back'}
              >
                <ArrowLeft size={14} /> {t.booking?.controls?.back || 'Back'}
              </button>
              
              {step < 4 && (
                <button
                  onClick={handleNext}
                  disabled={
                    (step === 0 && !selectedService) || 
                    (step === 1 && !selectedBarber) ||
                    (step === 2 && (!selectedDate || !selectedTime)) ||
                    (step === 3 && (!guestDetails.name || !guestDetails.email || !guestDetails.phone || !agreedToPolicy))
                  }
                  className="px-12 py-4 rounded-full bg-gold text-theme-main font-bold text-[10px] tracking-[0.4em] uppercase disabled:opacity-30 disabled:grayscale transition-all hover:bg-white hover:scale-105 duration-700 shadow-xl"
                  aria-label={t.booking?.aria?.next || 'Continue to next step'}
                >
                  {t.booking?.controls?.next || 'Continue'}
                </button>
              )}
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
};
