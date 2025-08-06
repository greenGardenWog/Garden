/** @type {import('tailwindcss').Config} */
export default {
content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
    theme: {
    extend: {
      fontFamily: {
        heading: ['"Playfair Display"', 'serif'],
        body: ['Quicksand', 'sans-serif'],
      },
      colors: {
        primary: '#2e7d32', // A rich garden green
        accent: '#81c784',  // Lighter green
      },
    },
  },
  plugins: [],
}

