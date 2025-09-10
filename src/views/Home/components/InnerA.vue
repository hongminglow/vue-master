<template>
	<div class="bg-green-50 border border-green-200 rounded-lg p-6">
		<div class="flex items-center mb-4">
			<div class="flex-shrink-0">
				<div class="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
					<span class="text-green-600 text-xl">📝</span>
				</div>
			</div>
			<div class="ml-4">
				<h3 class="text-lg font-medium text-green-900">Inner A Component</h3>
				<p class="text-green-700">This is a nested route component</p>
			</div>
		</div>

		<div class="space-y-4">
			<div class="bg-white p-4 rounded-md border border-green-200">
				<h4 class="font-semibold text-gray-800 mb-2">Counter from Parent: {{ counter }}</h4>
				<p class="text-gray-600 text-sm">
					This counter value is passed down from the parent Home component through router-view props.
				</p>
			</div>

			<div class="bg-white p-4 rounded-md border border-green-200">
				<h4 class="font-semibold text-gray-800 mb-2">Local State Demo</h4>
				<div class="flex items-center space-x-4">
					<button @click="localCount++" class="px-3 py-1 bg-green-600 text-white rounded text-sm hover:bg-green-700">
						Local Count: {{ localCount }}
					</button>
					<input
						v-model="inputValue"
						placeholder="Type something..."
						class="px-3 py-1 border border-gray-300 rounded text-sm"
					/>
					<span class="text-gray-600 text-sm">{{ inputValue }}</span>
				</div>
			</div>

			<div class="bg-white p-4 rounded-md border border-green-200">
				<h4 class="font-semibold text-gray-800 mb-2">Route Information</h4>
				<div class="text-sm text-gray-600 space-y-1">
					<p><strong>Current Route:</strong> {{ $route.path }}</p>
					<p><strong>Route Name:</strong> {{ $route.name }}</p>
					<p><strong>Parent Layout:</strong> Persistent (doesn't rerender on route change)</p>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import { ref } from "vue";

interface Props {
	counter?: number;
}

const props = withDefaults(defineProps<Props>(), {
	counter: 0,
});

// Local component state
const localCount = ref(0);
const inputValue = ref("");
</script>
