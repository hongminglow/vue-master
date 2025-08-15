<template>
	<button :type="type" :disabled="disabled || isLoading" :class="buttonClasses" @click="handleClick">
		<slot v-if="!isLoading" />
		<div v-else class="flex items-center">
			<svg
				class="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
				xmlns="http://www.w3.org/2000/svg"
				fill="none"
				viewBox="0 0 24 24"
			>
				<circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
				<path
					class="opacity-75"
					fill="currentColor"
					d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
				></path>
			</svg>
			<span>{{ loadingText }}</span>
		</div>
	</button>
</template>

<script setup lang="ts">
import { computed } from "vue";

interface Props {
	type?: "button" | "submit" | "reset";
	variant?: "primary" | "secondary" | "danger" | "outline";
	size?: "sm" | "md" | "lg";
	disabled?: boolean;
	isLoading?: boolean;
	loadingText?: string;
	fullWidth?: boolean;
}

interface Emits {
	(e: "click", event: MouseEvent): void;
}

const props = withDefaults(defineProps<Props>(), {
	type: "button",
	variant: "primary",
	size: "md",
	disabled: false,
	isLoading: false,
	loadingText: "Loading...",
	fullWidth: false,
});

const emit = defineEmits<Emits>();

const buttonClasses = computed(() => {
	const baseClasses = [
		"inline-flex items-center justify-center font-medium rounded-md",
		"focus:outline-none focus:ring-2 focus:ring-offset-2",
		"disabled:opacity-50 disabled:cursor-not-allowed",
		"transition-colors duration-200",
	];

	// Size classes
	const sizeClasses = {
		sm: "px-3 py-2 text-sm",
		md: "px-4 py-2 text-sm",
		lg: "px-6 py-3 text-base",
	};

	// Variant classes
	const variantClasses = {
		primary: ["text-white bg-indigo-600 hover:bg-indigo-700", "focus:ring-indigo-500 border border-transparent"],
		secondary: ["text-indigo-700 bg-indigo-100 hover:bg-indigo-200", "focus:ring-indigo-500 border border-transparent"],
		danger: ["text-white bg-red-600 hover:bg-red-700", "focus:ring-red-500 border border-transparent"],
		outline: ["text-indigo-700 bg-white hover:bg-indigo-50", "focus:ring-indigo-500 border border-indigo-300"],
	};

	// Width classes
	const widthClasses = props.fullWidth ? "w-full" : "";

	return [...baseClasses, sizeClasses[props.size], ...variantClasses[props.variant], widthClasses].filter(Boolean);
});

const handleClick = (event: MouseEvent) => {
	if (!props.disabled && !props.isLoading) {
		emit("click", event);
	}
};
</script>
