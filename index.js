import { tokenKey } from "./scripts/config.js";
import DOMHandler from "./scripts/dom-handler.js";
import LoginPage from "./scripts/pages/login.js";
import { login } from "./scripts/services/session-services.js";
import { createTasks, deleteTasks, editTasks, getTasks, showTask } from "./scripts/services/tasks-services.js";
import { signup } from "./scripts/services/user-services.js";

DOMHandler.load(LoginPage);
