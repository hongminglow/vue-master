<template>
	<div class="p-4 border border-gray-300 rounded-lg bg-blue-50">
		<h3 class="font-semibold text-blue-800 mb-2">Third Inner Span - Injected Context</h3>
		<p class="mb-2">Toggle state from context: {{ toggleState }}</p>
		<p class="mb-2">Username from context: "{{ username }}"</p>

		<div class="space-x-2">
			<button @click="incrementCount" class="px-2 py-1 bg-blue-500 text-white rounded text-sm">Call Increment</button>
			<button @click="resetState" class="px-2 py-1 bg-red-500 text-white rounded text-sm">Reset State</button>
		</div>
	</div>
</template>

<script setup lang="ts">
import { watchEffect } from "vue";
import { useExperimentState } from "@/views/Home/composables/useExperimentState";

const props = defineProps<{
	isToogle: boolean;
}>();

// Inject the type-safe context
const { toggleState, username, incrementCount, resetState } = useExperimentState();

watchEffect(() => {
	console.log("watching toogle state from prop:", props.isToogle);
	console.log("watching toggle state from context:", toggleState.value);
});
</script>
