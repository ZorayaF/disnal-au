/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        disnal: {
          red: "#e30613",
          "red-soft": "#ef3a3a",
          black: "#151515",
          dark: "#202020",
          gray: "#666666",
          line: "#d9d9d9",
          // Mapeamos el color real de texto e inputs
          ink: "#111111",
          white: "#ffffff",
          // Ajustamos los grises de fondo de tus resets
          "gray-root": "#949191",
          "gray-muted": "#8d8a8a",
        },
      },
      fontFamily: {
        sans: ["Inter", "Montserrat", "Segoe UI", "Arial", "sans-serif"],
      },
      letterSpacing: {
        disnal: "0.32em",
        "disnal-nav": "0.08em",
      },
      boxShadow: {
        "disnal-deep": "0 18px 46px rgba(0, 0, 0, 0.18)",
        "disnal-nav": "0 8px 22px rgba(0, 0, 0, 0.14)",
      },
    },
  },
  plugins: [],
};
