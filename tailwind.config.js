/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'noir-dark': '#0a0a0a',
        'noir-darker': '#050505',
        'gold': '#d4af37',
        'gold-light': '#f4e4bc',
        'gold-dark': '#b8941a',
      },
      fontFamily: {
        'serif': ['Georgia', 'serif'],
      },
    },
  },
  plugins: [],
}
