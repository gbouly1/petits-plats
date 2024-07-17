// scripts/ui/filter/updateRecipes.js

import { fetchRecipes } from "../../api/fetch.js";
import { displayRecipes } from "../display/displayRecipes.js";
import { normalizeString, selectedTags } from "../../utils.js";

export async function updateRecipes() {
  const query = normalizeString(document.getElementById("search").value);
  const data = await fetchRecipes();

  const filteredRecipes = [];

  for (let i = 0; i < data.recipes.length; i++) {
    const recipe = data.recipes[i];
    const normalizedTitle = normalizeString(recipe.name);
    const normalizedDescription = normalizeString(recipe.description);
    const normalizedIngredients = recipe.ingredients.map((ingredient) =>
      normalizeString(ingredient.ingredient)
    );
    const normalizedAppliance = normalizeString(recipe.appliance);
    const normalizedUstensils = recipe.ustensils.map((ustensil) =>
      normalizeString(ustensil)
    );

    const matchesMainSearch =
      query === "" ||
      normalizedTitle.includes(query) ||
      normalizedDescription.includes(query) ||
      normalizedIngredients.some((ingredient) => ingredient.includes(query)) ||
      normalizedAppliance.includes(query) ||
      normalizedUstensils.some((ustensil) => ustensil.includes(query));

    const matchesTags =
      (selectedTags.ingredients.length === 0 ||
        selectedTags.ingredients.every((tag) =>
          normalizedIngredients.includes(tag)
        )) &&
      (selectedTags.appliances.length === 0 ||
        selectedTags.appliances.includes(normalizedAppliance)) &&
      (selectedTags.ustensils.length === 0 ||
        selectedTags.ustensils.every((tag) =>
          normalizedUstensils.includes(tag)
        ));

    if (matchesMainSearch && matchesTags) {
      filteredRecipes.push(recipe);
    }
  }

  displayRecipes(filteredRecipes);
  renderTotal(filteredRecipes);
}

function renderTotal(array) {
  if (!Array.isArray(array)) {
    console.error("L'argument passé à renderTotal n'est pas un tableau.");
    return;
  }

  const totalRecipes = document.querySelector(".total-recette");
  if (!totalRecipes) {
    console.error("L'élément .total-recette n'a pas été trouvé.");
    return;
  }

  let total = array.length;
  totalRecipes.textContent = total + (total <= 1 ? " recette" : " recettes");
}
