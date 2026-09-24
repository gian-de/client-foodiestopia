<script setup lang="ts">
import MoonIcon from "~/components/svgs/MoonIcon.vue";
import SunIcon from "~/components/svgs/SunIcon.vue";

const theme = useThemeStore();
const { isDark } = storeToRefs(theme);
</script>

<template>
  <button
    type="button"
    class="p-2 rounded-md transition-colors text-stone-600 hover:text-brand-600 hover:bg-stone-100 dark:text-stone-300 dark:hover:text-brand-400 dark:hover:bg-stone-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-600"
    :aria-label="isDark ? 'Switch to light mode' : 'Switch to dark mode'"
    @click="theme.toggle()"
  >
    <SunIcon v-if="isDark" />
    <MoonIcon v-else />
  </button>
</template>
