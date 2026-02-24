<template>
	<div class="animate-in fade-in slide-in-from-bottom-4 duration-500 max-w-5xl mx-auto">
		<ComparisonCard
			title="Context API (React Context vs Provide/Inject)"
			description="Comparing React Context with Vue's Provide/Inject for dependency injection."
			:reactCode="reactSnippet"
			:vueCode="vueSnippet"
		>
			<template #demo>
				<div class="p-6 bg-slate-900 border border-slate-700/50 rounded-xl">
					<p class="text-sm font-medium text-slate-300 mb-4">
						Instead of "prop-drilling" down a deeply nested component tree, both React and Vue offer native Dependency
						Injection.
					</p>
					<div class="p-4 bg-slate-800 rounded flex flex-col gap-2 relative border-l-4 border-green-500">
						<span class="text-xs text-slate-500 font-mono tracking-wider">ThemeProvider (Parent)</span>
						<div class="ml-4 p-4 border border-slate-700/50 rounded bg-slate-700/20">
							<span class="text-xs text-slate-500 font-mono tracking-wider">NestedComponent (Child)</span>
							<p class="text-green-400 font-bold mt-2">Active Theme: Dark</p>
						</div>
					</div>
				</div>
			</template>

			<template #takeaway>
				<ul class="space-y-2">
					<li>
						• <b>React Context</b> requires you to create a Context object, wrap your tree in an explicit
						`&lt;Provider&gt;` JSX tag, and consume it via `useContext()`. You also often need to wrap the provided
						value in `useMemo` to prevent unnecessary renders.
					</li>
					<li>
						• <b>Vue Provide/Inject</b> is incredibly simple. In any parent component (or globally in your `app.use`),
						you call `provide('key', reactiveData)`. Any deeply nested child can simply call `const data =
						inject('key')`.
					</li>
					<li>
						• <b>When to use:</b> Use these for deeply shared state that doesn't necessarily warrant a full global store
						like Redux/Zustand/Pinia. Great for component library configuration, theme toggles, and localized
						router/auth states.
					</li>
					<li>
						• <b>Reactivity:</b> In Vue, if you `provide` a `ref` or `reactive` object, the injected value automatically
						tracks dependencies. In React, context triggers a re-render for **all** consumers when the value changes,
						which can be a performance pitfall without proper memoization.
					</li>
					<li class="p-3 bg-slate-800/80 rounded border border-amber-500/30">
						<strong class="text-amber-400 block mb-1 text-sm uppercase tracking-wide"
							>⚠️ Side Note: TypeScript & Injection Keys</strong
						>
						<span class="text-slate-300"
							>While Vue allows string keys (<code>provide('key', val)</code>), this breaks TypeScript inference in the
							child. To get React-like strict typing, import <code>InjectionKey&lt;T&gt;</code> from Vue, and export a
							typed <code>Symbol</code> from a separate file: <br /><code
								>export const themeKey = Symbol() as InjectionKey&lt;string&gt;</code
							>. Then use that symbol for both provide and inject!</span
						>
					</li>
				</ul>
			</template>
		</ComparisonCard>
	</div>
</template>

<script setup lang="ts">
import ComparisonCard from "@/components/ComparisonCard.vue";

const reactSnippet = `import { createContext, useContext, useState } from 'react';

// 1. Create Context
const ThemeContext = createContext('light');

function App() {
  const [theme, setTheme] = useState('dark');

  // 2. Wrap tree in Provider
  return (
    <ThemeContext.Provider value={theme}>
      <DeepChild />
    </ThemeContext.Provider>
  );
}

function DeepChild() {
  // 3. Consume context
  const theme = useContext(ThemeContext);
  return <div>{theme}</div>;
}`;

const vueSnippet = `<script setup>
import { provide, inject, ref } from 'vue';

// Parent Component
const theme = ref('dark');

// 1. Provide the data (no wrapper tags needed in template!)
provide('themeContext', theme);
<\/script>

<!-- DeepChild.vue -->
<script setup>
import { inject } from 'vue';

// 2. Inject the data
const theme = inject('themeContext', 'default-light');
<\/script>

<template>
  <div>{{ theme }}</div>
</template>`;
</script>
