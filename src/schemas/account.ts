import { z } from "zod";  
import { emailValidate } from "./auth";

// Hàm kiểm tra chuỗi không chứa số
const noNumbers = (str: string) => !/\d/.test(str);

// Schema cho form account detail
export const accountDetailSchema = z.object({
    firstName: z.string()
      .min(1, "First name là bắt buộc")
      .refine(noNumbers, "First name không được chứa số"),
    lastName: z.string()
      .min(1, "Last name là bắt buộc")
      .refine(noNumbers, "Last name không được chứa số"),
    displayName: z.string()
      .min(1, "Display name là bắt buộc")
      .refine(noNumbers, "Display name không được chứa số"),
    email: emailValidate,
    currentPassword: z.string().optional(),
    newPassword: z.string().min(6, "Password phải có ít nhất 6 ký tự").optional(),
    confirmPassword: z.string().optional(),
  }).refine((data) => {
    if (data.newPassword && !data.currentPassword) {
      return false;
    }
    return true;
  }, {
    message: "Vui lòng nhập mật khẩu hiện tại",
    path: ["currentPassword"],
  }).refine((data) => {
    if (data.newPassword && data.newPassword !== data.confirmPassword) {
      return false;
    }
    return true;
  }, {
    message: "Mật khẩu xác nhận không khớp",
    path: ["confirmPassword"],
  }); 

export type AccountDetailFormInputs = z.infer<typeof accountDetailSchema>;