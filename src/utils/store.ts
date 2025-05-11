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

/**
 * @description Returns string format of data passed or `null`
 * @description Modifies in the format of `{data, type}`
 */
export const modifyData = (data: any) => {
  try {
    if (typeof data === "function" || typeof data === "symbol") {
      throw new Error("Data must not be a function or symbol");
    }
    const template = {
      data: data as SupportedTypes,
      type: typeof data as SupportedTypesString,
    };
    const str = JSON.stringify(template);
    return str;
  } catch (err) {
    console.error("Error secure storage => modify data :", err);
    return null;
  }
};

const storeTypes = ["local", "session"] as const;
export type StoreType = (typeof storeTypes)[number];
export const setItem = (store: StoreType, data: SupportedTypes) => {
  try {
    if (typeof store !== "string" || !storeTypes.includes(store)) {
      throw new Error("Store type must be one of [local, session]");
    }
    const str = modifyData(data)
    if(typeof str !== "string"){
        return
    }
    if(store === "local"){
        window.localStorage.setItem("")
        return 
    }
    if(store === "session"){

    }
  } catch (err) {
    console.log("Error secure storage => setItem :", err);
  }
};
