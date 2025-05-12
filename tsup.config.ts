import { defineConfig } from "tsup";

export default defineConfig({
  // entry: ["src/**/*.[jt]s"], // for multiple files
  entry: ["src/index.ts"],
  format: ["cjs", "esm"],
  dts: true,
  outDir: "dist",
  splitting: true,
  clean: true,
  // sourcemap: true,
  minify: true,
  outExtension({ format }) {
    return format === "esm" ? { js: ".mjs" } : { js: ".cjs" };
  },
  env: {
    SECURE_STORAGE_SECRET: "x1bQYQA4vSEcR6RQ05XtJg",
    SECURE_STORAGE_PREFIX: "@secst",
  },
});
