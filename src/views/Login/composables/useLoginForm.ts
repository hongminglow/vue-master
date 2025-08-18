import { z } from "zod";
import { useFormFactory } from "@/composables/useFormFactory";

// Strict password validation schema
const passwordSchema = z
  .string()
  .min(8, "Password must be at least 8 characters long")
  .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
  .regex(/[!@#$%^&*(),.?":{}|<>]/, "Password must contain at least one symbol");

// Login form schema
export const loginSchema = z.object({
  email: z.email("Please enter a valid email address"),
  password: passwordSchema,
});

export type LoginFormData = z.infer<typeof loginSchema>;

export function useLoginForm(
  onSubmit?: (data: LoginFormData) => Promise<void> | void
) {
  return useFormFactory<LoginFormData>({
    defaultValues: {
      email: "admin@example.com",
      password: "Password1!",
    },
    validationSchema: loginSchema,
    onSubmit,
  });
}
