/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      // You can extend Tailwind's theme with your CSS variables
      colors: {
        'vue-green': 'hsla(160, 100%, 37%, 1)',
      },
    },
  },
  plugins: [],
}
