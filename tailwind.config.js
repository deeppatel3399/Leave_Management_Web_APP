/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    screens: {
      'sm': '425px',
      'md': '768px',
      'lg': '1024px',
      'xl': '1280px',
      '2xl': '1536px',
    },
    extend: {
      colors:{
        "primary-dark": "#043c6b",
        "error-light": "#ac6ea4",
        primary: "#3c7cd0",
        light: "#b3cde0",
        white: "#ffffff",
        error: "#cc0000",
        "error-dark": "#990000",
        success: "#3CD046", 
        "success-light": "#E6FFFA", 
        "success-dark": "#008000"
      },
    },
  },
  plugins: [],
};
