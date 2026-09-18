import type { PagedRecipes, Recipe } from "~/types/recipe";
import { mediaUrl } from "~/utils/mediaUrl";

export function useRecipes() {
  const { apiUrl, assetBase } = useApiBase();

  async function fetchRecipes(query: {
    page?: number;
    pageSize?: number;
    sortBy?: string;
    sortDirection?: string;
    search?: string;
  } = {}) {
    return await $fetch<PagedRecipes>(apiUrl("/api/recipes"), {
      query: {
        page: query.page ?? 1,
        pageSize: query.pageSize ?? 10,
        sortBy: query.sortBy ?? "PublishedAt",
        sortDirection: query.sortDirection ?? "desc",
        search: query.search || undefined,
      },
    });
  }

  async function fetchRecipeById(recipeId: string) {
    return await $fetch<Recipe>(apiUrl(`/api/recipes/${recipeId}`));
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
