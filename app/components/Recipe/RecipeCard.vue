<script setup lang="ts">
import type { Recipe } from "~/types/recipe";
import DifficultyTag from "~/components/Recipe/DifficultyTag.vue";
import HeartIcon from "~/components/svgs/HeartIcon.vue";

defineProps<{
  recipe: Recipe;
}>();

const { recipeImage } = useRecipes();
</script>

<template>
  <NuxtLink
    :to="`/recipes/${recipe.id}`"
    :aria-label="`View ${recipe.name}`"
    class="flex flex-col overflow-hidden transition group focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-600"
  >
    <div class="relative overflow-hidden bg-stone-200 aspect-[4/3]">
      <img
        :src="recipeImage(recipe.imageUrl)"
        :alt="recipe.name"
        class="object-cover w-full h-full transition duration-300 group-hover:scale-[1.03]"
      />
      <img
        :src="recipeImage(recipe.country.imagePath)"
        :alt="`${recipe.country.name} flag`"
        class="absolute object-cover w-9 h-6 bg-white border rounded-sm shadow-sm top-3 right-3 border-stone-200"
      />
      <span
        class="absolute flex items-center gap-1 px-2 py-1 text-xs font-medium rounded-full shadow-sm top-3 left-3 text-stone-700 bg-white/95"
        :aria-label="`${recipe.heartCount} likes`"
      >
        <HeartIcon class="size-4 text-brand-600" />
        {{ recipe.heartCount }}
      </span>
    </div>
    <div class="flex flex-col flex-1 gap-1.5 pt-3">
      <p class="text-xs font-semibold tracking-wide uppercase text-stone-500">
        {{ recipe.country.name }}
      </p>
      <h3
        class="text-lg font-bold leading-snug text-stone-900 transition-colors group-hover:text-brand-700"
      >
        {{ recipe.name }}
      </h3>
      <div class="flex items-center justify-between pt-1">
        <DifficultyTag :average="recipe.difficultyAverage" />
      </div>
    </div>
  </NuxtLink>
</template>
