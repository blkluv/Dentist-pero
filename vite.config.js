import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { copyFileSync } from "fs";
import { resolve } from "path";

export default defineConfig({
  plugins: [
    react(),
    {
      name: "copy-index-to-404",
      closeBundle() {
        // Use process.cwd() to get the project root
        const src = resolve(process.cwd(), "dist", "index.html");
        const dest = resolve(process.cwd(), "dist", "404.html");
        copyFileSync(src, dest);
        console.log("✅ 404.html created from index.html");
      },
    },
  ],
  base: "/",
});