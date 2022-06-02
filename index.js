import { tokenKey } from "./scripts/config.js";
import DOMHandler from "./scripts/dom-handler.js";
import { HomePage } from "./scripts/pages/home.js";
import LoginPage from "./scripts/pages/login.js";
import STORE from "./scripts/store.js";

async function init() {
  try {
    const token = sessionStorage.getItem(tokenKey);

    if (!token) throw new Error();

    await STORE.fetchTasks();
    DOMHandler.load(HomePage);
  } catch (error) {
    console.log(error);
    sessionStorage.removeItem(tokenKey);
    DOMHandler.load(LoginPage);
  }
}

init();
