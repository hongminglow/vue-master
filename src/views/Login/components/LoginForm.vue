<template>
  <form @submit.prevent="">
    <div class="mt-8 space-y-6">
      <div class="space-y-5">
        <FormField
          :form="form"
          name="email"
          type="email"
          label="Email address"
          placeholder="name@example.com"
          variant="default"
          required
        />

        <FormField
          :form="form"
          name="password"
          type="password"
          label="Password"
          placeholder="Enter your password"
          variant="default"
          required
        />
      </div>

      <!-- Error message -->
      <div v-if="error" class="text-red-600 text-sm text-center">
        {{ error }}
      </div>

      <div>
        <SubmitButton
          :form="form"
          label="Sign in"
          variant="primary"
          size="md"
          full-width
          :is-loading="isLoading"
          loading-text="Signing in..."
        />
      </div>
    </div>
  </form>
</template>

<script setup lang="ts">
import FormField from "@/components/form/FormField.vue";
import SubmitButton from "@/components/form/SubmitButton.vue";
import {
  useLoginForm,
  type LoginFormData,
} from "@/views/Login/composables/useLoginForm";

interface Props {
  isLoading?: boolean;
  error?: string;
}

interface Emits {
  (e: "submit", data: LoginFormData): void;
}

withDefaults(defineProps<Props>(), {
  isLoading: false,
  error: "",
});

const emit = defineEmits<Emits>();

// Handle form submission callback
const onSubmit = async (data: LoginFormData) => {
  emit("submit", data);
};

// Use the login form composable with proper submission handling
const { form } = useLoginForm(onSubmit);
</script>
