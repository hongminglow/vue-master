<template>
	<div class="animate-in fade-in slide-in-from-bottom-4 duration-500 max-w-5xl mx-auto">
		<ComparisonCard
			title="Conditional Rendering (v-if / v-show)"
			description="Comparing React's ternary operators and && logic against Vue's directive-based conditionals."
			:reactCode="reactSnippet"
			:vueCode="vueSnippet"
		>
			<template #demo>
				<div class="flex flex-col gap-6 p-6 bg-slate-800 border-2 border-slate-700/50 rounded-xl shadow-lg relative">
					<div class="flex gap-4 mb-2">
						<button
							@click="status = 'loading'"
							class="flex-1 py-2 bg-slate-700 hover:bg-slate-600 rounded text-sm font-bold text-white transition-colors"
							:class="{ 'ring-2 ring-blue-500': status === 'loading' }"
						>
							Set Loading
						</button>
						<button
							@click="status = 'error'"
							class="flex-1 py-2 bg-slate-700 hover:bg-slate-600 rounded text-sm font-bold text-white transition-colors"
							:class="{ 'ring-2 ring-blue-500': status === 'error' }"
						>
							Set Error
						</button>
						<button
							@click="status = 'success'"
							class="flex-1 py-2 bg-slate-700 hover:bg-slate-600 rounded text-sm font-bold text-white transition-colors"
							:class="{ 'ring-2 ring-blue-500': status === 'success' }"
						>
							Set Success
						</button>
					</div>

					<div
						class="p-6 bg-[#0F172A] border border-slate-700 rounded-lg min-h-[120px] shadow-inner flex items-center justify-center transition-all duration-300"
					>
						<!-- Here comes the beautiful v-if / v-else-if / v-else ! -->
						<div v-if="status === 'loading'" class="flex flex-col items-center gap-3">
							<span class="text-3xl animate-spin">⏳</span>
							<p class="text-blue-400 font-mono font-bold tracking-wider">Fetching secure data...</p>
						</div>

						<div v-else-if="status === 'error'" class="flex flex-col items-center gap-3">
							<span class="text-3xl">❌</span>
							<p class="text-red-400 font-mono font-bold tracking-wider">Failed to authenticate!</p>
						</div>

						<div v-else class="flex flex-col items-center gap-3">
							<span class="text-3xl">✅</span>
							<p class="text-green-400 font-mono font-bold tracking-wider">Dashboard fully loaded.</p>
						</div>
					</div>

					<div class="flex items-center gap-3 mt-2 bg-slate-900/50 p-4 rounded-lg border border-slate-700">
						<span class="text-sm font-bold text-slate-300">Toggle hidden feature:</span>
						<button
							@click="showFeature = !showFeature"
							class="px-3 py-1 bg-slate-700 hover:bg-slate-600 text-white rounded font-bold text-sm"
						>
							{{ showFeature ? "Hide" : "Show" }}
						</button>
						<span v-show="showFeature" class="text-amber-400 font-mono text-sm ml-auto animate-pulse">
							✨ Super Secret Feature Revealed ✨
						</span>
					</div>
				</div>
			</template>

			<template #takeaway>
				<ul class="space-y-4">
					<li>
						<strong class="text-green-400 block mb-1">✂️ No more Ternary Hell</strong>
						React developers are forced to use `condition ? <A /> : <B />` or `condition && <A />` everywhere. This gets
						extremely ugly and unreadable when chaining multiple conditions. Vue puts conditionals back where they
						belong: directly on the HTML templates using `v-if`, `v-else-if`, and `v-else`.
					</li>
					<li>
						<strong class="text-green-400 block mb-1">🗑️ Real DOM Removal (v-if)</strong>
						`v-if` is "real" conditional rendering. If the condition is false, the element is completely erased from the
						DOM. Its lifecycle hooks (`onUnmounted`) are triggered, and it stops taking up any memory. Use this for
						things that rarely toggle.
					</li>
					<li>
						<strong class="text-green-400 block mb-1">👻 CSS Hiding (v-show)</strong>
						`v-show` simply toggles Javascript's equivalent of `display: none` via CSS. The element is fully rendered
						and stays in the DOM securely. Use `v-show` when toggling something extremely frequently (like a dropdown
						menu or accordion), as it is incredibly fast and saves Vue from re-painting DOM nodes!
					</li>
				</ul>
			</template>
		</ComparisonCard>
	</div>
</template>

<script setup lang="ts">
import ComparisonCard from "@/components/ComparisonCard.vue";
import { ref } from "vue";

type Status = "loading" | "error" | "success";

const status = ref<Status>("loading");
const showFeature = ref(false);

const reactSnippet = `function Dashboard() {
  const [status, setStatus] = useState("loading");
  const [showFeature, setShowFeature] = useState(false);

  // Return structure using chained ternaries and logical AND
  return (
    <div>
      {status === "loading" ? (
        <LoadingSpinner />
      ) : status === "error" ? (
        <ErrorMessage />
      ) : (
        <SuccessDashboard />
      )}
      
      {/* React has no native v-show. We must inject a style prop. */}
      <div style={{ display: showFeature ? 'block' : 'none' }}>
        Secret Hidden Feature
      </div>
    </div>
  );
}`;

const vueSnippet = `<template>
  <div>
    <!-- Clean, readable, sequential logic -->
    <LoadingSpinner v-if="status === 'loading'" />
    <ErrorMessage v-else-if="status === 'error'" />
    <SuccessDashboard v-else />

    <!-- Vue natively handles the CSS "display:none" optimization -->
    <div v-show="showFeature">
      Secret Hidden Feature
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const status = ref('loading');
const showFeature = ref(false);
<\/script>`;
</script>
