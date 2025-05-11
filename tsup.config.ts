import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["src/index.ts"],
  format: ["cjs", "esm"],
  dts: true,
  outDir: "dist",
  clean: true,
  env: {
    SECURE_STORAGE_SECRET: "x1bQYQA4vSEcR6RQ05XtJg",
    SECURE_STORAGE_PREFIX: "@secst",
  },
});
