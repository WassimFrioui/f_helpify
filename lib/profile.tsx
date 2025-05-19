import api from "./axios";

export async function getProfile() {
  const res = await api.get("/profile");
  return res.data;
}

export async function updateProfile(data: { username: string; location: string }) {
  const res = await api.put("/profile", data);
  return res.data;
}