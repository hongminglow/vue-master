<template>
  <div
    class="min-h-screen flex items-center justify-center bg-slate-900 relative overflow-hidden"
  >
    <!-- Vue Master Vibrant Shapes -->
    <div
      class="absolute top-[10%] left-[10%] w-[20vw] h-[20vw] border-[40px] border-green-500/20 rounded-full animate-spin-slow pointer-events-none"
    ></div>
    <div
      class="absolute bottom-[20%] right-[10%] w-[15vw] h-[15vw] border-[30px] border-slate-700/50 rounded-lg rotate-45 pointer-events-none"
    ></div>

    <div
      class="relative z-10 max-w-md w-full space-y-8 p-10 bg-slate-800 border border-slate-700/50 rounded-2xl shadow-2xl"
    >
      <LoginHeader />
      <LoginForm :is-loading="isLoading" :error="error" @submit="handleLogin" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useAuthStore } from "@/stores/auth";
import LoginHeader from "./components/LoginHeader.vue";
import LoginForm from "./components/LoginForm.vue";
import type { LoginFormData } from "./composables/useLoginForm";

// Reactive variables
const isLoading = ref(false);
const error = ref("");

// Router and store
const router = useRouter();
const authStore = useAuthStore();

// Handle login submission
const handleLogin = async (formData: LoginFormData) => {
  isLoading.value = true;
  error.value = "";

  try {
    const success = await authStore.login(formData.email, formData.password);

    if (success) {
      await router.push("/");
    } else {
      error.value = "Invalid email or password";
    }
  } catch (err) {
    error.value = "An error occurred during login";
  } finally {
    isLoading.value = false;
  }
};
</script>
