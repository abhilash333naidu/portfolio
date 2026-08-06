

// ============================================
// Easing Curves
// ============================================
export const easings = {
  // Smooth, professional feel
  smooth: [0.4, 0, 0.2, 1] as const,
  // Elegant deceleration
  decelerate: [0, 0, 0.2, 1] as const,
  // Snappy acceleration
  accelerate: [0.4, 0, 1, 1] as const,
  // Bouncy, playful
  spring: { type: "spring" as const, stiffness: 300, damping: 30 },
  // Ultra-smooth for luxury feel
  luxury: [0.23, 1, 0.32, 1] as const,
  // Dramatic reveal
  dramatic: [0.87, 0, 0.13, 1] as const,
  // Magnetic pull
  magnetic: { type: "spring" as const, stiffness: 150, damping: 15, mass: 0.1 },
};

// ============================================
// Duration Scale
// ============================================
export const durations = {
  instant: 0.1,      // Micro-interactions
  fast: 0.2,         // Hover states
  normal: 0.4,       // Standard transitions
  slow: 0.6,         // Page transitions
  dramatic: 0.8,     // Hero reveals
  cinematic: 1.2,    // Major reveals
};

// ============================================
// Stagger Patterns
// ============================================
export const staggers = {
  fast: 0.05,        // List items, nav links
  normal: 0.1,       // Cards, grids
  slow: 0.15,        // Hero elements
  dramatic: 0.2,     // Section reveals
  text: 0.08,        // Text reveal words
};

// ============================================
// Page Transitions
// ============================================
export const pageTransition = {
  initial: { opacity: 0, y: 20 },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: easings.luxury,
    },
  },
  exit: {
    opacity: 0,
    y: -20,
    transition: {
      duration: 0.3,
      ease: easings.accelerate,
    },
  },
};

// ============================================
// Scroll-Triggered Reveals
// ============================================
export const fadeUpReveal = {
  initial: { opacity: 0, y: 40 },
  whileInView: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: easings.luxury,
    },
  },
  viewport: { once: true, margin: "-100px" },
};

export const fadeInReveal = {
  initial: { opacity: 0 },
  whileInView: {
    opacity: 1,
    transition: {
      duration: 0.6,
      ease: easings.smooth,
    },
  },
  viewport: { once: true, margin: "-50px" },
};

// ============================================
// Stagger Containers
// ============================================
export const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: staggers.normal,
      delayChildren: 0.2,
    },
  },
};

export const staggerItem = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: easings.luxury,
    },
  },
};

// ============================================
// Text Reveal Animation (Hero)
// ============================================
export const heroTextReveal = {
  container: {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: staggers.text,
        delayChildren: 0.3,
      },
    },
  },
  word: {
    hidden: {
      opacity: 0,
      y: 50,
      rotateX: -40,
    },
    visible: {
      opacity: 1,
      y: 0,
      rotateX: 0,
      transition: {
        duration: 0.8,
        ease: easings.luxury,
      },
    },
  },
};

// ============================================
// Magnetic Button
// ============================================
export const magneticConfig = {
  strength: 0.3,
  radius: 100,
  spring: {
    stiffness: 150,
    damping: 15,
    mass: 0.1,
  },
};

export const magneticHover = {
  whileHover: { scale: 1.05 },
  whileTap: { scale: 0.95 },
  transition: {
    type: "spring" as const,
    stiffness: 400,
    damping: 25,
  },
};

// ============================================
// Card Hover Effects
// ============================================
export const cardHover = {
  whileHover: {
    y: -8,
    transition: {
      duration: 0.3,
      ease: easings.luxury,
    },
  },
};

// ============================================
// Bento Grid Animations
// ============================================
export const bentoItem = {
  initial: { opacity: 0, scale: 0.9 },
  animate: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.6,
      ease: easings.luxury,
    },
  },
};

export const bentoHover = {
  whileHover: {
    scale: 1.02,
    transition: { duration: 0.3 },
  },
  whileTap: { scale: 0.98 },
};

// ============================================
// Scroll Indicator
// ============================================
export const scrollIndicatorAnimation = {
  y: [0, 10, 0],
  transition: {
    duration: 1.5,
    repeat: Infinity,
    ease: "easeInOut",
  },
};

// ============================================
// Page Load Animation
// ============================================
export const pageLoadAnimation = {
  curtain: {
    initial: { y: 0 },
    animate: {
      y: "-100%",
      transition: {
        duration: 0.8,
        ease: [0.76, 0, 0.24, 1],
        delay: 0.2,
      },
    },
  },
  content: {
    initial: { opacity: 0 },
    animate: {
      opacity: 1,
      transition: { duration: 0.5, delay: 0.6 },
    },
  },
};

// ============================================
// Smooth Scroll Configuration
// ============================================
export const smoothScrollConfig = {
  duration: 1.2,
  easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
  orientation: "vertical" as const,
  gestureOrientation: "vertical" as const,
  smoothWheel: true,
  wheelMultiplier: 1,
  touchMultiplier: 2,
};

// ============================================
// Timeline-Specific Animations
// ============================================

// Timeline node entrance
export const timelineNodeReveal = {
  initial: { scale: 0, opacity: 0 },
  animate: { 
    scale: 1, 
    opacity: 1,
    transition: {
      duration: 0.6,
      ease: easings.luxury,
    }
  },
};

// Timeline connection line draw
export const timelineConnectionDraw = {
  initial: { width: 0, opacity: 0 },
  animate: { 
    width: 48, 
    opacity: 1,
    transition: {
      duration: 0.4,
      ease: easings.luxury,
    }
  },
};

// Timeline card reveal (alternating directions)
export const timelineCardReveal = (isLeft: boolean) => ({
  initial: { 
    opacity: 0, 
    y: 30, 
    x: isLeft ? -20 : 20 
  },
  animate: { 
    opacity: 1, 
    y: 0, 
    x: 0,
    transition: {
      duration: 0.8,
      ease: easings.luxury,
    }
  },
});

// Timeline project card reveal
export const timelineProjectReveal = {
  initial: { opacity: 0, x: 20 },
  animate: { 
    opacity: 1, 
    x: 0,
    transition: {
      duration: 0.6,
      ease: easings.luxury,
    }
  },
};

// Achievement dot entrance
export const achievementDotReveal = {
  initial: { scale: 0 },
  animate: { 
    scale: 1,
    transition: {
      duration: 0.3,
      ease: easings.smooth,
    }
  },
};

// Achievement text entrance
export const achievementTextReveal = {
  initial: { opacity: 0, x: -10 },
  animate: { 
    opacity: 1, 
    x: 0,
    transition: {
      duration: 0.4,
      ease: easings.smooth,
    }
  },
};
