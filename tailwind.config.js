/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{vue, js, jsx, ts, tsx}"],
  theme: {
    extend: {},
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

