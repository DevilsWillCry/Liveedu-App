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
      keyframes: {
        autoShowAnimation: {
          '0%': { opacity: '0', transform: 'translateY(200px) scale(0.3)' },
          '100%': { opacity: '1', transform: 'translateY(0) scale(1)' },
        },
        'bottom-fade': {
          '0%': { maskImage: 'linear-gradient(to bottom, black 100%, transparent 100%)' },
          '100%': { maskImage: 'linear-gradient(to bottom, black 80%, transparent 100%)' },
        },
      },
      animation: {
        autoShow: 'autoShowAnimation 1s ease-in-out both',
        'bottom-fade': 'bottom-fade 0s ease-in-out forwards',
      },
    },
  },
  plugins: [],
});
