import DOMHandler from "./scripts/dom-handler.js";
import LoginPage from "./scripts/pages/login.js";
import { login } from "./scripts/services/session-services.js";
import { signup } from "./scripts/services/user-services.js";

DOMHandler.load(LoginPage);

const credentials = {
  email: "fabio@mail.com",
  password: "123456"
}

// signup(credentials)

// login(credentials)