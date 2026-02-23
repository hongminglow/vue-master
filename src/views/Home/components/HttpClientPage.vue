<template>
  <div
    class="animate-in fade-in slide-in-from-bottom-4 duration-500 max-w-5xl mx-auto"
  >
    <ComparisonCard
      title="HTTP Client (Axios vs VueUse / Fetch)"
      description="React mostly relies on standard Axios or Fetch inside useEffect. Vue has excellent composables from VueUse like useFetch."
      :reactCode="reactSnippet"
      :vueCode="vueSnippet"
    >
      <template #demo>
        <div
          class="p-6 bg-slate-800 border-2 border-slate-700/50 rounded-xl space-y-6 shadow-lg relative"
        >
          <p class="text-sm font-medium text-slate-300">
            Instead of raw Axios, we can use
            <span
              class="text-green-400 font-mono bg-green-500/10 px-1.5 py-0.5 rounded border border-green-500/20"
              >useFetch</span
            >
            from @vueuse/core, which handles loading, errors, and automatic
            abort controllers internally!
          </p>

          <button
            @click="() => execute()"
            class="px-5 py-2.5 rounded-lg shadow bg-slate-900 border border-slate-700 hover:border-green-500 hover:text-green-400 font-bold text-white transition-colors cursor-pointer"
          >
            Fetch 🦮 Image
          </button>

          <div
            class="mt-4 min-h-[200px] flex items-center justify-center border-2 border-dashed border-slate-600 rounded-xl bg-slate-900/50 relative overflow-hidden"
          >
            <div
              v-if="isFetching"
              class="text-green-400 font-mono font-bold animate-pulse flex items-center gap-2"
            >
              <span>⚙️</span> fetching...
            </div>
            <img
              v-else-if="data"
              :src="JSON.parse(data as string).message"
              class="w-full h-full object-cover max-h-[300px] rounded-lg shadow-md absolute inset-0 opacity-80"
            />
            <div v-else class="text-slate-500 font-mono text-sm">
              Image will appear here
            </div>
          </div>
        </div>
      </template>
      <template #takeaway>
        <ul class="space-y-4">
          <li>
            <strong class="text-green-400 block mb-1"
              >🌐 Standardization of HTTP</strong
            >
            Both ecosystems fully support standardized Javascript clients like
            `Axios` and raw `fetch`. There is nothing uniquely React or Vue
            about standard REST requests.
          </li>
          <li>
            <strong class="text-green-400 block mb-1"
              >🗑️ The AbortController Struggle</strong
            >
            React developers often write 5-6 lines of severe boilerplate in
            `useEffect` specifically to spin up an `AbortController` and
            `.abort()` the request on component unmount, preventing memory leaks
            if the user navigated away while an API call was pending.
          </li>
          <li>
            <strong class="text-green-400 block mb-1"
              >🛠️ Composables to the Rescue</strong
            >
            The Vue community largely standardizes with `@vueuse/core`
            (`useFetch`) or Nuxt's `ofetch`. Because composables hook directly
            into the `onUnmounted` lifecycles automatically, these functions
            abort their internal fetch requests when the component leaves the
            DOM seamlessly and entirely invisibly to the developer.
          </li>
        </ul>
      </template>
    </ComparisonCard>
  </div>
</template>

<script setup lang="ts">
import ComparisonCard from "@/components/ComparisonCard.vue";
import { useFetch } from "@vueuse/core";

// Immediate: false lets us trigger it manually!
const { isFetching, data, execute } = useFetch(
  "https://dog.ceo/api/breeds/image/random",
  {
    immediate: false,
  },
);

const reactSnippet = `import { useState, useEffect } from 'react';
import axios from 'axios';

function ImageFetcher() {
  const [data, setData] = useState(null);

  useEffect(() => {
    const controller = new AbortController();

    axios.get('https://dog.ceo/api/breeds/image/random', {
      signal: controller.signal
    }).then(res => setData(res.data));

    // React cleanup boilerplate required to prevent
    // setting state on unmounted components!
    return () => controller.abort();
  }, []);

  return <img src={data?.message} />;
}`;

const vueSnippet = `<script setup>
// Best practice: Use VueUse's useFetch
import { useFetch } from '@vueuse/core';

// This automatically handles AbortControllers on unmount,
// reactive changing urls, and loading states!
const { data, isFetching } = useFetch('https://dog.ceo/api/breeds/image/random').json();

<\/script>

<template>
  <p v-if="isFetching">Loading...</p>
  <img v-else-if="data" :src="data.message" />
</template>`;
</script>
