/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'myColor': '#b50556'
      },
      keyframes: {
        'scale-in-ver-top': {
          '0%': {
            transform: 'scaleY(0)',
            'transform-origin': '100% 0%',
            opacity: '1',
          },
          '100%': {
            transform: 'scaleY(1)',
          },
        },
        'slide-in-fwd-center': {
          '0%': {
            transform: 'translateZ(-1400px)',
            opacity: '0',
          },
          '100%': {
            transform: 'translateZ(0)',
            opacity: '1',
          },
        },
        'slide-in-blurred-top': {
          '0%': {
            transform: 'translateY(-1000px) scaleY(2.5) scaleX(0.2)',
            'transform-origin': '50% 0%',
            filter: 'blur(40px)',
            opacity: '0',
          },
          '100%': {
            transform: 'translateY(0) scaleY(1) scaleX(1)',
            'transform-origin': '50% 50%',
            filter: 'blur(0)',
            opacity: '1',
          },
        },
      },
      animation: {
        'scale-in-ver-top': 'scale-in-ver-top 1s ease-in-out both',
        'slide-in-fwd-center': 'slide-in-fwd-center 1.5s ease-in-out both', 
        'slide-in-blurred-top': 'slide-in-blurred-top 0.8s ease-in-out both', 
      },
    },
  },
  plugins: [],
}