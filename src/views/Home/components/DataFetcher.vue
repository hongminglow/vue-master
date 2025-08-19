<template>
	<div class="p-6 max-w-2xl mx-auto">
		<h2 class="text-2xl font-bold mb-4">TanStack Query Data Fetcher</h2>

		<!-- Manual State Management Example -->
		<div class="mb-8 p-4 border rounded-lg">
			<h3 class="text-lg font-semibold mb-3">Manual State Management</h3>
			<div class="flex gap-2 mb-4">
				<button
					@click="fetchManualData"
					:disabled="isManualLoading"
					class="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:opacity-50"
				>
					{{ isManualLoading ? "Loading..." : "Fetch Users" }}
				</button>
				<button @click="clearManualData" class="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600">
					Clear Data
				</button>
			</div>

			<!-- Loading State -->
			<div v-if="isManualLoading" class="text-blue-600">Loading users manually...</div>

			<!-- Error State -->
			<div v-else-if="manualError" class="text-red-600">Error: {{ manualError }}</div>

			<!-- Success State -->
			<div v-else-if="manualData" class="space-y-2">
				<p class="text-green-600">Loaded {{ manualData.length }} users manually!</p>
				<div class="grid gap-2 max-h-40 overflow-y-auto">
					<div v-for="user in manualData.slice(0, 5)" :key="user.id" class="p-2 bg-gray-100 rounded text-sm">
						<strong>{{ user.name }}</strong> - {{ user.email }}
					</div>
				</div>
			</div>
		</div>

		<!-- TanStack Query Example -->
		<div class="mb-8 p-4 border rounded-lg">
			<h3 class="text-lg font-semibold mb-3">TanStack Query Management</h3>
			<div class="flex gap-2 mb-4">
				<button
					@click="handleRefetch"
					:disabled="isFetching"
					class="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 disabled:opacity-50"
				>
					{{ isFetching ? "Refetching..." : "Refetch Users" }}
				</button>
				<button @click="handleInvalidate" class="px-4 py-2 bg-orange-500 text-white rounded hover:bg-orange-600">
					Invalidate Cache
				</button>
			</div>

			<!-- Loading State (first time) -->
			<div v-if="isLoading" class="text-blue-600">Loading users with TanStack Query...</div>

			<!-- Error State -->
			<div v-else-if="error" class="text-red-600">Query Error: {{ error.message }}</div>

			<!-- Success State -->
			<div v-else-if="data" class="space-y-2">
				<div class="flex items-center gap-2">
					<p class="text-green-600">Loaded {{ data.length }} users with TanStack Query!</p>
					<span v-if="isFetching" class="text-blue-500 text-sm">(Background refetching...)</span>
					<span v-if="isStale" class="text-yellow-500 text-sm">(Stale data)</span>
				</div>
				<div class="grid gap-2 max-h-40 overflow-y-auto">
					<div v-for="user in data.slice(0, 5)" :key="user.id" class="p-2 bg-gray-100 rounded text-sm">
						<strong>{{ user.name }}</strong> - {{ user.email }}
						<br />
						<span class="text-gray-500">Company: {{ user.company.name }}</span>
					</div>
				</div>
			</div>
		</div>

		<!-- Posts Example with Dependent Query -->
		<div class="p-4 border rounded-lg">
			<h3 class="text-lg font-semibold mb-3">Dependent Query - Posts for User 1</h3>

			<!-- Posts Loading State -->
			<div v-if="postsIsLoading" class="text-blue-600">Loading posts...</div>

			<!-- Posts Error State -->
			<div v-else-if="postsError" class="text-red-600">Posts Error: {{ postsError.message }}</div>

			<!-- Posts Success State -->
			<div v-else-if="postsData" class="space-y-2">
				<p class="text-green-600">Loaded {{ postsData.length }} posts!</p>
				<div class="space-y-2 max-h-32 overflow-y-auto">
					<div v-for="post in postsData.slice(0, 3)" :key="post.id" class="p-2 bg-blue-50 rounded text-sm">
						<strong>{{ post.title }}</strong>
						<p class="text-gray-600 text-xs">{{ post.body.slice(0, 100) }}...</p>
					</div>
				</div>
			</div>
		</div>

		<!-- Query State Info -->
		<div class="mt-6 p-4 bg-gray-50 rounded text-sm">
			<h4 class="font-semibold mb-2">Query State Info:</h4>
			<ul class="space-y-1 text-xs">
				<li>
					<strong>Users Query:</strong> Loading: {{ isLoading }}, Fetching: {{ isFetching }}, Stale: {{ isStale }},
					Error: {{ !!error }}
				</li>
				<li>
					<strong>Posts Query:</strong> Loading: {{ postsIsLoading }}, Fetching: {{ postsIsFetching }}, Error:
					{{ !!postsError }}
				</li>
			</ul>
		</div>
	</div>
</template>

<script setup lang="ts">
import { computed, ref, watch, watchEffect } from "vue";
import { useQuery, useQueryClient } from "@tanstack/vue-query";

// Types for our API data
interface User {
	id: number;
	name: string;
	email: string;
	company: {
		name: string;
	};
}

interface Post {
	id: number;
	userId: number;
	title: string;
	body: string;
}

// Manual state management (traditional approach)
const isManualLoading = ref(false);
const manualData = ref<User[] | null>(null);
const manualError = ref<string | null>(null);

// Get query client for manual operations
const queryClient = useQueryClient();

// API functions
const fetchUsers = async (): Promise<User[]> => {
	const response = await fetch("https://jsonplaceholder.typicode.com/users");
	if (!response.ok) {
		throw new Error("Failed to fetch users");
	}
	return response.json();
};

const fetchPosts = async (userId: number): Promise<Post[]> => {
	const response = await fetch(`https://jsonplaceholder.typicode.com/posts?userId=${userId}`);
	if (!response.ok) {
		throw new Error("Failed to fetch posts");
	}
	return response.json();
};

// Manual data fetching function
const fetchManualData = async () => {
	isManualLoading.value = true;
	manualError.value = null;

	try {
		const users = await fetchUsers();
		manualData.value = users;
	} catch (err) {
		manualError.value = err instanceof Error ? err.message : "Unknown error";
	} finally {
		isManualLoading.value = false;
	}
};

const clearManualData = () => {
	manualData.value = null;
	manualError.value = null;
};

// Click handlers for TanStack Query buttons
const handleRefetch = () => {
	refetch();
};

const handleInvalidate = () => {
	queryClient.invalidateQueries({ queryKey: ["users"] });
};

// TanStack Query for users (automatic caching, background refetching)
const { data, isLoading, isFetching, isStale, error, refetch } = useQuery({
	queryKey: ["users"],
	queryFn: fetchUsers,
	staleTime: 5 * 60 * 1000, // 5 minutes
	gcTime: 10 * 60 * 1000, // 10 minutes (previously cacheTime)
	refetchOnWindowFocus: true,
	refetchOnMount: true,
	retry: 3,
	retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
});

// Dependent query - posts for user 1 (only runs when users data exists)
const {
	data: postsData,
	isLoading: postsIsLoading,
	isFetching: postsIsFetching,
	error: postsError,
} = useQuery({
	queryKey: ["posts", 1],
	queryFn: () => fetchPosts(1),
	enabled: computed(() => !!data.value && data.value.length > 0),
	staleTime: 2 * 60 * 1000, // 2 minutes
});
</script>
