/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
     ],

  theme: {
    extend: {
      colors: {
        one:'#3498db',
        two:'#2ecc71',
        three:'#95a5a6',
        four:'#e67e22',
        five:'#ecf0f1',
      }
    },
  },
  plugins: [],
}

