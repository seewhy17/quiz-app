const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
  purge: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      fontFamily: {
          'sans': ['Commissioner', ...defaultTheme.fontFamily.sans],
      },
      backgroundImage: theme => ({
          "hero-image": "url('/src/assets/students-taking-tests.jpg')",
      }),
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
