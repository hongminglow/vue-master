import { defineStore } from "pinia";
import { ref, computed } from "vue";

// Define the auth store - similar to Redux slice or Context
export const useAuthStore = defineStore("auth", () => {
	// State - using ref() is like React's useState
	const isAuthenticated = ref(false);
	const user = ref<{
		email: string;
		name: string;
	} | null>(null);

	// Computed properties - similar to useMemo in React
	const isLoggedIn = computed(() => isAuthenticated.value);

	// Actions - similar to Redux actions or custom hooks
	const login = async (email: string, password: string) => {
		// Simulate API call
		return new Promise<boolean>((resolve) => {
			setTimeout(() => {
				if (email === "admin@example.com" && password === "password") {
					isAuthenticated.value = true;
					user.value = {
						email: email,
						name: "Admin User",
					};
					localStorage.setItem("isAuthenticated", "true");
					localStorage.setItem("user", JSON.stringify(user.value));
					resolve(true);
				} else {
					resolve(false);
				}
			}, 1000);
		});
	};

	const logout = () => {
		isAuthenticated.value = false;
		user.value = null;
		localStorage.removeItem("isAuthenticated");
		localStorage.removeItem("user");
	};

	const initializeAuth = () => {
		const stored = localStorage.getItem("isAuthenticated");
		const storedUser = localStorage.getItem("user");

		if (stored === "true" && storedUser) {
			isAuthenticated.value = true;
			user.value = JSON.parse(storedUser);
		}
	};

	return {
		isAuthenticated,
		user,
		isLoggedIn,
		login,
		logout,
		initializeAuth,
	};
});
