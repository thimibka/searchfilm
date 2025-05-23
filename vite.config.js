import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: "autoUpdate",
      manifest: {
        name: "Nom de ton app",
        short_name: "TonApp",
        description: "Description de ton app",
        theme_color: "#ffffff",
        background_color: "#ffffff",
        display: "standalone",
        start_url: "/",
        icons: [
          {
            src: "icons/camera.png",
            sizes: "192x192",
            type: "image/png",
          },
          {
            src: "icons/camera.png",
            sizes: "512x512",
            type: "image/png",
          },
        ],
      },
    }),
  ],
});
