<template>
	<div class="min-h-screen bg-slate-900 flex">
		<!-- Sidebar -->
		<aside class="w-64 bg-[#0F172A] border-r border-slate-800 flex-col hidden md:flex h-screen sticky top-0">
			<div class="h-16 flex items-center px-6 border-b border-slate-800">
				<h1 class="text-xl font-bold text-white tracking-tight flex items-center gap-2">
					<span class="text-green-500 text-2xl">⚡</span>
					Vue <span class="font-light text-slate-400">Master</span>
				</h1>
			</div>

			<div class="flex-1 overflow-y-auto py-4 px-3 space-y-3 scrollbar-hide">
				<router-link
					v-for="route in sidebarRoutes"
					:key="route.path"
					:to="route.path"
					class="block px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200"
					:class="
						$route.path === route.path
							? 'bg-green-500/10 text-green-400'
							: 'text-slate-400 hover:bg-slate-800 hover:text-white'
					"
				>
					<span class="mr-2">{{ route.icon }}</span> {{ route.name }}
				</router-link>
			</div>

			<div class="p-4 border-t border-slate-800">
				<button
					@click="handleLogout"
					class="w-full flex items-center justify-center px-4 py-2 text-sm font-medium text-slate-300 bg-slate-800 rounded-lg hover:bg-slate-700 hover:text-white transition-colors cursor-pointer"
				>
					Logout
				</button>
			</div>
		</aside>

		<!-- Main Content -->
		<div class="flex-1 flex flex-col min-w-0">
			<!-- Top Navigation (Mobile friendly & User info) -->
			<header
				class="h-16 bg-[#0F172A] border-b border-slate-800 flex items-center justify-between px-6 sticky top-0 z-10"
			>
				<div class="md:hidden font-bold text-white flex items-center gap-2">
					<span class="text-green-500 text-2xl">⚡</span> Vue Master
				</div>
				<div class="hidden md:block"></div>
				<div class="flex items-center space-x-4 text-sm font-medium text-slate-400">
					<span
						>Hello, <span class="text-white">{{ user?.name || "Developer" }}</span></span
					>
				</div>
			</header>

			<!-- Nested Route Outlet -->
			<main class="flex-1 p-6 lg:p-10 overflow-auto relative">
				<!-- Fancy Decor -->
				<div
					class="fixed right-0 top-0 w-[50vw] h-[50vw] rounded-full bg-slate-800/20 blur-[100px] pointer-events-none -z-10"
				></div>

				<router-view v-slot="{ Component }">
					<transition name="fade" mode="out-in">
						<component :is="Component" />
					</transition>
				</router-view>
			</main>
		</div>
	</div>
</template>

<script setup lang="ts">
import { computed, onMounted } from "vue";
import { useRouter } from "vue-router";
import { useAuthStore } from "@/stores/auth";

const router = useRouter();
const authStore = useAuthStore();

const user = computed(() => authStore.user);

const handleLogout = () => {
	authStore.logout();
	router.push("/login");
};

// Define sidebar routes for learning modules
const sidebarRoutes = [
	{ path: "/home/intro", name: "Introduction", icon: "🚀" },
	{ path: "/home/state", name: "State (useState)", icon: "📦" },
	{ path: "/home/global-state", name: "Global State (Zustand)", icon: "🌍" },
	{ path: "/home/effect", name: "Effects (useEffect)", icon: "🔄" },
	{ path: "/home/performance", name: "Performance (useMemo)", icon: "⚡" },
	{ path: "/home/form-validation", name: "Form (React Hook Form)", icon: "📝" },
	{ path: "/home/data-fetching", name: "Query (TanStack)", icon: "📡" },
	{ path: "/home/http-client", name: "HTTP Client (Axios)", icon: "🌐" },
	{ path: "/home/list-mapping", name: "List Mapping (.map)", icon: "📋" },
	{ path: "/home/condition", name: "Conditionals (v-if)", icon: "🛣️" },
	{ path: "/home/event-handler", name: "Event Handler (onClick)", icon: "🎯" },
	{ path: "/home/context", name: "Provide/Inject (Context)", icon: "💉" },
	{ path: "/home/advanced", name: "Advanced (KeepAlive, etc.)", icon: "🔬" },
];

onMounted(() => {
	authStore.initializeAuth();
});
</script>

<style scoped>
.scrollbar-hide::-webkit-scrollbar {
	display: none;
}
.scrollbar-hide {
	-ms-overflow-style: none;
	scrollbar-width: none;
}
</style>
