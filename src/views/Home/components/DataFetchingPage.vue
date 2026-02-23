<template>
  <div
    class="animate-in fade-in slide-in-from-bottom-4 duration-500 max-w-5xl mx-auto"
  >
    <ComparisonCard
      title="Data Fetching (TanStack Query)"
      description="Comparing React Query (@tanstack/react-query) to Vue Query (@tanstack/vue-query)."
      :reactCode="reactSnippet"
      :vueCode="vueSnippet"
    >
      <template #demo>
        <div
          class="flex flex-col gap-6 p-6 bg-slate-800 border-2 border-slate-700/50 rounded-xl shadow-lg relative"
        >
          <button
            @click="triggerFetch = !triggerFetch"
            class="max-w-fit px-5 py-2.5 rounded-lg shadow bg-slate-900 border border-slate-700 hover:border-green-500 hover:text-green-400 font-bold text-slate-300 transition-colors cursor-pointer"
          >
            Fetch Mock Users via Vue Query
          </button>

          <div
            v-if="triggerFetch"
            class="p-5 border border-slate-700 rounded-lg bg-[#0F172A] min-h-[120px] shadow-inner"
          >
            <p
              v-if="isLoading"
              class="text-green-500 font-mono font-bold animate-pulse flex items-center gap-2"
            >
              <span>🔄</span> Loading network data...
            </p>
            <p v-else-if="isError" class="text-red-500 font-mono font-bold">
              Error fetching data 🛑
            </p>
            <ul v-else-if="data" class="space-y-3">
              <li
                v-for="user in data"
                :key="user.id"
                class="px-4 py-3 bg-slate-800 shadow-sm border border-slate-700 rounded transition hover:-translate-y-0.5"
              >
                <div class="flex flex-col">
                  <span class="font-bold text-slate-200">{{ user.name }}</span>
                  <span class="text-sm text-slate-500 font-mono"
                    >@{{ user.username }}</span
                  >
                </div>
              </li>
            </ul>
          </div>
        </div>
      </template>

      <template #takeaway>
        <ul class="space-y-4">
          <li>
            <strong class="text-green-400 block mb-1"
              >🏗️ Same TanStack Core</strong
            >
            Both libraries originate from the exact same core:
            <b>TanStack Query</b>. They share the same caching mechanisms,
            stale-time logic, garbage collection, and query-key array syntax. If
            you know React Query, you formally know Vue Query.
          </li>
          <li>
            <strong class="text-green-400 block mb-1"
              >🔄 API Translation is 1:1</strong
            >
            React uses `useQuery`. Vue uses `useQuery` from
            `@tanstack/vue-query`. All the option parameters—like `queryFn`,
            `queryKey`, `enabled`, `staleTime`—are functionally perfectly
            identical.
          </li>
          <li>
            <strong class="text-green-400 block mb-1"
              >👀 Reactive Refs Magic</strong
            >
            The absolute biggest difference: React returns standard primitive
            properties (`data`, `isLoading`) that cause standard re-renders. Vue
            wraps these returns in reactive <b>Refs</b> (`Ref&lt;T&gt;`). When
            `data.value` arrives across the network, Vue's Proxy engine injects
            the signal directly into the template (because it auto-unwraps
            `.value` inside `&lt;template&gt;`).
          </li>
          <li>
            <strong class="text-green-400 block mb-1"
              >♻️ No Dependency Arrays anywhere!</strong
            >
            When a query parameter changes in React, you usually must rebuild
            dependency logic. In Vue Query, you can pass a reactive `Computed`
            or `Ref` into `queryKey` and it will inherently re-fetch without
            asking!
          </li>
        </ul>
      </template>
    </ComparisonCard>
  </div>
</template>

<script setup lang="ts">
import ComparisonCard from "@/components/ComparisonCard.vue";
import { ref } from "vue";
import { useQuery } from "@tanstack/vue-query";

const triggerFetch = ref(false);

const { isLoading, isError, data } = useQuery({
  queryKey: ["mockUsers"],
  queryFn: async () => {
    // Artificial delay to demonstrate loading state
    await new Promise((res) => setTimeout(res, 1000));
    const response = await fetch(
      "https://jsonplaceholder.typicode.com/users?_limit=3",
    );
    if (!response.ok) throw new Error("Network error");
    return response.json();
  },
  // Ensure we only fetch if the user triggered it for this demo
  enabled: triggerFetch,
});

const reactSnippet = `import { useQuery } from '@tanstack/react-query';

function UsersList() {
  const { isLoading, isError, data } = useQuery({
    queryKey: ['users'],
    queryFn: () => fetch('/api/users').then(res => res.json())
  });

  if (isLoading) return <p>Loading...</p>
  if (isError) return <p>Error occurred</p>

  return (
    <ul>
      {data.map(user => <li key={user.id}>{user.name}</li>)}
    </ul>
  )
}`;

const vueSnippet = `<script setup>
import { useQuery } from '@tanstack/vue-query';

// They export the exact same API (useQuery, useMutation, etc.)
// but the returned properties are Vue Refs
const { isLoading, isError, data } = useQuery({
  queryKey: ['users'],
  queryFn: () => fetch('/api/users').then(res => res.json())
});
<\/script>

<template>
  <p v-if="isLoading">Loading...</p>
  <p v-else-if="isError">Error occurred</p>
  <ul v-else>
    <!-- data auto-unwraps its .value within the template! -->
    <li v-for="user in data" :key="user.id">{{ user.name }}</li>
  </ul>
</template>`;
</script>
