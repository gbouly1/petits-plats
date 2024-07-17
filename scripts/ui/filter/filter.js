// scripts/ui/filter/filter.js

import { fetchItems, fetchRecipes } from "../../api/fetch.js";
import { displayRecipes } from "../display/displayRecipes.js";
import { normalizeString, selectedTags } from "../../utils.js";
import { updateRecipes } from "./updateRecipes.js";
import { addTag, removeTag } from "./tags.js";

document.addEventListener("DOMContentLoaded", (event) => {
  const ingredientsList = document.querySelector("#ingredientsList");
  const appliancesList = document.querySelector("#appliancesList");
  const ustensilsList = document.querySelector("#ustensilsList");
  const searchInputs = document.querySelectorAll(".searchInput");
  const mainSearch = document.getElementById("search");

  async function initialize() {
    const ingredients = await fetchItems("ingredients");
    const appliances = await fetchItems("appliances");
    const ustensils = await fetchItems("ustensils");

    displayItems(ingredients, ingredientsList, "ingredients");
    displayItems(appliances, appliancesList, "appliances");
    displayItems(ustensils, ustensilsList, "ustensils");

    const recipes = await fetchRecipes();
    if (recipes && recipes.recipes) {
      displayRecipes(recipes.recipes);
      renderTotal(recipes.recipes);
    } else {
      console.error("Les recettes n'ont pas pu être récupérées.");
    }
  }

  initialize();

  mainSearch.addEventListener("input", function (e) {
    if (e.target.value.length >= 3 || e.target.value.length === 0) {
      updateRecipes();
    }
  });

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

export function displayItems(items, listElement, type) {
  listElement.innerHTML = ""; // Clear the list first
  const clickedWrapper = document.createElement("div");
  clickedWrapper.className = "clickedWrapper";

  // Add selected tags to the top of the list
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

  // Filter out selected tags from items
  const filteredItems = items.filter(
    (item) => !selectedTags[type].includes(item)
  );

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
