import process from "node:process"

import { defineConfig } from "tsdown"

export default defineConfig({
  entry: ["src/index.ts"],
  outDir: "dist",

  env: {
    NODE_ENV: process.env.NODE_ENV ?? "production",
    DEV: process.env.NODE_ENV === "development",
    PROD: process.env.NODE_ENV === "production",
    TEST: false,
  },

  platform: "node",
  target: "node14",
  format: ["cjs", "esm"],
  dts: true,
  fixedExtension: true,

  sourcemap: !process.env.IS_RELEASE,
})
