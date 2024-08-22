/** @type {import('tailwindcss').Config} */
const { nextui } = require("@nextui-org/react");
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      gridTemplateColumns: { layout: "250px 1fr" },
      gridTemplateRows: { messages: "1fr 115px" },
      width: { burgerSm: "18px", burgerMd: "24px", burgerLg: "33px" },
    },
  },
  plugins: [nextui()],
};
