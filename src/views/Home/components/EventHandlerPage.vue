<template>
	<div class="animate-in fade-in slide-in-from-bottom-4 duration-500 max-w-5xl mx-auto">
		<ComparisonCard
			title="Event Handling (@click / modifiers)"
			description="Comparing React's SyntheticEvents (onClick) against Vue's template events and inline modifiers (@click)."
			:reactCode="reactSnippet"
			:vueCode="vueSnippet"
		>
			<template #demo>
				<div class="flex flex-col gap-6 p-6 bg-slate-800 border-2 border-slate-700/50 rounded-xl shadow-lg relative">
					<div
						@click="log('Outer DIV clicked (Bubbled up)!')"
						class="p-8 bg-[#0F172A] border-[3px] border-dashed border-slate-600 hover:border-slate-500 rounded-xl max-w-md w-full cursor-pointer relative transition-colors shadow-inner"
					>
						<span class="text-xs absolute top-3 right-3 text-slate-500 font-mono tracking-wider font-bold"
							>Outer Tracking Div</span
						>

						<button
							@click.stop="log('Inner Button clicked! 🛑 Vue automatically stopped propagation via `.stop`')"
							class="px-5 py-2.5 rounded-lg shadow bg-slate-900 border border-slate-700 hover:border-green-500 hover:text-green-400 font-bold text-slate-300 transition-colors cursor-pointer"
						>
							Click me (with @click.stop)
						</button>
						<p class="text-xs text-slate-400 mt-4 leading-relaxed font-medium">
							Notice how clicking the button
							<strong class="text-green-400">DOES NOT</strong> trigger the outer div's click tracker because we added
							the `.stop` modifier.
						</p>
					</div>

					<div
						class="mt-2 p-5 bg-slate-900 border-l-4 border-green-500 rounded text-sm text-green-400 font-mono font-bold min-h-[60px] shadow-sm tracking-wide"
					>
						{{ lastMessage }}
					</div>
				</div>
			</template>

			<template #takeaway>
				<ul class="space-y-4">
					<li>
						<strong class="text-green-400 block mb-1">🎭 Direct DOM vs Synthetic</strong>
						React binds events via JSX camelCase props: (`onClick`, `onSubmit`) and routes them through a massive global
						Synthetic Event root system. Vue attaches actual standard browser DOM Event Listeners mapped straight to the
						element via `v-on:` (or the shorthand `@`).
					</li>
					<li>
						<strong class="text-green-400 block mb-1">🛠️ Powerful Inline Modifiers</strong>
						The absolute highest productivity feature in Vue templates. Instead of explicitly calling
						`e.stopPropagation()` inside a Javascript function, Vue provides powerful inline modifiers attached cleanly
						to the event via a dot suffix. `@click.stop` immediately handles bubbling natively.
					</li>
					<li>
						<strong class="text-green-400 block mb-1">🛑 e.preventDefault() no more</strong>
						`e.preventDefault()` logic inside standard Javascript `onSubmit` handlers is completely eliminated by
						attaching the simplest modifier: `&lt;form @submit.prevent="submitForm"&gt;`.
					</li>
					<li>
						<strong class="text-green-400 block mb-1">⌨️ Exact Key Tracking</strong>
						For keyboard events, you no longer need `if (e.key === 'Enter')` wrappers inside your logic block. You can
						specify exact tracking straight onto the HTML attribute: `@keyup.enter="trigger"` or `@keyup.ctrl.c="copy"`.
						Clean, beautiful, and completely decoupled from JS logic.
					</li>
					<li class="p-4 bg-slate-800/80 rounded-lg border-2 border-blue-500/30 mt-4">
						<strong class="text-blue-400 block mb-2 text-lg">💡 Beginner's Golden Rule: Events Under the Hood</strong>
						<div class="space-y-3 text-slate-300">
							<p>
								<strong>What is the difference between <code>v-on:click</code> and <code>@click</code>?</strong>
								<br />Absolutely nothing! <code>@</code> is simply the exact typing syntax shorthand for the
								<code>v-on:</code> directive. Just like React developers never type <code>React.Fragment</code> (they
								use <code>&lt;&gt;</code>), Vue developers exclusively use the <code>@</code> shorthand to save
								keystrokes. You will almost never see <code>v-on:</code> in modern Vue codebars.
							</p>
							<p>
								<strong>The "SyntheticEvent" illusion</strong>
								<br />In React, the <code>event</code> object you receive in an <code>onClick</code> is a massive global
								wrapper object engineered by the React team called a <strong>SyntheticEvent</strong>. To get the actual
								underlying browser event, you have to dig into <code>e.nativeEvent</code>.
							</p>
							<p>
								Vue completely skips this entire layer. When a Vue <code>@click</code> fires, the
								<code>event</code> parameter injected into your function is the
								<strong>100% genuine, raw, standard browser event</strong> (like <code>MouseEvent</code> or
								<code>KeyboardEvent</code>). There is no wrapper, no pooling logic, and no
								<code>e.nativeEvent</code> tunneling required!
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
import { ref } from "vue";

const lastMessage = ref("Waiting for user action events...");

const log = (msg: string) => {
	lastMessage.value = `[${new Date().toLocaleTimeString()}] ${msg}`;
};

const reactSnippet = `function EventDemo() {
  const handleClick = (e) => {
    // Manually stop propagation inside the Javascript logic
    e.stopPropagation();
    console.log("Inner Button clicked");
  };

  const handleForm = (e) => {
    // Manually prevent default in Javascript
    e.preventDefault();
  };

  return (
    <div onClick={() => console.log('Outer')}>
      <button onClick={handleClick}>Click Me</button>
      <form onSubmit={handleForm}>...</form>
    </div>
  );
}`;

const vueSnippet = `<template>
  <div @click="console.log('Outer')">

    <!-- Modifiers explicitly prevent default or stop propagation direct in HTML! -->
    <!-- Your Javascript functions NEVER need to take the 'event' param anymore -->
    <button @click.stop="handleClick">
      Click Me
    </button>

    <form @submit.prevent="handleForm">
      ...
    </form>

    <!-- Bonus: Exact Keyboard Modifiers! -->
    <input @keyup.enter="submitSearch" />
    <input @keyup.ctrl.c="copyText" />
  </div>
</template>`;
</script>
