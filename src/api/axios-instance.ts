import axios from "axios";
import * as SecureStore from "expo-secure-store";
import { refreshApi } from "./auth-api";

export const axiosInstance = axios.create({
  baseURL: process.env.EXPO_PUBLIC_BASE_URL,
});

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (
      error.response?.data?.code === "token_expired" &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;

      await refreshApi();
      const newToken = await SecureStore.getItemAsync("token");
      originalRequest.headers.Authorization = `Bearer ${newToken}`;

      return axiosInstance(originalRequest);
    }

    return Promise.reject(error);
  },
);
