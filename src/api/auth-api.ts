import { signOut } from "@/store/slices/userSessionSlice";
import axios from "axios";

import * as SecureStore from "expo-secure-store";
import { AppStore } from "@/store";

const axiosRefresh = axios.create({
  baseURL: process.env.EXPO_PUBLIC_BASE_URL,
});

let store: AppStore;

export const injectStore = (_store: AppStore) => {
  store = _store;
};

export const refreshApi = async () => {
  const provider = await SecureStore.getItemAsync("provider");
  const refreshToken = await SecureStore.getItemAsync("refreshToken");
  if (provider != null && refreshToken != null) {
    const res = await axiosRefresh.get(`/auth/${provider}/refresh`, {
      headers: { Authorization: `Bearer ${refreshToken}` },
    });
    await SecureStore.setItemAsync("token", res.data.token);
  }
};

axiosRefresh.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error?.response?.data?.code === "refresh_token_expired") {
      store.dispatch(signOut());
    }
    return Promise.reject(error);
  },
);
