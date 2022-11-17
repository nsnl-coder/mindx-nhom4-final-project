/** @type {import('tailwindcss').Config} */
const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {},
    colors: {
      primary: '#F81411', // main color for logo, buttons, highlight, success message
      gray: '#D9D9D9',
      'dark-gray': '#696969', // color for other substitute parts
      warn: '#F1CC81', // color for warning message
      white: '#FFFFFF', // background color
      black: '#313638', // text color
      'pure-black': '#000000', // use for text color in primary background
      transparent: 'transparent',
    },
    fontFamily: {
      roboto: ['Roboto', 'sans-serif'],
      sans: ['Roboto', ...defaultTheme.fontFamily.sans], // config default fontfamily
    },
    screens: {
      ss: '480px',
      sm: '640px',
      md: '768px',
      lg: '1024px',
      xl: '1280px',
      '2xl': '1536px',
    },
  },
  plugins: [],
}
