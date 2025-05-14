import { decrypt, encrypt } from "./crypt";
import { mainConfig } from "./config";

var window: Window & typeof globalThis;
/**
 * @description ⚠️`Experimental`⚠️
 * @description Use this to change the global `window` object
 */
export const changeWindow = (newWindow: any) => {
  window = newWindow;
};

export type SupportedTypes =
  | boolean
  | object
  | null
  | undefined
  | string
  | number
  | bigint;
export type SupportedTypesString =
  | "boolean"
  | "number"
  | "bigint"
  | "string"
  | "object"
  | "undefined";

const getPrefix = () => {
  try {
    const prefix = mainConfig.prefix;
    if (typeof prefix !== "string") {
      throw new Error("Invalid prefix, not a string");
    }
    const str = `${prefix}`;
    return str;
  } catch (err) {
    console.error("Error secure storage => prefix :", err);
    return null;
  }
};
const prefix = getPrefix();

export const getModKey = (key: string) => {
  if (typeof prefix !== "string") {
    throw new Error("Prefix is invalid");
  }
  if (typeof key !== "string") {
    throw new Error("Key must be string");
  }
  const str = `${prefix}.${key}`;
  return str;
};

type TemplateData = {
  data: SupportedTypes;
  type: SupportedTypesString;
};

/**
 * @description Returns string format of data passed or `null`
 * @description Modifies in the format of `{data, type}`
 */
export const modifyDataToString = (data: any) => {
  try {
    if (typeof data === "function" || typeof data === "symbol") {
      throw new Error("Data must not be a function or symbol");
    }
    const template: TemplateData = {
      data: data,
      // @ts-ignore
      type: typeof data,
    };
    const str = JSON.stringify(template);
    return str;
  } catch (err) {
    console.error("Error secure storage => modify data :", err);
    return null;
  }
};

/**
 * @description Returns data from of formatted string passed or `null`
 * @description Accepts data string in the format of `{data, type}`
 */
export const getDataFromModifiedString = (str: string) => {
  try {
    if (typeof str !== "string") {
      throw new Error("Value must be string");
    }
    const template: TemplateData = JSON.parse(str);
    if (
      typeof template !== "object" ||
      !Object.getOwnPropertyNames(template).includes("data") ||
      !Object.getOwnPropertyNames(template).includes("type")
    ) {
      throw new Error("Invalid data scheme");
    }
    const dataType = typeof template.data;
    template.type = dataType as SupportedTypesString;
    if (dataType === "symbol" || dataType === "function") {
      throw new Error(
        "Invalid data type, does not supports function or symbol"
      );
    }
    return template;
  } catch (err) {
    console.error("Error secure storage => get data :", err);
    return null;
  }
};

const storeTypes = ["local", "session"] as const;
export type StoreType = (typeof storeTypes)[number];

/**
 * @description Validates store by checking any of `local` or `session`
 */
const validateStore = (store: StoreType) => {
  if (typeof store !== "string" || !storeTypes.includes(store)) {
    throw new Error("Store type must be one of [local, session]");
  }
  if (
    typeof window !== "object" ||
    typeof window.localStorage !== "object" ||
    typeof window.sessionStorage !== "object"
  ) {
    throw new Error("Invalid window, please use only in browser");
  }
};

/**
 * @description Validates store by checking any of `local` or `session`
 * @description Validates prefix as `string`
 * @description Validates key as `string`
 */
const preValidations = (prefix: string, key: string, store: StoreType) => {
  if (typeof prefix !== "string") {
    throw new Error("Prefix is invalid");
  }
  if (typeof key !== "string") {
    throw new Error("Key must be string");
  }
  validateStore(store);
};

/**
 * @description Syncronously removes matched values with matching `prefix`
 */
const matchedClear = (storage: Storage) => {
  try {
    const len = storage.length;
    for (let i = 0; i < len; i++) {
      const key = storage.key(i);
      if (key?.startsWith(`${prefix}.`)) {
        storage.removeItem(key);
      }
    }
  } catch (err) {
    console.error("Error secure storage => matched-clear :", err);
  }
};

export class Store<S extends StoreType> {
  private store: StoreType = "local" as S;
  private storage: Storage = window.localStorage;

  constructor(store?: S) {
    try {
      validateStore(store as StoreType);
      this.store = store as StoreType;
      if (store === "local") {
        this.storage = window.localStorage;
      }
      if (store === "session") {
        this.storage = window.sessionStorage;
      }
    } catch (err) {}
  }

  /**
   * @description Stores data to store matching `key`
   */
  setItem = (key: string, data: SupportedTypes) => {
    try {
      preValidations(prefix as string, key, this.store);

      const str = modifyDataToString(data);
      if (typeof str !== "string") {
        return;
      }
      const encrypted = encrypt(str);
      if (typeof encrypted !== "string") {
        return;
      }

      const modKey = `${prefix}.${key}`;
      this.storage.setItem(modKey, encrypted);
    } catch (err) {
      console.error("Error secure storage => setItem :", err);
    }
  };

  /**
   * @description Gets data from store matching `key`
   */
  getItem = <T extends any = SupportedTypes>(key: string) => {
    try {
      preValidations(prefix as string, key, this.store);

      const modKey = `${prefix}.${key}`;
      let str: string | null = null;
      str = this.storage.getItem(modKey);

      const decrypted = decrypt(str as string);
      if (typeof decrypted !== "string") {
        return null;
      }

      const template = getDataFromModifiedString(decrypted);
      if (!template) {
        return null;
      }

      const data = template.data as T;
      return data;
    } catch (err) {
      console.error("Error secure storage => setItem :", err);
      return null;
    }
  };

  /**
   * @description Removes single item from store matching `key`
   */
  removeItem = (key: string) => {
    try {
      preValidations(prefix as string, key, this.store);

      const modKey = `${prefix}.${key}`;
      this.storage.removeItem(modKey);
    } catch (err) {
      console.error("Error secure storage => removeItem :", err);
    }
  };

  /**
   * @description Syncronously removes matched values with matching `prefix`
   */
  clear = () => {
    try {
      preValidations(prefix as string, "", this.store);
      matchedClear(this.storage);
    } catch (err) {
      console.error("Error secure storage => clear :", err);
    }
  };

  /**
   * @description Executes `storage.clear()` to clear complete store
   */
  forceClear = () => {
    try {
      preValidations(prefix as string, "", this.store);
      this.storage.clear();
    } catch (err) {
      console.error("Error secure storage => force-clear :", err);
    }
  };
}
