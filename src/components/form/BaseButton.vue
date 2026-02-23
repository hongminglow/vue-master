<template>
  <button
    :type="type"
    :disabled="disabled || isLoading"
    :class="buttonClasses"
    @click="handleClick"
  >
    <slot v-if="!isLoading" />
    <div v-else class="flex items-center">
      <svg
        class="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
      >
        <circle
          class="opacity-25"
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          stroke-width="4"
        ></circle>
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
    "transition-colors duration-200 cursor-pointer",
  ];

  // Size classes
  const sizeClasses = {
    sm: "px-3 py-2 text-sm",
    md: "px-4 py-2 text-sm",
    lg: "px-6 py-3 text-base",
  };

  // Variant classes
  const variantClasses = {
    primary: [
      "text-slate-900 bg-green-500 hover:bg-green-400 font-bold tracking-wide",
      "focus:ring-green-500 border border-transparent",
    ],
    secondary: [
      "text-slate-300 bg-slate-800 hover:bg-slate-700",
      "focus:ring-slate-500 border border-slate-600",
    ],
    danger: [
      "text-white bg-red-500 hover:bg-red-400",
      "focus:ring-red-500 border border-transparent",
    ],
    outline: [
      "text-green-500 bg-transparent hover:bg-slate-800",
      "focus:ring-green-500 border border-green-500",
    ],
  };

  // Width classes
  const widthClasses = props.fullWidth ? "w-full" : "";

  return [
    ...baseClasses,
    sizeClasses[props.size],
    ...variantClasses[props.variant],
    widthClasses,
  ].filter(Boolean);
});

const handleClick = (event: MouseEvent) => {
  if (!props.disabled && !props.isLoading) {
    emit("click", event);
  }
};
</script>
