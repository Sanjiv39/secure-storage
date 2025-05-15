# Secure-Storage

[![npm](https://img.shields.io/npm/v/@secure-storage/common.svg)](https://www.npmjs.com/package/@secure-storage/common) <!-- [![downloads](https://img.shields.io/npm/dm/@secure-storage/common.svg)](http://npm-stat.com/charts.html?@secure-storage/common) -->

![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E) ![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)

![Browser Only](https://img.shields.io/badge/Environment-Browser--Only-blue?style=flat-square)

**Secure, type-safe, and effortless encrypted access to `localStorage` and `sessionStorage` in your web applications.**

---

## 🔐 Why secure-storage?

Storing sensitive data in `localStorage` or `sessionStorage` without encryption is risky. **secure-storage** ensures your data is:

- ✅ **Encrypted** before storage
- ✅ **Decrypted** automatically on retrieval
- ✅ **Type-safe** – no need to manually `JSON.stringify` or `JSON.parse`
- ✅ **Easy to use** with both `localStorage` and `sessionStorage`

---

## ✨ Features

- AES-based encryption under the hood
- Automatically serializes and deserializes data
- Works seamlessly with complex types (objects, arrays, etc.) and also custom user types.
- Supports both `localStorage` and `sessionStorage`
- Lightweight and dependency-free (or minimal deps)

---

## ⚠️ Important: Environment Requirement

This package is **browser-only**. It requires access to the `window` object and will not work in server-side environments like Node.js, Next.js SSR, or during static site generation (SSG).

> 🧠 **Use this only in the browser** – such as React, Next.js (client components only), Vue, or any SPA framework with client-side rendering.

---

## 📦 Installation

```bash
npm install @secure-storage/common
```

or

```bash
yarn add @secure-storage/common
```

---

## 🚀 Quick Start

You can **configure** you own hash and prefix using `env` with these variables

```bash
SECURE_STORAGE_SECRET="<your-hash-secret>"
SECURE_STORAGE_PREFIX="<your-prefix>"
```

For example in VITE `vite.config.js`

```js
import { defineConfig } from "vite";
// ...
export default defineConfig({
  // ...
  define: {
    "process.env": {
        SECURE_STORAGE_SECRET="ze329jdfjhf348ad"
        SECURE_STORAGE_PREFIX="my-secure-storage"
    },
  },
});
```

Also you can configure via the `configure` function

```ts
import { configure } from "@secure-storage/common";

configure({
  secret: "ze329jdfjhf348ad",
  prefix: "my-secure-storage",
});
```

Here is an **example usage**

```ts
import { localStorage, sessionStorage } from "@secure-storage/common";

// Save data
localStorage.setItem("user", { name: "Alice", age: 30 });
sessionStorage.setItem("loggedData", { session: "sdh34as9uiw" });

// Retrieve data - defaults type to "string|number|object|boolean|undefined|null"
const user = localStorage.getItem("user");
const loggedData = sessionStorage.getItem("loggedData");

// Retrieve data (typed) - inherits the user passed type to variable
const userTyped = localStorage.getItem<{ name: string; age: number }>("user");
const loggedDataTyped = sessionStorage.getItem<{ session: string }>(
  "loggedData"
);

// Remove data
localStorage.removeItem("user");
sessionStorage.removeItem("loggedData");

// Clear - checks prefix match then removes sequentially
localStorage.clear();
sessionStorage.clear();

// Force clear - works similar to storage.clear()
localStorage.forceClear();
sessionStorage.forceClear();
```

---

## How can I contribute ?

To contribute on the library, make sure you are creating a development branch for your fix as `dev-{feature/fix name}` and create a PR to `main` branch.

You can test your changes using `npm run test` or `npm run dev-test` before pushing.
