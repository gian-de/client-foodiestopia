<script setup lang="ts">
import DifficultyTag from "~/components/Recipe/DifficultyTag.vue";
import HeartIcon from "~/components/svgs/HeartIcon.vue";
import { countrySearchPath, formatMinutes } from "~/utils/recipe";

const route = useRoute();
const { fetchRecipeById, recipeImage } = useRecipes();

const {
  data: recipe,
  pending: isLoading,
  error,
} = await useAsyncData(
  () => `recipe-${route.params.id}`,
  () => fetchRecipeById(String(route.params.id))
);

const errorMessage = computed(
  () =>
    (error.value as any)?.data?.message ||
    error.value?.message ||
    ""
);

const sortedInstructions = computed(() => {
  if (!recipe.value) return [];
  return [...recipe.value.instructions].sort((a, b) => a.order - b.order);
});

function formatIngredient(quantity: number, measurement: string | null) {
  const amount = Number.isInteger(quantity)
    ? String(quantity)
    : String(quantity);
  const unit = measurement?.trim();
  return unit ? `${amount} ${unit}` : amount;
}
</script>

<template>
  <div class="px-6 py-10 space-y-8">
    <NuxtLink
      to="/"
      class="inline-flex items-center text-sm font-medium transition-colors text-stone-600 hover:text-brand-600 dark:text-stone-400 dark:hover:text-brand-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-600"
    >
      ← Back to recipes
    </NuxtLink>

    <div
      v-if="errorMessage"
      class="p-3 text-red-700 bg-red-50 border border-red-200 rounded-md dark:text-red-300 dark:bg-red-950 dark:border-red-900"
      role="alert"
    >
      {{ errorMessage }}
    </div>

    <p v-else-if="isLoading" class="text-stone-600 dark:text-stone-400">
      Loading recipe...
    </p>

    <article v-else-if="recipe" class="max-w-3xl mx-auto space-y-8">
      <div
        class="relative overflow-hidden bg-stone-200 dark:bg-stone-800 rounded-lg"
      >
        <img
          :src="recipeImage(recipe.imageUrl)"
          :alt="recipe.name"
          class="object-cover w-full max-h-[480px]"
        />
        <NuxtLink
          :to="countrySearchPath(recipe.country.name)"
          :aria-label="`Search ${recipe.country.name} recipes`"
          class="absolute top-4 right-4 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-600"
        >
          <img
            :src="recipeImage(recipe.country.imagePath)"
            :alt="`${recipe.country.name} flag`"
            class="object-cover w-12 h-8 bg-white border rounded-sm shadow-sm border-stone-200"
          />
        </NuxtLink>
      </div>

      <header class="space-y-4">
        <NuxtLink
          :to="countrySearchPath(recipe.country.name)"
          class="inline-flex items-center gap-2 text-xs font-semibold tracking-wide uppercase transition-colors text-stone-500 hover:text-brand-600 dark:text-stone-400 dark:hover:text-brand-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-600"
        >
          <img
            :src="recipeImage(recipe.country.imagePath)"
            alt=""
            class="object-cover w-8 h-5 bg-white border rounded-sm border-stone-200 dark:border-stone-600"
          />
          {{ recipe.country.name }}
        </NuxtLink>
        <h1
          class="text-3xl font-bold leading-tight text-stone-900 sm:text-4xl dark:text-stone-100"
        >
          {{ recipe.name }}
        </h1>
        <div
          class="flex flex-wrap items-center gap-3 text-sm text-stone-600 dark:text-stone-400"
        >
          <DifficultyTag :average="recipe.difficultyAverage" />
          <span
            class="inline-flex items-center gap-1"
            :aria-label="`${recipe.heartCount} likes`"
          >
            <HeartIcon class="size-4 text-brand-600" />
            {{ recipe.heartCount }} likes
          </span>
          <span v-if="recipe.user?.username">
            by {{ recipe.user.username }}
          </span>
        </div>
        <div
          class="grid grid-cols-3 gap-4 p-4 bg-white border-t-4 rounded-lg border-t-brand-600 border border-stone-200 dark:bg-stone-900 dark:border-stone-800"
        >
          <div>
            <p class="text-sm font-semibold text-stone-900 dark:text-stone-100">
              Prep time
            </p>
            <p class="text-stone-600 dark:text-stone-400">
              {{ formatMinutes(recipe.prepTimeMinutes) }}
            </p>
          </div>
          <div>
            <p class="text-sm font-semibold text-stone-900 dark:text-stone-100">
              Cook time
            </p>
            <p class="text-stone-600 dark:text-stone-400">
              {{ formatMinutes(recipe.cookTimeMinutes) }}
            </p>
          </div>
          <div>
            <p class="text-sm font-semibold text-stone-900 dark:text-stone-100">
              Total time
            </p>
            <p class="text-stone-600 dark:text-stone-400">
              {{ formatMinutes(recipe.totalTimeMinutes) }}
            </p>
          </div>
        </div>
      </header>

      <section
        class="p-6 space-y-4 bg-white border rounded-lg border-stone-200 dark:bg-stone-900 dark:border-stone-800"
      >
        <h2 class="text-xl font-bold text-stone-900 dark:text-stone-100">
          Ingredients
        </h2>
        <ul
          class="pl-5 space-y-2 list-disc text-stone-700 dark:text-stone-300"
        >
          <li v-for="ingredient in recipe.ingredients" :key="ingredient.id">
            {{ formatIngredient(ingredient.quantity, ingredient.measurement) }}
            {{ ingredient.name }}
          </li>
        </ul>
      </section>

      <section
        class="p-6 space-y-4 bg-white border rounded-lg border-stone-200 dark:bg-stone-900 dark:border-stone-800"
      >
        <h2 class="text-xl font-bold text-stone-900 dark:text-stone-100">
          Instructions
        </h2>
        <ol
          class="pl-5 space-y-4 list-decimal text-stone-700 dark:text-stone-300"
        >
          <li v-for="step in sortedInstructions" :key="step.id">
            {{ step.text }}
          </li>
        </ol>
      </section>
    </article>
  </div>
</template>
