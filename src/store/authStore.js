import { create } from "zustand";


const useAuthStore = create((set) => ({
    token: localStorage.getItem("token"),
    user: localStorage.getItem("user"),
    setToken: (token) => {
        localStorage.setItem("token", token);
        set({ token });
    },

    setUser: (user) => {
        localStorage.setItem("user", user);
        set({ user });
    },
    logout: () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        set({ token: null, user: null });
    },
}));

export default useAuthStore;