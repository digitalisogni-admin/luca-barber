import React, { useRef, useState } from 'react';
import gsap from 'gsap';

interface MagneticButtonProps {
  children: React.ReactNode;
  className?: string;
  href?: string;
  onClick?: () => void;
  type?: 'button' | 'submit';
  disabled?: boolean;
}

export const MagneticButton = ({
  children,
  className = '',
  href,
  onClick,
  type = 'button',
  disabled = false,
}: MagneticButtonProps) => {
  const btnRef = useRef<HTMLElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!btnRef.current || disabled) return;
    const rect = btnRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;

    gsap.to(btnRef.current, {
      x: x * 0.3,
      y: y * 0.3,
      duration: 0.4,
      ease: 'power2.out',
    });
  };

  const handleMouseLeave = () => {
    if (!btnRef.current) return;
    setIsHovered(false);
    gsap.to(btnRef.current, {
      x: 0,
      y: 0,
      duration: 0.6,
      ease: 'elastic.out(1, 0.3)',
    });
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const sharedProps = {
    ref: btnRef as any,
    className: `relative inline-flex items-center justify-center overflow-hidden transition-all duration-500 ${disabled ? 'opacity-30 cursor-not-allowed' : ''} ${className}`,
    onMouseMove: handleMouseMove,
    onMouseLeave: handleMouseLeave,
    onMouseEnter: handleMouseEnter,
    'data-cursor': 'Book',
  };

  const inner = (
    <>
      <span className={`relative z-10 transition-transform duration-500 ${isHovered ? 'scale-105' : ''}`}>
        {children}
      </span>
      <div
        className="absolute inset-0 bg-gold/10 rounded-full scale-0 transition-transform duration-700 ease-out"
        style={{ transform: isHovered ? 'scale(2.5)' : 'scale(0)' }}
      />
    </>
  );

  if (href) {
    return (
      <a href={href} {...sharedProps}>
        {inner}
      </a>
    );
  }

  return (
    <button type={type} onClick={onClick} disabled={disabled} {...sharedProps}>
      {inner}
    </button>
  );
};
