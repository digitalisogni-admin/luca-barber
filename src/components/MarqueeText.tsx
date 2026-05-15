import React from 'react';

interface MarqueeTextProps {
  text: string;
  speed?: number;
  className?: string;
  separator?: string;
  rtl?: boolean;
}

export const MarqueeText = ({
  text,
  speed = 30,
  className = '',
  separator = '',
  rtl = false,
}: MarqueeTextProps) => {
  const repeatedText = `${text}${separator}`.repeat(12);

  return (
    <div className={`relative overflow-hidden whitespace-nowrap py-6 ${className}`}>
      <div className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-theme-main to-transparent z-10 pointer-events-none" />
      <div className="absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-theme-main to-transparent z-10 pointer-events-none" />
      <div
        className="inline-block"
        style={{
          animation: `${rtl ? 'marquee-rtl' : 'marquee'} ${speed}s linear infinite`,
          willChange: 'transform',
        }}
      >
        <span className="font-cinzel tracking-[0.15em]">{repeatedText}</span>
      </div>
    </div>
  );
};
