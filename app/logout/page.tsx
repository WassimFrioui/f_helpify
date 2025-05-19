"use client";
import { useEffect } from "react";
import Cookies from "js-cookie";

export default function LogoutPage() {
  useEffect(() => {
    Cookies.remove("token", { path: "/" });  // <-- ajoute le path
    window.location.href = "/login";
  }, []);

  return null;
}
