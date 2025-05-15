import CryptoJS from "crypto-js";
import { mainConfig } from "./config";

const secret = mainConfig.secret;

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
    const str = CryptoJS.AES.decrypt(value, secret).toString(CryptoJS.enc.Utf8);
    return str;
  } catch (err) {
    console.error("Error secure storage => decrypt :", err);
    return null;
  }
};
