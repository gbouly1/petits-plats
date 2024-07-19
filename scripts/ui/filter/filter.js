// Import des fonctions et des constantes nécessaires
import { fetchItems, fetchRecipes } from "../../api/fetch.js";
import { displayRecipes } from "../display/displayRecipes.js";
import { normalizeString, selectedTags } from "../../utils.js";
import { updateRecipes } from "./updateRecipes.js";
import { addTag, removeTag } from "./tags.js";

// Fonction exécutée lorsque le DOM est complètement chargé
document.addEventListener("DOMContentLoaded", (event) => {
  const ingredientsList = document.querySelector("#ingredientsList");
  const appliancesList = document.querySelector("#appliancesList");
  const ustensilsList = document.querySelector("#ustensilsList");
  const searchInputs = document.querySelectorAll(".searchInput");
  const mainSearch = document.getElementById("search");

  async function initialize() {
    // Récupération des ingrédients, appareils et ustensiles
    const ingredients = await fetchItems("ingredients");
    const appliances = await fetchItems("appliances");
    const ustensils = await fetchItems("ustensils");

    // Affichage des éléments récupérés dans les listes correspondantes
    displayItems(ingredients, ingredientsList, "ingredients");
    displayItems(appliances, appliancesList, "appliances");
    displayItems(ustensils, ustensilsList, "ustensils");

    // Récupération et affichage des recettes
    const recipes = await fetchRecipes();
    if (recipes && recipes.recipes) {
      displayRecipes(recipes.recipes);
      renderTotal(recipes.recipes);
    } else {
      console.error("Les recettes n'ont pas pu être récupérées.");
    }
  }

  initialize();

  // Écouteur d'événements pour la barre de recherche principale
  mainSearch.addEventListener("input", function (e) {
    if (e.target.value.length >= 3 || e.target.value.length === 0) {
      updateRecipes();
    }
  });

  // Écouteurs d'événements pour les barres de recherche des filtres
  for (let i = 0; i < searchInputs.length; i++) {
    searchInputs[i].addEventListener("input", async function (e) {
      const filter = normalizeString(e.target.value);
      if (filter.length >= 3) {
        if (i === 0) {
          const ingredients = await fetchItems("ingredients");
          const filteredIngredients = ingredients.filter((ingredient) =>
            ingredient.includes(filter)
          );
          displayItems(filteredIngredients, ingredientsList, "ingredients");
        } else if (i === 1) {
          const appliances = await fetchItems("appliances");
          const filteredAppliances = appliances.filter((appliance) =>
            appliance.includes(filter)
          );
          displayItems(filteredAppliances, appliancesList, "appliances");
        } else if (i === 2) {
          const ustensils = await fetchItems("ustensils");
          const filteredUstensils = ustensils.filter((ustensil) =>
            ustensil.includes(filter)
          );
          displayItems(filteredUstensils, ustensilsList, "ustensils");
        }
      } else {
        if (i === 0) {
          const ingredients = await fetchItems("ingredients");
          displayItems(ingredients, ingredientsList, "ingredients");
        } else if (i === 1) {
          const appliances = await fetchItems("appliances");
          displayItems(appliances, appliancesList, "appliances");
        } else if (i === 2) {
          const ustensils = await fetchItems("ustensils");
          displayItems(ustensils, ustensilsList, "ustensils");
        }
      }
    });
  }
});

// Fonction pour afficher les éléments dans la liste appropriée
export function displayItems(items, listElement, type) {
  listElement.innerHTML = "";
  const clickedWrapper = document.createElement("div");
  clickedWrapper.className = "clickedWrapper";

  // Ajout des tags sélectionnés en haut de la liste
  selectedTags[type].forEach((tag) => {
    const li = document.createElement("li");
    li.textContent = tag;
    li.className = "clicked-item text-black cursor-pointer flex items-center";
    const removeButton = document.createElement("button");
    removeButton.className = "fullCross";
    removeButton.innerHTML = `<img class="stroke-[#1B1B1B] stroke-3" src="./assets/svg/full-cross.svg" alt="Croix" />`;
    removeButton.addEventListener("click", () => {
      removeTag(tag, type);
    });
    li.appendChild(removeButton);
    clickedWrapper.appendChild(li);
  });

  listElement.appendChild(clickedWrapper);

  // Filtre les items déjà sélectionnés
  const filteredItems = items.filter(
    (item) => !selectedTags[type].includes(item)
  );

  // Ajoute les items filtrés à la liste
  filteredItems.forEach((item) => {
    const li = document.createElement("li");
    li.textContent = item;
    li.className = "p-2 cursor-pointer hover:bg-gray-200";
    listElement.appendChild(li);

    li.addEventListener("click", () => {
      addTag(item, type);
      console.log(item);
    });
  });
}

// Fonction pour afficher le nombre total de recettes
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
