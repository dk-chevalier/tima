/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        transparent: 'transparent',
        current: 'currentColor',
        primary: {
          100: '#f8fffe',
          200: '#e7fefa',
          300: '#b6fcf0',
          400: '#6df8e0',
          500: '#0bf4cc',
          600: '#09c3a3',
          700: '#07927a',
          800: '#03493d',
          900: '#011814',
        },
        secondary: {
          100: '#fffdff',
          200: '#fee9fe',
          300: '#faa8fb',
          400: '#f666f8',
          500: '#f225f5',
          600: '#a91aac',
          700: '#79137b',
          800: '#490b49',
          900: '#180418',
        },
      },
      keyframes: {
        slideInTop: {
          '0%': { transform: 'translateY(-50%)', opacity: '0' },
          '90%': { transform: 'translateY(5%)', opacity: '100' },
          '100%': { transform: 'translateY(0%)' },
        },
        slideOutTop: {
          '0%': { transform: 'translateY(0%)' },
          '10%': { transform: 'translateY(5%)' },
          '100%': {
            transform: 'translateY(-50%)',
            opacity: '0',
            display: 'hidden',
            visibility: 'hidden',
          },
        },
      },
      animation: {
        slideInTop: 'slideInTop 300ms cubic-bezier(0.3, 0.2, 0.2, 1.4)',
        slideOutTop: 'slideOutTop 500ms cubic-bezier(0.3, 0.2, 0.2, 1.4)',
      },
    },
  },
  plugins: [],
};
