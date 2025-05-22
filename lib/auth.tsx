// lib/auth.ts
import api from "./axios";
import Cookies from "js-cookie";

export async function login(email: string, password: string) {
  const res = await api.post("/auth/login", { email, password });
  Cookies.set("token", res.data.token);

  document.cookie = `token=${res.data.token}; path=/; max-age=3600; secure; samesite=strict`;
}

export async function register(data: {
  username: string;
  email: string;
  password: string;
  role: string;
  location: string;
  siret: string;
  companyName: string;
}) {
  const res = await api.post("/auth/register", data);
  Cookies.set("token", res.data.token);
}

export async function logout() {
  await api.post("/auth/logout");
  Cookies.remove("token");
}

