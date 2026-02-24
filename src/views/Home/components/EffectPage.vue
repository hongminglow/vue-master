<template>
	<div class="animate-in fade-in slide-in-from-bottom-4 duration-500 max-w-5xl mx-auto">
		<ComparisonCard
			title="Side Effects & Lifecycle"
			description="Comparing React's useEffect to Vue's watch, watchEffect, and onMounted."
			:reactCode="reactSnippet"
			:vueCode="vueSnippet"
		>
			<template #demo>
				<div class="flex flex-col gap-5 p-6 bg-slate-800 border-2 border-slate-700/50 rounded-xl shadow-lg relative">
					<div
						class="p-4 bg-slate-900 border-l-4 border-yellow-500 rounded text-slate-300 text-sm font-medium shadow-inner flex items-center gap-2"
					>
						<span>💡</span> Open your browser console to see what happens when you type!
					</div>
					<input
						v-model="searchTerm"
						class="w-full max-w-sm px-4 py-2.5 bg-slate-900 border border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent text-white placeholder-slate-500 font-mono transition-all shadow-inner"
						placeholder="Type to trigger a watch effect..."
					/>
					<div class="h-6">
						<p class="text-sm text-green-400 font-mono font-bold" v-if="searchTerm">Evaluating: "{{ searchTerm }}"</p>
					</div>
				</div>
			</template>
			<template #takeaway>
				<ul class="space-y-4">
					<li>
						<strong class="text-green-400 block mb-1">🛑 Stop Using useEffect for Everything!</strong>
						In React, `useEffect` is the hammer for every single side-effect nail: lifecycle mounting, data fetching,
						sync updates, and layout transitions. Because of this, it's very easy to create infinite loops or stale
						closures if the dependency array `[...]` isn't perfectly mapped out. Vue fundamentally redesigns this
						problem by breaking them apart.
					</li>
					<li>
						<strong class="text-green-400 block mb-1">🔌 Lifecycles (onMounted / onUnmounted)</strong>
						Instead of an empty array `useEffect(() => {}, [])`, Vue gives you specific syntax for DOM mounting. These
						functions *only* run when the component initializes or destroys. They do not re-trigger implicitly. This
						makes it impossible to accidentally rerun an expensive API call just because a component's internal state
						updated.
					</li>
					<li>
						<strong class="text-green-400 block mb-1">👀 Explicit Tracking (watch)</strong>
						When you *must* know exact changes, `watch(var, (newVal, oldVal) => {})` explicitly monitors a single `ref`
						or `reactive` object. It provides immediate access to the before-and-after states, which React's `useEffect`
						hides from you completely (you'd need to use a `useRef` to store the previous state).
					</li>
					<li>
						<strong class="text-green-400 block mb-1">✨ Automatic Magic Tracking (watchEffect)</strong>
						If you just want a block of code to re-run anytime *any* of its inner variables change, you use
						`watchEffect(() => {})`. Vue's reactive core tracks which `refs` you call inside the function block
						automatically. You never have to manually write a dependency array again. It tracks dependencies
						synchronously on its first run and listens to them.
					</li>
					<li>
						<strong class="text-green-400 block mb-1">🛑 Stopping a Watcher</strong>
						If you want to un-register a watcher programmatically (like how `ExperimentLab` did), you simply assign it
						to a variable: `const unwatch = watch(...)`. Calling `unwatch()` acts exactly like throwing away an event
						listener, clearing memory cleanly!
					</li>
					<li class="p-4 bg-slate-800/80 rounded-lg border-2 border-blue-500/30">
						<strong class="text-blue-400 block mb-2 text-lg">💡 Beginner's Golden Rule: watch vs watchEffect</strong>
						<div class="space-y-3 text-slate-300">
							<p>
								<strong>When to use <code>watch()</code>? (90% of the time)</strong>
								<br />Use this when you need <strong>explicit control</strong>. It is "lazy" by default (doesn't run on
								mount), allows you to see the <code>newVal</code> vs <code>oldVal</code>, and explicitly tells the
								reader exactly which variable is triggering the side effect. Perfect for API calls when a specific ID
								changes!
							</p>
							<p>
								<strong>When to use <code>watchEffect()</code>? (10% of the time)</strong>
								<br />Use this when you want an effect to run <strong>immediately on mount</strong> (like React's
								<code>useEffect</code>), and automatically track multiple variables inside it. It's great for keeping a
								complex piece of DOM synchronized or logging out a quick debug statement, but can be dangerous if it
								starts re-running too often due to hidden dependencies!
							</p>
						</div>
					</li>
				</ul>
			</template>
		</ComparisonCard>
	</div>
</template>

<script setup lang="ts">
import ComparisonCard from "@/components/ComparisonCard.vue";
import { ref, watch, onMounted, onUnmounted } from "vue";

const searchTerm = ref("");

watch(searchTerm, (newVal, oldVal) => {
	console.log(`[watch] Term changed from "${oldVal}" to "${newVal}"`);
});

onMounted(() => {
	console.log("[onMounted] Component was mounted to the DOM");
});

onUnmounted(() => {
	console.log("[onUnmounted] Component was removed from DOM");
});

const reactSnippet = `import { useState, useEffect } from 'react';

function Search() {
  const [searchTerm, setSearchTerm] = useState("");

  // Re-runs whenever tracking dependencies change
  useEffect(() => {
    console.log(\`Term changed to "\${searchTerm}"\`);
  }, [searchTerm]); // explicit dependencies

  // Mounting / cleanup equivalent
  useEffect(() => {
    console.log("Component mounted!");
    return () => console.log("Component unmounted!");
  }, []);

  return <input onChange={e => setSearchTerm(e.target.value)} />;
}`;

const vueSnippet = `<script setup>
import { ref, watch, watchEffect, onMounted, onUnmounted } from 'vue';

const searchTerm = ref("");

// 1. Reacting to specific data changes (can see old vs new)
watch(searchTerm, (newVal, oldVal) => {
  console.log(\`[watch] Term changed from "\${oldVal}" to "\${newVal}"\`);
});

// 2. watchEffect traces dependencies automatically!
watchEffect(() => {
  console.log(\`Term is \${searchTerm.value}\`); // Auto tracks searchTerm
});

// 3. Lifecycle equivalents
onMounted(() => console.log("Mounted"));
onUnmounted(() => console.log("Unmounted"));
<\/script>`;
</script>
