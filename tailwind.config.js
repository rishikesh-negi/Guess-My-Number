/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./*.{html,js}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Orbitron", "sans-serif"],
        mono: ["IBM Plex Mono", "sans-serif"],
      },
    },
  },
  plugins: [],
};
