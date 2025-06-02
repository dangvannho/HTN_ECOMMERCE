import { z } from "zod";


export const emailValidate = z.string().min(1, "Email là bắt buộc").email("Email không hợp lệ") 

// Schema cho form login
export const loginSchema = z.object({
  email: emailValidate,
  password: z.string().min(1, "Password là bắt buộc"),
});

// Schema cho form register
export const registerSchema = z.object({
  name: z.string().min(1, "Username là bắt buộc"),
  email: emailValidate,
  password: z.string().min(6, "Password phải có ít nhất 6 ký tự"),
});

// Types cho form inputs
export type LoginFormInputs = z.infer<typeof loginSchema>;
export type RegisterFormInputs = z.infer<typeof registerSchema>;

