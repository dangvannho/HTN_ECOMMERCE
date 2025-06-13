import { User } from "@/services/auth/types/auth.type";

export type UpdateUserResponse = {
  status: number;
  message: string;
  user: User;
};

export type ChangePasswordRequest = {
  oldPassword: string;
  newPassword: string;
};
export type ChangePasswordResponse = {
  status: number;
  message: string;
};
