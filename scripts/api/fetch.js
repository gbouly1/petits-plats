// api/fetch.js
import { normalizeString } from "../utils.js";

// fetch les recettes de recipes.json
export async function fetchRecipes() {
  try {
    const response = await fetch("recipes.json");
    if (!response.ok) {
      throw new Error("Network response was not ok " + response.statusText);
    }
    return await response.json();
  } catch (error) {
    console.error("There has been a problem with your fetch operation:", error);
  }
}

// fetch les items d'un type spécifique (ingrédients, ustensils, appliances)
export async function fetchItems(type) {
  try {
    const data = await fetchRecipes();
    if (type === "ingredients") {
      // si le type est ingrédients, normalize et return unique ingrédients
      let ingredients = data.recipes.flatMap((recipe) =>
        recipe.ingredients.map((ingredient) =>
          normalizeString(ingredient.ingredient)
        )
      );
      return [...new Set(ingredients)];
    } else if (type === "ustensils") {
      let ustensils = data.recipes.flatMap((recipe) =>
        recipe.ustensils.map((ustensil) => normalizeString(ustensil))
      );
      return [...new Set(ustensils)];
    } else if (type === "appliances") {
      let appliances = data.recipes.flatMap((recipe) => [
        normalizeString(recipe.appliance),
      ]);
      return [...new Set(appliances)];
    } else {
      throw new Error("Invalid type specified");
    }
  } catch (error) {
    console.error("There has been a problem with your fetch operation:", error);
    return []; // Return an empty array in case of error
  }
}
