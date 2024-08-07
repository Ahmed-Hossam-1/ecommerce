/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#3490dc",
        secondary: "#ffed4a",
        accent: "#e3342f",
        background: "#f8fafc",
        text: "#2d3748",
      },
    },
  },
  plugins: [],
};
