/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    colors: {
      'blue': '#004cff',
      'lightBlue': '#004cff59',
      'transparent': 'transparent',
      'white': '#ffffff',
      'black': '#000000',
      'lightGrey': "#fcfcfc",
      'red' : '#ff0000'
    },
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      gridTemplateColumns: {
        'search': '2.3fr 1fr'
      }
    },
  },
  plugins: [
    require('tailwind-scrollbar')
  ],
}
