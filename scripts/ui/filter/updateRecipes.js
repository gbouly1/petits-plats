// scripts/ui/filter/updateRecipes.js

import { fetchRecipes } from "../../api/fetch.js";
import { displayRecipes } from "../display/displayRecipes.js";
import { normalizeString, selectedTags } from "../../utils.js";

export async function updateRecipes() {
  const query = normalizeString(document.getElementById("search").value);
  const data = await fetchRecipes(); // Récupère les recettes

  const filteredRecipes = [];

  // Parcourt chaque recette pour appliquer les filtres et la recherche
  data.recipes.forEach((recipe) => {
    const normalizedTitle = normalizeString(recipe.name);
    const normalizedDescription = normalizeString(recipe.description);
    const normalizedIngredients = recipe.ingredients.map((ingredient) =>
      normalizeString(ingredient.ingredient)
    );

    // Vérifie si la recette correspond à la recherche principale
    const matchesMainSearch =
      query === "" ||
      normalizedTitle.includes(query) ||
      normalizedDescription.includes(query) ||
      normalizedIngredients.some((ingredient) => ingredient.includes(query));

    // Vérifie si la recette correspond aux tags sélectionnés
    const matchesTags =
      (selectedTags.ingredients.length === 0 ||
        selectedTags.ingredients.every((tag) =>
          normalizedIngredients.includes(tag)
        )) &&
      (selectedTags.appliances.length === 0 ||
        selectedTags.appliances.includes(normalizeString(recipe.appliance))) &&
      (selectedTags.ustensils.length === 0 ||
        selectedTags.ustensils.every((tag) =>
          recipe.ustensils.map(normalizeString).includes(tag)
        ));

    // Si la recette correspond à la recherche principale et aux tags, elle est ajoutée aux recettes filtrées
    if (matchesMainSearch && matchesTags) {
      filteredRecipes.push(recipe);
    }
  });

  displayRecipes(filteredRecipes); // Affiche les recettes filtrées
  renderTotal(filteredRecipes); // Affiche le total des recettes filtrées
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
