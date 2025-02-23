/** @type {import('tailwindcss').Config} */
module.exports = {
  // NOTE: Update this to include the paths to all of your component files.
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
        background: '#f0f4f8',
        primary: '#DEFF35',
      },
    },
  },
  plugins: [],
}