/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#c41e1e', // Merah
        secondary: '#1e40c4', // Biru InterMedi-A
      }
    },
  },
  plugins: [],
}