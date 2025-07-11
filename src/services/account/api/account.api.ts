import { axiosInstance } from "@/config/axios";
import {
  UpdateUserResponse,
  ChangePasswordRequest,
  ChangePasswordResponse,
} from "@/services/account/types/account.type";

const ACCOUNT_ENDPOINT = {
  UPDATE_USER: "auth/update-account",
  CHANGE_PASSWORD: "auth/update-password",
};

const accountApi = {
  updateUser: async (
    name: string,
    phoneNumber: string
  ): Promise<UpdateUserResponse> => {
    try {
      const response = await axiosInstance.put(ACCOUNT_ENDPOINT.UPDATE_USER, {
        name,
        phoneNumber,
      });
      return response.data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  },

  changePassword: async (
    data: ChangePasswordRequest
  ): Promise<ChangePasswordResponse> => {
    try {
      const response = await axiosInstance.put(
        ACCOUNT_ENDPOINT.CHANGE_PASSWORD,

        data
      );
      return response.data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  },
};

export default accountApi;
