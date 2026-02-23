<template>
  <div
    class="animate-in fade-in slide-in-from-bottom-4 duration-500 max-w-5xl mx-auto"
  >
    <ComparisonCard
      title="Performance & Memoization"
      description="Comparing React's useMemo/useCallback to Vue's computed."
      :reactCode="reactSnippet"
      :vueCode="vueSnippet"
    >
      <template #demo>
        <div
          class="flex flex-col gap-6 p-6 bg-slate-800 border-2 border-slate-700/50 rounded-xl shadow-lg relative overflow-hidden"
        >
          <div class="flex flex-col gap-2">
            <p class="text-slate-300 font-medium">
              Expensive calculation input:
            </p>
            <div class="flex items-center gap-4">
              <input
                v-model.number="multiplier"
                type="number"
                class="px-3 py-2 bg-slate-900 border border-slate-700 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent text-white w-32 font-mono"
              />
              <p class="text-slate-400">
                Multiplier is
                <span class="text-green-400 font-bold">{{ multiplier }}</span>
              </p>
            </div>
          </div>

          <button
            @click="unrelatedCount++"
            class="max-w-fit px-5 py-2.5 rounded-lg shadow bg-slate-900 border border-slate-700 hover:border-green-500 hover:text-green-400 font-bold text-slate-300 transition-colors cursor-pointer"
          >
            Unrelated Update (Count: {{ unrelatedCount }})
          </button>

          <div
            class="p-4 bg-[#0F172A] border-l-4 border-green-500 text-green-400 font-mono font-medium rounded-r shadow-inner"
          >
            Computed Value: {{ expensiveValue }}
            <br />
            <span class="text-xs text-slate-500"
              >(Check console to see when it recalculates)</span
            >
          </div>
        </div>
      </template>
      <template #takeaway>
        <ul class="space-y-4">
          <li>
            <strong class="text-green-400 block mb-1"
              >🧠 Vue Functions Only Run Once</strong
            >
            React component bodies re-execute top-to-bottom on every state
            change. Thus, <code>useMemo</code> caches values and
            <code>useCallback</code> caches function references. Vue’s
            <code>&lt;script setup&gt;</code> only runs <em>once</em> during
            component creation.
          </li>
          <li>
            <strong class="text-green-400 block mb-1"
              >🚫 No Need for useCallback</strong
            >
            Functions inside a Vue script do not need <code>useCallback</code>.
            Because the script block runs only once, the function references
            never change across component updates. Passing them as props will
            naturally never trigger unwanted child re-renders.
          </li>
          <li>
            <strong class="text-green-400 block mb-1"
              >✨ Magic Dependency Tracking with Computed</strong
            >
            <code>computed()</code> only re-evaluates when its reactive
            dependencies change. You do not need to pass it an array of
            dependencies like `[multiplier]`. Vue's reactive proxy engine
            handles dependency tracking transparently; it automatically knows
            exactly what signals are read inside the getter!
          </li>
          <li>
            <strong class="text-green-400 block mb-1"
              >📦 Caching is Native</strong
            >
            The result of `computed` is permanently cached until its specific
            dependencies change, making it extremely efficient for huge dataset
            filters, derived state transformations, and UI aggregations.
          </li>
        </ul>
      </template>
    </ComparisonCard>
  </div>
</template>

<script setup lang="ts">
import ComparisonCard from "@/components/ComparisonCard.vue";
import { ref, computed } from "vue";

const multiplier = ref(2);
const unrelatedCount = ref(0);

const expensiveValue = computed(() => {
  console.log("Expensive computed recalculating!", multiplier.value);
  return multiplier.value * 999999;
});

const reactSnippet = `import { useState, useMemo, useCallback } from 'react';

function MemoizationExample() {
  const [multiplier, setMultiplier] = useState(2);
  const [unrelatedCount, setUnrelatedCount] = useState(0);

  // You must explicitly tell React what dependencies this relies on
  const expensiveValue = useMemo(() => {
    return multiplier * 999999;
  }, [multiplier]);

  // You must wrap functions to preserve reference parity
  const doSomething = useCallback(() => {
    console.log("Fixed reference!", multiplier);
  }, [multiplier]);

  return (
    <button onClick={doSomething}>Action</button>
  );
}`;

const vueSnippet = `<script setup>
import { ref, computed } from 'vue';

const multiplier = ref(2);
const unrelatedCount = ref(0);

// Just wrap the logic in computed. No dependency arrays!
// Tracks multiplier automatically.
const expensiveValue = computed(() => {
  return multiplier.value * 999999;
});

// A normal function is completely fine! Script runs once,
// so the function reference nevers changes.
const doSomething = () => {
  console.log("Fixed reference automatically!", multiplier.value);
};
<\/script>`;
</script>
