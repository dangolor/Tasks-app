// src/store/authStore.js
import { create } from "zustand";
import { authService } from "../services/authService";

export const useAuthStore = create((set) => ({
  accessToken: authService.getAccessToken(),
  refreshToken: authService.getRefreshToken(),
  isAuthenticated: !!authService.getAccessToken(),

  login: async (username, password) => {
    const data = await authService.login(username, password);

    set({
      accessToken: data.access,
      refreshToken: data.refresh,
      isAuthenticated: true,
    });

    return data;
  },

  logout: () => {
    authService.logout();

    set({
      accessToken: null,
      refreshToken: null,
      isAuthenticated: false,
    });
  },
}));
