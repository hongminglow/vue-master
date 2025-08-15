<template>
	<BaseForm :is-valid="isValid" @submit="handleSubmit">
		<template #default>
			<div class="mt-8 space-y-6">
				<div class="rounded-md shadow-sm -space-y-px">
					<FormField
						:form="form"
						name="email"
						type="email"
						label="Email address"
						placeholder="Email address"
						variant="rounded-top"
						required
						:error="getFieldError('email')"
					/>

					<FormField
						:form="form"
						name="password"
						type="password"
						label="Password"
						placeholder="Password (8+ chars, 1 uppercase, 1 symbol)"
						variant="rounded-bottom"
						required
						:error="getFieldError('password')"
					/>
				</div>

				<!-- Error message -->
				<div v-if="error" class="text-red-600 text-sm text-center">
					{{ error }}
				</div>

				<div>
					<BaseButton
						type="submit"
						variant="primary"
						size="md"
						full-width
						:disabled="!isValid"
						:is-loading="isLoading"
						loading-text="Signing in..."
					>
						Sign in
					</BaseButton>
				</div>
			</div>
		</template>
	</BaseForm>
</template>

<script setup lang="ts">
import BaseForm from "@/components/form/BaseForm.vue";
import BaseButton from "@/components/form/BaseButton.vue";
import FormField from "@/components/form/FormField.vue";
import { useLoginForm, type LoginFormData } from "../composables/useLoginForm";

interface Props {
	isLoading?: boolean;
	error?: string;
}

interface Emits {
	(e: "submit", data: LoginFormData): void;
}

withDefaults(defineProps<Props>(), {
	isLoading: false,
	error: "",
});

const emit = defineEmits<Emits>();

// Use the login form composable
const { form, isValid, getFieldError } = useLoginForm();

// Handle form submission
const handleSubmit = async () => {
	try {
		const values = form.state.values;
		const validationErrors = getFieldError("email") || getFieldError("password");

		if (validationErrors) {
			throw new Error("Please fix validation errors");
		}

		emit("submit", values);
	} catch (error) {
		console.error("Form submission error:", error);
	}
};
</script>
