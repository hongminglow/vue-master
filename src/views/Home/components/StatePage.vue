<template>
	<div class="animate-in fade-in slide-in-from-bottom-4 duration-500 max-w-5xl mx-auto">
		<ComparisonCard
			title="Local State Variables"
			description="Comparing React's useState to Vue's ref() and reactive()."
			:reactCode="reactSnippet"
			:vueCode="vueSnippet"
		>
			<template #demo>
				<div class="flex flex-col gap-6 p-6 bg-slate-800 border-2 border-slate-700/50 rounded-xl shadow-lg">
					<div class="flex items-center gap-4">
						<button
							@click="count++"
							class="px-5 py-2.5 bg-green-600 text-white font-bold rounded-lg hover:bg-green-500 shadow-md transition-colors cursor-pointer"
						>
							Click Count: {{ count }}
						</button>
						<span class="text-slate-300 font-medium tracking-wide">
							The count is
							<span class="text-green-400 font-bold uppercase">{{ isEven ? "Even" : "Odd" }}</span>
						</span>
					</div>
					<div class="bg-slate-900/50 p-4 border border-slate-700 rounded-lg max-w-sm">
						<label class="block text-sm font-bold text-slate-400 mb-2 uppercase tracking-wider"
							>Update Object State (reactive)</label
						>
						<input
							v-model="user.name"
							class="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent text-white transition-all"
							placeholder="Enter name"
						/>
						<p class="mt-3 text-sm text-slate-400">
							User's Name is:
							<span class="font-bold text-green-400">{{ user.name }}</span>
							(Age: {{ user.age }})
						</p>
					</div>
				</div>
			</template>
			<template #takeaway>
				<ul class="space-y-4">
					<li>
						<strong class="text-green-400 block mb-1">📦 Refs vs Objects</strong>
						In React, `useState` works identically for primitives and objects. In Vue, you generally use `ref()` for
						primitive values (numbers, strings, booleans, arrays) and `reactive()` for deep, complex JS object state.
					</li>
					<li>
						<strong class="text-green-400 block mb-1">🔄 Direct Proxy Mutation</strong>
						React strictly requires immutability (`setState(prev => ({ ...prev, name: 'x' }))`) because it relies on
						referential equality to trigger DOM diffs. Vue creates ES6 Proxies around your state. You simply mutate it
						directly: `user.name = 'x'`, and Vue's reactivity system tracks the deepest nested changes instantly.
					</li>
					<li>
						<strong class="text-green-400 block mb-1">✨ Unwrapping & Two-Way Binding</strong>
						Inside the `&lt;script setup&gt;`, you must access Ref values with `.value` (e.g. `count.value++`). However,
						Vue automatically unwraps them in the `&lt;template&gt;`, so you just write `{{ count }}`. Furthermore, you
						use `v-model` for true 2-way data binding directly on `&lt;input&gt;` fields, entirely skipping the need for
						`onChange={e => setValue(e.target.value)}`.
					</li>
					<li>
						<strong class="text-amber-400 block mb-1">⚠️ Side Note: Arrays & Ref Unwrapping</strong>
						While Vue unwraps <code>ref</code> automatically in templates and objects,
						<strong>if you place a ref inside a reactive Array or Map, it does NOT unwrap!</strong>
						You will still need to access it via <code>.value</code> (e.g., <code>arr[0].value</code>).
					</li>
					<li class="p-4 bg-slate-800/80 rounded-lg border-2 border-blue-500/30">
						<strong class="text-blue-400 block mb-2 text-lg">💡 Beginner's Golden Rule: When to use which?</strong>
						<div class="space-y-3 text-slate-300">
							<p>
								If you are confused, <strong>just use <code>ref()</code> for EVERYTHING.</strong> Period.
							</p>
							<p>
								Wait, <b>can <code>ref()</code> be destructured?</b> No! Neither of them can be destructured safely. If
								you do <code>const { name } = user</code> (reactive) OR <code>const { name } = myRef.value</code>, both
								will give you a disconnected string. You
								<strong class="text-rose-400">always need <code>toRefs()</code></strong>
								when destructuring objects if you want to keep reactivity.
							</p>
							<p>
								So why prefer <code>ref()</code>? Because <code>reactive()</code> has a massive reassignment flaw. You
								<strong class="text-rose-400">cannot reassign it</strong> (e.g.,
								<code>user = { name: 'New' }</code> instantly ruins reactivity). On the other hand,
								<code>ref()</code> survives full reassignments effortlessly (e.g., <code>users.value = [...]</code>),
								handles both primitives and objects, and seeing <code>.value</code> instantly reminds you "this is
								reactive state!".
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
import { ref, reactive, computed } from "vue";

// The Vue implementation for the demo
const count = ref(0);
const isEven = computed(() => count.value % 2 === 0);

const user = reactive({
	name: "Jane Doe",
	age: 25,
});

const reactSnippet = `import { useState, useMemo } from 'react';

function Counter() {
  const [count, setCount] = useState(0);
  const isEven = useMemo(() => count % 2 === 0, [count]);

  const [user, setUser] = useState({ name: 'Jane Doe', age: 25 });

  return (
    <>
      <button onClick={() => setCount(c => c + 1)}>Count: {count}</button>
      <input
        value={user.name}
        onChange={e => setUser(prev => ({ ...prev, name: e.target.value }))}
      />
    </>
  );
}`;

const vueSnippet = `<script setup lang="ts">
import { ref, reactive, computed } from 'vue';

// ref is for primitive values (access via .value in script, auto unwrap in template)
const count = ref(0);
const isEven = computed(() => count.value % 2 === 0);

// reactive is for complex objects (proxies the object deeply)
const user = reactive({
  name: "Jane Doe",
  age: 25
});
<\/script>

<template>
  <button @click="count++">Count: {{ count }}</button>
  <input v-model="user.name" />
</template>`;
</script>
