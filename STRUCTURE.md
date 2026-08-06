# High-End Motion Portfolio - Technical Specification

## 1. Visual Design System

### 1.1 Dark Mode Aesthetic

#### Color Palette
```
Primary Colors:
--bg-primary: #0a0a0a          // Deep void black
--bg-secondary: #111111        // Elevated surfaces
--bg-tertiary: #1a1a1a         // Cards, elevated elements
--bg-elevated: #222222         // Modals, dropdowns

Accent Colors:
--accent-primary: #3b82f6      // Electric blue
--accent-secondary: #8b5cf6    // Violet purple
--accent-tertiary: #06b6d4     // Cyan
--accent-gradient: linear-gradient(135deg, #3b82f6 0%, #8b5cf6 50%, #06b6d4 100%)

Text Colors:
--text-primary: #ffffff        // Primary text, 100% opacity
--text-secondary: rgba(255,255,255,0.7)   // Secondary text
--text-tertiary: rgba(255,255,255,0.5)    // Muted, captions
--text-muted: rgba(255,255,255,0.3)       // Disabled, subtle

Surface Colors:
--surface-border: rgba(255,255,255,0.08)  // Subtle borders
--surface-glow: rgba(59,130,246,0.15)     // Accent glow
```

#### Gradients & Effects
```
Primary Gradient: linear-gradient(135deg, #3b82f6 0%, #8b5cf6 50%, #06b6d4 100%)
Subtle Gradient: linear-gradient(180deg, rgba(255,255,255,0.03) 0%, transparent 100%)
Glow Effect: 0 0 60px rgba(59,130,246,0.3), 0 0 120px rgba(139,92,246,0.15)
Card Gradient: radial-gradient(ellipse at top, rgba(59,130,246,0.1) 0%, transparent 50%)
```

#### Shadows (Dark Mode Optimized)
```
shadow-sm: 0 1px 2px rgba(0,0,0,0.3)
shadow-md: 0 4px 6px -1px rgba(0,0,0,0.4), 0 2px 4px -2px rgba(0,0,0,0.3)
shadow-lg: 0 10px 15px -3px rgba(0,0,0,0.5), 0 4px 6px -4px rgba(0,0,0,0.4)
shadow-xl: 0 20px 25px -5px rgba(0,0,0,0.6), 0 8px 10px -6px rgba(0,0,0,0.4)
shadow-glow: 0 0 40px rgba(59,130,246,0.2), 0 0 80px rgba(139,92,246,0.1)
shadow-inner: inset 0 2px 4px rgba(0,0,0,0.3)
```

#### Contrast Ratios (WCAG 2.1 AA Compliance)
- Primary text on bg-primary: 21:1 (pass)
- Secondary text on bg-primary: 7.5:1 (pass)
- Muted text on bg-primary: 4.6:1 (pass AA Large)
- Accent on bg-primary: 4.5:1 minimum

---

### 1.2 Typography System

#### Font Families
```
Headings: "Inter", system-ui, -apple-system, sans-serif
Body: "Inter", system-ui, -apple-system, sans-serif
Mono: "JetBrains Mono", "Fira Code", monospace
```

#### Type Scale (Fluid)
```
Display XL: clamp(3.5rem, 8vw, 8rem)       // 56px - 128px
Display LG: clamp(2.5rem, 5vw, 5rem)       // 40px - 80px
Display MD: clamp(2rem, 4vw, 3.5rem)       // 32px - 56px

Heading 1: clamp(1.75rem, 3vw, 2.5rem)     // 28px - 40px
Heading 2: clamp(1.5rem, 2.5vw, 2rem)      // 24px - 32px
Heading 3: clamp(1.25rem, 2vw, 1.75rem)    // 20px - 28px
Heading 4: clamp(1.1rem, 1.5vw, 1.5rem)    // 18px - 24px

Body Large: clamp(1.125rem, 1.5vw, 1.25rem)   // 18px - 20px
Body: clamp(1rem, 1.2vw, 1.125rem)            // 16px - 18px
Body Small: clamp(0.875rem, 1vw, 1rem)        // 14px - 16px
Caption: clamp(0.75rem, 0.9vw, 0.875rem)      // 12px - 14px
```

#### Font Weights
```
Thin: 100
Light: 300
Regular: 400
Medium: 500
Semibold: 600
Bold: 700
Black: 900
```

