
import { CSSProperties } from 'react';

// Staggered animation helper
export const getStaggeredAnimation = (index: number, baseDelay = 0.1) => {
  const delay = baseDelay * index;
  
  return {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { 
      duration: 0.3, 
      ease: [0.25, 0.1, 0.25, 1], 
      delay 
    }
  };
};

// Animation variants for framer-motion (if used)
export const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.25, 0.1, 0.25, 1]
    }
  }
};

export const fadeIn = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1,
    transition: {
      duration: 0.4,
      ease: [0.25, 0.1, 0.25, 1]
    }
  }
};

export const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

// CSS animation classes
export const getAnimationClass = (
  animation: 'fade-in' | 'slide-up' | 'scale-in' | 'blur-in',
  delay: number = 0
): string => {
  const delayClass = delay > 0 ? `delay-${delay * 100}` : '';
  return `animate-${animation} ${delayClass}`;
};

// Inline animation styles
export const getAnimationStyle = (
  delay: number = 0
): CSSProperties => {
  return {
    animationDelay: `${delay}s`,
    animationFillMode: 'both'
  };
};
