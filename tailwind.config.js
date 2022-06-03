module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      transitionDelay: {
        0: '0ms',
      },
      colors: {
        accent: {
          100: '#FAFAFA',
          200: '#EAEAEA',
          300: '#999',
          400: '#888',
          500: '#666',
          600: '#444',
          700: '#333',
          800: '#111',
        },
        error: {
          lighter: '#F7D4D6',
          light: '#FF1A1A',
          base: '#E00',
          dark: '#C50000',
        },
        success: {
          lighter: '#D3E5FF',
          light: '#3291FF',
          base: '#0070F3',
          dark: '#0761D1',
        },
        warning: {
          lighter: '#FFEFCF',
          light: '#F7B955',
          base: '#F5A623',
          dark: '#AB570A',
        },
        violet: {
          lighter: '#D8CCF1',
          light: '#8A63D2',
          base: '#7928CA',
          dark: '#4C2889',
        },
        cyan: {
          lighter: '#AAFFEC',
          light: '#79FFE1',
          base: '#50E3C2',
          dark: '#29BC9B',
        },
      },
      animation: {
        marquee: 'marquee 20s linear infinite',
      },
      keyframes: {
        marquee: {
          '0%': { left: 'translateX(-100%)' },
          '100%': { transform: 'translateX(100%)' },
        },
      },
    },
  },
  plugins: [
    require('tailwindcss-radix')(),
    require('tailwind-children'),
    require('@tailwindcss/custom-forms'),
  ],
}
