import { z } from "zod";
import { emailValidate, nameValidate } from "./auth";

// Schema cho form account detail
export const accountDetailSchema = z.object({
  displayName: nameValidate,
  email: emailValidate,
  phoneNumber: z.string().optional(),
});

export const changePasswordSchema = z
  .object({
    currentPassword: z.string().optional(),
    newPassword: z
      .string()
      .min(6, "Password phải có ít nhất 6 ký tự")
      .optional(),
    confirmPassword: z.string().optional(),
  })
  .refine(
    (data) => {
      if (data.newPassword && !data.currentPassword) {
        return false;
      }
      return true;
    },
    {
      message: "Vui lòng nhập mật khẩu hiện tại",
      path: ["currentPassword"],
    }
  )
  .refine(
    (data) => {
      if (data.newPassword && data.newPassword !== data.confirmPassword) {
        return false;
      }
      return true;
    },
    {
      message: "Mật khẩu xác nhận không khớp",
      path: ["confirmPassword"],
    }
  );

export type ChangePasswordFormInputs = z.infer<typeof changePasswordSchema>;
export type AccountDetailFormInputs = z.infer<typeof accountDetailSchema>;
