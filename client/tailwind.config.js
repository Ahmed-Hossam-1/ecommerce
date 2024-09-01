/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        mainColor: "#19c8fa",
        primary: "#3490dc",
        secondary: "rgb(15 116 143 / 70%)",
        mainRed: "#e3342f",
        mainBackground: "#f8fafc",
        mainbgDark900: "#111827",
        secbgDark800: "#1F2937",
        thirdbgDark700: "#374151",
        mainText: "#2d3748",
        mainTextDark: "#fff",
        mainParagraph: "#777",
      },
    },
  },
  plugins: [],
};
