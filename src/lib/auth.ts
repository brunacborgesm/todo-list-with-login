export const saveToken = (t: string) => localStorage.setItem("token", t);
export const getToken = () => localStorage.getItem("token");
export const clearToken = () => localStorage.removeItem("token");
export const logout = () => clearToken();
