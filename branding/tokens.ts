/**
 * Design Tokens — babafemi.codes
 * Source of truth for all colors, typography, spacing, and motion values.
 * Import this file into Tailwind config and component styles.
 */

export const colors = {
  bg: '#050A14',
  surface: '#0D1626',
  surfaceElevated: '#111D35',
  border: '#1E2D4A',
  borderBright: '#2D4470',

  text: {
    primary: '#F1F5F9',
    secondary: '#94A3B8',
    muted: '#4B6080',
  },

  accent: {
    primary: '#6366F1',   // electric indigo
    secondary: '#22D3EE', // cyan
    gradient: 'linear-gradient(135deg, #6366F1 0%, #22D3EE 100%)',
  },

  semantic: {
    success: '#10B981',
    warning: '#F59E0B',
    danger: '#EF4444',
  },
} as const;

export const fonts = {
  display: "'Space Grotesk', sans-serif",
  body: "'Inter', sans-serif",
  mono: "'JetBrains Mono', monospace",
} as const;

export const fontWeights = {
  regular: 400,
  medium: 500,
  semibold: 600,
  bold: 700,
} as const;

export const radii = {
  sm: '6px',
  md: '8px',
  lg: '12px',
  xl: '16px',
  full: '9999px',
} as const;

export const motion = {
  fadeInUp: {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.4, ease: 'easeOut' },
  },
  stagger: {
    animate: {
      transition: {
        delayChildren: 0.1,
        staggerChildren: 0.08,
      },
    },
  },
  hoverScale: { scale: 1.02 },
  hoverGlow: {
    boxShadow: '0 0 24px rgba(99, 102, 241, 0.3)',
  },
} as const;

export const breakpoints = {
  sm: '640px',
  md: '768px',
  lg: '1024px',
  xl: '1200px',
} as const;
