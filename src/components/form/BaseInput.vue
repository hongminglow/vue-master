<template>
  <div class="space-y-1">
    <label v-if="label" :for="id" :class="labelClass">
      {{ label }}
      <span v-if="required" class="text-red-500">*</span>
    </label>

    <input
      :id="id"
      :name="name"
      :type="type"
      :placeholder="placeholder"
      :required="required"
      :disabled="disabled"
      :value="modelValue"
      :class="inputClasses"
      @input="handleInput"
      @blur="handleBlur"
      @focus="handleFocus"
    />

    <div v-if="error" class="text-red-600 text-sm mt-1">
      {{ error }}
    </div>

    <div v-if="hint && !error" class="text-gray-500 text-sm mt-1">
      {{ hint }}
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";

interface Props {
  id?: string;
  name?: string;
  type?: "text" | "email" | "password" | "tel" | "url" | "search" | "number";
  label?: string;
  placeholder?: string;
  modelValue?: string;
  error?: string;
  hint?: string;
  required?: boolean;
  disabled?: boolean;
  size?: "sm" | "md" | "lg";
  variant?: "default" | "rounded" | "rounded-top" | "rounded-bottom";
}

interface Emits {
  (e: "update:modelValue", value: string): void;
  (e: "blur", event: FocusEvent): void;
  (e: "focus", event: FocusEvent): void;
}

const props = withDefaults(defineProps<Props>(), {
  type: "text",
  size: "md",
  variant: "default",
  required: false,
  disabled: false,
});

const emit = defineEmits<Emits>();

const inputClasses = computed(() => {
  const baseClasses = [
    "relative block w-full px-4 py-2.5 border bg-slate-900 border-slate-700/80 placeholder-slate-500 text-slate-50",
    "focus:outline-none focus:ring-2 focus:ring-green-500/50 focus:border-green-500 transition-all",
    "disabled:opacity-50 disabled:cursor-not-allowed",
  ];

  // Size classes
  const sizeClasses = {
    sm: "text-xs",
    md: "text-sm",
    lg: "text-base",
  };

  // Variant classes
  const variantClasses = {
    default: "rounded-lg",
    rounded: "rounded-lg border-slate-700",
    "rounded-top": "rounded-t-lg rounded-none",
    "rounded-bottom": "rounded-b-lg rounded-none",
  };

  // Error state
  const errorClasses = props.error ? "border-red-500" : "border-slate-700";

  return [
    ...baseClasses,
    sizeClasses[props.size],
    variantClasses[props.variant],
    errorClasses,
  ];
});

const labelClass = computed(() => {
  return props.variant === "default"
    ? "block text-sm font-medium text-slate-300 mb-1"
    : "sr-only";
});

const handleInput = (event: Event) => {
  const target = event.target as HTMLInputElement;
  emit("update:modelValue", target.value);
};

const handleBlur = (event: FocusEvent) => {
  emit("blur", event);
};

const handleFocus = (event: FocusEvent) => {
  emit("focus", event);
};
</script>
