/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Plus Jakarta Sans','sans-serif']
      },
      colors: {
        primary: "#FB7C37",
        primaryLight: "#ff8544",
        primaryAccent: "#FFEDE6",
        primaryAccentLight: "#fff5f1",
        primaryAccent2: "#FFB693",
        grey: "#797676",
        grey2: "#242424",
        grey3: "#F6EFF3",
        grey4: "#797676",
        borderColor: "#E5E2E1",
        textColor: "#111111",
        purpleAccent: "#F4EEFF",
        black: "#111111",
        background: "rgb(255, 248, 246)",
        lightBg: 'rgba(255, 248, 246,0.8)',
        // green: '#006D35',
        greenAccent: '#C4FFCD',
        redAccent: '#FFEDE9',
        greenAccent: '#C4FFCD',
      },
      backgroundImage: {
        'map': "url('/src/assets/images/map.png')",
      }
    },
  },
  plugins: [],
}

