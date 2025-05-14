import { ENV } from "./utils/env";
ENV;

import { Store, changeWindow } from "./utils/store";
import { configure } from "./utils/config";

changeWindow(window);

const localStorage = new Store("local");
const sessionStorage = new Store("session");

export { localStorage, sessionStorage, configure };
