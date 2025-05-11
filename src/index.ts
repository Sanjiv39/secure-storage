import { ENV } from "./utils/env";
ENV;

import { Store } from "./utils/store";

const localStorage = new Store("local");
const sessionStorage = new Store("session");

export { localStorage, sessionStorage };
