<script setup lang="ts">
import { computed } from "vue";
import { useQuery, useQueryClient } from "@tanstack/vue-query";
import { fetchPosts } from "@/services/posts";
import { fetchUsers } from "@/services/user";

// Get query client for manual operations
const queryClient = useQueryClient();

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
  retryDelay: (attemptIndex: number) =>
    Math.min(1000 * 2 ** attemptIndex, 30000),
});

// Dependent query - posts for user 1 (only runs when users data exists)
const {
  data: postsData,
  isLoading: postsIsLoading,
  error: postsError,
} = useQuery({
  queryKey: ["posts", 1],
  queryFn: () => fetchPosts(1),
  enabled: computed(() => !!data.value && data.value.length > 0),
  staleTime: 2 * 60 * 1000, // 2 minutes
});
</script>

<template>
  <div class="p-6 max-w-2xl mx-auto">
    <h2 class="text-2xl font-bold mb-4">TanStack Query Data Fetcher</h2>

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
        <button
          @click="handleInvalidate"
          class="px-4 py-2 bg-orange-500 text-white rounded hover:bg-orange-600"
        >
          Invalidate Cache
        </button>
      </div>

      <!-- Loading State (first time) -->
      <div v-if="isLoading" class="text-blue-600">
        Loading users with TanStack Query...
      </div>

      <!-- Error State -->
      <div v-else-if="error" class="text-red-600">
        Query Error: {{ error.message }}
      </div>

      <!-- Success State -->
      <div v-else-if="data" class="space-y-2">
        <div class="flex items-center gap-2">
          <p class="text-green-600">
            Loaded {{ data.length }} users with TanStack Query!
          </p>
          <span v-if="isFetching" class="text-blue-500 text-sm"
            >(Background refetching...)</span
          >
          <span v-if="isStale" class="text-yellow-500 text-sm"
            >(Stale data)</span
          >
        </div>
        <div class="grid gap-2 max-h-40 overflow-y-auto">
          <div
            v-for="user in data.slice(0, 5)"
            :key="user.id"
            class="p-2 bg-gray-100 rounded text-sm"
          >
            <strong>{{ user.name }}</strong> - {{ user.email }}
            <br />
            <span class="text-gray-500">Company: {{ user.company.name }}</span>
          </div>
        </div>
      </div>
    </div>

    <!-- Posts Example with Dependent Query -->
    <div class="p-4 border rounded-lg">
      <h3 class="text-lg font-semibold mb-3">
        Dependent Query - Posts for User 1
      </h3>

      <!-- Posts Loading State -->
      <div v-if="postsIsLoading" class="text-blue-600">Loading posts...</div>

      <!-- Posts Error State -->
      <div v-else-if="postsError" class="text-red-600">
        Posts Error: {{ postsError.message }}
      </div>

      <!-- Posts Success State -->
      <div v-else-if="postsData" class="space-y-2">
        <p class="text-green-600">Loaded {{ postsData.length }} posts!</p>
        <div class="space-y-2 max-h-32 overflow-y-auto">
          <div
            v-for="post in postsData.slice(0, 3)"
            :key="post.id"
            class="p-2 bg-blue-50 rounded text-sm"
          >
            <strong>{{ post.title }}</strong>
            <p class="text-gray-600 text-xs">
              {{ post.body.slice(0, 100) }}...
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
