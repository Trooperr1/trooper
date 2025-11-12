/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'navy-blue': '#1a2845',
        'jaff-orange': '#f58220',
      },
      fontFamily: {
        'kurdish': ['Rabar', 'Tahoma', 'sans-serif'],
        'arabic': ['Cairo', 'Tahoma', 'sans-serif'],
      },
    },
  },
  plugins: [
    require('tailwindcss-rtl'),
  ],
}
