import React, { createContext, useContext, ReactNode } from 'react';
import { useScroll, useSpring, MotionValue } from 'motion/react';

interface ScrollContextType {
  scrollYProgress: MotionValue<number>;
  smoothScrollProgress: MotionValue<number>;
}

const ScrollContext = createContext<ScrollContextType | undefined>(undefined);

export const ScrollProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  // Capture raw scroll progress (0 for top, 1 for bottom)
  const { scrollYProgress } = useScroll();

  // Create a smoothed version for high-end feel
  const smoothScrollProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <ScrollContext.Provider value={{ scrollYProgress, smoothScrollProgress }}>
      {children}
    </ScrollContext.Provider>
  );
};

export const useScrollProgress = () => {
  const context = useContext(ScrollContext);
  if (context === undefined) {
    throw new Error('useScrollProgress must be used within a ScrollProvider');
  }
  return context;
};

/**
 * Helper hook to map scroll progress to an animation frame
 */
export const useScrollFrame = (totalFrames: number) => {
  const { smoothScrollProgress } = useScrollProgress();
  // Note: we'll use motion's useTransform in the component for better perf, 
  // but this is a conceptual hook if needed.
  return smoothScrollProgress;
};
