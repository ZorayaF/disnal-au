// tailwind.config.js
/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        // 🎨 1. COLORES SEMÁNTICOS (Grupos por jerarquía)
        bg: {
          main: "#f8fafc", // bg-bg-main
          surface: "#ffffff", // bg-bg-surface
        },
        action: {
          primary: "#0284c7", // bg-action-primary o text-action-primary
          hover: "#0369a1",
        },
        text: {
          title: "#0f172a", // text-text-title
          body: "#475569", // text-text-body
          muted: "#94a3b8",
        },
        border: {
          component: "#e2e8f0", // border-border-component
        },
      },
    },
  },
  plugins: [],
};
