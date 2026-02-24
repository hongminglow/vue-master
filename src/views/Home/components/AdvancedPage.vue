<template>
	<div class="animate-in fade-in slide-in-from-bottom-4 duration-500 max-w-4xl mx-auto space-y-8 pb-12">
		<div class="space-y-2">
			<h1 class="text-3xl font-bold text-white flex items-center gap-3">
				<span class="text-green-500">🔬</span> Advanced Vue Arsenal
			</h1>
			<p class="text-slate-400 text-lg">
				Go beyond the basics with Vue's unique built-in tools. No third-party libraries required.
			</p>
		</div>

		<!-- Transition -->
		<div class="flex flex-col rounded-xl border-2 border-slate-700/50 bg-[#0F172A] overflow-hidden shadow-lg">
			<div class="bg-slate-800/80 p-5 border-b border-slate-700/50 flex items-center justify-between">
				<h3 class="text-lg font-bold text-white flex items-center gap-2">
					<span class="text-emerald-400">✨</span> &lt;Transition&gt;
				</h3>
				<span
					class="text-xs font-mono px-2 py-1 rounded bg-emerald-500/10 border border-emerald-500/20 text-emerald-400"
					>Animations</span
				>
			</div>
			<div class="p-6 md:flex gap-8 items-start">
				<div class="space-y-4 flex-1">
					<p class="text-slate-300">
						Built directly into Vue core. Provide entering/leaving CSS classes natively via perfectly-timed lifecycle
						hooks. Much simpler and zero dependencies compared to React Transition Group or Framer Motion.
					</p>
					<div
						class="bg-slate-900 rounded-lg p-4 font-mono text-sm border border-slate-700/80 shadow-inner overflow-x-auto leading-relaxed"
					>
						<span class="text-blue-300">&lt;Transition&nbsp;</span><span class="text-purple-300">name</span>=<span
							class="text-green-300"
							>"slide-fade"</span
						><span class="text-blue-300">&gt;</span><br />
						&nbsp;&nbsp;<span class="text-blue-300">&lt;div&nbsp;</span><span class="text-purple-300">v-if</span>=<span
							class="text-green-300"
							>"showBox"</span
						><span class="text-blue-300">&gt;</span>I animate!<span class="text-blue-300">&lt;/div&gt;</span><br />
						<span class="text-blue-300">&lt;/Transition&gt;</span>
					</div>
				</div>

				<!-- Live Demo -->
				<div
					class="flex-1 mt-6 md:mt-0 p-6 bg-slate-900 rounded-lg border border-slate-700/80 shadow-inner flex flex-col items-center justify-center min-h-[200px]"
				>
					<button
						@click="showBox = !showBox"
						class="mb-6 px-4 py-2 bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 rounded-lg shadow-sm hover:text-white transition-all font-bold text-sm cursor-pointer"
					>
						Toggle Visibility
					</button>
					<div class="h-16 flex items-center justify-center">
						<Transition name="slide-fade">
							<div
								v-if="showBox"
								class="px-6 py-3 bg-emerald-500 text-slate-900 rounded-lg font-mono font-bold shadow-lg shadow-emerald-500/20"
							>
								I slide and fade!
							</div>
						</Transition>
					</div>
				</div>
			</div>
		</div>

		<!-- v-memo -->
		<div class="flex flex-col rounded-xl border-2 border-slate-700/50 bg-[#0F172A] overflow-hidden shadow-lg">
			<div class="bg-slate-800/80 p-5 border-b border-slate-700/50 flex items-center justify-between">
				<h3 class="text-lg font-bold text-white flex items-center gap-2">
					<span class="text-blue-400">⚡</span> v-memo
				</h3>
				<span class="text-xs font-mono px-2 py-1 rounded bg-blue-500/10 border border-blue-500/20 text-blue-400"
					>Performance</span
				>
			</div>
			<div class="p-6 space-y-4">
				<p class="text-slate-300">
					Vue's native supercharged alternative to <code>React.memo</code>. When rendering massive lists, you explicitly
					tell Vue to cache the DOM node entirely, completely bypassing virtual DOM diffing unless the designated
					dependencies change. No higher-order component wrappers needed!
				</p>
				<div
					class="bg-slate-900 rounded-lg p-5 font-mono text-sm text-green-400 border border-slate-700/80 shadow-inner overflow-x-auto leading-relaxed"
				>
					&lt;div v-for="item in heavyList" :key="item.id"&nbsp;
					<span class="text-white bg-green-500/20 px-1 rounded border border-green-500/30 font-bold"
						>v-memo="[item.id, item.updatedAt]"</span
					>&gt;<br />
					&nbsp;&nbsp;<span class="text-slate-500">&lt;!-- Hundreds of nested nodes here --&gt;</span><br />
					&lt;/div&gt;
				</div>
			</div>
		</div>

		<!-- Scoped Slots -->
		<div class="flex flex-col rounded-xl border-2 border-slate-700/50 bg-[#0F172A] overflow-hidden shadow-lg">
			<div class="bg-slate-800/80 p-5 border-b border-slate-700/50 flex items-center justify-between">
				<h3 class="text-lg font-bold text-white flex items-center gap-2">
					<span class="text-purple-400">📦</span> Scoped Slots
				</h3>
				<span class="text-xs font-mono px-2 py-1 rounded bg-purple-500/10 border border-purple-500/20 text-purple-400"
					>Architecture</span
				>
			</div>
			<div class="p-6 md:flex gap-8 items-start">
				<div class="space-y-4 flex-1">
					<p class="text-slate-300">
						The elegant Vue equivalent to React's <code>render props</code>. A child logic component handles state
						encapsulation or data fetching, but lets the <i>parent</i> define exactly how the UI should look by
						injecting the state payload back "up" to the parent block.
					</p>
					<div
						class="bg-slate-800 border-l-4 border-purple-500 p-4 rounded text-sm text-slate-300 font-mono shadow-inner space-y-1"
					>
						<span class="text-slate-500 text-xs block mb-2 uppercase tracking-wide font-sans font-bold"
							>Parent Accesses Data via #default:</span
						>
						<span class="text-blue-300">&lt;template&nbsp;</span><span class="text-purple-300">#default</span>=<span
							class="text-green-300"
							>"{ items }"</span
						><span class="text-blue-300">&gt;</span><br />
						<span v-pre>&nbsp;&nbsp;{{ items[0] }}</span
						><br />
						<span class="text-blue-300">&lt;/template&gt;</span>
					</div>
				</div>

				<!-- Live Demo -->
				<div
					class="flex-1 mt-6 md:mt-0 p-6 bg-slate-900 rounded-lg border border-slate-700/80 shadow-inner text-center"
				>
					<div class="flex items-center justify-center gap-3 mb-6">
						<h4 class="text-sm font-bold text-slate-500 uppercase tracking-widest">Live Slot Payload Receiver</h4>
						<button
							@click="triggerFetch"
							class="text-xs px-2 py-1 bg-slate-800 text-slate-300 hover:text-white rounded border border-slate-700 cursor-pointer"
						>
							Refetch
						</button>
					</div>
					<DataFetcherComponent :fetch-trigger="fakeTrigger">
						<template #default="{ status, data }">
							<div
								class="flex items-center justify-center h-24 bg-[#0F172A] rounded-xl border border-slate-700/50 inset-shadow-sm"
							>
								<div
									v-if="status === 'loading'"
									class="text-yellow-400/80 font-mono text-sm tracking-widest flex items-center gap-2"
								>
									<svg class="animate-spin h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
										<circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
										<path
											class="opacity-75"
											fill="currentColor"
											d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
										></path>
									</svg>
									LOADING...
								</div>
								<div
									v-else
									class="text-green-400 font-bold space-x-3 flex items-center animate-in zoom-in duration-300"
								>
									<span
										v-for="item in data"
										:key="item"
										class="bg-green-500/10 px-3 py-1.5 rounded-lg border border-green-500/30 shadow-sm"
										>{{ item }}</span
									>
								</div>
							</div>
						</template>
					</DataFetcherComponent>
				</div>
			</div>
		</div>

		<!-- Dynamic Components -->
		<div class="flex flex-col rounded-xl border-2 border-slate-700/50 bg-[#0F172A] overflow-hidden shadow-lg">
			<div class="bg-slate-800/80 p-5 border-b border-slate-700/50 flex items-center justify-between">
				<h3 class="text-lg font-bold text-white flex items-center gap-2">
					<span class="text-cyan-400">🔁</span> Dynamic Components
				</h3>
				<span class="text-xs font-mono px-2 py-1 rounded bg-cyan-500/10 border border-cyan-500/20 text-cyan-400"
					>Rendering</span
				>
			</div>
			<div class="p-6 md:flex gap-8 items-start">
				<div class="space-y-4 flex-1">
					<p class="text-slate-300">
						Instead of massive <code>if/else</code> chains to display different components, Vue offers the generic
						<code>&lt;component :is="..."&gt;</code> element. It instantly renders whichever component object (or
						resolved string name) is bound to it!
					</p>
					<div
						class="bg-slate-900 rounded-lg p-4 font-mono text-sm border border-slate-700/80 shadow-inner overflow-x-auto leading-relaxed"
					>
						<span class="text-blue-300">&lt;component&nbsp;</span><span class="text-purple-300">:is</span>=<span
							class="text-green-300"
							>"activeTab"</span
						><span class="text-blue-300">&nbsp;/&gt;</span>
					</div>
				</div>
				<div
					class="flex-1 mt-6 md:mt-0 p-6 bg-slate-900 rounded-lg border border-slate-700/80 shadow-inner flex flex-col items-center justify-center min-h-[150px]"
				>
					<p class="text-sm font-medium text-slate-500 text-center italic">
						(Notice we are actually building the interactive KeepAlive routing demo below using exactly this feature!)
					</p>
				</div>
			</div>
		</div>

		<!-- KeepAlive -->
		<div class="flex flex-col rounded-xl border-2 border-slate-700/50 bg-[#0F172A] overflow-hidden shadow-lg">
			<div class="bg-slate-800/80 p-5 border-b border-slate-700/50 flex items-center justify-between">
				<h3 class="text-lg font-bold text-white flex items-center gap-2">
					<span class="text-orange-400">💾</span> KeepAlive
				</h3>
				<span class="text-xs font-mono px-2 py-1 rounded bg-orange-500/10 border border-orange-500/20 text-orange-400"
					>State / Routing</span
				>
			</div>
			<div class="p-6 md:flex gap-8 items-start">
				<div class="space-y-4 flex-1">
					<p class="text-slate-300">
						In React, when a component unmounts, its state is wiped unless explicitly cached in a global store (like
						Redux or Zustand). Vue's
						<code>&lt;KeepAlive&gt;</code> wrapper simply <b>pauses</b> a component's lifecycle.
					</p>
					<p class="text-slate-300">
						It is removed from the DOM, but its entire reactive instance tree is perfectly preserved in memory natively.
						Incredible for multi-step wizards or tab-based routing without complex global state!
					</p>

					<div class="bg-slate-900 rounded-lg p-4 font-mono text-sm border border-slate-700/80 shadow-inner">
						<span class="text-blue-400">let</span> formDraft = ref(<span class="text-green-300">""</span>); <br />
						<span class="text-slate-500">// Preserved magically when swapping tabs</span>
					</div>
				</div>

				<!-- Demo -->
				<div class="flex-1 mt-6 md:mt-0 bg-slate-900 p-6 rounded-lg border border-slate-700/80 shadow-inner">
					<div class="flex space-x-2 mb-6">
						<button
							@click="activeTab = 'A'"
							:class="
								activeTab === 'A'
									? 'bg-orange-500/20 text-orange-400 border border-orange-500/30'
									: 'bg-slate-800 text-slate-400 border border-slate-700 hover:text-white'
							"
							class="px-4 py-2 rounded-lg font-bold text-sm transition-all focus:outline-none cursor-pointer shadow-sm"
						>
							Document Editor
						</button>
						<button
							@click="activeTab = 'B'"
							:class="
								activeTab === 'B'
									? 'bg-orange-500/20 text-orange-400 border border-orange-500/30'
									: 'bg-slate-800 text-slate-400 border border-slate-700 hover:text-white'
							"
							class="px-4 py-2 rounded-lg font-bold text-sm transition-all focus:outline-none cursor-pointer shadow-sm"
						>
							Simple Counter
						</button>
					</div>

					<!-- KeepAlive wrapper -->
					<div
						class="bg-slate-800 rounded-lg p-5 border border-slate-700 h-32 flex items-center shadow-inner relative overflow-hidden"
					>
						<KeepAlive>
							<component :is="activeTab === 'A' ? TabAComponent : TabBComponent" />
						</KeepAlive>
					</div>
				</div>
			</div>
		</div>

		<!-- Reactivity Gotchas -->
		<div class="flex flex-col rounded-xl border-2 border-slate-700/50 bg-[#0F172A] overflow-hidden shadow-lg">
			<div class="bg-slate-800/80 p-5 border-b border-slate-700/50 flex items-center justify-between">
				<h3 class="text-lg font-bold text-white flex items-center gap-2">
					<span class="text-rose-400">⚠️</span> Reactivity Gotchas
				</h3>
				<span class="text-xs font-mono px-2 py-1 rounded bg-rose-500/10 border border-rose-500/20 text-rose-400"
					>Reactivity</span
				>
			</div>
			<div class="p-6 md:flex gap-8 items-start">
				<div class="space-y-4 flex-1">
					<p class="text-slate-300">Vue's reactivity system is powerful, but has common pitfalls:</p>
					<ul class="list-disc pl-5 text-slate-300 space-y-2">
						<li>
							<b>Destructuring</b> a <code>reactive</code> object
							<span class="text-rose-400 font-bold">destroys reactivity</span>. The destructured primitives become
							disconnected from the source. Use <code>toRefs()</code> to safely destructure.
						</li>
						<li>
							<b>Shallow tracking</b> using <code>shallowRef</code> or <code>shallowReactive</code> only tracks changes
							at the top level. Deeply nested object property mutations won't trigger updates!
						</li>
					</ul>

					<div
						class="bg-slate-900/50 rounded-lg p-4 font-mono text-sm border border-slate-700/80 shadow-inner overflow-x-auto leading-relaxed"
					>
						<span class="text-blue-300 font-medium">const</span>
						<span class="text-slate-200">state = reactive({ count:</span>
						<span class="text-green-300 font-medium">0</span> <span class="text-slate-200">});</span><br />
						<span class="text-slate-400 italic">// ❌ Loses reactivity!</span><br />
						<span class="text-blue-300 font-medium">let</span> <span class="text-slate-200">{ count } = state;</span
						><br /><br />
						<span class="text-slate-400 italic">// ✅ Keeps reactivity intact</span><br />
						<span class="text-blue-300 font-medium">let</span>
						<span class="text-slate-200">{ count } = toRefs(state);</span>
					</div>
				</div>

				<div
					class="flex-1 mt-6 md:mt-0 p-6 bg-slate-900 rounded-lg border border-slate-700/80 shadow-inner flex flex-col items-center justify-center space-y-6"
				>
					<div class="text-center w-full">
						<h4 class="text-slate-400 text-sm font-bold uppercase tracking-widest mb-3">Destructuring Demo</h4>
						<div class="grid grid-cols-2 gap-4 text-center">
							<div class="p-3 bg-slate-800/80 rounded border border-rose-500/50 relative shadow-inner">
								<p class="text-xs text-slate-300 mb-1 font-medium">Destructured</p>
								<p class="text-xl font-mono text-rose-400 font-bold bg-slate-900/50 rounded p-1">{{ lostCount }}</p>
								<span class="absolute top-2 right-2 flex h-2 w-2">
									<span
										class="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75"
									></span>
									<span class="relative inline-flex rounded-full h-2 w-2 bg-rose-500"></span>
								</span>
							</div>
							<div class="p-3 bg-slate-800/80 rounded border border-green-500/50 relative shadow-inner">
								<p class="text-xs text-slate-300 mb-1 font-medium">Source (Reactive)</p>
								<p class="text-xl font-mono text-green-400 font-bold bg-slate-900/50 rounded p-1">
									{{ demoState.count }}
								</p>
								<span class="absolute top-2 right-2 flex h-2 w-2">
									<span
										class="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"
									></span>
									<span class="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
								</span>
							</div>
						</div>
						<p class="text-sm text-slate-300 mt-4 italic text-left leading-relaxed">
							Click below. Notice how the destructured variable stops updating, while the source reactivity lives on!
						</p>
						<button
							@click="incrementDemo"
							class="mt-4 px-4 py-2 bg-slate-700 hover:bg-slate-600 text-white rounded-lg border border-slate-600 cursor-pointer transition-colors text-sm font-bold w-full shadow-sm"
						>
							Increment Source +1
						</button>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import { ref, reactive, defineComponent, h, onMounted, watch } from "vue";

