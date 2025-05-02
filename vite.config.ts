import vue from "@vitejs/plugin-vue"
import vueJsx from "@vitejs/plugin-vue-jsx"
import { resolve } from "path"
import { visualizer } from "rollup-plugin-visualizer"
import { defineConfig, type PluginOption } from "vite"
import dts from "vite-plugin-dts"
import vueDevTools from "vite-plugin-vue-devtools"

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    dts({
      include: ["lib"],
      exclude: ["lib/main.tsx"],
      tsconfigPath: "tsconfig.app.json",
      outDir: resolve(__dirname, "dist", "types"),
    }),
    vue(),
    vueJsx(),
    vueDevTools(),
    visualizer({
      filename: "docs-generated/stats/stats.html",
    }) as PluginOption,
  ],

  build: {
    lib: {
      entry: resolve(__dirname, "./lib/index"),
      name: "index",
      fileName: "index",
    },
    rollupOptions: {
      external: ["vue", "vue-router", "animejs"],
      output: [
        {
          dir: "dist/lib/esm",
          format: "es",
          globals: {
            vue: "Vue",
          },
        },
      ],
    },
    minify: false,
  },

  resolve: {
    alias: {
      "@": resolve(__dirname, "./lib"),
    },
  },

  css: {
    preprocessorOptions: {
      scss: {
        additionalData: '@use "@/styles/global.scss" as *;',
        api: "modern",
      },
    },
  },
})
