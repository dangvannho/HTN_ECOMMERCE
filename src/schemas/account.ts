import { z } from "zod";
import {
  emailValidate,
  nameValidate,
  passwordValidate,
  comfirmPasswordValidate,
} from "./auth";

// Schema cho form account detail
export const accountDetailSchema = z.object({
  displayName: nameValidate,
  email: emailValidate,
  phoneNumber: z.string().optional(),
});

export const changePasswordSchema = z
  .object({
    currentPassword: z.string().min(1, "Mật khẩu hiện tại là bắt buộc"),
    newPassword: passwordValidate,
    confirmPassword: comfirmPasswordValidate,
  })
  .refine(
    (data) => {
      if (data.newPassword && data.newPassword !== data.confirmPassword) {
        return false;
      }
      return true;
    },
    {
      message: "Mật khẩu mới và xác nhận mật khẩu mới không khớp",
      path: ["confirmPassword"],
    }
  );

export type ChangePasswordFormInputs = z.infer<typeof changePasswordSchema>;
export type AccountDetailFormInputs = z.infer<typeof accountDetailSchema>;
