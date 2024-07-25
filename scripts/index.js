// scripts/index.js

import { fetchRecipes } from "./api/fetch.js";
import { displayRecipes } from "./ui/display/displayRecipes.js";
import { selectedTags } from "./utils.js";
import "./ui/filter/filter.js";
import "./ui/dropdown/dropdown.js";
import { updateRecipes } from "./ui/filter/updateRecipes.js"; // Import de updateRecipes

document.addEventListener("DOMContentLoaded", () => {
  // Récupère et affiche les recettes initiales
  fetchRecipes().then((data) => {
    displayRecipes(data.recipes);
  });

  // Logique de recherche principale
  document.getElementById("search").addEventListener("input", function (e) {
    const query = e.target.value; // Récupère la valeur de l'input de recherche
    if (query.length >= 3 || query.length === 0) {
      // Si la longueur de la recherche est >= 3 ou égale à 0
      updateRecipes(); // Utilisation de updateRecipes
    }
  });
});
