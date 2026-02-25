import { createRouter, createWebHistory } from "vue-router";
import type { RouteRecordRaw } from "vue-router";
import Login from "@/views/Login/Login.vue";
import Home from "@/views/Home/Home.vue";

// Define routes - similar to React Router routes but different syntax
const routes: RouteRecordRaw[] = [
	{
		path: "/",
		redirect: "/home/intro", // Redirect to default nested route
	},
	{
		path: "/home",
		name: "Home",
		component: Home,
		meta: { requiresAuth: true },
		children: [
			{
				path: "intro",
				name: "Intro",
				component: () => import("@/views/Home/components/IntroPage.vue"),
			},
			{
				path: "state",
				name: "State",
				component: () => import("@/views/Home/components/StatePage.vue"),
			},
			{
				path: "global-state",
				name: "GlobalState",
				component: () => import("@/views/Home/components/GlobalStatePage.vue"),
			},
			{
				path: "effect",
				name: "Effect",
				component: () => import("@/views/Home/components/EffectPage.vue"),
			},
			{
				path: "performance",
				name: "Performance",
				component: () => import("@/views/Home/components/PerformancePage.vue"),
			},
			{
				path: "form-validation",
				name: "FormValidation",
				component: () => import("@/views/Home/components/FormValidationPage.vue"),
			},
			{
				path: "data-fetching",
				name: "DataFetching",
				component: () => import("@/views/Home/components/DataFetchingPage.vue"),
			},
			{
				path: "http-client",
				name: "HttpClient",
				component: () => import("@/views/Home/components/HttpClientPage.vue"),
			},
			{
				path: "list-mapping",
				name: "ListMapping",
				component: () => import("@/views/Home/components/ListMappingPage.vue"),
			},
			{
				path: "condition",
				name: "ConditionRendering",
				component: () => import("@/views/Home/components/ConditionRenderingPage.vue"),
			},
			{
				path: "event-handler",
				name: "EventHandler",
				component: () => import("@/views/Home/components/EventHandlerPage.vue"),
			},
			{
				path: "advanced",
				name: "AdvancedFeatures",
				component: () => import("@/views/Home/components/AdvancedPage.vue"),
			},
			{
				path: "context",
				name: "ContextAPI",
				component: () => import("@/views/Home/components/ContextPage.vue"),
			},
			{
				path: "",
				redirect: "intro",
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
	scrollBehavior(_to, _from, _savedPosition) {
		if (_savedPosition) {
			return _savedPosition;
		} else {
			return { top: 0 };
		}
	},
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
