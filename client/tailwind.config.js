/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        mainColor: '#19c8fa',
        primary: '#3490dc',
        secondary: 'rgb(15 116 143 / 70%)',
        accent: '#e3342f',
        background: '#f8fafc',
        text: '#2d3748',
      },
    },
  },
  plugins: [],
};
