export type Config = {
  /** @description The secret hash will be used for AES encryption */
  secret: string;
  /**
   * @description The prefix which will prepend on every key in the storage as `{prefix}.{key}`
   */
  prefix: string;
};

const ENV =
  (typeof process === "object" &&
    process?.env &&
    typeof process.env === "object" &&
    process.env) ||
  null;

export const mainConfig: Config = {
  secret: ENV?.SECURE_STORAGE_SECRET || "x1bQYQA4vSEcR6RQ05XtJg",
  prefix: ENV?.SECURE_STORAGE_PREFIX || "@secst",
};

export const configure = (config?: Partial<Config>) => {
  try {
    if (config && typeof config === "object") {
      if (
        typeof config.prefix !== "undefined" &&
        (typeof config.prefix !== "string" || !config.prefix.trim())
      ) {
        throw new Error("Prefix must be valid string");
      }
      if (
        typeof config.secret !== "undefined" &&
        (typeof config.secret !== "string" || !config.secret.trim())
      ) {
        throw new Error("Secret must be valid string");
      }
      for (const key in config) {
        if (typeof config[key as keyof Config] !== "undefined") {
          mainConfig[key as keyof Config] = config[
            key as keyof Config
          ] as string;
        }
      }
    }
  } catch (err) {
    console.error("Error secure storage => encrypt :", err);
  }
};
