import { ENV } from "./utils/env";
ENV;

import { Store, changeWindow } from "./utils/store";

changeWindow(window);
const localStorage = new Store("local");
const sessionStorage = new Store("session");

export { localStorage, sessionStorage };
