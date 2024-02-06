/** @type {import('tailwindcss').Config} */
const colors = require('tailwindcss/colors')
module.exports = {
  mode: 'jit',
  darkMode: 'class',
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    'colors': {
      logo: '#37517e',
      transparent: 'transparent',
      current: 'currentColor',
      black: colors.black,
      white: colors.white,
      gray: colors.gray,
      emerald: colors.emerald,
      indigo: colors.indigo,
      yellow: colors.yellow,
      blue: colors.blue
    },


    extend: {
      fontFamily: {
        Cabin: ["Cabin", "sans-serif"],
      },
      keyframes: {
        CBounce: {
          '0% , 100%': { transform: 'translateY(-25%); ' },
          '50%': { transform: 'translateY(0%); ' },
        },

        typing: {
          from: {
            width: '0'
          },
          to: {
            width: '6ch'
          },
        },
        blink: {
          from: {
            'border-right-color': 'transparent'
          },
          to: {
            'border-right-color': 'black'
          },
        },
      },
      animation: {
        CBounce: 'CBounce 4s ease-in-out infinite ',
        typing: 'typing 2s steps(6), blink 1s infinite',

      },

    },

  },
  plugins: [
    require('@tailwindcss/forms'),
    require('tailwindcss-animated'),
    require('tailwind-typewriter')({
      wordsets: {
        title: {
          words: ['Elevate Your Expertise', 'Learn, Grow, Succeed', 'Charting Success Through', 'Unlock Your Brilliance', 'Transforming Ambitions into Achievements'],
          writeSpeed: 0.1,
          pauseBetween: 2
        }
      }
    })
  ]
}

