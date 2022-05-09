module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {},
  },
  plugins: [
    require('tailwindcss-radix')(),
    require('tailwind-children'),
    require('@tailwindcss/custom-forms'),
  ],
}
