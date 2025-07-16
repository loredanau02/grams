import type { Config } from 'tailwindcss'

const config: Config = {
  darkMode: 'class',
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#E1306C',
          dark: '#C13056',
        },
        secondary: '#FF6B6B',
        accent: '#4ECDC4',
        dark: '#262626',
        light: '#FAFAFA',
        gray: '#8E8E8E',
        border: '#DBDBDB',
        success: '#4CAF50',
        warning: '#FFA726',
        error: '#EF5350',
      },
      boxShadow: {
        'sm': '0 2px 4px rgba(0,0,0,0.04)',
        'md': '0 4px 12px rgba(0,0,0,0.08)',
        'lg': '0 8px 24px rgba(0,0,0,0.12)',
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease',
        'slide-in': 'slideIn 0.3s ease',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(-10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideIn: {
          '0%': { transform: 'translateX(100%)' },
          '100%': { transform: 'translateX(0)' },
        },
      },
    },
  },
  plugins: [],
}
export default config