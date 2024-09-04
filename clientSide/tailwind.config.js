/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'passionOne': ["Passion One"],
        'roboto': ["Roboto"],
        'robotoCondensed': ["Roboto Condensed"],
        'robotoFlex': ["Roboto Flex"]
      }
    },
  },
  plugins: [],
  darkMode: 'class',
}