#### Line Heights
```
Display: 0.95 - 1.0 (tight)
Headings: 1.1 - 1.2 (compact)
Body: 1.6 - 1.8 (comfortable)
UI Elements: 1.0 - 1.2 (compact)
```

#### Letter Spacing
```
Display: -0.02em to -0.04em (tighter)
Headings: -0.01em to -0.02em
Body: 0 (normal)
UI/Caption: 0.05em to 0.1em (wider, uppercase)
```

---

### 1.3 Spacing & Layout

#### Grid System
```
Columns: 12
Gutter: clamp(16px, 2vw, 32px)
Max Container: 1400px
Content Max: 1200px
Narrow Max: 800px
```

#### Section Spacing
```
Section Padding Y: clamp(80px, 12vw, 160px)
Section Padding X: clamp(16px, 5vw, 80px)
Container Padding: clamp(16px, 4vw, 48px)
```

#### Spacing Scale (4px base)
```
space-1: 4px
space-2: 8px
space-3: 12px
space-4: 16px
space-5: 24px
space-6: 32px
space-7: 48px
space-8: 64px
space-9: 96px
space-10: 128px
```

#### Responsive Breakpoints
```
sm: 640px
md: 768px
lg: 1024px
xl: 1280px
2xl: 1536px
```

---

## 2. Animation Engine (Framer Motion)

### 2.1 Animation Philosophy

#### Easing Curves
```typescript
const easings = {
  // Smooth, professional feel
  smooth: [0.4, 0, 0.2, 1],
  
  // Elegant deceleration
  decelerate: [0, 0, 0.2, 1],
  
  // Snappy acceleration
  accelerate: [0.4, 0, 1, 1],
  
  // Bouncy, playful
  spring: { type: "spring", stiffness: 300, damping: 30 },
  
  // Ultra-smooth for luxury feel
  luxury: [0.23, 1, 0.32, 1],
  
  // Dramatic reveal
  dramatic: [0.87, 0, 0.13, 1],
  
  // Magnetic pull
  magnetic: { type: "spring", stiffness: 150, damping: 15, mass: 0.1 }
}
```

#### Duration Scale
```typescript
const durations = {
  instant: 0.1,      // Micro-interactions
  fast: 0.2,         // Hover states
  normal: 0.4,       // Standard transitions
  slow: 0.6,         // Page transitions
  dramatic: 0.8,     // Hero reveals
  cinematic: 1.2,    // Major reveals
}
```

#### Stagger Patterns
```typescript
const staggers = {
  fast: 0.05,        // List items, nav links
  normal: 0.1,       // Cards, grids
  slow: 0.15,        // Hero elements
  dramatic: 0.2,     // Section reveals
}
```

---

### 2.2 Component Animation Specs

#### Page Transitions
```typescript
// Page exit/enter
const pageTransition = {
  initial: { opacity: 0, y: 20 },
  animate: { 
    opacity: 1, 
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.23, 1, 0.32, 1]
    }
  },
  exit: { 
    opacity: 0, 
    y: -20,
    transition: {
      duration: 0.3,
      ease: [0.4, 0, 1, 1]
    }
  }
}
```

#### Scroll-Triggered Reveals
```typescript
// Fade up reveal
const fadeUpReveal = {
  initial: { opacity: 0, y: 40 },
  whileInView: { 
    opacity: 1, 
    y: 0,
    transition: {
      duration: 0.8,
      ease: [0.23, 1, 0.32, 1]
    }
  },
  viewport: { once: true, margin: "-100px" }
}

// Staggered children
const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2
    }
  }
}

const staggerItem = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.23, 1, 0.32, 1]
    }
  }
}
```

#### Hover States & Micro-interactions
```typescript
// Magnetic button hover
const magneticHover = {
  whileHover: { scale: 1.05 },
  whileTap: { scale: 0.95 },
  transition: {
    type: "spring",
    stiffness: 400,
    damping: 25
  }
}

// Card hover lift
const cardHover = {
  whileHover: { 
    y: -8,
    boxShadow: "0 20px 40px rgba(0,0,0,0.3)",
    transition: {
      duration: 0.3,
      ease: [0.23, 1, 0.32, 1]
    }
  }
}

// Link underline animation
const linkHover = {
  initial: { width: "0%" },
  whileHover: { 
    width: "100%",
    transition: { duration: 0.3, ease: [0.23, 1, 0.32, 1] }
  }
}
```

