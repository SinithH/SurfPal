/** @type {import('tailwindcss').Config} */
export default {
  content: ['./entrypoints/**/*.{html,tsx}', './components/**/*.tsx'],
  theme: {
    extend: {
      fontFamily: { 
        "kanit": ['Kanit', 'sans-serif'] 
      },
      colors: {
        primary: '#9E00E8',
      }
    },
  },
  plugins: [
    require('@tailwindcss/aspect-ratio')
  ],
};