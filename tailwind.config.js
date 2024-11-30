/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}", // Adjust this according to your file structure
  ],
  fontFamily: {
    sans: ['Montserrat', 'sans-serif'], // Set DM Sans as the default sans font
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
        mq350: '330px',    
        mq375: '375px',    
        mq400: '400px',    
        mq425: '425px',    
        mq1024: '1024px',
        mq1150: '1150px',
        mq1200: '1200px',
        mq1240: '1240px',
        mq1290: '1290px', 
        mq1370: '1370px', 
        mq1330: '1380px',
        mq1440: '1440px',
        mq1500: '1500px',
        mq1600: '1600px',
        mq2000: '2000px',
        mq2400: '2400px',
        'h-sm': { 'raw': '(max-height: 666px)' }, 
        'h-md': { 'raw': '(max-height: 740px)' },
        'h-lg': { 'raw': '(min-height: 1025px)' }
      },
      boxShadow: {
        'custom': '0px 4px 22px 0px #00000040', // Custom shadow definition
      },
    },
  },
  plugins: [],
}
