const colors = require("tailwindcss/colors");

module.exports = {
  mode: "jit",
  content: [
    "./src/components/**/*.{ts,tsx,js,jsx}",
    "./src/pages/**/*.{ts,tsx,js,jsx}",
  ],
  theme: {
    extend: {},
    colors: {
      transparent: "transparent",
      primary: colors.black,
      sky: colors.sky,
      black: colors.black,
      white: colors.white,
      gray: colors.gray,
      emerald: colors.emerald,
      indigo: colors.indigo,
      yellow: colors.yellow,
      blue: colors.blue,
      zinc: colors.zinc,
      red: colors.red,
    },
  },
  variants: {},
  plugins: [],
};
