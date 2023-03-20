/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      keyframes: {
        wiggle: {
          "0%, 100%": { transform: "rotate(-5deg)" },
          "50%": { transform: "rotate(5deg)" }
        }
      },
      animation: {
        wiggle: "wiggle 200ms ease-in-out"
      },
      colors: {
        apple: "#82cf98",
        "apple-shade": "#77bd8b",
        blue: "#13648B",
        "dark-blue": "#253137",
        "dark-blue-shade": "#1c2429"
      },
      fontFamily: {
        font: ['Jost', 'sans-serif']
      }
    },
  },
  plugins: [],
  darkMode: 'class'
};