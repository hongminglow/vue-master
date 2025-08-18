<template>
	<div class="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
		<div class="max-w-md w-full space-y-8">
			<LoginHeader />
			<LoginForm :is-loading="isLoading" :error="error" @submit="handleLogin" />
		</div>
	</div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useAuthStore } from "@/stores/auth";
import LoginHeader from "./components/LoginHeader.vue";
import LoginForm from "./components/LoginForm.vue";
import type { LoginFormData } from "./composables/useLoginForm";

// Reactive variables
const isLoading = ref(false);
const error = ref("");

// Router and store
const router = useRouter();
const authStore = useAuthStore();

// Handle login submission
const handleLogin = async (formData: LoginFormData) => {
	isLoading.value = true;
	error.value = "";

	try {
		const success = await authStore.login(formData.email, formData.password);

		if (success) {
			await router.push("/");
		} else {
			error.value = "Invalid email or password";
		}
	} catch (err) {
		error.value = "An error occurred during login";
	} finally {
		isLoading.value = false;
	}
};
</script>
