// src/services/authService.js
import client from "../api/client";

const ACCESS_TOKEN_KEY = "access_token";
const REFRESH_TOKEN_KEY = "refresh_token";

export const authService = {
  async login(username, password) {
    const response = await client.post("/auth/login/", {
      username,
      password,
    });
    const { access, refresh } = response.data;

    localStorage.setItem(ACCESS_TOKEN_KEY, access);
    localStorage.setItem(REFRESH_TOKEN_KEY, refresh);

    return response.data;
  },

  logout() {
    localStorage.removeItem(ACCESS_TOKEN_KEY);
    localStorage.removeItem(REFRESH_TOKEN_KEY);
  },

  getAccessToken() {
    return localStorage.getItem(ACCESS_TOKEN_KEY);
  },

  getRefreshToken() {
    return localStorage.getItem(REFRESH_TOKEN_KEY);
  },

  isAuthenticated() {
    return !!localStorage.getItem(ACCESS_TOKEN_KEY);
  },
};
