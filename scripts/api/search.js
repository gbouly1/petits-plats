// // Importation de la fonction fetchRecipes depuis fetch.js et de normalizeString depuis utils.js
// import { fetchRecipes } from "./fetch.js";
// import { normalizeString } from "../utils.js";

// // Fonction pour rechercher des recettes basées sur une requête et des tags sélectionnés
// export async function searchRecipes(query, selectedTags) {
//   const normalizedQuery = normalizeString(query);

//   // Récupère les recettes et les filtre en fonction de la requête et des tags sélectionnés
//   return fetchRecipes().then((data) => {
//     return data.recipes.filter((recipe) => {
//       // Normalise le nom, la description et les ingrédients de la recette
//       const normalizedTitle = normalizeString(recipe.name);
//       const normalizedDescription = normalizeString(recipe.description);
//       const normalizedIngredients = recipe.ingredients.map((ingredient) =>
//         normalizeString(ingredient.ingredient)
//       );

//       // Vérifie si la recette correspond à la requête principale
//       const matchesMainSearch =
//         normalizedQuery === "" ||
//         normalizedTitle.includes(normalizedQuery) ||
//         normalizedDescription.includes(normalizedQuery) ||
//         normalizedIngredients.some((ingredient) =>
//           ingredient.includes(normalizedQuery)
//         );

//       // Vérifie si la recette correspond aux tags sélectionnés
//       const matchesTags =
//         (selectedTags.ingredients.length === 0 ||
//           selectedTags.ingredients.every((tag) =>
//             normalizedIngredients.includes(tag)
//           )) &&
//         (selectedTags.appliances.length === 0 ||
//           selectedTags.appliances.includes(
//             normalizeString(recipe.appliance)
//           )) &&
//         (selectedTags.ustensils.length === 0 ||
//           selectedTags.ustensils.every((tag) =>
//             recipe.ustensils.map(normalizeString).includes(tag)
//           ));

//       // Retourne true si la requête principale et les tags correspondent
//       return matchesMainSearch && matchesTags;
//     });
//   });
// }
