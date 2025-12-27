import { create } from "zustand";
import { axiosInstance } from "../lib/axios.js";

export const useAuthStore = create((set) => ({
  authUser: null,
  isRegister: false,
  isLoggedIn: false,
  isCheckAuth: true,
  isLoading: false,

  checkAuth: async () => {
    set({ isLoading: true });
    try {
      const token = localStorage.getItem("accessToken");

      const res = await axiosInstance.get("/user/current-user", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      set({ authUser: res.data });
    } catch (error) {
      console.log(error.message);
      set({ authUser: null });
      localStorage.removeItem("accessToken");
    } finally {
      set({ isCheckAuth: false, isLoading: false });
    }
  },

  register: async (data) => {
    set({ isRegister: true, isLoading: true });
    try {
      const res = await axiosInstance.post("/user/register", data);

      set({ authUser: res.data });
    } catch (error) {
      set({ error });
    } finally {
      set({ isRegister: false, isLoading: false });
    }
  },

  login: async (data) => {
    set({ isLoggedIn: true, isLoading: true });

    try {
      const res = await axiosInstance.post("/user/login", data);
      // console.log(res.data.data);
      const { accessToken, refreshToken, ...userData } = res.data.data;

      localStorage.setItem("accessToken", accessToken);
      localStorage.setItem("refreshToken", refreshToken);

      set({ authUser: userData });
    } catch (error) {
    } finally {
      set({ isLoggedIn: false, isLoading: false });
    }
  },

  logout: async () => {
    set({ isLoading: true });
    try {
      const token = localStorage.getItem("accessToken");

      // console.log(token);

      await axiosInstance.post(
        "/user/logout",
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");

      set({ authUser: null, isLoggedIn: false });
    } catch (error) {
      console.log(error.message);
    } finally {
      set({ isLoading: true });
    }
  },
}));
