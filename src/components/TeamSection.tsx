import React from 'react';
import { useLocale } from '../i18n/useLocale';
import { motion } from 'motion/react';

export const teamMembers = [
  {
    id: 'master' as const,
    name: 'Marco "The Blade"',
    image: '/assets/images/barbers/marco.jpeg',
  },
  {
    id: 'artist' as const,
    name: 'Alessandro',
    image: '/assets/images/barbers/Alessandro.jpeg',
  },
  {
    id: 'specialist' as const,
    name: 'Giovanni',
    image: '/assets/images/barbers/Giovanni.jpeg',
  },
  {
    id: 'junior' as const,
    name: 'Luca',
    image: '/assets/images/barbers/Gulia.jpeg',
  }
];

export const TeamSection = () => {
  const { t, dir } = useLocale();

  return (
    <section id="team" className="relative py-44 bg-theme-main overflow-hidden">
      {/* Background accents */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[1000px] bg-gold/[0.03] rounded-full blur-[300px] pointer-events-none" />
      <div className="absolute -right-20 top-1/2 w-96 h-96 bg-gold/[0.02] rounded-full blur-[150px] pointer-events-none" />
      
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 relative z-10">
        <div className={`text-center mb-24 ${dir === 'rtl' ? 'direction-rtl' : ''}`}>
           <motion.div 
             initial={{ opacity: 0, y: 20 }}
             whileInView={{ opacity: 1, y: 0 }}
             transition={{ duration: 0.8 }}
             viewport={{ once: true }}
             className="flex items-center justify-center gap-4 mb-4"
           >
            <div className="w-10 h-[1px] bg-gold/30" />
            <span className="text-[10px] tracking-[0.6em] uppercase text-gold font-bold">
              {t.team.label}
            </span>
            <div className="w-10 h-[1px] bg-gold/30" />
          </motion.div>
          <motion.h2 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.2 }}
            viewport={{ once: true }}
            className="font-cinzel text-5xl md:text-7xl text-theme-text"
          >
            {t.team.title}
          </motion.h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {teamMembers.map((member, i) => (
            <motion.div 
              key={member.name}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: i * 0.15 }}
              viewport={{ once: true }}
              className="group cursor-none"
              data-cursor={`@${member.id}`}
            >
              <div className="relative overflow-hidden rounded-[2.5rem] aspect-[4/5] mb-8 border border-theme-border/50 bg-theme-surface">
                <img 
                  src={member.image} 
                  alt={member.name} 
                  className="w-full h-full object-cover grayscale brightness-75 transition-all duration-1000 group-hover:scale-110 group-hover:grayscale-0 group-hover:brightness-100"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-theme-main/90 via-transparent to-transparent opacity-80 group-hover:opacity-40 transition-opacity duration-700" />
                
                {/* Floating Role Badge */}
                <div className="absolute top-6 right-6 translate-x-12 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-700">
                  <div className="glass-card-strong px-4 py-2 rounded-full border border-gold/20 shadow-2xl">
                     <span className="text-[8px] tracking-[0.3em] font-black uppercase text-gold">{t.team.expert}</span>
                  </div>
                </div>
              </div>
              <div className="text-center">
                <h3 className="font-cinzel text-2xl text-theme-text mb-2 group-hover:text-gold transition-colors duration-500">{member.name}</h3>
                <div className="flex flex-col items-center">
                   <p className="font-inter text-[10px] tracking-[0.3em] uppercase text-theme-text/40 font-bold mb-4">
                     {t.team.roles[member.id]}
                   </p>
                   <div className="w-6 h-[1px] bg-gold/20 group-hover:w-16 transition-all duration-500" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
