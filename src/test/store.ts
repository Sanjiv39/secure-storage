import { encrypt, decrypt } from "../utils/crypt";
import { modifyDataToString, getDataFromModifiedString } from "../utils/store";

const data = { message: "test" };
const mod = modifyDataToString(data) as string
const enc = encrypt(mod);
console.log(mod, enc, decrypt(enc as string));
