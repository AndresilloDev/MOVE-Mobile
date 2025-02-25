/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,jsx,ts,tsx}", 
    "./App.js", 
    "./components/**/*.{js,jsx}", 
    "./screens/**/*.{js,jsx}", 
    "./components/*.{js,jsx}", 
    "./screens/*.{js,jsx}",
    "./navigation/**/*.{js,jsx}",
    "./navigation/*.{js,jsx}",
  ],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        header: '#FFFFFF',
        lines: '#D9D9D9',
        action: {
          primary: '#DEFF35',
          hover: '#B4CF2D',
        },
        text: {
          primary: '#000000',
          secondary: '#D9D9D9',
        }
      },
    },
  },
  plugins: [],
};
