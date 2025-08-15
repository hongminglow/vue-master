<template>
	<div id="app">
		<!-- This is like React's Router component -->
		<RouterView />
	</div>
</template>

<script setup lang="ts">
// Vue 3 Composition API - similar to React hooks but simpler
import { RouterView } from "vue-router";
</script>

<style scoped>
/* Scoped styles - only apply to this component */
#app {
	min-height: 100vh;
}
</style>
