<script setup lang="ts">
import Navbar from "~/components/Navbar.vue";
</script>

<template>
  <div
    class="min-h-screen text-stone-900 bg-stone-50 dark:text-stone-100 dark:bg-stone-950"
  >
    <Navbar />
    <main class="max-w-6xl mx-auto">
      <slot />
    </main>
  </div>
</template>
