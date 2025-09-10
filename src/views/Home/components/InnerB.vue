<template>
	<div class="bg-purple-50 border border-purple-200 rounded-lg p-6">
		<div class="flex items-center mb-4">
			<div class="flex-shrink-0">
				<div class="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
					<span class="text-purple-600 text-xl">🎯</span>
				</div>
			</div>
			<div class="ml-4">
				<h3 class="text-lg font-medium text-purple-900">Inner B Component</h3>
				<p class="text-purple-700">Another nested route component with different content</p>
			</div>
		</div>

		<div class="space-y-4">
			<div class="bg-white p-4 rounded-md border border-purple-200">
				<h4 class="font-semibold text-gray-800 mb-2">Interactive Chart Demo</h4>
				<div class="h-32 bg-gradient-to-r from-purple-100 to-purple-200 rounded flex items-center justify-center">
					<div class="text-center">
						<div class="text-2xl font-bold text-purple-800">{{ chartValue }}%</div>
						<div class="text-sm text-purple-600">Progress Indicator</div>
					</div>
				</div>
				<div class="mt-2 flex space-x-2">
					<button @click="updateChart" class="px-3 py-1 bg-purple-600 text-white rounded text-sm hover:bg-purple-700">
						Update Chart
					</button>
					<button @click="resetChart" class="px-3 py-1 bg-gray-500 text-white rounded text-sm hover:bg-gray-600">
						Reset
					</button>
				</div>
			</div>

			<div class="bg-white p-4 rounded-md border border-purple-200">
				<h4 class="font-semibold text-gray-800 mb-2">Parent Counter: {{ counter }}</h4>
				<div class="grid grid-cols-2 gap-4">
					<div class="text-center p-3 bg-purple-50 rounded">
						<div class="text-xl font-bold text-purple-800">{{ counter * 2 }}</div>
						<div class="text-xs text-purple-600">Doubled</div>
					</div>
					<div class="text-center p-3 bg-purple-50 rounded">
						<div class="text-xl font-bold text-purple-800">{{ counter * counter }}</div>
						<div class="text-xs text-purple-600">Squared</div>
					</div>
				</div>
			</div>

			<div class="bg-white p-4 rounded-md border border-purple-200">
				<h4 class="font-semibold text-gray-800 mb-2">Todo List</h4>
				<div class="space-y-2">
					<div class="flex space-x-2">
						<input
							v-model="newTodo"
							@keyup.enter="addTodo"
							placeholder="Add a todo..."
							class="flex-1 px-3 py-1 border border-gray-300 rounded text-sm"
						/>
						<button @click="addTodo" class="px-3 py-1 bg-purple-600 text-white rounded text-sm hover:bg-purple-700">
							Add
						</button>
					</div>
					<ul class="space-y-1">
						<li
							v-for="(todo, index) in todos"
							:key="index"
							class="flex items-center justify-between py-1 px-2 bg-purple-50 rounded text-sm"
						>
							<span :class="{ 'line-through text-gray-500': todo.completed }">
								{{ todo.text }}
							</span>
							<div class="space-x-1">
								<button
									@click="toggleTodo(index)"
									class="text-xs px-2 py-1 bg-purple-100 text-purple-700 rounded hover:bg-purple-200"
								>
									{{ todo.completed ? "Undo" : "Done" }}
								</button>
								<button
									@click="removeTodo(index)"
									class="text-xs px-2 py-1 bg-red-100 text-red-700 rounded hover:bg-red-200"
								>
									×
								</button>
							</div>
						</li>
					</ul>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import { computed, ref } from "vue";

interface Props {
	counter?: number;
}

const props = withDefaults(defineProps<Props>(), {
	counter: 0,
});

// Chart demo state
const chartValue = ref(75);

const updateChart = () => {
	chartValue.value = Math.floor(Math.random() * 100);
};

const resetChart = () => {
	chartValue.value = 75;
};

// Todo list state
const newTodo = ref("");
const todos = ref([
	{ text: "Learn Vue 3 nested routes", completed: false },
	{ text: "Build awesome components", completed: true },
	{ text: "Master TypeScript integration", completed: false },
]);

const addTodo = () => {
	if (newTodo.value.trim()) {
		todos.value.push({
			text: newTodo.value.trim(),
			completed: false,
		});
		newTodo.value = "";
	}
};

const toggleTodo = (index: number) => {
	todos.value[index].completed = !todos.value[index].completed;
};

const removeTodo = (index: number) => {
	todos.value.splice(index, 1);
};
</script>
