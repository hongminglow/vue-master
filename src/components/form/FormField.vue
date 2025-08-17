<template>
  <form.Field :name="name">
    <template #default="{ field }">
      <BaseInput
        :id="name"
        :name="name"
        v-bind="$attrs"
        :model-value="field.state.value"
        :error="field.state.meta.errors[0]"
        @update:model-value="field.handleChange"
        @blur="field.handleBlur"
      />
    </template>
  </form.Field>
</template>

<script setup lang="ts">
import BaseInput from "./BaseInput.vue";

interface Props {
  form: any; // TanStack form instance
  name: string;
}

defineProps<Props>();
defineOptions({ inheritAttrs: false });
</script>
