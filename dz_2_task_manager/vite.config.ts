import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { resolve } from "path";
import { fileURLToPath } from "url";

const root = fileURLToPath(new URL(".", import.meta.url));

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": resolve(root, "src"),
      "@entities": resolve(root, "src/entities"),
      "@features": resolve(root, "src/features"),
      "@shared": resolve(root, "src/shared"),
      "@app": resolve(root, "src/app"),
      "@pages": resolve(root, "src/pages"),
    },
  },
});
