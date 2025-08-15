import { useForm } from "@tanstack/vue-form";
import { computed } from "vue";
import { z } from "zod";

// Strict password validation schema
const passwordSchema = z
	.string()
	.min(8, "Password must be at least 8 characters long")
	.regex(/[A-Z]/, "Password must contain at least one uppercase letter")
	.regex(/[!@#$%^&*(),.?":{}|<>]/, "Password must contain at least one symbol");

// Login form schema
export const loginSchema = z.object({
	email: z.string().email("Please enter a valid email address"),
	password: passwordSchema,
});

export type LoginFormData = z.infer<typeof loginSchema>;

export function useAppForm() {
	const form = useForm({
		defaultValues: {
			email: "",
			password: "",
		},
		onSubmit: async ({ value }) => {
			// Validate with Zod before submitting
			const result = loginSchema.safeParse(value);
			if (!result.success) {
				throw new Error("Validation failed");
			}

			// Return validated data for the component to handle
			return result.data;
		},
	});

	// Computed properties for form state
	const isValid = computed(() => {
		const values = form.state.values;
		const result = loginSchema.safeParse(values);
		return result.success;
	});

	// Helper function to validate with Zod and return errors
	const validateWithZod = (values: Partial<LoginFormData>) => {
		const result = loginSchema.safeParse(values);
		const errors: Record<string, string> = {};

		if (!result.success) {
			result.error.issues.forEach((issue) => {
				const fieldName = issue.path[0] as string;
				if (fieldName) {
					errors[fieldName] = issue.message;
				}
			});
		}

		return errors;
	};

	// Get validation errors for current form state
	const getValidationErrors = computed(() => {
		return validateWithZod(form.state.values);
	});

	// Helper function to get field error
	const getFieldError = (fieldName: keyof LoginFormData) => {
		return getValidationErrors.value[fieldName] || "";
	};

	return {
		form,
		isValid,
		getFieldError,
		getValidationErrors,
		validateWithZod,
		loginSchema,
	};
}
