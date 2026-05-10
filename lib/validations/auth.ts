import { z } from "zod";

export const loginSchema = z.object({
  email: z
    .string()
    .trim()
    .min(1, "Enter your email.")
    .email("Enter a valid email."),
  password: z.string().trim().min(5, "Password must be at least 5 characters."),
});

export const signupSchema = z
  .object({
    email: z
      .string()
      .trim()
      .min(1, "Enter you email.")
      .email("Enter a valid email."),
    password: z
      .string()
      .trim()
      .min(5, "Password must be at least 5 characters."),
    confirmPassword: z.string().trim(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match.",
    path: ["confirmPassword"],
  });

export type LoginFormData = z.infer<typeof loginSchema>;
export type SignupFormData = z.infer<typeof signupSchema>;
