/** @type {import('tailwindcss').Config} */
const defaultTheme = require("tailwindcss/defaultTheme");
const withMT = require("@material-tailwind/react/utils/withMT");

export default  withMT( {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        Inter: ['"Inter"', ...defaultTheme.fontFamily.sans],
      },
      screens: {
        'max-sm': {'max': '540px'},  // Para pantallas de máximo 640px
        'max-md': {'max': '768px'},  // Para pantallas de máximo 768px
        'max-lg': {'max': '1024px'}, // Para pantallas de máximo 1024px
        'max-xl': {'max': '1280px'}, // Puedes agregar más breakpoints si es necesario
      },
    },
  },
  plugins: [],
});
