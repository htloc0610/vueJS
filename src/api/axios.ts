import axios from "axios";
import type { AxiosInstance } from "axios";
import type { AxiosRequestConfig } from "axios";

const axiosInstance: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 10000,
});

axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Biến cờ tránh gọi refresh nhiều lần
let isRefreshing = false;

// Định nghĩa kiểu cho các item trong failedQueue
interface FailedQueueItem {
  resolve: (token: string) => void;
  reject: (err: Error) => void;
}

// Thay thế `any[]` bằng `FailedQueueItem[]`
let failedQueue: FailedQueueItem[] = [];

const processQueue = (error: Error | null, token: string | null = null) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else {
      if (token) {
        prom.resolve(token);
      } else {
        prom.reject(new Error("Token is null"));
      }
    }
  });
  failedQueue = [];
};

// Response interceptor: nếu 403, gọi /refresh-token
axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest: AxiosRequestConfig & { _retry?: boolean } = error.config;

    // Nếu bị 403 và chưa retry
    if (error.response?.status === 403 && !originalRequest._retry) {
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({
            resolve: (token: string) => {
              originalRequest.headers = originalRequest.headers || {};
              originalRequest.headers.Authorization = "Bearer " + token;
              resolve(axiosInstance(originalRequest));
            },
            reject: (err: unknown) => reject(err),
          });
        });
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        const refreshToken = localStorage.getItem("token");
        const response = await axios.post(`${import.meta.env.VITE_API_URL}/auth/refresh-token`, {
          token: refreshToken,
        });

        const newToken = response.data.data.token;
        localStorage.setItem("token", newToken);

        processQueue(null, newToken);

        originalRequest.headers = originalRequest.headers || {};
        originalRequest.headers.Authorization = "Bearer " + newToken;
        return axiosInstance(originalRequest);
      } catch (err) {
        processQueue(err as Error, null);
        localStorage.removeItem("token"); // Xoá token cũ nếu refresh fail
        return Promise.reject(err);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
