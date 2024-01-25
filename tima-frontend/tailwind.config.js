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
    },
  },
  plugins: [],
};
