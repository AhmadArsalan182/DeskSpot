import { apiRequest } from "./api.js";

export function register({ fullName, email, password }) {
  return apiRequest("/auth/register", { method: "POST", body: { fullName, email, password } });
}

export function login({ email, password }) {
  return apiRequest("/auth/login", { method: "POST", body: { email, password } });
}
