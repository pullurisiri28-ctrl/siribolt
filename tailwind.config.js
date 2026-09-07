/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      colors: {
        ink: {
          50: '#f6f7f9',
          100: '#eceef2',
          200: '#d5d9e2',
          300: '#b0b8c9',
          400: '#8590a8',
          500: '#67738d',
          600: '#525c73',
          700: '#434b5e',
          800: '#3a4051',
          900: '#1a1f2e',
          950: '#0d111c',
        },
        risk: {
          low: '#22c55e',
          moderate: '#f59e0b',
          high: '#f97316',
          critical: '#ef4444',
        },
        brand: {
          50: '#eef6ff',
          100: '#d9eaff',
          200: '#bcd9ff',
          300: '#8ec0ff',
          400: '#599dff',
          500: '#347aff',
          600: '#1d5cf5',
          700: '#1748e1',
          800: '#193cb6',
          900: '#1a388f',
        },
      },
      boxShadow: {
        card: '0 1px 3px rgba(13,17,28,0.06), 0 1px 2px rgba(13,17,28,0.04)',
        'card-hover': '0 8px 24px rgba(13,17,28,0.10), 0 2px 6px rgba(13,17,28,0.06)',
        glow: '0 0 0 1px rgba(52,122,255,0.15), 0 8px 30px rgba(52,122,255,0.12)',
      },
      keyframes: {
        'fade-in': {
          '0%': { opacity: '0', transform: 'translateY(8px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'slide-in': {
          '0%': { opacity: '0', transform: 'translateX(-12px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        'pulse-ring': {
          '0%': { transform: 'scale(0.8)', opacity: '0.8' },
          '100%': { transform: 'scale(2.4)', opacity: '0' },
        },
        'scale-in': {
          '0%': { opacity: '0', transform: 'scale(0.96)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
      },
      animation: {
        'fade-in': 'fade-in 0.4s ease-out both',
        'slide-in': 'slide-in 0.3s ease-out both',
        'pulse-ring': 'pulse-ring 2s ease-out infinite',
        'scale-in': 'scale-in 0.25s ease-out both',
      },
    },
  },
  plugins: [],
};
