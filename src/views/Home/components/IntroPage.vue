<template>
  <div
    class="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500 max-w-5xl mx-auto"
  >
    <div class="prose max-w-none">
      <h1 class="text-4xl font-extrabold text-white tracking-tight">
        Welcome to Vue Master 🚀
      </h1>
      <p class="text-slate-400 text-lg mt-3">
        A structured, side-by-side comparison of core React patterns and their
        equivalent Vue 3 Composition API idioms. Click any module below to
        start.
      </p>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <router-link
        v-for="feature in features"
        :key="feature.title"
        :to="feature.link"
        class="group bg-slate-800 border-2 border-slate-700/50 p-6 rounded-xl shadow-md hover:shadow-xl hover:border-green-500 hover:-translate-y-1 transition-all duration-200 cursor-pointer block"
      >
        <div
          class="text-4xl mb-4 group-hover:scale-110 transition-transform origin-left"
        >
          {{ feature.icon }}
        </div>
        <h3 class="font-bold text-white mb-2 text-xl">{{ feature.title }}</h3>
        <p
          class="text-sm text-slate-400 font-mono bg-slate-900/50 inline-block px-2 py-1 rounded"
        >
          {{ feature.react }} ➡️
        </p>
        <p
          class="text-sm text-green-400 font-mono font-bold mt-2 bg-green-500/10 inline-block px-2 py-1 rounded"
        >
          {{ feature.vue }}
        </p>
      </router-link>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";

const features = ref([
  {
    icon: "📦",
    title: "Local State",
    react: "useState",
    vue: "ref / reactive",
    link: "/home/state",
  },
  {
    icon: "🔄",
    title: "Side Effects",
    react: "useEffect",
    vue: "onMounted / watch",
    link: "/home/effect",
  },
  {
    icon: "⚡",
    title: "Memoization",
    react: "useMemo",
    vue: "computed",
    link: "/home/performance",
  },
  {
    icon: "📝",
    title: "Form Handling",
    react: "React Hook Form",
    vue: "@tanstack/vue-form",
    link: "/home/form-validation",
  },
  {
    icon: "🌍",
    title: "Global State",
    react: "Zustand",
    vue: "Pinia",
    link: "/home/global-state",
  },
  {
    icon: "🎯",
    title: "Events",
    react: "onClick",
    vue: "@click",
    link: "/home/event-handler",
  },
]);
</script>
