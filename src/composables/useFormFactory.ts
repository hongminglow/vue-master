import { useForm } from "@tanstack/vue-form";
import { type ZodSchema } from "zod";

export interface FormFactoryOptions<TFormData> {
  defaultValues: TFormData;
  validationSchema?: ZodSchema<TFormData>;
  onSubmit?: (data: TFormData) => Promise<void> | void;
}

export function useFormFactory<TFormData extends Record<string, any>>(
  options: FormFactoryOptions<TFormData>
) {
  const { defaultValues, validationSchema, onSubmit } = options;

  const form = useForm({
    defaultValues,
    // Form-level validation (runs on submit)
    validators: validationSchema
      ? {
          onSubmit: (values) => {
            const result = validationSchema.safeParse(values.value);
            if (!result.success) {
              // Return form-level errors that will be distributed to fields
              const fieldErrors: Record<string, string> = {};
              result.error.issues.forEach((issue) => {
                const fieldName = issue.path[0] as string;
                if (fieldName) {
                  fieldErrors[fieldName] = issue.message;
                }
              });
              return {
                fields: fieldErrors,
              };
            }
            return undefined;
          },
        }
      : undefined,
    onSubmit: async ({ value }) => {
      if (onSubmit) {
        await onSubmit(value);
      }
      return value;
    },
  });

  return {
    form,
    validationSchema,
  };
}
