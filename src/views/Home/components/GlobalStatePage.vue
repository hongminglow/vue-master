<template>
  <div
    class="animate-in fade-in slide-in-from-bottom-4 duration-500 max-w-5xl mx-auto"
  >
    <ComparisonCard
      title="Global State Management"
      description="Comparing React's Zustand (or Context) vs Vue's Pinia."
      :reactCode="reactSnippet"
      :vueCode="vueSnippet"
    >
      <template #demo>
        <div class="flex flex-col gap-4">
          <p class="text-slate-200">
            Current Authenticated User:
            <span
              class="font-mono text-green-400 bg-green-500/10 px-2 py-1 rounded border border-green-500/20"
              >{{ user?.name || "Not logged in" }}</span
            >
          </p>
          <button
            @click="toggleAuth"
            class="max-w-fit px-5 py-2.5 border border-slate-600 text-slate-200 rounded-lg hover:bg-slate-700 hover:border-green-500 transition-colors font-bold cursor-pointer"
          >
            Toggle Dummy Authentication
          </button>
        </div>
      </template>
      <template #takeaway>
        <ul class="space-y-4">
          <li>
            <strong class="text-green-400 block mb-1"
              >📦 Zustand vs Pinia: Same Philosophy</strong
            >
            Both are tiny, closure-based stores. Zustand uses `create((set) =>
            ({ ... }))` to define state and actions. Pinia uses
            `defineStore('id', () => { ... })` with the same closure shape. Both
            feel like "just a hook" in their respective frameworks.
          </li>
          <li>
            <strong class="text-green-400 block mb-1"
              >🏛️ Pinia is Official & Built-in</strong
            >
            Unlike React where you choose among Redux, Zustand, Jotai, Recoil,
            etc., Vue officially recommends Pinia. It has first-class devtools
            support, SSR compatibility, and hot module replacement out of the
            box.
          </li>
          <li>
            <strong class="text-green-400 block mb-1"
              >🔗 No Selectors Needed</strong
            >
            In Zustand you write `useAuthStore(state => state.user)` selectors
            to avoid re-renders. In Pinia, you destructure freely with
            `storeToRefs()` or just access `authStore.user` directly — Vue's
            reactivity tracks it automatically, so only the parts you use
            trigger updates.
          </li>
          <li>
            <strong class="text-green-400 block mb-1"
              >🧩 Composable-Friendly</strong
            >
            Because Pinia stores are just composable functions internally (using
            `ref`, `computed`, regular functions), you can compose them, import
            one store into another, and test them like any other function. No
            middleware, no reducers, no boilerplate.
          </li>
        </ul>
      </template>
    </ComparisonCard>
  </div>
</template>

<script setup lang="ts">
import ComparisonCard from "@/components/ComparisonCard.vue";
import { useAuthStore } from "@/stores/auth";
import { computed } from "vue";

const authStore = useAuthStore();
const user = computed(() => authStore.user);

const toggleAuth = () => {
  if (user.value) {
    authStore.user = null;
  } else {
    authStore.user = { name: "Demo User", email: "demo@example.com" };
  }
};

const reactSnippet = `// Using Zustand
import { create } from 'zustand';

export const useAuthStore = create((set) => ({
  user: null, // state
  // actions
  setUser: (user) => set({ user }),
  logout: () => set({ user: null })
}));

// In component:
const user = useAuthStore(state => state.user);
const logout = useAuthStore(state => state.logout);
`;

const vueSnippet = `// stores/auth.ts
import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useAuthStore = defineStore('auth', () => {
  const user = ref(null); // state

  function login(u) {     // action
    user.value = u;
  }

  function logout() {     // action
    user.value = null;
  }

  return { user, login, logout };
});

// In component:
import { useAuthStore } from '@/stores/auth';
const authStore = useAuthStore();
// Note: no need to manually select state with selectors!
console.log(authStore.user);
authStore.logout();`;
</script>
