import { create } from "zustand";

const parseUserFromStorage = () => {
  try {
    const userString = localStorage.getItem("user");
    if (!userString || userString === "null" || userString === "undefined") {
      return null;
    }
    return JSON.parse(userString);
  } catch (error) {
    console.warn("Corrupted user data in localStorage, clearing...");
    localStorage.removeItem("user");
    return null;
  }
};

const useAuthStore = create((set) => ({
  token: localStorage.getItem("token"),
  user: parseUserFromStorage(),

  setToken: (token) => {
    localStorage.setItem("token", token);
    set({ token });
  },

  setUser: (user) => {
    localStorage.setItem("user", JSON.stringify(user));
    set({ user });
  },

  logout: () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    set({ token: null, user: null });
  },
}));

export default useAuthStore;