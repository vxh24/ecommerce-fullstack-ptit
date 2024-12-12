/** @type {import('tailwindcss').Config} */
module.exports = {
  prefix: 'tw-',
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./src/index.css",
  ],
  theme: {
    extend: {},
  },
  plugins: [
    require('tailwindcss'),
    require('daisyui'),

  ],
}

