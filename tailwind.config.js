const defaultTheme = require("tailwindcss/defaultTheme");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    `components/**/*.{vue,js}`,
    `layouts/**/*.vue`,
    `pages/**/*.vue`,
    `composables/**/*.{js,ts}`,
    `plugins/**/*.{js,ts}`,
    `App.{js,ts,vue}`,
    `app.{js,ts,vue}`,
  ],
  theme: {
    extend: {
      colors: {
        "light-gray": "#e5e7eb",
        "dark-gray": "#374151",
        "light-white": "#fff",
        "dark-white": "#e2e8f0",
        "royal-blue": "#4169e1",
        "dark-blue": "#00008B",
      },
      container: {
        center: true,
        padding: {
          DEFAULT: "1rem",
          sm: "2rem",
          lg: "4rem",
          xl: "5rem",
          "2xl": "6rem",
        },
      },
      fontFamily: {
        sans: ["Lato", ...defaultTheme.fontFamily.sans],
      },
    },
  },
  plugins: [
    require("@tailwindcss/line-clamp"),
    require("@tailwindcss/typography"),
  ],
};
