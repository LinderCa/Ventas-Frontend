/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      colors:{
        primaryNeutro: '#250001',
        secundaryCrimson: '#590004',
        rojo: '#ef4444',
        amarillo: '#FCBA04',
        blanco: '#F3F3F3'
      }
    },
  },
  plugins: [],
}

