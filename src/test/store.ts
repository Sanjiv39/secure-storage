import { encrypt, decrypt } from "../utils/crypt";
import { modifyDataToString, getDataFromModifiedString } from "../utils/store";

const data = { message: "test" };
const mod = modifyDataToString(data) as string;
const enc = encrypt(mod);
const dec = decrypt(enc as string);
const decoded = getDataFromModifiedString(dec as string);
console.log("Testing store encryption and decryption.......................................")
console.log("Data :", mod);
console.log("Encrypted :", enc);
console.log("Decrypted :", dec);
console.log("Decoded data :", decoded?.data);
