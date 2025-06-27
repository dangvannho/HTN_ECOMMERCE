import { create } from "zustand";
import authApi from "@/services/auth/api/auth.api"; // Import API service
import { toast } from "react-hot-toast";
import type { User } from "@/services/auth/types/auth.type";

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean; // Thêm trạng thái loading
  error: string | null; // Thêm trạng thái lỗi
  login: (email: string, password: string) => Promise<void>;
  loginFacebook: () => Promise<void>; // Hàm login
  loginGoogle: () => Promise<void>;
  fetchUser: () => Promise<void>; // Hàm lấy thông tin user
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isAuthenticated: !!localStorage.getItem("accessToken"),
  isLoading: false,
  error: null,

  login: async (email: string, password: string) => {
    set({ isLoading: true, error: null });
    try {
      const response = await authApi.login(email, password);
      if (response.statusCode === 200) {
        localStorage.setItem("accessToken", response.accessToken);
        const userData = await authApi.getMe();
        set({
          user: userData.user,
          isAuthenticated: true,
          isLoading: false,
          error: null,
        });
      } else {
        set({ isLoading: false, error: "Đăng nhập thất bại" });
        toast.error("Đăng nhập thất bại");
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      const errorMessage =
        error.response?.data?.message || "Đã có lỗi xảy ra, vui lòng thử lại";
      set({ isLoading: false, error: errorMessage });
      toast.error(errorMessage);
    }
  },

  loginFacebook: async () => {
    set({ isLoading: true, error: null });
    try {
      await authApi.loginFacebook();
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      const errorMessage =
        error.response?.data?.message || "Đã có lỗi xảy ra, vui lòng thử lại";
      set({ isLoading: false, error: errorMessage });
      toast.error(errorMessage);
    }
  },

  loginGoogle: async () => {
    set({ isLoading: true, error: null });
    try {
      await authApi.loginGoogle();
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      const errorMessage =
        error.response?.data?.message || "Đã có lỗi xảy ra, vui lòng thử lại";
      set({ isLoading: false, error: errorMessage });
      toast.error(errorMessage);
    }
  },

  // Hàm lấy thông tin user (dùng để khôi phục trạng thái)
  fetchUser: async () => {
    set({ isLoading: true, error: null });
    try {
      const userData = await authApi.getMe();
      set({
        user: userData.user,
        isAuthenticated: true,
        isLoading: false,
        error: null,
      });
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      const errorMessage =
        error.response?.data?.message || "Không thể lấy thông tin người dùng";
      set({
        isLoading: false,
        error: errorMessage,
        user: null,
        isAuthenticated: false,
      });
      // localStorage.removeItem("accessToken"); // Xóa token nếu không hợp lệ
      // toast.error(errorMessage);
    }
  },
  logout: () => {
    localStorage.removeItem("accessToken");
    set({ user: null, isAuthenticated: false, isLoading: false, error: null });
  },
}));
