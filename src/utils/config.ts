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

const optionValidation = (
  value?: string,
  options?: Partial<{
    appendChecker: (value: string) => boolean;
    message: string;
  }>
) => {
  if (typeof value === "undefined") {
    return;
  }
  if (
    typeof value !== "string" ||
    !value.trim() ||
    (typeof options?.appendChecker === "function" &&
      !options.appendChecker(value))
  ) {
    throw new Error(options?.message || "Value must be a valid string");
  }
};

export const configure = (config?: Partial<Config>) => {
  try {
    if (config && typeof config === "object") {
      optionValidation(config.prefix, {
        message: "Prefix must be a valid string",
      });
      optionValidation(config.secret, {
        message: "Secret must be a valid string",
      });

      for (const key in config) {
        if (typeof config[key as keyof Config] !== "undefined") {
          mainConfig[key as keyof Config] = config[
            key as keyof Config
          ] as string;
        }
      }
    }
  } catch (err) {
    console.error("Error secure storage => update-configuration :", err);
  }
};
