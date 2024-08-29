/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{html,js,jsx, ts, tsx}'],
  theme: {
    colors: {
      'blue': '#1fb6ff',
      'purple': '#7e5bef',
      'pink': '#ff49db',
      'orange': '#ff7849',
      'green': '#119001',
      'yellow': '#ffe035',
      'gray-dark': '#273444',
      'gray': '#8492a6',
      'gray-light': '#d3dce6',
      'black' : "#000000",
      'red' : '#ff0000',
      'green-light':'#dfffdb',
      'white': '#ffffff',
      'primary-green':'#18CD02'
    },
    fontFamily: {
      
    },
    screens: {
      'sm': '640px',

      'md': '768px',

      'lg': '1024px',

      'xl': '1280px',

      '2xl': '1536px',
    },
    extend: {
      spacing: {
        '8xl': '96rem',
        '9xl': '128rem',
      },
      borderRadius: {
        '4xl': '2rem',
      },
      fontSize:{
        'sm': "13px",
        'md': "20px"
      },
      fontFamily:{

      },
      borderWidth:{
        
      }
    },
    // extend: {
      
    // },
  },
  plugins: [],
}