// ----- REACTIVITY GOTCHAS DEMO -----
const demoState = reactive({ count: 0 });
// By destructuring directly, we lose the reactive connection.
// `lostCount` acts like a regular disconnected primitive constant variable.
let { count: lostCount } = demoState;
const incrementDemo = () => {
	demoState.count++;
	// lostCount does not re-render or update since it's disconnected
};

// ----- TRANSITION DEMO -----
const showBox = ref(true);

// ----- SCOPED SLOTS DEMO -----
const fakeTrigger = ref(0);
const triggerFetch = () => fakeTrigger.value++;

const DataFetcherComponent = defineComponent({
	props: ["fetchTrigger"],
	setup(props, { slots }) {
		const status = ref("loading");
		const data = ref<string[]>([]);

		const load = () => {
			status.value = "loading";
			setTimeout(() => {
				status.value = "success";
				data.value = ["Vue", "React", "Svelte"];
			}, 1500);
		};

		onMounted(load);
		watch(() => props.fetchTrigger, load);

		return () => {
			// Expose state up to parent slot
			if (slots.default) {
				return slots.default({ status: status.value, data: data.value });
			}
			return null;
		};
	},
});

// ----- KEEPALIVE DEMO -----
const activeTab = ref("A");

const TabAComponent = defineComponent({
	setup() {
		const draft = ref("");
		return () =>
			h("div", { class: "space-y-3 animate-in fade-in w-full text-left" }, [
				h(
					"p",
					{
						class: "text-xs text-slate-400 font-bold uppercase tracking-widest flex items-center gap-2",
					},
					[h("span", { class: "w-2 h-2 rounded-full bg-green-500" }), "Input Instance"],
				),
				h("input", {
					value: draft.value,
					onInput: (e: any) => (draft.value = e.target.value),
					placeholder: "Type, switch tabs, return...",
					class:
						"w-full px-3 py-2 bg-slate-900 border border-slate-600 rounded-lg text-white text-sm focus:outline-none focus:border-orange-500 transition-colors placeholder-slate-500",
				}),
			]);
	},
});

