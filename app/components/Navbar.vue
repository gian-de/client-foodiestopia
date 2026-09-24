<script setup lang="ts">
import { NuxtLink } from "#components";
import ThemeToggle from "~/components/ThemeToggle.vue";

const navAuthLinks = [
  { id: 1, name: "Register", to: "/register" },
  { id: 2, name: "Login", to: "/login" },
];

const auth = useAuthStore();
const { isAuthenticated } = storeToRefs(auth);

function onClickSignOut() {
  auth.logout();
}
</script>

<template>
  <nav
    class="sticky top-0 z-30 px-6 py-4 bg-white border-b border-stone-200 dark:bg-stone-900 dark:border-stone-800"
  >
    <div class="flex items-center justify-between max-w-6xl mx-auto">
      <NuxtLink
        to="/"
        class="text-2xl font-bold tracking-tight text-brand-600 transition-colors hover:text-brand-700 dark:text-brand-500 dark:hover:text-brand-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-600"
      >
        Foodiestopia
      </NuxtLink>
      <ClientOnly>
        <div class="flex items-center gap-2 sm:gap-4">
          <ThemeToggle />
          <div
            v-if="isAuthenticated"
            class="flex items-center gap-4 text-sm font-medium text-stone-700 dark:text-stone-300"
          >
            <button
              type="button"
              class="transition-colors hover:text-brand-600 dark:hover:text-brand-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-600"
              @click="onClickSignOut"
            >
              Sign out
            </button>
          </div>
          <div v-else class="flex items-center gap-4 text-sm font-medium">
            <NuxtLink
              v-for="link in navAuthLinks"
              :key="link.id"
              :to="link.to"
              class="text-stone-700 transition-colors hover:text-brand-600 dark:text-stone-300 dark:hover:text-brand-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-600"
              active-class="!text-brand-600 dark:!text-brand-400"
            >
              {{ link.name }}
            </NuxtLink>
          </div>
        </div>
      </ClientOnly>
    </div>
  </nav>
</template>
