/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    fontFamily:{
      poppins:'Poppins, sans-serif'
    },
    height:{
      screen:'100dvh'
    },
    screens: {
      sm: "640px",
      md: "768px",
      lg: "960px",
      xl: "1200px", 
    },
    extend: {},
  },
  plugins: [],
}

