<template>
	<div class="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
		<div class="max-w-md w-full space-y-8">
			<div>
				<h2 class="mt-6 text-center text-3xl font-extrabold text-gray-900">Sign in to your account</h2>
				<p class="mt-2 text-center text-sm text-gray-600">Use: admin@example.com / Password1!</p>
			</div>

			<form class="mt-8 space-y-6" @submit.prevent="onSubmit">
				<div class="rounded-md shadow-sm -space-y-px">
					<div>
						<label for="email" class="sr-only">Email address</label>
						<form.Field name="email">
							<template #default="{ field }">
								<input
									id="email"
									name="email"
									type="email"
									required
									:value="field.state.value"
									@blur="field.handleBlur"
									@input="(e: Event) => field.handleChange((e.target as HTMLInputElement).value)"
									:class="[
										'appearance-none rounded-none relative block w-full px-3 py-2 border placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm',
										getFieldError('email') ? 'border-red-300' : 'border-gray-300',
									]"
									placeholder="Email address"
								/>
							</template>
						</form.Field>
						<div v-if="getFieldError('email')" class="text-red-600 text-sm mt-1 px-3">
							{{ getFieldError("email") }}
						</div>
					</div>
					<div>
						<label for="password" class="sr-only">Password</label>
						<form.Field name="password">
							<template #default="{ field }">
								<input
									id="password"
									name="password"
									type="password"
									required
									:value="field.state.value"
									@blur="field.handleBlur"
									@input="(e: Event) => field.handleChange((e.target as HTMLInputElement).value)"
									:class="[
										'appearance-none rounded-none relative block w-full px-3 py-2 border placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm',
										getFieldError('password') ? 'border-red-300' : 'border-gray-300',
									]"
									placeholder="Password (8+ chars, 1 uppercase, 1 symbol)"
								/>
							</template>
						</form.Field>
						<div v-if="getFieldError('password')" class="text-red-600 text-sm mt-1 px-3">
							{{ getFieldError("password") }}
						</div>
					</div>
				</div>

				<!-- Error message - Vue's v-if is like React's conditional rendering -->
				<div v-if="error" class="text-red-600 text-sm text-center">
					{{ error }}
				</div>

				<div>
					<button
						type="submit"
						:disabled="loading || !isValid"
						class="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed"
					>
						<!-- Loading state - Vue's v-if/v-else is like React's conditional rendering -->
						<span v-if="loading">Signing in...</span>
						<span v-else>Sign in</span>
					</button>
				</div>
			</form>

			<SimpleCard>
				<template v-slot:footer class="mt-6 text-center">
					<p class="text-sm text-gray-600">
						Don't have an account?
						<router-link to="/register" class="font-medium text-indigo-600 hover:text-indigo-500">Register</router-link>
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
// Vue 3 Composition API - similar to React hooks
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useAuthStore } from "@/stores/auth";
import SimpleCard from "@/components/card/SimpleCard.vue";
import HCloneDemo from "@/components/HCloneDemo.vue";
import { useAppForm } from "@/composables/useAppForm";

// Use the form composable
const { form, isValid, getFieldError } = useAppForm();

// Other reactive variables
const loading = ref(false);
const error = ref("");

// Router hook - similar to useNavigate in React Router
const router = useRouter();

// Store hook - similar to useContext or Redux hooks in React
const authStore = useAuthStore();

// Handle form submission
const onSubmit = async (e: Event) => {
	e.preventDefault();

	loading.value = true;
	error.value = "";

	try {
		// Manually validate and get values
		const values = form.state.values;
		const validationErrors = getFieldError("email") || getFieldError("password");

		if (validationErrors) {
			throw new Error("Please fix validation errors");
		}

		const success = await authStore.login(values.email, values.password);

		if (success) {
			router.push("/");
		} else {
			error.value = "Invalid email or password";
		}
	} catch (err) {
		error.value = "An error occurred during login";
	} finally {
		loading.value = false;
	}
};
</script>
