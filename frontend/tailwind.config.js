/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
    colors : {
      'white': '#ffffff',

      'orange' : '#dd6b20',
      'dBlue' : '#001524',
      'gray-400': '#cbd5e0',
      'gray-300': '#E0E0E0',
      'blue-500': '#2b72ee'
    }
  },
  plugins: [],
}

