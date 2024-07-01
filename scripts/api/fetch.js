// api/fetch.js

export function fetchRecipes() {
  return fetch("recipes.json")
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok " + response.statusText);
      }
      return response.json();
    })
    .catch((error) =>
      console.error(
        "There has been a problem with your fetch operation:",
        error
      )
    );
}

export function fetchItems(type) {
  return fetchRecipes().then((data) => {
    if (type === "ingredients") {
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
  });
}

function normalizeString(str) {
  return str
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, ""); // Remove accents
}
