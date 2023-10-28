/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      gridTemplateColumns: {
        "fluid": 'auto 1fr 1fr 1fr 1fr'
      }
    },
  },
  plugins: [],
}

