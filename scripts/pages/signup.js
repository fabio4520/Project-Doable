import { renderInput } from "../components/input.js";
import DOMHandler from "../dom-handler.js";
import LoginPage from "./login.js";
import { login } from "../services/session-services.js";
import { signup } from "../services/user-services.js";
import { HomePage } from "./home.js";

function renderSignup() {
  const { SignupError } = SignupPage.state;
  return `
  <header class="container is-max-desktop">
<a class="navbar-item" href="../../index.html">
  <h1>📕 Contacts App</h1>
</a>
</header>
<main class="container is-max-desktop signupView">
<!-- form -->
<form action="" class="form">
  <div class="formBody">
  <h2 class="titleSection">Sign up</h2>
    ${renderInput("email", "email", "email", SignupError)}       
    ${renderInput(
      "password",
      "password",
      "password",
      SignupError,
      "passwordBox",
      `minlength="6" required`
    )}
    ${
      SignupError
        ? `<p class="tag is-danger is-light"> 😨 ${SignupError}</p>`
        : ""
    }
    <p>you already have an account? <a id="login-btn2" href="#">login</a></p>
  </div>

  <div class="linksFooter field">
    <div class="control">
      <a id="login-btn" class="button is-success is-light">Login</a>
    </div>
    <div class="control">
      <button
        type="submit"
        class="button is-success"
        id="submit-btn"
      />Create Account</button>
    </div>
  </div>
</form>
</main>`;
}

function listenLoginBtn() {
  const loginBtn = document.querySelector("#login-btn")
  loginBtn.addEventListener("click", (event) => {
    event.preventDefault();
    DOMHandler.load(LoginPage);
    SignupPage.state.loginError = null;
  })
  const loginBtn2 = document.querySelector("#login-btn2")
  loginBtn2.addEventListener("click", (event) => {
    event.preventDefault();
    DOMHandler.load(LoginPage);
    SignupPage.state.loginError = null;
  })
}

function listenSubmit() {
  const form = document.querySelector(".form");
  form.addEventListener("submit", async (event) => {
    document.querySelector("#submit-btn").classList.toggle("is-loading");
    try {
      event.preventDefault();
      const { email, password } = event.target;
      const credentials = {
        email: email.value,
        password: password.value,
      };

      await signup(credentials);
      await login(credentials);

      setTimeout(function () {
        // loadingPage();
        setTimeout(async () => {
          // await STORE.fetchContacts();
          DOMHandler.load(HomePage);
        }, 500);
      }, 500);
    } catch (error) {
      SignupPage.state.SignupError = error.message;
      setTimeout(function () {
        DOMHandler.reload();
      }, 800);
    }
  });
}

const SignupPage = {
  toString() {
    return renderSignup();
  },
  addListeners() {
    return listenLoginBtn(), listenSubmit();
  },
  state: {
    SignupError: null,
  },
};

export default SignupPage;
