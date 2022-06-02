import { renderInput } from "../components/input.js"
import DOMHandler from "../dom-handler.js";
import SignupPage from "./signup.js";
function renderLogin() {
  const { loginError } = LoginPage.state;
  return `
  <header class="container is-max-desktop">
  <a class="navbar-item" href="../../index.html">
    <h1>📕 Contacts App</h1>
  </a>
  </header>
  <main class="container is-max-desktop">
  <!-- form -->
  <form action="" class="form">
    <div class="formBody">
    <h2 class="titleSection">Login</h2>
      ${renderInput("email", "email", "email", loginError)}        
      ${renderInput(
        "password",
        "password",
        "password",
        loginError,
        "passwordBox",
        `minlength="6" required`
      )}
      ${
        loginError
          ? `<p class="tag is-danger is-light"> 😨 ${loginError}</p>`
          : ""
      }
      <p>you don't have an account? <a id="signup-btn2" href="#">signup</a></p>
    </div>

    <div class="linksFooter field">
      <div class="control">
        <a id="signup-btn" class="button is-link is-light">Signup</a>
      </div>
      <div class="control">
        <button
          type="submit"
          class="button is-link"
          id="submit-btn"
        />Login</button>
      </div>
    </div>
  </form>
  </main>`;
}

function listenSignup() {
  const signupBtn = document.querySelector("#signup-btn")
  signupBtn.addEventListener("click", (event) => {
    event.preventDefault();
    DOMHandler.load(SignupPage);
    LoginPage.state.loginError = null;
  })
  const signupBtn2 = document.querySelector("#signup-btn2")
  signupBtn2.addEventListener("click", (event) => {
    event.preventDefault();
    DOMHandler.load(SignupPage);
    LoginPage.state.loginError = null;
  })
}

const LoginPage = {
  toString() {
    return renderLogin();
  },
  addListeners() {
    return listenSignup();
  },
  state: {
    loginError: null,
  },
};

export default LoginPage;
