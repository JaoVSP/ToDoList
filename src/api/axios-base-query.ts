import { BaseQueryFn } from "@reduxjs/toolkit/query/react";
import * as SecureStore from "expo-secure-store";

import type { AxiosRequestConfig, AxiosError } from "axios";
import { axiosInstance } from "./axios-instance";

export const axiosBaseQuery =
  (): BaseQueryFn<
    {
      url: string;
      method?: AxiosRequestConfig["method"];
      data?: AxiosRequestConfig["data"];
      params?: AxiosRequestConfig["params"];
      headers?: AxiosRequestConfig["headers"];
    },
    unknown,
    unknown
  > =>
  async ({ url, method, data, params, headers }) => {
    try {
      const jwt = await SecureStore.getItemAsync("token");
      const result = await axiosInstance({
        url: url,
        method,
        data,
        params,
        headers: {
          ...headers,
          Authorization: `Bearer ${jwt}`,
        },
      });
      return { data: result.data };
    } catch (axiosError) {
      const error = axiosError as AxiosError;
      return {
        error: {
          status: error.response?.status,
          data: error.response?.data || error.message,
        },
      };
    }
  };
