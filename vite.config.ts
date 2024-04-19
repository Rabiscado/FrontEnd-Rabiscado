import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@assets": "/src/assets",
      "@context": "/src/context",
      "@pages": "/src/pages",
      "@utils": "/src/utils",
      "@components": "/src/components",
      "@services": "/src/services",
      "@Models": "/src/Models",
      "@hooks": "/src/hooks",
    },
  },
});
