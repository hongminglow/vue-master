<template>
  <div class="space-y-6">
    <div class="bg-slate-800 rounded-xl shadow-lg border-2 border-slate-700/50 overflow-hidden">
      <div class="px-6 py-5 border-b border-slate-700/50 bg-[#0F172A]/50 backdrop-blur-sm">
        <h2 class="text-2xl font-bold text-white tracking-wide">{{ title }}</h2>
        <p class="mt-2 text-base text-slate-400 leading-relaxed">{{ description }}</p>
      </div>

      <div class="p-6 border-b border-slate-700/50 bg-[#0F172A]">
        <h3
          class="text-lg font-bold text-slate-200 mb-4 flex items-center gap-2"
        >
          <span class="text-green-500">▶</span> Live Demo Space
        </h3>
        <div
          class="p-6 bg-slate-900 rounded-lg border border-slate-700 shadow-inner"
        >
          <slot name="demo"></slot>
        </div>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-2 gap-px bg-slate-700/40">
        <!-- React Column -->
        <div class="bg-slate-800 flex flex-col">
          <div
            class="px-6 py-4 border-b border-slate-700/50 bg-[#0F172A]/80 flex items-center justify-between"
          >
            <span class="font-bold text-blue-400 flex items-center gap-2 tracking-wide">
              <span class="text-xl">⚛️</span> React
            </span>
            <span class="text-xs font-mono text-slate-500 bg-slate-900 px-2 py-1 rounded">JSX / TSX</span>
          </div>
          <div class="p-5 bg-[#0A0F1A] flex-1 overflow-x-auto">
            <pre
              class="text-sm font-mono text-slate-300 leading-relaxed"
            ><code>{{ reactCode }}</code></pre>
          </div>
        </div>

        <!-- Vue Column -->
        <div class="bg-slate-800 flex flex-col">
          <div
            class="px-6 py-4 border-b border-slate-700/50 bg-[#0F172A]/80 flex items-center justify-between"
          >
            <span
              class="font-bold text-green-500 flex items-center gap-2 tracking-wide"
            >
              <span class="text-xl">💚</span> Vue 3
            </span>
            <span class="text-xs font-mono text-slate-500 bg-slate-900 px-2 py-1 rounded"
              >Setup Script / Template</span
            >
          </div>
          <div class="p-5 bg-[#0A0F1A] flex-1 overflow-x-auto">
            <pre
              class="text-sm font-mono text-green-100/90 leading-relaxed"
            ><code>{{ vueCode }}</code></pre>
          </div>
        </div>
      </div>

      <div
      <div
        v-if="$slots.takeaway"
        class="p-6 bg-[#0F172A] border-t border-slate-700/50"
      >
        <h3
          class="text-sm font-bold text-green-500 uppercase tracking-widest mb-4 flex items-center gap-2"
        >
          <span class="text-xl text-green-400">💡</span> Core Concepts & Usage Guide
        </h3>
        <div class="text-base text-slate-300 space-y-3 leading-relaxed">
          <slot name="takeaway"></slot>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  title: string;
  description: string;
  reactCode: string;
  vueCode: string;
}>();
</script>
