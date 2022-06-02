import { tokenKey } from "../config.js"
import apiFetch from "./api-fetch.js"

export async function signup(credentials = { email, password }) {
  // const {token, ...user} = await apiFetch("signup", { body: credentials })
  const { token } = await apiFetch("signup", { body: credentials })
  // console.log(token);
  sessionStorage.setItem(tokenKey, token)
  return token;
}
