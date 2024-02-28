/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{tsx,ts,js,jsx}'],
  theme: {
    extend: {
      colors: {
        'pico-card-background': 'var(--pico-card-background-color)',
        'pico-muted': 'var(--pico-muted-border-color)',
      },
    },
  },
  plugins: [],
};
