const HARDCODED_USER = {
  username: "admin",
  password: "123456"
};

export function login(username: string, password: string): boolean {
  if (username === HARDCODED_USER.username && password === HARDCODED_USER.password) {
    document.cookie = "isLoggedIn=true; path=/";
    return true;
  }
  return false;
}

export function isAuthenticated(): boolean {
  return document.cookie.includes("isLoggedIn=true");
}

export function logout(): void {
  document.cookie = "isLoggedIn=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/";
}