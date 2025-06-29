import { z } from "zod";

export const emailValidate = z
  .string()
  .min(1, "Email là bắt buộc")
  .email("Email không hợp lệ");

export const phoneNumberValidate = z
  .string()
  .min(1, "Số điện thoại là bắt buộc")
  .regex(/^\d+$/, "Số điện thoại chỉ được chứa các chữ số")
  .min(10, "Số điện thoại phải có 10 chữ số")
  .max(10, "Số điện thoại không được vượt quá 10 chữ số")
  .regex(/^(0)(3|5|7|8|9)[0-9]{8}$/, "Số điện thoại không hợp lệ!");
  

export const nameValidate = z
  .string()
  .min(1, "Họ và tên là bắt buộc")
  .min(2, "Họ và tên phải có ít nhất 2 ký tự")
  .regex(/^[^\d]*$/, "Họ và tên không được chứa số")
  .regex(/^[A-Za-zÀ-ỹ\s]*$/, "Họ và tên không được chứa ký tự đặc biệt");

export const passwordValidate = z
  .string()
  .min(1, "Mật khẩu là bắt buộc")
  .min(6, "Mật khẩu phải có ít nhất 6 ký tự")
  .max(20, "Mật khẩu không được vượt quá 20 ký tự");

export const comfirmPasswordValidate = z
  .string()
  .min(1, "Xác nhận mật khẩu là bắt buộc");

// Schema cho form login
export const loginSchema = z.object({
  email: emailValidate,
  password: z.string().min(1, "Mật khẩu là bắt buộc"),
});

// Schema cho form register
export const registerSchema = z
  .object({
    name: nameValidate,
    phoneNumber: phoneNumberValidate,
    email: emailValidate,
    password: passwordValidate,
    confirmPassword: comfirmPasswordValidate,
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Mật khẩu và xác nhận mật khẩu không khớp",
    path: ["confirmPassword"], // Hiển thị lỗi ở trường confirmPassword
  });

// Schema cho form forgot password
export const forgotPasswordSchema = z.object({
  email: emailValidate,
});

export const resetPasswordSchema = z
  .object({
    password: passwordValidate,
    confirmPassword: comfirmPasswordValidate,
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Mật khẩu và xác nhận mật khẩu không khớp",
    path: ["confirmPassword"], // Hiển thị lỗi ở trường confirmPassword
  });

// Types cho form inputs
export type LoginFormInputs = z.infer<typeof loginSchema>;
export type RegisterFormInputs = z.infer<typeof registerSchema>;
export type ForgotPasswordFormInputs = z.infer<typeof forgotPasswordSchema>;
export type ResetPasswordFormInputs = z.infer<typeof resetPasswordSchema>;
