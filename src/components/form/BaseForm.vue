<template>
	<form @submit.prevent="handleSubmit">
		<slot :isValid="isValid" :isSubmitting="isSubmitting" />
	</form>
</template>

<script setup lang="ts">
import { ref } from "vue";

interface Props {
	isValid?: boolean;
}

interface Emits {
	(e: "submit", event: Event): void;
}

const props = defineProps<Props>();
const emit = defineEmits<Emits>();

const isSubmitting = ref(false);

const handleSubmit = async (event: Event) => {
	if (!props.isValid) return;

	isSubmitting.value = true;
	try {
		emit("submit", event);
	} finally {
		isSubmitting.value = false;
	}
};
</script>
