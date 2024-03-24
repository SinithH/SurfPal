/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './entrypoints/**/*.{html,tsx}', './components/**/*.tsx',
    './node_modules/@material-tailwind/react/components/**/*.{js,ts,jsx,tsx}',
    './node_modules/@material-tailwind/react/theme/components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: { 
        "kanit": ['Kanit', 'sans-serif'] 
      },
      colors: {
        primary: '#9E00E8',
        darkBg: 'rgba(var(--dark-bg))',
        darkTileHover: 'rgba(var(--dark-tile-hover-bg))'
      }
    },
  },
  plugins: [
    require('@tailwindcss/aspect-ratio')
  ],
  darkMode: 'selector',
};