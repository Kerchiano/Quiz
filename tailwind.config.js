/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      borderRadius: {
        custom: "4px",
      },
      screens: {
        'xs': '480px',
        'below-sm': {'max': '479px'},
        'below-md': {'max': '768px'},
        'below-lg': {'max': '1024px'}
      },
      minWidth: {
        '100': '400px',
        '110': '440px',
        '120': '480px',
      },
      
    },
  },
  plugins: [],
};
