/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{vue, js, jsx, ts, tsx}"],
  theme: {
    extend: {
      fontSize:{
        xxs:"8px"
      }
    },
  },
  plugins: [require('tailwindcss-primeui')],
  "editor.quickSuggestions": {
    "strings": "on"
  },
  "files.associations": {
    "*.css": "tailwindcss"
  },
  "tailwindCSS.includeLanguages": {
    "plaintext": "vue"
  }
}

