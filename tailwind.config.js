/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
      },
      colors: {
        cream: '#FAF7F2',
        teal: {
          DEFAULT: '#1F4D4A',
          dark: '#163836',
        },
        gold: {
          DEFAULT: '#C9A961',
          light: '#E8D5A0',
        },
      },
    },
  },
  plugins: [],
};
