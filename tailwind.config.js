/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'primary': '#A7D1CC',
        'secondary': '#BA8ED5',
        'secondaryhover': '#bd8cbf',
        'accent': '#F3FF63',
        'rule': '#cccccc',
      },
      boxShadow: {
        custom:
          'rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px;',
      },
      screens: {
        'short': { 'raw': '(max-height: 600px)' },
      },
    },
    fontFamily: {
      sans: ['Roboto', 'sans-serif'],
    },
    // enables manual dark mode
    darkMode: 'class',
  },
  plugins: [],
}