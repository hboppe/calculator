/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/*.{html,js}"],
  theme: {
    extend: {
      colors: {
        'orange': '#FD9426',
        'light-gray': '#A6A6A6',
      },
      animation: {
        flicker: 'flicker .1s ease-in-out'
      }, 
      keyframes: {
        'flicker': {
          '0%, 100%': {opacity: 1 },
          '50%': { opacity: 0 }
        }
      }
    },
  },
  plugins: [],
}
