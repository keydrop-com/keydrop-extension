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
      animation: {
        'show-banner': 'show 0.2s linear',
      },
      keyframes: {
        show: {
          '0%': { transform: 'scaleY(0)', opacity: 0 },
          '100%': { transform: 'scaleY(1)', opacity: 1 },
        },
      },
    },
  },
}
