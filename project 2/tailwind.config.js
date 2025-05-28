/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#4A90E2',
          light: '#E6F0FA',
        },
        secondary: {
          DEFAULT: '#2ECC71',
          light: '#E9F7EF',
        },
        accent: '#8E44AD',
        dark: '#1A1A1A',
        beige: '#F5F1E9',
        gold: '#FFD700',
      },
      fontFamily: {
        heading: ['Roboto', 'sans-serif'],
        body: ['Open Sans', 'sans-serif'],
      },
    },
  },
  plugins: [],
};