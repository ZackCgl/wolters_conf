/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      animation: {
        blob: "blob 7s infinite",
        blop: "blob 7s infinite",
      },
      keyframes: {
        blob: {
          "0%": {
            transform: "translate(0px, 0px) scale(1)",
          },
          "33%": {
            transform: "translate(30px, -50px) scale(1.2)",
          },
          "66%": {
            transform: "translate(-20px, 20px) scale(0.9)",
          },
          "100%": {
            transform: "tranlate(0px, 0px) scale(1)",
          },
        },
        blop: {
          "0%": {
            transform: "translate(0px, 0px) scale(1.9)",
          },
          "33%": {
            transform: "translate(30px, -50px) scale(10.9)",
          },
          "66%": {
            transform: "translate(-20px, 20px) scale(0.2)",
          },
          "100%": {
            transform: "tranlate(0px, 0px) scale(3.7)",
          },
        },
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [require("tailwind-scrollbar-hide")],
};