#### Bento-Box Grid Animations
```typescript
// Grid item entrance
const bentoItem = {
  initial: { opacity: 0, scale: 0.9 },
  animate: { 
    opacity: 1, 
    scale: 1,
    transition: {
      duration: 0.6,
      ease: [0.23, 1, 0.32, 1]
    }
  }
}

// Grid item hover
const bentoHover = {
  whileHover: {
    scale: 1.02,
    transition: { duration: 0.3 }
  },
  whileTap: { scale: 0.98 }
}
```

---

### 2.3 Performance Budget

#### Target Metrics
```
First Contentful Paint: < 1.5s
Largest Contentful Paint: < 2.5s
Time to Interactive: < 3.5s
Cumulative Layout Shift: < 0.1
Animation Frame Rate: 60fps minimum
```

#### GPU Acceleration Strategies
```typescript
// Use transform instead of positional properties
// GPU-accelerated properties:
const gpuProperties = [
  "transform",
  "opacity",
  "filter"
]

// Avoid animating:
const avoidProperties = [
  "width", "height", "top", "left", "right", "bottom",
  "margin", "padding", "border-width"
]
```

#### will-change Usage
```typescript
// Apply to elements before animation
const willChangeStyles = {
  willChange: "transform, opacity",
  
  // Remove after animation completes
  onAnimationComplete: () => ({
    willChange: "auto"
  })
}
```

#### Reduce Motion Support
```typescript
const prefersReducedMotion = {
  initial: false,
  animate: false,
  transition: { duration: 0 }
}

// Wrap animations in media query check
const animationVariants = {
  animate: prefersReducedMotion ? {} : { opacity: 1, y: 0 }
}
```

---

## 3. Layout Specifications

### 3.1 Bento-Box Project Grid

#### Grid Structure
```typescript
// Desktop layout (3 columns with varied heights)
const bentoGridConfig = {
  columns: 3,
  gap: "24px",
  
  // Card size variants
  sizes: {
    small: { colSpan: 1, rowSpan: 1 },    // 1x1
    medium: { colSpan: 1, rowSpan: 2 },    // 1x2
    large: { colSpan: 2, rowSpan: 2 },     // 2x2
    wide: { colSpan: 2, rowSpan: 1 },      // 2x1
    featured: { colSpan: 3, rowSpan: 2 }   // 3x2
  }
}

// Responsive behavior
const responsiveGrid = {
  mobile: { columns: 1, allCards: "full" },
  tablet: { columns: 2, gap: "20px" },
  desktop: { columns: 3, gap: "24px" }
}
```

