import type { Recipe } from "~/types/recipe";

export function isPublicRecipe(recipe: Recipe) {
  return recipe.visibilityStatus?.toLowerCase() === "public";
}

export function matchesRecipeSearch(recipe: Recipe, query: string) {
  const term = query.trim().toLowerCase();
  if (!term) return true;

  return (
    recipe.name.toLowerCase().includes(term) ||
    recipe.country?.name?.toLowerCase().includes(term)
  );
}
