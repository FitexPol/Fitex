/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{tsx,ts,js,jsx}'],
  theme: {
    extend: {
      colors: {
        'pico-card-background': 'var(--card-background-color)',
      },
    },
  },
  plugins: [],
};
