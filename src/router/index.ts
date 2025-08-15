import { createRouter, createWebHistory } from "vue-router";
import type { RouteRecordRaw } from "vue-router";
import Login from "@/views/Login/Login.vue";
import Home from "@/views/Home.vue";

// Define routes - similar to React Router routes but different syntax
const routes: RouteRecordRaw[] = [
	{
		path: "/",
		name: "Home",
		component: Home,
		meta: { requiresAuth: true },
	},
	{
		path: "/login",
		name: "Login",
		component: Login,
	},
	// Catch all route - redirect to login
	{
		path: "/:pathMatch(.*)*",
		redirect: "/login",
	},
];

const router = createRouter({
	history: createWebHistory(),
	routes,
});

// Navigation guard - similar to React Router's protected routes
router.beforeEach((to, from, next) => {
	const isAuthenticated = localStorage.getItem("isAuthenticated") === "true";

	if (to.meta.requiresAuth && !isAuthenticated) {
		next("/login");
	} else if (to.name === "Login" && isAuthenticated) {
		next("/");
	} else {
		next();
	}
});

export default router;
