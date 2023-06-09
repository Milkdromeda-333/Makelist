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
        peach: "#faeee7",
        plum: "#33272a",
        "plum-shade": "#231b1d",
        "plum-tone": "#655e61",
        pink: "#ffc6c7",
        blue: "#13648B",
        "blue-shade": "#105777",
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