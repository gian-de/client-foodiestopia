<script setup lang="ts">
import type { Recipe } from "~/types/recipe";
import DifficultyTag from "~/components/Recipe/DifficultyTag.vue";
import HeartIcon from "~/components/svgs/HeartIcon.vue";
import { countrySearchPath, formatMinutes } from "~/utils/recipe";

defineProps<{
  recipe: Recipe;
}>();

const { recipeImage } = useRecipes();
</script>

<template>
  <article class="flex flex-col">
    <div
      class="relative overflow-hidden bg-stone-200 dark:bg-stone-800 aspect-[4/3]"
    >
      <NuxtLink
        :to="`/recipes/${recipe.id}`"
        :aria-label="`View ${recipe.name}`"
        class="block w-full h-full transition group focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-600"
      >
        <img
          :src="recipeImage(recipe.imageUrl)"
          :alt="recipe.name"
          class="object-cover w-full h-full transition duration-300 group-hover:scale-[1.03]"
        />
        <span
          class="absolute flex items-center gap-1 px-2 py-1 text-xs font-medium rounded-full shadow-sm top-3 left-3 text-stone-700 bg-white/95 dark:text-stone-200 dark:bg-stone-900/95"
          :aria-label="`${recipe.heartCount} likes`"
        >
          <HeartIcon class="size-4 text-brand-600" />
          {{ recipe.heartCount }}
        </span>
      </NuxtLink>
      <NuxtLink
        :to="countrySearchPath(recipe.country.name)"
        :aria-label="`Search ${recipe.country.name} recipes`"
        class="absolute z-10 object-cover top-3 right-3 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-600"
      >
        <img
          :src="recipeImage(recipe.country.imagePath)"
          :alt="`${recipe.country.name} flag`"
          class="object-cover w-9 h-6 bg-white border rounded-sm shadow-sm border-stone-200 dark:border-stone-600"
        />
      </NuxtLink>
    </div>
    <div class="flex flex-col flex-1 gap-1.5 pt-3">
      <NuxtLink
        :to="countrySearchPath(recipe.country.name)"
        class="text-xs font-semibold tracking-wide uppercase transition-colors text-stone-500 hover:text-brand-600 dark:text-stone-400 dark:hover:text-brand-400 w-fit focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-600"
      >
        {{ recipe.country.name }}
      </NuxtLink>
      <NuxtLink
        :to="`/recipes/${recipe.id}`"
        class="focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-600"
      >
        <h3
          class="text-lg font-bold leading-snug transition-colors text-stone-900 hover:text-brand-700 dark:text-stone-100 dark:hover:text-brand-400"
        >
          {{ recipe.name }}
        </h3>
      </NuxtLink>
      <div class="flex items-center justify-between pt-1">
        <DifficultyTag :average="recipe.difficultyAverage" />
        <p class="text-xs text-stone-500 dark:text-stone-400">
          {{ formatMinutes(recipe.totalTimeMinutes) }}
        </p>
      </div>
    </div>
  </article>
</template>
