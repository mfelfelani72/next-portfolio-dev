/**
 * @Author: Mohammad Felfelani
 * @Email: mfelfelani72@gmail.com
 * @Team:
 * @Date: 2025-10-06 15:14:10
 * @Description:
 */

export const isBrowser = (): boolean => {
  return typeof window !== "undefined" && typeof document !== "undefined";
};

export const setCookie = (name: string, value: string): void => {
  if (!isBrowser()) return;

  const expires = new Date();
  expires.setFullYear(expires.getFullYear() + 1);

  document.cookie = `${name}=${value}; expires=${expires.toUTCString()}; path=/; sameSite=lax`;
};

export const getCookie = (name: string): string | null => {
  if (!isBrowser()) return null;

  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) {
    return parts.pop()?.split(";").shift() || null;
  }
  return null;
};
