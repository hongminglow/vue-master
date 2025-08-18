<template>
  <input
    class="p-2 ml-2 border border-gray-400 bg-gray-200 rounded-md"
    type="text"
    :value="props.username"
    @input="onInput"
  />
</template>

<script lang="ts" setup>
const props = defineProps<{
  username: String;
}>();

const emit = defineEmits<{ (e: "update:username", v: string): void }>();

function onInput(e: Event) {
  emit("update:username", (e.target as HTMLInputElement).value);
}
</script>
