// NOTE: Hardcoded credentials per user's explicit request.
// This is documented as insecure in the security memory.
const ADMIN_USER = "CHANELLE";
const ADMIN_PASS = "Chanelle@123";
const STORAGE_KEY = "chanai_admin_session";

export const adminLogin = (username: string, password: string): boolean => {
  if (username.trim() === ADMIN_USER && password === ADMIN_PASS) {
    sessionStorage.setItem(STORAGE_KEY, "1");
    return true;
  }
  return false;
};

export const adminLogout = () => sessionStorage.removeItem(STORAGE_KEY);

export const isAdmin = (): boolean =>
  typeof window !== "undefined" && sessionStorage.getItem(STORAGE_KEY) === "1";
