/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
      colors: {
        'light-blue': '#e0f2fe',
        blue: '#3b82f6',
        'dark-blue': '#1e3a8a',
      },
    },
  },
  plugins: [],
}
