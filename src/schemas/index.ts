import { boolean, z } from "zod";

export const isRequired = (msg?: string) =>
  z.string().min(1, msg ?? "This field is required");

export const LoginValidationSchema = z.object({
  email: isRequired().email("Invalid email"),
  password: isRequired(),
  extend: boolean().optional(),
});

export const ForgotPasswordValidationSchema = z.object({
  email: z.string().email(),
});

export const ResetPasswordValidationSchema = z
  .object({
    oldPassword: z.string().min(6, "Password must be at least 6 characters long"),
    newPassword: z
      .string()
      .min(6, "Password must be at least 6 characters long"),
  })
  .refine((data) => data.oldPassword === data.newPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });
