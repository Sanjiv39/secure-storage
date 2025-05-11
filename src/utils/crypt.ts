import CryptoJS from "crypto-js";

export const secret =
  process?.env?.SECURE_STORAGE_SECRET || "x1bQYQA4vSEcR6RQ05XtJg";

export const encrypt = (value: string) => {
  try {
    if (typeof value !== "string") {
      throw new Error("Value must be string");
    }
    const str = CryptoJS.AES.encrypt(value, secret).toString();
    return str;
  } catch (err) {
    console.error("Error secure storage => encrypt :", err);
    return null;
  }
};

export const decrypt = (value: string) => {
  try {
    if (typeof value !== "string") {
      throw new Error("Value must be string");
    }
    const str = CryptoJS.AES.decrypt(value, secret).toString();
    return str;
  } catch (err) {
    console.error("Error secure storage => decrypt :", err);
    return null;
  }
};
