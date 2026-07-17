/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        gold: {
          50: "#fef9f0",
          100: "#fdf2e1",
          300: "#f4d03f",
          500: "#d4af37",
          700: "#aa8c2c",
          900: "#1a1a1a",
        },
        black: {
          900: "#1a1a1a",
          950: "#0f0f0f",
        },
      },
      fontFamily: {
        sans: ["system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
}
