<script setup lang="ts">
import Switch from "@/components/ui/switch/Switch.vue";
import { computed, Directive, onMounted, reactive, ref, watch, watchEffect } from "vue";
import FirstInnerSpan from "./FirstInnerSpan.vue";
import SecondInnerSpan from "./SecondInnerSpan.vue";
import ThirdInnerSpan from "./ThirdInnerSpan.vue";
import SampleInput from "./SampleInput.vue";
import SimpleCard from "@/components/card/SimpleCard.vue";
import { useExperimentProvider } from "@/views/Home/composables/useExperimentState";
import ListItemTransition from "./ListItemTransition.vue";
import DataFetcher from "./DataFetcher.vue";

interface Props {
	count: number;
}

const props = withDefaults(defineProps<Props>(), {
	count: 0,
});

const toogled = ref(true);
const isClicked = ref(false);
const username = ref("");

const vFocus: Directive = {
	mounted(el: HTMLElement) {
		el.focus();
	},
};

const computedCount = computed(() => {
	return props.count * 2;
});

const handleClick = () => {
	isClicked.value = !isClicked.value;
};

// Provide context to children with type safety
useExperimentProvider({
	toggleState: toogled,
	username,
	incrementCount: () => {
		console.log("Increment called from child!");
	},
	resetState: () => {
		toogled.value = false;
		username.value = "";
		isClicked.value = false;
		console.log("State reset from child!");
	},
});

const unwatchToogle = watchEffect(() => {
	if (toogled.value === false) console.log("watching toogled:", toogled.value);
});

// manually stop the watch effect on other dependency
watch(isClicked, (newValue) => {
	if (newValue) unwatchToogle();
});

// watch(username, (newValue) => {
//   console.log("username changed..", newValue);
// });
</script>

<template>
	<div
		class="px-6 py-3.5 bg-gray-50 shadow-md flex flex-col items-center space-y-3 justify-between border-4 border-dashed border-gray-200 rounded-lg"
	>
		<h1 class="text-4xl text-blue-700 font-bold">Vue Experiment Lab</h1>
		<Switch v-model="toogled" :class="['transition-colors', 'data-[state=checked]:bg-red-500']"> </Switch>
		<p :class="['text-sm text-blue-500', toogled && 'text-red-500']">
			{{ computedCount }}
		</p>
		<button @click="handleClick">Testing</button>

		<!-- KeepAlive initially will cache all children, unless named component being excluded -->
		<KeepAlive exclude="firstspan">
			<component :is="toogled ? FirstInnerSpan : SecondInnerSpan"></component>
		</KeepAlive>

		<ThirdInnerSpan v-memo="[toogled, isClicked]" :isToogle="toogled" />

		<!-- Only components can passing v-model with naming as its expecting props received inside component -->
		<SampleInput v-focus v-model:username="username" />

		<SimpleCard>
			<template #inner-card="{ title, message }"> {{ title }} - {{ message }} </template>
		</SimpleCard>

		<Transition name="fade">
			<p v-if="isClicked">Fading Label</p>
		</Transition>

		<ListItemTransition />

		<DataFetcher />
	</div>
</template>
