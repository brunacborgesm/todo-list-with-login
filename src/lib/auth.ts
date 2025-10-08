const KEY = "token";

export const saveToken = (t: string) => {
  if (typeof window === "undefined") return;
  localStorage.setItem(KEY, t);
};

export const getToken = () => {
  if (typeof window === "undefined") return null;
  return localStorage.getItem(KEY);
};

export const clearToken = () => {
  if (typeof window === "undefined") return;
  localStorage.removeItem(KEY);
};
