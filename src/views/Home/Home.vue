<template>
	<div class="min-h-screen bg-gray-50">
		<!-- Navigation Header -->
		<nav class="bg-white shadow">
			<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
				<div class="flex justify-between h-16">
					<div class="flex items-center">
						<h1 class="text-xl font-semibold text-gray-900">Vue Startup App</h1>
					</div>
					<div class="flex items-center space-x-4">
						<!-- User info - Vue's template interpolation {{ }} is like React's {expression} -->
						<span class="text-gray-700"> Welcome, {{ user?.name }} </span>
						<button
							@click="handleLogout"
							class="bg-red-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
						>
							Logout
						</button>
					</div>
				</div>
			</div>
		</nav>

		<!-- Main Content -->
		<main class="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
			<div class="px-4 py-6 sm:px-0">
				<div class="border-4 border-dashed border-gray-200 rounded-lg p-8">
					<div class="text-center">
						<h2 class="text-3xl font-extrabold text-gray-900 mb-4">🎉 Welcome to Vue!</h2>
						<p class="text-lg text-gray-600 mb-8">
							You've successfully created a Vue 3 + TypeScript + Tailwind application!
						</p>

						<!-- Stats Cards -->
						<div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
							<div v-for="stat in stats" :key="stat.name" class="bg-white overflow-hidden shadow rounded-lg">
								<div class="p-5">
									<div class="flex items-center">
										<div class="flex-shrink-0">
											<div class="text-2xl">{{ stat.icon }}</div>
										</div>
										<div class="ml-5 w-0 flex-1">
											<dl>
												<dt class="text-sm font-medium text-gray-500 truncate">
													{{ stat.name }}
												</dt>
												<dd class="text-lg font-medium text-gray-900">
													{{ stat.value }}
												</dd>
											</dl>
										</div>
									</div>
								</div>
							</div>
						</div>

						<!-- Action Buttons -->
						<div class="space-x-4">
							<button
								@click="incrementCounter"
								class="bg-indigo-600 text-white px-6 py-3 rounded-md text-lg font-medium hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
							>
								Click Counter: {{ counter }}
							</button>
							<button
								@click="showAlert"
								class="bg-green-600 text-white px-6 py-3 rounded-md text-lg font-medium hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
							>
								Show Alert
							</button>
						</div>
					</div>
				</div>
			</div>

			<ExperimentLab :count="counter" />
		</main>
	</div>
</template>

<script setup lang="ts">
// Vue 3 Composition API imports
import { ref, computed, onMounted, watch, watchEffect, watchPostEffect, watchSyncEffect } from "vue";
import { useRouter } from "vue-router";
import { useAuthStore } from "@/stores/auth";
import { once } from "events";
import ExperimentLab from "./components/ExperimentLab.vue";

// State - like useState in React
const counter = ref(0);

// Router and store
const router = useRouter();
const authStore = useAuthStore();

// Computed property - like useMemo in React
const user = computed(() => authStore.user);

// Reactive data for the stats cards
const stats = ref([
	{ name: "Framework", value: "Vue 3", icon: "⚡" },
	{ name: "Language", value: "TypeScript", icon: "📝" },
	{ name: "Styling", value: "Tailwind CSS", icon: "🎨" },
]);

// Methods - similar to functions in React components
const incrementCounter = () => {
	counter.value++;
};

const showAlert = () => {
	alert(`Hello ${user.value?.name}! You're using Vue 3 with TypeScript!`);
};

const handleLogout = () => {
	authStore.logout();
	router.push("/login");
};

watch(counter, (newVal, oldVal) => {
	console.log(`new val..${newVal} -> old val..${oldVal}`);
});

// Lifecycle hook - similar to useEffect in React
onMounted(() => {
	console.log("Home component mounted!");
	authStore.initializeAuth();
});
</script>

<style scoped>
/* Component-scoped styles - only apply to this component */
/* This is like CSS Modules in React */
</style>
