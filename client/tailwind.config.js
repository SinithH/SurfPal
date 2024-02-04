/** @type {import('tailwindcss').Config} */
export default {
  content: ['./entrypoints/**/*.{html,tsx}', './components/**/*.tsx'],
  theme: {
    extend: {
      fontFamily: { 
        "kanit": ['Kanit', 'sans-serif'] 
    }
    },
  },
  plugins: [
    require('@tailwindcss/aspect-ratio')
  ],
};