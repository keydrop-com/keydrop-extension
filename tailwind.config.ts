/** @type {import('tailwindcss').Config} */

import theme from './src/styles/theme'

module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    ...theme,
    fontFamily: {
      sans: ['Poppins', 'sans-serif'],
    },
    extend: {
      height: {
        'screen-without-nav': 'calc(600px - 70px)',
      },
    },
  },
}
