/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{tsx,ts,js,jsx}'],
  theme: {
    extend: {
      colors: {
        'pico-text': '#c2c7d0',
        'pico-primary': 'var(--pico-primary-background)',
        'pico-background': 'var(--pico-background-color)',
        'pico-card-background': 'var(--pico-card-background-color)',
        'pico-muted': 'var(--pico-muted-border-color)',
        'pico-error': 'var(--pico-form-element-invalid-active-border-color)',
        'pico-success': 'var(--pico-form-element-valid-active-border-color)',
      },
    },
  },
  plugins: [],
};
