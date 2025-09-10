import { createRouter, createWebHistory } from "vue-router";
import type { RouteRecordRaw } from "vue-router";
import Login from "@/views/Login/Login.vue";
import Home from "@/views/Home/Home.vue";

// Define routes - similar to React Router routes but different syntax
const routes: RouteRecordRaw[] = [
	{
		path: "/",
		redirect: "/home/experiment", // Redirect to default nested route
	},
	{
		path: "/home",
		name: "Home",
		component: Home,
		meta: { requiresAuth: true },
		children: [
			{
				path: "experiment", // /home/experiment
				name: "ExperimentLab",
				component: () => import("@/views/Home/components/ExperimentLab.vue"),
			},
			{
				path: "innerA", // /home/innerA
				name: "InnerA",
				component: () => import("@/views/Home/components/InnerA.vue"),
			},
			{
				path: "innerB", // /home/innerB
				name: "InnerB",
				component: () => import("@/views/Home/components/InnerB.vue"),
			},
			{
				path: "", // /home (empty child path)
				redirect: "experiment", // Redirect /home to /home/experiment
			},
		],
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
router.beforeEach((to, _from, next) => {
	const isAuthenticated = localStorage.getItem("isAuthenticated") === "true";

	if (to.meta.requiresAuth && !isAuthenticated) {
		next("/login");
	} else if (to.name === "Login" && isAuthenticated) {
		next("/home");
	} else {
		next();
	}
});

export default router;
