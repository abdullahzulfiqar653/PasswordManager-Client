/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}", // Adjust this according to your file structure
  ],
  fontFamily: {
    sans: ['DM Sans', 'sans-serif'], // Set DM Sans as the default sans font
  },
  theme: {
    container:{
      center: true,
      padding: '20px',
    },
    extend: {
      screens: {
        lg: '1440px',
        md: '768px',
        sm: '600px',
        xs: '320px',
        mq375: '375px',    
        mq425: '425px',    
        mq1024: '1024px', 
        mq1440: '1440px',
      },
      boxShadow: {
        'custom': '0px 4px 22px 0px #00000040', // Custom shadow definition
      },
    },
  },
  plugins: [],
}
