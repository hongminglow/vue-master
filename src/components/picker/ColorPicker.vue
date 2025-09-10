<template>
	<div class="grid grid-cols-2 gap-4 place-items-center">
		<input type="color" v-model="colorPreference" />

		<h1 class="text-3xl">Vue Is Good !</h1>
	</div>
</template>

<script setup lang="ts">
import { ref } from "vue";

const colorPreference = ref("black");
</script>

<style scoped>
:is(h1, h2, h3) {
	color: v-bind(colorPreference);
}
</style>
