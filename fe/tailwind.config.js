/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        'primary': '#426B1F',  // Màu chính
        'secondary': '#FAFAF5', // Màu phụ
        'accent': '#5733FF',    // Màu nhấn
      },
    },
  },
  plugins: [],
}

