<template>
  <form.Subscribe>
    <template #default="{ canSubmit, isSubmitting }">
      <BaseButton
        type="submit"
        :variant="variant"
        :size="size"
        :full-width="fullWidth"
        :disabled="!canSubmit"
        :is-loading="isSubmitting"
        :loading-text="loadingText"
        @click="handleSubmit"
      >
        <slot>{{ label }}</slot>
      </BaseButton>
    </template>
  </form.Subscribe>
</template>

<script setup lang="ts">
import BaseButton from "./BaseButton.vue";

interface Props {
  form: any; // TanStack form instance
  label?: string;
  variant?: "primary" | "secondary" | "danger" | "outline";
  size?: "sm" | "md" | "lg";
  fullWidth?: boolean;
  loadingText?: string;
}

const props = withDefaults(defineProps<Props>(), {
  label: "Submit",
  variant: "primary",
  size: "md",
  fullWidth: false,
  loadingText: "Loading...",
});

const handleSubmit = (e: Event) => {
  e.preventDefault();
  props.form.handleSubmit();
};
</script>
