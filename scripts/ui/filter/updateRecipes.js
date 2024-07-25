import { fetchRecipes } from "../../api/fetch.js";
import { displayRecipes } from "../display/displayRecipes.js";
import { normalizeString, selectedTags } from "../../utils.js";

// Fonction asynchrone pour mettre à jour les recettes affichées en fonction des filtres et de la recherche
export async function updateRecipes() {
  const query = normalizeString(document.getElementById("search").value);
  const data = await fetchRecipes(); // Récupère les recettes

  const filteredRecipes = [];

  // Parcourt chaque recette pour appliquer les filtres et la recherche
  for (let i = 0; i < data.recipes.length; i++) {
    const recipe = data.recipes[i];

    const normalizedTitle = normalizeString(recipe.name);
    const normalizedDescription = normalizeString(recipe.description);

    const normalizedIngredients = [];
    for (let j = 0; j < recipe.ingredients.length; j++) {
      normalizedIngredients.push(
        normalizeString(recipe.ingredients[j].ingredient)
      );
    }

    const normalizedAppliance = normalizeString(recipe.appliance);

    const normalizedUstensils = [];
    for (let k = 0; k < recipe.ustensils.length; k++) {
      normalizedUstensils.push(normalizeString(recipe.ustensils[k]));
    }

    // Vérifie si la recette correspond à la recherche principale
    let matchesMainSearch = query === "";
    if (!matchesMainSearch) {
      if (
        normalizedTitle.includes(query) ||
        normalizedDescription.includes(query)
      ) {
        matchesMainSearch = true;
      } else {
        for (let l = 0; l < normalizedIngredients.length; l++) {
          if (normalizedIngredients[l].includes(query)) {
            matchesMainSearch = true;
            break;
          }
        }
        if (!matchesMainSearch) {
          if (normalizedAppliance.includes(query)) {
            matchesMainSearch = true;
          } else {
            for (let m = 0; m < normalizedUstensils.length; m++) {
              if (normalizedUstensils[m].includes(query)) {
                matchesMainSearch = true;
                break;
              }
            }
          }
        }
      }
    }

    // Vérifie si la recette correspond aux tags sélectionnés
    let matchesTags = true;

    if (selectedTags.ingredients.length > 0) {
      for (let n = 0; n < selectedTags.ingredients.length; n++) {
        if (!normalizedIngredients.includes(selectedTags.ingredients[n])) {
          matchesTags = false;
          break;
        }
      }
    }

    if (matchesTags && selectedTags.appliances.length > 0) {
      if (!selectedTags.appliances.includes(normalizedAppliance)) {
        matchesTags = false;
      }
    }

    if (matchesTags && selectedTags.ustensils.length > 0) {
      for (let o = 0; o < selectedTags.ustensils.length; o++) {
        if (!normalizedUstensils.includes(selectedTags.ustensils[o])) {
          matchesTags = false;
          break;
        }
      }
    }

    // Si la recette correspond à la recherche principale et aux tags, elle est ajoutée aux recettes filtrées
    if (matchesMainSearch && matchesTags) {
      filteredRecipes.push(recipe);
    }
  }

  displayRecipes(filteredRecipes); // Affiche les recettes filtrées
  renderTotal(filteredRecipes); // Affiche le total des recettes filtrées
}

// Fonction pour afficher le nombre total de recettes filtrées
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
  totalRecipes.textContent = total + (total <= 1 ? " recette" : " recettes"); // Affiche le nombre de recettes avec une gestion du singulier/pluriel
}
