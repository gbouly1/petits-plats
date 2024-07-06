// api/search.js

import { fetchRecipes } from "./fetch.js";
import { normalizeString } from "../utils.js";

export function searchRecipes(query, selectedTags) {
  const normalizedQuery = normalizeString(query);

  return fetchRecipes().then((data) => {
    return data.recipes.filter((recipe) => {
      const normalizedTitle = normalizeString(recipe.name);
      const normalizedDescription = normalizeString(recipe.description);
      const normalizedIngredients = recipe.ingredients.map((ingredient) =>
        normalizeString(ingredient.ingredient)
      );

      const matchesMainSearch =
        normalizedQuery === "" ||
        normalizedTitle.includes(normalizedQuery) ||
        normalizedDescription.includes(normalizedQuery) ||
        normalizedIngredients.some((ingredient) =>
          ingredient.includes(normalizedQuery)
        );

      const matchesTags =
        (selectedTags.ingredients.length === 0 ||
          selectedTags.ingredients.every((tag) =>
            normalizedIngredients.includes(tag)
          )) &&
        (selectedTags.appliances.length === 0 ||
          selectedTags.appliances.includes(
            normalizeString(recipe.appliance)
          )) &&
        (selectedTags.ustensils.length === 0 ||
          selectedTags.ustensils.every((tag) =>
            recipe.ustensils.map(normalizeString).includes(tag)
          ));

      return matchesMainSearch && matchesTags;
    });
  });
}
