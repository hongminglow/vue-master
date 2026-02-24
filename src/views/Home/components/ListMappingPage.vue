<template>
	<div class="animate-in fade-in slide-in-from-bottom-4 duration-500 max-w-5xl mx-auto">
		<ComparisonCard
			title="List Mapping (JSX .map vs Vue v-for)"
			description="Comparing how React loops an array to render elements vs Vue's explicit v-for directive."
			:reactCode="reactSnippet"
			:vueCode="vueSnippet"
		>
			<template #demo>
				<div class="flex flex-col gap-4 p-6 bg-slate-800 border-2 border-slate-700/50 rounded-xl shadow-lg relative">
					<ul class="rounded-lg border border-slate-700 bg-[#0F172A] overflow-hidden shadow-inner max-w-md w-full">
						<li
							v-for="(framework, index) in frameworks"
							:key="framework.id"
							class="px-5 py-4 border-b border-slate-800/50 last:border-0 hover:bg-slate-800 transition-colors cursor-default flex items-center justify-between group"
						>
							<div class="flex items-center gap-4">
								<span
									class="w-8 h-8 rounded-full bg-slate-900 border border-slate-700 flex items-center justify-center text-xs text-green-500 font-mono font-bold shadow-sm group-hover:border-green-500/50 transition-colors"
									>{{ index + 1 }}</span
								>
								<span class="font-bold text-slate-200 tracking-wide">{{ framework.name }}</span>
							</div>
							<span class="text-xs text-slate-500 font-mono opacity-0 group-hover:opacity-100 transition-opacity"
								>v-for item</span
							>
						</li>
					</ul>
				</div>
			</template>

			<template #takeaway>
				<ul class="space-y-4">
					<li>
						<strong class="text-green-400 block mb-1">🔁 JavaScript vs Directives</strong>
						React strictly drops out of JSX tags and uses standard JavaScript `Array.prototype.map()` to return an array
						of JSX nodes. Vue prefers to keep templates "HTML-like" and handles structural iteration natively via the
						`v-for` HTML directive (which looks syntactically similar to standard JS `for...in` loops).
					</li>
					<li>
						<strong class="text-green-400 block mb-1">📍 The Rule of Keys</strong>
						Both engines strictly require you to provide a
						<b>unique key property</b> to prevent Virtual DOM tearing. React uses `key={item.id}`, while Vue uses the
						dynamic binding `:key="item.id"`. This allows the reconciliation engine to intelligently move elements
						instead of destroying and recreating DOM nodes!
					</li>
					<li>
						<strong class="text-green-400 block mb-1">🔗 Target Injection</strong>
						A key difference: in React you wrap the element you want repeated inside the `.map()` callback. In Vue, you
						place the `v-for` property
						<i>directly onto the target element itself</i>. If you place `v-for` on an `&lt;li&gt;`, you get 5
						`&lt;li&gt;` elements.
					</li>
					<li>
						<strong class="text-green-400 block mb-1">🚫 Avoid v-for alongside v-if</strong>
						Vue officially strongly recommends against placing `v-for` and `v-if` conditionally on the exact same tag
						because of precedence behavior. If you need to filter a mapped array conditionally, perform the `.filter()`
						inside the `&lt;script setup&gt;` computed property and `v-for` the computed result!
					</li>
					<li class="p-3 bg-slate-800/80 rounded border border-amber-500/30">
						<strong class="text-amber-400 block mb-1 text-sm uppercase tracking-wide"
							>⚠️ Side Note: Looping without wrappers</strong
						>
						<span class="text-slate-300"
							>In React you might return a <code>&lt;Fragment key={id}&gt;</code> inside a map to render multiple
							sibling elements without a wrapper div. In Vue, you can achieve the exact same thing by placing `v-for`
							directly on a <code>&lt;template&gt;</code> tag! The template tag itself won't render into the DOM, but it
							will output its looped contents cleanly.</span
						>
					</li>
				</ul>
			</template>
		</ComparisonCard>
	</div>
</template>

<script setup lang="ts">
import ComparisonCard from "@/components/ComparisonCard.vue";

const frameworks = [
	{ id: "f-1", name: "Vue" },
	{ id: "f-2", name: "React" },
	{ id: "f-3", name: "Svelte" },
	{ id: "f-4", name: "Angular" },
];

const reactSnippet = `function FrameworkList({ frameworks }) {
  // We drop into JS { .. } and call .map()
  return (
    <ul>
      {frameworks.map((framework, index) => (
        <li key={framework.id}>
          {index + 1}. {framework.name}
        </li>
      ))}
    </ul>
  );
}`;

const vueSnippet = `<template>
  <ul>
    <!-- Loop structure is declared on the repeating element -->
    <!-- Notice :key ensures the same virtual DOM tracking as React -->
    <li v-for="(framework, index) in frameworks" :key="framework.id">
      {{ index + 1 }}. {{ framework.name }}
    </li>
  </ul>
</template>

<script setup>
const frameworks = [
  { id: 'f-1', name: 'Vue' },
  { id: 'f-2', name: 'React' }
];
<\/script>`;
</script>
