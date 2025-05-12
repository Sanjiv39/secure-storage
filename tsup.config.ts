import { defineConfig } from "tsup";

export default defineConfig({
  // entry: ["src/**/*.[jt]s"], // for multiple files
  entry: ["src/index.ts", "!src/(utils|test).(ts|js)"],
  format: ["cjs", "esm"],
  platform: "browser",
  target: ["node16"],
  dts: true,
  outDir: "dist",
  splitting: false,
  clean: true,
  sourcemap: true,
  minify: true,
  // bundle: false,
  env: {
    SECURE_STORAGE_SECRET: "x1bQYQA4vSEcR6RQ05XtJg",
    SECURE_STORAGE_PREFIX: "@secst",
  },
});
