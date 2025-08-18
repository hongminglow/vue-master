<script setup lang="ts">
import Switch from "@/components/ui/switch/Switch.vue";
import { computed, ref, watch, watchEffect } from "vue";
import FirstInnerSpan from "./FirstInnerSpan.vue";
import SecondInnerSpan from "./SecondInnerSpan.vue";
import ThirdInnerSpan from "./ThirdInnerSpan.vue";
import SampleInput from "./SampleInput.vue";
import SimpleCard from "@/components/card/SimpleCard.vue";

interface Props {
  count: number;
}

const props = withDefaults(defineProps<Props>(), {
  count: 0,
});

const toogled = ref(true);
const isClicked = ref(false);
const username = ref("");

const computedCount = computed(() => {
  return props.count * 2;
});

const handleClick = () => {
  isClicked.value = !isClicked.value;
};

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
    <Switch
      v-model="toogled"
      :class="['transition-colors', 'data-[state=checked]:bg-red-500']"
    >
    </Switch>
    <p :class="['text-sm text-blue-500', toogled && 'text-red-500']">
      {{ computedCount }}
    </p>
    <button @click="handleClick">Testing</button>

    <component :is="isClicked ? FirstInnerSpan : SecondInnerSpan"></component>

    <ThirdInnerSpan v-memo="[toogled, isClicked]" :isToogle="toogled" />

    <!-- Only components can passing v-model with naming as its expecting props received inside component -->
    <SampleInput v-model:username="username" />

    <SimpleCard>
      <template #inner-card="{ title, message }">
        {{ title }} - {{ message }}
      </template>
    </SimpleCard>

    <!-- TODO: TEST PROVIDE/INJECT -->
  </div>
</template>
