/** @type {import('tailwindcss').Config} */
const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  daisyui: {
    themes: false,
  },
  theme: {
    extend: {
      colors: {
        primary: '#F81411', // main color for logo, buttons, highlight, success message
        accent: '#F1CC81', // color for warning message
        text: '#313638', // text color
        // chat app config
        'blue-message': '#1555FF',
        'gray-message': '#f8f8f8',
        'text-message': '#4f5e7b',
        mention: '#1877f233',
      },
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
  variants: {
    extend: {
      display: ['group-hover'],
    },
  },
  plugins: [require('daisyui')],
}
