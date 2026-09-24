import type { PagedRecipes, Recipe } from "~/types/recipe";
import { mediaUrl } from "~/utils/mediaUrl";
import { normalizePagedRecipes, normalizeRecipe } from "~/utils/recipe";

export function useRecipes() {
  const { apiUrl, assetBase } = useApiBase();

  async function fetchRecipes(query: {
    page?: number;
    pageSize?: number;
    sortBy?: string;
    sortDirection?: string;
    search?: string;
  } = {}) {
    const data = await $fetch<PagedRecipes>(apiUrl("/api/recipes"), {
      query: {
        page: query.page ?? 1,
        pageSize: query.pageSize ?? 100,
        sortBy: query.sortBy ?? "PublishedAt",
        sortDirection: query.sortDirection ?? "desc",
        search: query.search || undefined,
      },
    });
    return normalizePagedRecipes(data);
  }

  async function fetchRecipeById(recipeId: string) {
    const data = await $fetch<Recipe>(apiUrl(`/api/recipes/${recipeId}`));
    return normalizeRecipe(data);
  }

  function recipeImage(path: string | null | undefined) {
    return mediaUrl(assetBase, path);
  }

  return {
    baseUrl: assetBase,
    fetchRecipes,
    fetchRecipeById,
    recipeImage,
  };
}