const TabBComponent = defineComponent({
	setup() {
		const count = ref(0);
		return () =>
			h("div", { class: "space-y-3 animate-in fade-in w-full text-left" }, [
				h(
					"p",
					{
						class: "text-xs text-slate-400 font-bold uppercase tracking-widest flex items-center gap-2",
					},
					[
						h("span", {
							class: "w-2 h-2 rounded-full bg-red-500 shadow-[0_0_10px_rgba(239,68,68,0.8)]",
						}),
						"Counter Instance",
					],
				),
				h("div", { class: "flex items-center gap-4" }, [
					h(
						"button",
						{
							onClick: () => count.value++,
							class:
								"px-4 py-2 bg-slate-700 hover:bg-slate-600 text-white font-medium border border-slate-600 rounded-lg transition-colors cursor-pointer",
						},
						`Increment`,
					),
					h("span", { class: "text-xl font-bold text-white font-mono" }, count.value),
				]),
			]);
	},
});
</script>

<style scoped>
.slide-fade-enter-active {
	transition: all 0.4s ease-out;
}
.slide-fade-leave-active {
	transition: all 0.3s cubic-bezier(1, 0.5, 0.8, 1);
}
.slide-fade-enter-from,
.slide-fade-leave-to {
	transform: translateX(-20px);
	opacity: 0;
}
</style>
