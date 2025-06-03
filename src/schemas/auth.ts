import { z } from "zod";

export const emailValidate = z
  .string()
  .min(1, "Email là bắt buộc")
  .email("Email không hợp lệ");

export const phoneNumberValidate = z
  .string()
  .regex(/^\d+$/, "Số điện thoại chỉ được chứa các chữ số")
  .min(10, "Số điện thoại phải có 10 chữ số")
  .max(10, "Số điện thoại không được vượt quá 10 chữ số");

export const nameValidate = z
  .string()
  .min(1, "Họ và tên là bắt buộc")
  .regex(/^[^\d]*$/, "Họ và tên không được chứa số");

// Schema cho form login
export const loginSchema = z.object({
  email: emailValidate,
  password: z.string().min(1, "Password là bắt buộc"),
});

// Schema cho form register
export const registerSchema = z
  .object({
    name: nameValidate,
    phoneNumber: phoneNumberValidate,
    email: emailValidate,
    password: z.string().min(6, "Mật khẩu phải có ít nhất 6 ký tự"),
    confirmPassword: z.string().min(1, "Xác nhận mật khẩu là bắt buộc"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Mật khẩu và xác nhận mật khẩu không khớp",
    path: ["confirmPassword"], // Hiển thị lỗi ở trường confirmPassword
  });

// Types cho form inputs
export type LoginFormInputs = z.infer<typeof loginSchema>;
export type RegisterFormInputs = z.infer<typeof registerSchema>;