#### Card Specifications
```typescript
interface BentoCard {
  id: string
  title: string
  category: string
  image: string
  size: "small" | "medium" | "large" | "wide" | "featured"
  accent: boolean        // Has gradient border/glow
}

// Card styling
const cardStyles = {
  base: `
    relative overflow-hidden rounded-2xl
    bg-[#1a1a1a] border border-white/[0.08]
    transition-all duration-300
  `,
  hover: `
    hover:border-white/20
    hover:shadow-[0_0_40px_rgba(59,130,246,0.15)]
  `,
  featured: `
    gradient-border
    before:absolute before:inset-0 before:rounded-2xl
    before:bg-gradient-to-br before:from-blue-500/20 before:via-purple-500/20 before:to-cyan-500/20
    before:opacity-0 hover:before:opacity-100
    before:transition-opacity before:duration-500
  `
}
```

#### Hover Interactions
```typescript
const bentoCardHover = {
  // Image zoom
  image: {
    whileHover: { scale: 1.08 },
    transition: { duration: 0.6, ease: [0.23, 1, 0.32, 1] }
  },
  
  // Content slide up
  content: {
    initial: { y: 20, opacity: 0 },
    whileHover: { 
      y: 0, 
      opacity: 1,
      transition: { duration: 0.3 }
    }
  },
  
  // Gradient reveal
  gradient: {
    initial: { opacity: 0 },
    whileHover: { 
      opacity: 1,
      transition: { duration: 0.4 }
    }
  }
}
```

---

### 3.2 Hero Section

#### Layout Structure
```typescript
const heroLayout = {
  height: "100vh",           // Full viewport
  minHeight: "600px",
  maxHeight: "1200px",
  
  content: {
    position: "center",
    maxWidth: "900px",
    textAlign: "center"
  }
}
```

#### Text-Reveal Animation Sequence
```typescript
const heroTextReveal = {
  // Container
  container: {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.3
      }
    }
  },
  
  // Individual word/character
  word: {
    hidden: { 
      opacity: 0, 
      y: 50,
      rotateX: -40
    },
    visible: {
      opacity: 1,
      y: 0,
      rotateX: 0,
      transition: {
        duration: 0.8,
        ease: [0.23, 1, 0.32, 1]
      }
    }
  }
}

// Usage timing
const heroSequence = {
  0.0: "Background fade in",
  0.3: "Title words start revealing (staggered)",
  0.8: "Subtitle fades in",
  1.2: "CTA buttons slide up",
  1.6: "Scroll indicator appears"
}
```

#### Scroll Indicator
```typescript
const scrollIndicator = {
  animation: {
    y: [0, 10, 0],
    transition: {
      duration: 1.5,
      repeat: Infinity,
      ease: "easeInOut"
    }
  },
  
  // Fade out on scroll
  scrollFade: {
    initial: { opacity: 1 },
    scroll: { 
      opacity: 0,
      transition: { duration: 0.3 }
    }
  }
}
```

#### Initial Load Animation
```typescript
const pageLoadAnimation = {
  // Black overlay that fades out
  curtain: {
    initial: { y: 0 },
    animate: { 
      y: "-100%",
      transition: {
        duration: 0.8,
        ease: [0.76, 0, 0.24, 1],
        delay: 0.2
      }
    }
  },
  
  // Content fades in after curtain
  content: {
    initial: { opacity: 0 },
    animate: { 
      opacity: 1,
      transition: { duration: 0.5, delay: 0.6 }
    }
  }
}
```

---

### 3.3 Magnetic CTA Buttons

#### Physics Specifications
```typescript
const magneticConfig = {
  // Attraction strength
  strength: 0.3,           // 0-1, higher = stronger pull
  
  // Magnetic radius (pixels)
  radius: 100,
  
  // Spring physics
  spring: {
    stiffness: 150,
    damping: 15,
    mass: 0.1
  }
}
```

#### Implementation Approach
```typescript
// Custom hook for magnetic effect
const useMagnetic = (ref: RefObject<HTMLElement>) => {
  const [position, setPosition] = useState({ x: 0, y: 0 })
  
  useEffect(() => {
    const element = ref.current
    if (!element) return
    
    const handleMouseMove = (e: MouseEvent) => {
      const rect = element.getBoundingClientRect()
      const centerX = rect.left + rect.width / 2
      const centerY = rect.top + rect.height / 2
      
      const distanceX = e.clientX - centerX
      const distanceY = e.clientY - centerY
      const distance = Math.sqrt(distanceX ** 2 + distanceY ** 2)
      
      if (distance < magneticConfig.radius) {
        const strength = (1 - distance / magneticConfig.radius) * magneticConfig.strength
        setPosition({
          x: distanceX * strength,
          y: distanceY * strength
        })
      } else {
        setPosition({ x: 0, y: 0 })
      }
    }
    
    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [ref])
  
  return position
}
```

#### Button Variants
```typescript
const ctaVariants = {
  primary: `
    relative px-8 py-4 rounded-full
    bg-gradient-to-r from-blue-500 via-purple-500 to-cyan-500
    text-white font-medium
    overflow-hidden
    group
  `,
  
  secondary: `
    relative px-8 py-4 rounded-full
    bg-transparent border border-white/20
    text-white font-medium
    hover:bg-white/5
    transition-colors duration-300
  `,
  
  ghost: `
    relative px-6 py-3
    text-white/70 font-medium
    hover:text-white
    transition-colors duration-300
  `
}
```

---

### 3.4 Smooth Scroll Integration

#### Scroll Behavior
```typescript
// Global smooth scroll
const smoothScrollConfig = {
  duration: 1.2,           // Seconds
  ease: [0.76, 0, 0.24, 1], // Cubic bezier
  smoothWheel: true,
  wheelMultiplier: 1,
  touchMultiplier: 2
}

// Section snap points
const snapPoints = {
  enabled: true,
  delay: 0,
  ease: [0.76, 0, 0.24, 1],
  duration: 0.5
}
```

#### Lenis Implementation
```typescript
// Initialize smooth scroll
const initSmoothScroll = () => {
  const lenis = new Lenis({
    duration: 1.2,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    orientation: "vertical",
    gestureOrientation: "vertical",
    smoothWheel: true,
    wheelMultiplier: 1,
    touchMultiplier: 2
  })
  
  function raf(time: number) {
    lenis.raf(time)
    requestAnimationFrame(raf)
  }
  
  requestAnimationFrame(raf)
  return lenis
}

// GSAP ScrollTrigger integration
ScrollTrigger.scrollerProxy(document.body, {
  scrollTop(value) {
    return lenis.scroll
  },
  getBoundingClientRect() {
    return {
      top: 0,
      left: 0,
      width: window.innerWidth,
      height: window.innerHeight
    }
  }
})
```

#### Parallax Considerations
```typescript
const parallaxConfig = {
  // Layer 1: Background (slowest)
  background: { speed: 0.2 },
  
  // Layer 2: Midground
  midground: { speed: 0.5 },
  
  // Layer 3: Foreground (fastest)
  foreground: { speed: 0.8 },
  
  // Layer 4: Floating elements
  floating: { speed: 1.2 }
}

// Usage with Framer Motion
const parallaxVariants = {
  initial: { y: 0 },
  scroll: (speed: number) => ({
    y: speed * 100,
    transition: { duration: 0 }
  })
}
```

---

## 4. Technical Stack

### Core Dependencies
```json
{
  "dependencies": {
    "next": "^14.2.0",
    "react": "^18.3.0",
    "react-dom": "^18.3.0",
    "framer-motion": "^11.0.0",
    "lenis": "^1.0.0",
    "gsap": "^3.12.0",
    "@gsap/react": "^2.1.0"
  },
  "devDependencies": {
    "typescript": "^5.4.0",
    "@types/node": "^20.0.0",
    "@types/react": "^18.3.0",
    "@types/react-dom": "^18.3.0",
    "tailwindcss": "^3.4.0",
    "postcss": "^8.4.0",
    "autoprefixer": "^10.4.0",
    "eslint": "^8.57.0",
    "eslint-config-next": "^14.2.0"
  }
}
```

### TypeScript Configuration
```json
{
  "compilerOptions": {
    "target": "ES2020",
    "lib": ["dom", "dom.iterable", "ES2020"],
    "allowJs": true,
    "skipLibCheck": true,
    "strict": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "preserve",
    "incremental": true,
    "plugins": [{ "name": "next" }],
    "paths": {
      "@/*": ["./src/*"],
      "@/components/*": ["./src/components/*"],
      "@/hooks/*": ["./src/hooks/*"],
      "@/lib/*": ["./src/lib/*"],
      "@/types/*": ["./src/types/*"],
      "@/styles/*": ["./src/styles/*"]
    }
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx", ".next/types/**/*.ts"],
  "exclude": ["node_modules"]
}
```

### Tailwind Configuration
```typescript
// tailwind.config.ts
import type { Config } from "tailwindcss"

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        background: "#0a0a0a",
        surface: {
          DEFAULT: "#1a1a1a",
          elevated: "#222222"
        },
        accent: {
          blue: "#3b82f6",
          purple: "#8b5cf6",
          cyan: "#06b6d4"
        }
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
        mono: ["JetBrains Mono", "monospace"]
      },
      animation: {
        "fade-up": "fadeUp 0.8s cubic-bezier(0.23, 1, 0.32, 1) forwards",
        "fade-in": "fadeIn 0.6s ease-out forwards"
      },
      keyframes: {
        fadeUp: {
          "0%": { opacity: "0", transform: "translateY(40px)" },
          "100%": { opacity: "1", transform: "translateY(0)" }
        },
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" }
        }
      }
    }
  },
  plugins: []
}

export default config
```

---

## 5. File Structure

### Directory Organization
```
my-portfolio/
├── public/
│   ├── images/
│   │   ├── projects/           # Project thumbnails & images
│   │   ├── profile/            # Profile photos
│   │   └── backgrounds/        # Background assets
│   ├── fonts/
│   │   ├── Inter/              # Custom font files if needed
│   │   └── JetBrainsMono/
│   └── favicon.ico
│
├── src/
│   ├── app/
│   │   ├── layout.tsx          # Root layout with providers
│   │   ├── page.tsx            # Homepage
│   │   ├── loading.tsx         # Loading state
│   │   ├── not-found.tsx       # 404 page
│   │   └── globals.css         # Global styles
│   │
│   ├── components/
│   │   ├── ui/                 # Reusable UI primitives
│   │   │   ├── button.tsx
│   │   │   ├── card.tsx
│   │   │   └── badge.tsx
│   │   │
│   │   ├── layout/             # Layout components
│   │   │   ├── header.tsx
│   │   │   ├── footer.tsx
│   │   │   └── container.tsx
│   │   │
│   │   ├── sections/           # Page sections
│   │   │   ├── hero.tsx
│   │   │   ├── about.tsx
│   │   │   ├── projects-grid.tsx
│   │   │   ├── project-card.tsx
│   │   │   ├── contact.tsx
│   │   │   └── skills.tsx
│   │   │
│   │   └── animations/         # Animation wrappers
│   │       ├── fade-up.tsx
│   │       ├── stagger-container.tsx
│   │       ├── text-reveal.tsx
│   │       └── magnetic-button.tsx
│   │
│   ├── hooks/
│   │   ├── use-smooth-scroll.ts
│   │   ├── use-magnetic.ts
│   │   ├── use-scroll-progress.ts
│   │   ├── use-in-view.ts
│   │   └── use-media-query.ts
│   │
│   ├── lib/
│   │   ├── animations.ts       # Animation variants & configs
│   │   ├── utils.ts            # Utility functions (cn, etc.)
│   │   └── constants.ts        # Site constants
│   │
│   ├── types/
│   │   ├── project.ts          # Project type definitions
│   │   └── index.ts            # Export all types
│   │
│   └── data/
│       ├── projects.ts         # Project data
│       └── site.ts             # Site metadata
│
├── next.config.js
├── tailwind.config.ts
├── tsconfig.json
├── postcss.config.js
└── package.json
```

### Component Hierarchy
```
Layout (Root)
├── SmoothScrollProvider
│   └── Header (Fixed)
│       └── Navigation
│           └── MagneticButton (Nav links)
│   
└── Main Content
    ├── Hero Section
    │   ├── TextReveal (Animated heading)
    │   ├── MagneticButton (CTAs)
    │   └── ScrollIndicator
    │
    ├── About Section
    │   └── FadeUp (Content wrapper)
    │
    ├── Projects Section
    │   └── BentoGrid
    │       └── ProjectCard (Multiple)
    │           └── Hover animations
    │
    ├── Skills Section
    │   └── StaggerContainer
    │       └── SkillCard (Multiple)
    │
    └── Contact Section
        └── MagneticButton (Contact CTA)
    
    └── Footer
```

### Animation Utilities Location
```
src/lib/animations.ts
- Easing curves constants
- Duration scale
- Stagger patterns
- Pre-built variants (fadeUp, scaleIn, etc.)
- Page transition variants

src/components/animations/
- Reusable animation wrapper components
- Complex animation compositions
- Text reveal components
- Magnetic effect components

src/hooks/
- Custom hooks for scroll, magnetic, and viewport detection
```

### Asset Organization
```
public/images/projects/
├── project-1/
│   ├── thumbnail.jpg        # 800x600 minimum
│   ├── thumbnail@2x.jpg     # Retina
│   ├── hero.jpg             # Full width hero
│   └── gallery/             # Additional images
│       ├── 01.jpg
│       └── 02.jpg
├── project-2/
└── ...

Image specifications:
- Thumbnails: 800x600px, WebP with JPG fallback
- Hero images: 1920x1080px, optimized
- Use Next.js Image component for optimization
- Lazy load below-fold images
```

---

## 6. Implementation Order

### Phase 1: Foundation (Week 1)
1. **Project Setup**
   - Initialize Next.js 14 project with TypeScript
   - Configure Tailwind CSS with custom theme
   - Set up folder structure
   - Install core dependencies

2. **Global Styles**
   - Implement color system in Tailwind config
   - Set up typography scale
   - Create global CSS variables
   - Configure dark mode (system + toggle)

3. **Layout Components**
   - Create root layout with metadata
   - Build Header component
   - Build Footer component
   - Create Container wrapper

**Dependencies**: None
**Deliverables**: Working skeleton with navigation

---

### Phase 2: Animation Infrastructure (Week 1-2)
1. **Animation Library Setup**
   - Configure Framer Motion
   - Create animation variants library
   - Set up Lenis smooth scroll
   - Integrate GSAP ScrollTrigger

2. **Core Animation Components**
   - FadeUp wrapper component
   - StaggerContainer component
   - TextReveal component
   - Page transition wrapper

3. **Custom Hooks**
   - useSmoothScroll
   - useScrollProgress
   - useInView
   - useMediaQuery

**Dependencies**: Phase 1
**Deliverables**: Animation system ready for use

---

### Phase 3: Hero Section (Week 2)
1. **Hero Layout**
   - Full-height hero container
   - Content positioning
   - Background elements

2. **Text Reveal Animation**
   - Split text into characters/words
   - Implement staggered reveal
   - Fine-tune timing and easing

3. **Interactive Elements**
   - Magnetic CTA buttons
   - Scroll indicator animation
   - Initial load curtain animation

**Dependencies**: Phase 2
**Deliverables**: Animated hero section

---

### Phase 4: Bento Grid Projects (Week 2-3)
1. **Grid System**
   - Build responsive grid layout
   - Implement size variants (small, medium, large, etc.)
   - Configure gap and spacing

2. **Project Cards**
   - Card component with variants
   - Image optimization setup
   - Category badges

3. **Card Animations**
   - Hover lift effect
   - Image zoom on hover
   - Content slide-up reveal
   - Gradient border on featured

4. **Scroll Integration**
   - Trigger animations on scroll
   - Staggered entrance animations
   - Parallax effects on cards

**Dependencies**: Phase 2
**Deliverables**: Interactive project gallery

---

### Phase 5: Content Sections (Week 3)
1. **About Section**
   - Layout and content
   - Scroll-triggered reveals
   - Profile image animations

2. **Skills Section**
   - Skill cards or list
   - Progress bar animations
   - Staggered reveals

3. **Contact Section**
   - Contact form layout
   - Magnetic CTA
   - Social links with hover states

**Dependencies**: Phase 2
**Deliverables**: All content sections with animations

---

### Phase 6: Polish & Optimization (Week 4)
1. **Performance**
   - Implement will-change optimizations
   - Lazy load images
   - Code splitting
   - Reduce motion support

2. **Responsive**
   - Mobile navigation
   - Touch-friendly interactions
   - Responsive grid adjustments
   - Font size scaling

3. **Accessibility**
   - Focus states
   - Keyboard navigation
   - Screen reader support
   - ARIA labels

4. **SEO**
   - Meta tags
   - Open Graph
   - Structured data
   - Sitemap

**Dependencies**: All previous phases
**Deliverables**: Production-ready site

---

### Phase 7: Deployment (Week 4)
1. **Build Configuration**
   - Next.js config optimization
   - Image optimization settings
   - Static export or server config

2. **Testing**
   - Cross-browser testing
   - Mobile device testing
   - Performance audit (Lighthouse)
   - Animation frame rate check

3. **Deployment**
   - Vercel setup
   - Environment variables
   - Domain configuration
   - Analytics setup

**Dependencies**: Phase 6
**Deliverables**: Live production site

---

## Quick Reference

### Key Animation Values
```
Easing (Luxury): [0.23, 1, 0.32, 1]
Duration (Standard): 0.6s
Stagger (Normal): 0.1s
Spring (Magnetic): { stiffness: 150, damping: 15 }
```

### Color Quick Reference
```
Background: #0a0a0a
Surface: #1a1a1a
Primary Accent: #3b82f6
Secondary Accent: #8b5cf6
Tertiary Accent: #06b6d4
Text Primary: #ffffff
Text Secondary: rgba(255,255,255,0.7)
```

### Performance Checklist
- [ ] 60fps animations
- [ ] will-change applied before animations
- [ ] Images optimized (WebP)
- [ ] Code split by route
- [ ] Lazy load below-fold content
- [ ] Reduce motion media query respected
- [ ] LCP < 2.5s
- [ ] CLS < 0.1

---

*Last Updated: 2026-02-02*
*Version: 1.0*
