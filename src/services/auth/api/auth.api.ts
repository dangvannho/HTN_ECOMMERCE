import { axiosInstance } from "@/config/axios";
import type {
  LoginResponse,
  UserResponse,
  RegisterResponse,
} from "@/services/auth/types/auth.type";

const AUTH_ENDPOINT = {
  LOGIN: "/auth/login",
  LOGIN_FACEBOOK: "/auth/facebook",
  LOGIN_GOOGLE: "/auth/google",
  REGISTER: "auth/register",
  GET_ME: "/auth/account",
  LOGOUT: "/logout",
};

const authApi = {
  login: async (email: string, password: string): Promise<LoginResponse> => {
    try {
      const response = await axiosInstance.post(AUTH_ENDPOINT.LOGIN, {
        email,
        password,
      });
      return response.data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  },

  loginFacebook: async (): Promise<void> => {
    window.location.href = "http://localhost:8000/v1/api/auth/facebook";
  },

  loginGoogle: async (): Promise<void> => {
    window.location.href = "http://localhost:8000/v1/api/auth/google";
  },
  getMe: async (): Promise<UserResponse> => {
    try {
      const response = await axiosInstance.get(AUTH_ENDPOINT.GET_ME);
      return response.data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  },
  register: async (
    email: string,
    name: string,
    phoneNumber: string,
    password: string
  ): Promise<RegisterResponse> => {
    try {
      const response = await axiosInstance.post(AUTH_ENDPOINT.REGISTER, {
        email,
        name,
        password,
        phoneNumber,
      });
      return response.data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  },
  logout: async (): Promise<void> => {
    try {
      const response = await axiosInstance.post(AUTH_ENDPOINT.LOGOUT);
      return response.data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  },
};

export default authApi;
