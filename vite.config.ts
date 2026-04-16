import type { UserConfig } from 'vite'
import react from '@vitejs/plugin-react'
import mdx from '@mdx-js/rollup'
import path from 'path';
import svgr from "vite-plugin-svgr";

export default {
  appType: "spa",
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    license: true,
    sourcemap: true,
  },
  css: {
    devSourcemap: true,
  },
  plugins: [
    { enforce: "pre", ...mdx() },
    react({ include: /\.(mdx|js|jsx|ts|tsx)$/ }),
    svgr()
  ],
  // ...
} satisfies UserConfig;