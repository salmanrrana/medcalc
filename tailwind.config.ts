import type { Config } from 'tailwindcss'

export default {
  content: [
    './src/**/*.{js,ts,jsx,tsx}',
    './index.html',
  ],
  theme: {
    extend: {
      colors: {
        // Minimal neutral palette
        background: '#ffffff',
        foreground: '#000000',
        border: '#e5e7eb',
        muted: '#6b7280',
        'muted-foreground': '#9ca3af',
        accent: '#3b82f6', // Subtle blue accent
      },
      spacing: {
        // Clean, consistent spacing
        'xs': '0.5rem',
        'sm': '1rem',
        'md': '1.5rem',
        'lg': '2rem',
        'xl': '3rem',
        '2xl': '4rem',
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
