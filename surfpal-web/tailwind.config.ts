import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@material-tailwind/react/components/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@material-tailwind/react/theme/components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        primaryPurple: "#9E00E8",
        darkBg: 'rgba(var(--dark-bg))',
        lightBg: '#fcfcfc',
        darkTileHover: 'rgba(var(--dark-tile-hover-bg))',
        carouselLightBg: '#fbebd7',
        carouselDarkBg: '#1a2642'
      },
      scale: {
        '8': '0.08', // for user avatar in header
      },
    },
  },
  plugins: [],
  darkMode: 'selector',
};
export default config;
