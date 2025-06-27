import axios, {
  AxiosError,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from "axios";
import authApi from "@/services/auth/api/auth.api";

// Mở rộng interface InternalAxiosRequestConfig
interface CustomInternalAxiosRequestConfig extends InternalAxiosRequestConfig {
  _retry?: boolean;
}

const baseURL = import.meta.env.VITE_API_URL;

export const axiosInstance = axios.create({
  baseURL,
  timeout: 10000,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

// Request interceptor
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("accessToken");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor
axiosInstance.interceptors.response.use(
  (response: AxiosResponse) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config as CustomInternalAxiosRequestConfig;

    if (error.response?.status === 401) {
      localStorage.removeItem("accessToken");
      window.location.href = "/login";
    }

    if (error.response?.status === 400 && !originalRequest?._retry) {
      originalRequest._retry = true;

      try {
        const response = await authApi.refreshToken();
        localStorage.setItem("accessToken", response.accessToken);

        // Cập nhật header Authorization với token mới
        originalRequest.headers.Authorization = `Bearer ${response.accessToken}`;

        // Thử lại request ban đầu với token mới
        return axiosInstance(originalRequest);
      } catch (refreshError) {
        // Nếu refresh token thất bại, xóa token và chuyển về trang login
        localStorage.removeItem("accessToken");
        window.location.href = "/login";
        return Promise.reject(refreshError);
      }
    }

    if (!error.response) {
      // Network error or CORS issue
      const networkError = error as Error;
      console.error("Network Error or CORS issue:", networkError.message);
      return Promise.reject(
        new Error(
          "Unable to connect to the server. Please check your connection."
        )
      );
    }

    return Promise.reject(error);
  }
);
