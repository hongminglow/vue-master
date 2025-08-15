<template>
	<div class="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
		<div class="max-w-md w-full space-y-8">
			<LoginHeader />

			<LoginForm :is-loading="isLoading" :error="error" @submit="handleLogin" />

			<SimpleCard>
				<template v-slot:footer class="mt-6 text-center">
					<p class="text-sm text-gray-600">
						Don't have an account?
						<router-link to="/register" class="font-medium text-indigo-600 hover:text-indigo-500">
							Register
						</router-link>
					</p>
				</template>
				<p>Testing123</p>
				<p>Testing456</p>
				<!-- Demo: h() vs cloneVNode() -->
				<HCloneDemo />
			</SimpleCard>
		</div>
	</div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useAuthStore } from "@/stores/auth";
import SimpleCard from "@/components/card/SimpleCard.vue";
import HCloneDemo from "@/components/HCloneDemo.vue";
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
