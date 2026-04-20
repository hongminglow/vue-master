<template>
	<div class="animate-in fade-in slide-in-from-bottom-4 duration-500 max-w-5xl mx-auto space-y-8 pb-12">
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

		<!-- ============================================================ -->
		<!-- DEEP DIVE: watchEffect vs watch (pre) vs watchPostEffect      -->
		<!-- ============================================================ -->
		<div class="space-y-2">
			<h2 class="text-3xl font-bold text-white flex items-center gap-3">
				<span class="text-yellow-400">⏱️</span> Watch Flush Timing: The Deep Dive
			</h2>
			<p class="text-slate-400 text-lg">
				Vue gives you three distinct flush timing flavors. Knowing when each runs relative to the DOM update
				cycle is the key to mastering side effects.
			</p>
		</div>

		<!-- Timing Overview Cards -->
		<div class="grid grid-cols-1 md:grid-cols-3 gap-4">
			<!-- watchEffect / watch (pre) -->
			<div class="flex flex-col rounded-xl border-2 border-purple-500/30 bg-[#0F172A] overflow-hidden shadow-lg">
				<div class="bg-slate-800/80 p-4 border-b border-purple-500/30 flex items-center justify-between">
					<h3 class="text-base font-bold text-white flex items-center gap-2">
						<span class="text-purple-400">①</span> Pre-flush
					</h3>
					<span class="text-xs font-mono px-2 py-1 rounded bg-purple-500/10 border border-purple-500/20 text-purple-400">default</span>
				</div>
				<div class="p-5 flex-1 space-y-3">
					<div class="bg-slate-900 rounded-lg p-3 font-mono text-sm border border-slate-700 shadow-inner overflow-x-auto">
						<span class="text-purple-300">watchEffect</span><span class="text-slate-300">(() =&gt; { ... })</span><br />
						<span class="text-slate-500 text-xs">// OR explicitly:</span><br />
						<span class="text-purple-300">watch</span><span class="text-slate-300">(src, cb,</span><br />
						<span class="text-slate-300">&nbsp;&nbsp;{ flush: </span><span class="text-green-300">'pre'</span><span class="text-slate-300"> })</span>
					</div>
					<p class="text-slate-300 text-sm leading-relaxed">
						Runs <strong class="text-purple-300">before</strong> Vue updates the DOM. This is the
						<strong>default</strong> for both <code class="text-purple-300">watch()</code> and
						<code class="text-purple-300">watchEffect()</code>. The callback fires <em>before</em> the
						component re-renders, so <code>document.querySelector</code> will still reflect old DOM state.
					</p>
					<div class="space-y-2">
						<p class="text-xs font-bold text-green-400 uppercase tracking-widest">✅ Pros</p>
						<ul class="text-xs text-slate-400 space-y-1 list-disc pl-4">
							<li>Avoids unnecessary DOM reads — ideal for pure data transforms</li>
							<li>Runs immediately on first render (eager auto-tracking)</li>
							<li>Batches multiple reactive changes into one callback call</li>
						</ul>
					</div>
					<div class="space-y-2">
						<p class="text-xs font-bold text-rose-400 uppercase tracking-widest">❌ Cons</p>
						<ul class="text-xs text-slate-400 space-y-1 list-disc pl-4">
							<li>Cannot read updated DOM measurements inside the callback</li>
							<li>May cause subtle ordering bugs if you expect the DOM to be fresh</li>
						</ul>
					</div>
				</div>
				<div class="px-5 pb-5">
					<div class="p-3 bg-purple-500/5 border border-purple-500/20 rounded-lg text-xs text-slate-400 leading-relaxed">
						<strong class="text-purple-300">🎯 Use when:</strong> Syncing reactive data state, logging, analytics,
						API calls triggered by state changes (no DOM interaction needed).
					</div>
				</div>
			</div>

			<!-- watchSyncEffect / flush: sync -->
			<div class="flex flex-col rounded-xl border-2 border-rose-500/30 bg-[#0F172A] overflow-hidden shadow-lg">
				<div class="bg-slate-800/80 p-4 border-b border-rose-500/30 flex items-center justify-between">
					<h3 class="text-base font-bold text-white flex items-center gap-2">
						<span class="text-rose-400">②</span> Sync-flush
					</h3>
					<span class="text-xs font-mono px-2 py-1 rounded bg-rose-500/10 border border-rose-500/20 text-rose-400">advanced</span>
				</div>
				<div class="p-5 flex-1 space-y-3">
					<div class="bg-slate-900 rounded-lg p-3 font-mono text-sm border border-slate-700 shadow-inner overflow-x-auto">
						<span class="text-rose-300">watchSyncEffect</span><span class="text-slate-300">(() =&gt; { ... })</span><br />
						<span class="text-slate-500 text-xs">// OR explicitly:</span><br />
						<span class="text-rose-300">watch</span><span class="text-slate-300">(src, cb,</span><br />
						<span class="text-slate-300">&nbsp;&nbsp;{ flush: </span><span class="text-green-300">'sync'</span><span class="text-slate-300"> })</span>
					</div>
					<p class="text-slate-300 text-sm leading-relaxed">
						Runs <strong class="text-rose-300">synchronously and immediately</strong> — triggered the very instant
						a reactive dependency mutates, with absolutely zero batching or deferring. This bypasses Vue's
						scheduler entirely.
					</p>
					<div class="space-y-2">
						<p class="text-xs font-bold text-green-400 uppercase tracking-widest">✅ Pros</p>
						<ul class="text-xs text-slate-400 space-y-1 list-disc pl-4">
							<li>Deterministic, zero-delay reaction to changes</li>
							<li>Useful in unit tests to assert without <code>nextTick()</code></li>
							<li>Ideal for imperative state machines where order matters</li>
						</ul>
					</div>
					<div class="space-y-2">
						<p class="text-xs font-bold text-rose-400 uppercase tracking-widest">❌ Cons</p>
						<ul class="text-xs text-slate-400 space-y-1 list-disc pl-4">
							<li><strong>No batching</strong> — fires once per mutation, even in loops</li>
							<li>Can devastate performance if dependencies change rapidly</li>
							<li>Risk of redundant re-renders and infinite loops if misused</li>
						</ul>
					</div>
				</div>
				<div class="px-5 pb-5">
					<div class="p-3 bg-rose-500/5 border border-rose-500/20 rounded-lg text-xs text-slate-400 leading-relaxed">
						<strong class="text-rose-300">🎯 Use when:</strong> Unit testing without <code>await nextTick()</code>,
						or complex state machines where sequential execution order is critical. Rarely needed in production UI.
					</div>
				</div>
			</div>

			<!-- watchPostEffect / flush: post -->
			<div class="flex flex-col rounded-xl border-2 border-blue-500/30 bg-[#0F172A] overflow-hidden shadow-lg">
				<div class="bg-slate-800/80 p-4 border-b border-blue-500/30 flex items-center justify-between">
					<h3 class="text-base font-bold text-white flex items-center gap-2">
						<span class="text-blue-400">③</span> Post-flush
					</h3>
					<span class="text-xs font-mono px-2 py-1 rounded bg-blue-500/10 border border-blue-500/20 text-blue-400">DOM-safe</span>
				</div>
				<div class="p-5 flex-1 space-y-3">
					<div class="bg-slate-900 rounded-lg p-3 font-mono text-sm border border-slate-700 shadow-inner overflow-x-auto">
						<span class="text-blue-300">watchPostEffect</span><span class="text-slate-300">(() =&gt; { ... })</span><br />
						<span class="text-slate-500 text-xs">// OR explicitly:</span><br />
						<span class="text-blue-300">watch</span><span class="text-slate-300">(src, cb,</span><br />
						<span class="text-slate-300">&nbsp;&nbsp;{ flush: </span><span class="text-green-300">'post'</span><span class="text-slate-300"> })</span>
					</div>
					<p class="text-slate-300 text-sm leading-relaxed">
						Runs <strong class="text-blue-300">after</strong> Vue has flushed and committed DOM updates. Inside
						this callback, <code>templateRef.value</code> reflects the <em>freshly painted</em> DOM. This is
						Vue's equivalent of React's <code>useLayoutEffect</code>.
					</p>
					<div class="space-y-2">
						<p class="text-xs font-bold text-green-400 uppercase tracking-widest">✅ Pros</p>
						<ul class="text-xs text-slate-400 space-y-1 list-disc pl-4">
							<li>Safe to read updated DOM nodes, measurements, and refs</li>
							<li>Great for canvas drawing, charts, <code>scrollTop</code> updates</li>
							<li>Equivalent to React's <code>useLayoutEffect</code> timing</li>
						</ul>
					</div>
					<div class="space-y-2">
						<p class="text-xs font-bold text-rose-400 uppercase tracking-widest">❌ Cons</p>
						<ul class="text-xs text-slate-400 space-y-1 list-disc pl-4">
							<li>Runs after paint — slight delay vs. <code>pre</code></li>
							<li>Overkill if you don't actually need DOM access</li>
						</ul>
					</div>
				</div>
				<div class="px-5 pb-5">
					<div class="p-3 bg-blue-500/5 border border-blue-500/20 rounded-lg text-xs text-slate-400 leading-relaxed">
						<strong class="text-blue-300">🎯 Use when:</strong> Reading DOM dimensions after a data change
						(e.g., resizing a canvas, scrolling to a position, animating a newly rendered element).
					</div>
				</div>
			</div>
		</div>

		<!-- Comparison Table -->
		<div class="flex flex-col rounded-xl border-2 border-slate-700/50 bg-[#0F172A] overflow-hidden shadow-lg">
			<div class="bg-slate-800/80 p-5 border-b border-slate-700/50 flex items-center justify-between">
				<h3 class="text-lg font-bold text-white flex items-center gap-2">
					<span class="text-yellow-400">📊</span> Side-by-Side Comparison
				</h3>
				<span class="text-xs font-mono px-2 py-1 rounded bg-yellow-500/10 border border-yellow-500/20 text-yellow-400">Quick Ref</span>
			</div>
			<div class="overflow-x-auto">
				<table class="w-full text-sm">
					<thead>
						<tr class="border-b border-slate-700/50 bg-slate-800/40">
							<th class="text-left px-5 py-3 text-slate-400 font-bold uppercase text-xs tracking-widest w-1/4">Property</th>
							<th class="text-left px-5 py-3 text-purple-400 font-bold uppercase text-xs tracking-widest">watchEffect / pre</th>
							<th class="text-left px-5 py-3 text-rose-400 font-bold uppercase text-xs tracking-widest">watchSyncEffect / sync</th>
							<th class="text-left px-5 py-3 text-blue-400 font-bold uppercase text-xs tracking-widest">watchPostEffect / post</th>
						</tr>
					</thead>
					<tbody class="divide-y divide-slate-700/30">
						<tr class="hover:bg-slate-800/30 transition-colors">
							<td class="px-5 py-3.5 text-slate-400 font-medium">Runs when?</td>
							<td class="px-5 py-3.5 text-slate-300">Before DOM update</td>
							<td class="px-5 py-3.5 text-slate-300">Immediately on mutation</td>
							<td class="px-5 py-3.5 text-slate-300">After DOM update</td>
						</tr>
						<tr class="hover:bg-slate-800/30 transition-colors">
							<td class="px-5 py-3.5 text-slate-400 font-medium">Tracks deps?</td>
							<td class="px-5 py-3.5 text-slate-300">Auto (reads inside fn)</td>
							<td class="px-5 py-3.5 text-slate-300">Auto (reads inside fn)</td>
							<td class="px-5 py-3.5 text-slate-300">Auto (reads inside fn)</td>
						</tr>
						<tr class="hover:bg-slate-800/30 transition-colors">
							<td class="px-5 py-3.5 text-slate-400 font-medium">DOM access safe?</td>
							<td class="px-5 py-3.5"><span class="text-rose-400 font-bold">❌ Stale DOM</span></td>
							<td class="px-5 py-3.5"><span class="text-rose-400 font-bold">❌ Stale DOM</span></td>
							<td class="px-5 py-3.5"><span class="text-green-400 font-bold">✅ Fresh DOM</span></td>
						</tr>
						<tr class="hover:bg-slate-800/30 transition-colors">
							<td class="px-5 py-3.5 text-slate-400 font-medium">Batched?</td>
							<td class="px-5 py-3.5"><span class="text-green-400 font-bold">✅ Yes</span></td>
							<td class="px-5 py-3.5"><span class="text-rose-400 font-bold">❌ No (1 per mutation)</span></td>
							<td class="px-5 py-3.5"><span class="text-green-400 font-bold">✅ Yes</span></td>
						</tr>
						<tr class="hover:bg-slate-800/30 transition-colors">
							<td class="px-5 py-3.5 text-slate-400 font-medium">Runs on mount?</td>
							<td class="px-5 py-3.5"><span class="text-green-400 font-bold">✅ Eager</span></td>
							<td class="px-5 py-3.5"><span class="text-green-400 font-bold">✅ Eager</span></td>
							<td class="px-5 py-3.5"><span class="text-green-400 font-bold">✅ Eager</span></td>
						</tr>
						<tr class="hover:bg-slate-800/30 transition-colors">
							<td class="px-5 py-3.5 text-slate-400 font-medium">React equivalent</td>
							<td class="px-5 py-3.5 font-mono text-[#61DAFB] text-xs">useEffect (with deps)</td>
							<td class="px-5 py-3.5 font-mono text-[#61DAFB] text-xs">— (no direct equiv.)</td>
							<td class="px-5 py-3.5 font-mono text-[#61DAFB] text-xs">useLayoutEffect</td>
						</tr>
						<tr class="hover:bg-slate-800/30 transition-colors">
							<td class="px-5 py-3.5 text-slate-400 font-medium">Performance risk</td>
							<td class="px-5 py-3.5 text-slate-300">Low</td>
							<td class="px-5 py-3.5"><span class="text-rose-400 font-bold">High (no batching!)</span></td>
							<td class="px-5 py-3.5 text-slate-300">Low</td>
						</tr>
					</tbody>
				</table>
			</div>
		</div>

		<!-- Execution Timeline Visual -->
		<div class="flex flex-col rounded-xl border-2 border-slate-700/50 bg-[#0F172A] overflow-hidden shadow-lg">
			<div class="bg-slate-800/80 p-5 border-b border-slate-700/50 flex items-center justify-between">
				<h3 class="text-lg font-bold text-white flex items-center gap-2">
					<span class="text-green-400">🔄</span> Execution Order Timeline
				</h3>
				<span class="text-xs font-mono px-2 py-1 rounded bg-green-500/10 border border-green-500/20 text-green-400">Visualized</span>
			</div>
			<div class="p-6 space-y-4">
				<p class="text-slate-400 text-sm">
					When a reactive dependency mutates, here is the guaranteed execution order within a single Vue tick:
				</p>
				<div class="relative">
					<!-- Timeline line -->
					<div class="absolute left-6 top-5 bottom-5 w-0.5 bg-slate-600/60 rounded"></div>
					<div class="space-y-3 pl-16 relative">

						<div class="relative">
							<div class="absolute -left-[2.75rem] top-1 w-7 h-7 rounded-full bg-slate-700 border-2 border-rose-400 flex items-center justify-center text-rose-400 font-bold text-sm shadow-lg shadow-rose-500/20">S</div>
							<div class="p-3 bg-slate-800/80 rounded-lg border border-rose-500/20 shadow-inner">
								<p class="text-xs font-bold text-rose-400 uppercase tracking-widest mb-1">flush: sync (watchSyncEffect)</p>
								<p class="text-xs text-slate-400">Fires instantly — no queue, no batching. Runs <em>inside</em> the same JS call stack as the mutation.</p>
							</div>
						</div>

						<div class="flex items-center gap-3 text-slate-600">
							<div class="flex-1 border-t border-dashed border-slate-700"></div>
							<span class="text-xs text-slate-600 font-mono italic">Vue scheduler flushes queue →</span>
							<div class="flex-1 border-t border-dashed border-slate-700"></div>
						</div>

						<div class="relative">
							<div class="absolute -left-[2.75rem] top-1 w-7 h-7 rounded-full bg-slate-700 border-2 border-purple-400 flex items-center justify-center text-purple-400 font-bold text-sm shadow-lg shadow-purple-500/20">P</div>
							<div class="p-3 bg-slate-800/80 rounded-lg border border-purple-500/20 shadow-inner">
								<p class="text-xs font-bold text-purple-400 uppercase tracking-widest mb-1">flush: pre (watchEffect — default)</p>
								<p class="text-xs text-slate-400">Runs after sync effects, but <em>before</em> the component re-renders and Vue patches the DOM.</p>
							</div>
						</div>

						<div class="flex items-center gap-3 text-slate-600">
							<div class="flex-1 border-t border-dashed border-slate-700"></div>
							<span class="text-xs text-slate-600 font-mono italic">Vue updates &amp; patches DOM →</span>
							<div class="flex-1 border-t border-dashed border-slate-700"></div>
						</div>

						<div class="relative">
							<div class="absolute -left-[2.75rem] top-1 w-7 h-7 rounded-full bg-slate-700 border-2 border-blue-400 flex items-center justify-center text-blue-400 font-bold text-sm shadow-lg shadow-blue-500/20">T</div>
							<div class="p-3 bg-slate-800/80 rounded-lg border border-blue-500/20 shadow-inner">
								<p class="text-xs font-bold text-blue-400 uppercase tracking-widest mb-1">flush: post (watchPostEffect)</p>
								<p class="text-xs text-slate-400">Runs last — after Vue has fully committed all DOM mutations. Template refs are guaranteed fresh here.</p>
							</div>
						</div>

					</div>
				</div>
			</div>
		</div>

		<!-- Golden Rules -->
		<div class="flex flex-col rounded-xl border-2 border-slate-700/50 bg-[#0F172A] overflow-hidden shadow-lg">
			<div class="bg-slate-800/80 p-5 border-b border-slate-700/50 flex items-center justify-between">
				<h3 class="text-lg font-bold text-white flex items-center gap-2">
					<span class="text-yellow-400">💡</span> Golden Decision Rules
				</h3>
				<span class="text-xs font-mono px-2 py-1 rounded bg-yellow-500/10 border border-yellow-500/20 text-yellow-400">Best Practices</span>
			</div>
			<div class="p-6 grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
				<div class="p-4 bg-[#0F172A] rounded-lg border border-purple-500/20 space-y-2">
					<p class="font-bold text-purple-300">Default? Use <code>watchEffect()</code></p>
					<p class="text-slate-400 leading-relaxed">
						If you just need to react to data changes and perform side effects (API calls, logging, state sync),
						stick with the default <code class="text-purple-300">pre</code> flush. It covers 80% of real-world cases.
					</p>
				</div>
				<div class="p-4 bg-[#0F172A] rounded-lg border border-blue-500/20 space-y-2">
					<p class="font-bold text-blue-300">Need fresh DOM? Use <code>watchPostEffect()</code></p>
					<p class="text-slate-400 leading-relaxed">
						Any time your callback needs to read a <code class="text-blue-300">templateRef</code>, measure an element,
						scroll to a position, or draw on a canvas, you <strong>must</strong> use <code>post</code> flush.
					</p>
				</div>
				<div class="p-4 bg-[#0F172A] rounded-lg border border-rose-500/20 space-y-2">
					<p class="font-bold text-rose-300">Testing only? Use <code>watchSyncEffect()</code></p>
					<p class="text-slate-400 leading-relaxed">
						Useful inside unit tests when you want to assert watcher side-effects synchronously without
						<code class="text-rose-300">await nextTick()</code>. Avoid it in production UI — its unbatched nature
						is a performance trap.
					</p>
				</div>
			</div>
		</div>

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
