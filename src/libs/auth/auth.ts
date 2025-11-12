
export async function login(username: string, password: string): Promise<boolean> {
  try {
    const res = await fetch("/next-portfolio/api/auth/login", {
    // const res = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });
    return res.ok;
  } catch (err) {
    console.error("Login error:", err);
    return false;
  }
}

export async function logout(): Promise<boolean> {
  try {
    const res = await fetch("/next-portfolio/api/auth/logout", { method: "POST" });
    // const res = await fetch("/api/auth/logout", { method: "POST" });
    return res.ok;
  } catch (err) {
    console.error("Logout error:", err);
    return false;
  }
}

export async function isAuthenticated(): Promise<boolean> {
  try {
    const res = await fetch("/next-portfolio/api/auth/me");
    // const res = await fetch("/api/auth/me");
    if (!res.ok) return false;
    const json = await res.json();
    return !!json.isLoggedIn;
  } catch (err) {
    console.error("isAuthenticated error:", err);
    return false;
  }
}
