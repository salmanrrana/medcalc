import type { Config } from 'tailwindcss'

export default {
  content: [
    './src/**/*.{js,ts,jsx,tsx}',
    './index.html',
  ],
  theme: {
    extend: {
      colors: {
        // Minimal neutral palette - pure whites and grays
        background: '#ffffff',
        foreground: '#111827', // gray-900
        border: '#e5e7eb', // gray-200
        muted: '#9ca3af', // gray-400
        'muted-foreground': '#d1d5db', // gray-300
        accent: '#374151', // gray-700 for subtle accents
      },
      spacing: {
        // Clean, consistent spacing with better hierarchy
        'xs': '0.5rem',
        'sm': '1rem',
        'md': '1.5rem',
        'lg': '2rem',
        'xl': '3rem',
        '2xl': '4rem',
        '3xl': '5rem',
      },
      typography: {
        DEFAULT: {
          css: {
            color: 'inherit',
            'code::before': {
              content: '""',
            },
            'code::after': {
              content: '""',
            },
          },
        },
      },
    },
  },
  plugins: [],
} satisfies Config
