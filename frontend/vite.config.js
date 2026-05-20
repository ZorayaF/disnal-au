import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { fileURLToPath, URL } from "node:url";

export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
      "@components": fileURLToPath(
        new URL("./src/components", import.meta.url),
      ),
      "@sections": fileURLToPath(
        new URL("./src/components/sections", import.meta.url),
      ),
      "@assets": fileURLToPath(new URL("./src/assets", import.meta.url)),
      "@pages": fileURLToPath(new URL("./src/pages", import.meta.url)),
      "@data": fileURLToPath(new URL("./src/data", import.meta.url)),
      "@context": fileURLToPath(new URL("./src/context", import.meta.url)),
      "@services": fileURLToPath(new URL("./src/services", import.meta.url)),
      "@hooks": fileURLToPath(new URL("./src/hooks", import.meta.url)),
    },
  },
});
