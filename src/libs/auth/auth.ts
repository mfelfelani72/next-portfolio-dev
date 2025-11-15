// Functions

import { cns } from "../api/cns";

export async function login(
  username: string,
  password: string
): Promise<boolean> {
  try {
    const res = await cns<{
      token?: string;
      user?: any;
      username?: string;
      password?: string;
    }>({
      method: "post",
      endPoint: "/api/auth/login",
      body: { username, password },
      headers: { "Content-Type": "application/json" },
      route: "login",
    });

    return res !== false;
  } catch (err) {
    console.error("Login error:", err);
    return false;
  }
}

export async function logout(): Promise<boolean> {
  try {
    const res = await cns({
      method: "post",
      endPoint: "/api/auth/logout",
      route: "logout",
    });

    return res !== false;
  } catch (err) {
    console.error("Logout error:", err);
    return false;
  }
}

export async function isAuthenticated(): Promise<boolean> {
  try {
    const res = await cns<{
      isLoggedIn?: boolean;
    }>({
      method: "get",
      endPoint: "/api/auth/me",
      route: "isAuthenticated",
    });

    if (res === false) return false;

    return !!res?.isLoggedIn;
  } catch (err) {
    console.error("isAuthenticated error:", err);
    return false;
  }
}
