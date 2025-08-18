<template>
	<span>Third Inner span : {{ isToogle }}</span>
</template>

<script setup lang="ts">
import { watchEffect } from "vue";

const props = defineProps<{
	isToogle: boolean;
}>();

watchEffect(() => {
	console.log("watching toogle state:", props.isToogle);
});
</script>
