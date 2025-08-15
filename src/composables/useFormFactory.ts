import { useForm } from "@tanstack/vue-form";
import { computed } from "vue";
import { type ZodSchema } from "zod";

export interface FormFactoryOptions<TFormData> {
	defaultValues: TFormData;
	validationSchema: ZodSchema<TFormData>;
	onSubmit?: (data: TFormData) => Promise<void> | void;
}

export function useFormFactory<TFormData extends Record<string, any>>(options: FormFactoryOptions<TFormData>) {
	const { defaultValues, validationSchema, onSubmit } = options;

	const form = useForm({
		defaultValues,
		onSubmit: async ({ value }) => {
			// Validate with Zod before submitting
			const result = validationSchema.safeParse(value);
			if (!result.success) {
				throw new Error("Validation failed");
			}

			if (onSubmit) {
				await onSubmit(result.data);
			}

			return result.data;
		},
	});

	// Computed properties for form state
	const isValid = computed(() => {
		const values = form.state.values;
		const result = validationSchema.safeParse(values);
		return result.success;
	});

	// Helper function to validate with Zod and return errors
	const validateWithZod = (values: Partial<TFormData>) => {
		const result = validationSchema.safeParse(values);
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
	const getFieldError = (fieldName: keyof TFormData) => {
		return getValidationErrors.value[fieldName as string] || "";
	};

	// Get field state
	const getFieldState = (fieldName: keyof TFormData) => {
		return form.getFieldInfo(fieldName as string);
	};

	return {
		form,
		isValid,
		getFieldError,
		getValidationErrors,
		getFieldState,
		validateWithZod,
		validationSchema,
	};
}
