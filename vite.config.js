import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import eslint from "vite-plugin-eslint";
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), eslint()],
  define: {
    "import.meta.env.ENV_VARIABLE": JSON.stringify(process.env.ENV_VARIABLE),
  },
});