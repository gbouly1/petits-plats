// ui/filter.js

import { fetchItems, fetchRecipes } from "../api/fetch.js";
import { displayRecipes, displaySelectedTags } from "./display.js";
import { normalizeString, selectedTags } from "../utils.js";

document.addEventListener("DOMContentLoaded", (event) => {
  const ingredientsList = document.querySelector("#ingredientsList");
  const appliancesList = document.querySelector("#appliancesList");
  const ustensilsList = document.querySelector("#ustensilsList");
  const searchInputs = document.querySelectorAll(".searchInput");
  const mainSearch = document.getElementById("search");

  function displayItems(items, listElement, type) {
    listElement.innerHTML = ""; // Clear the list first
    items.forEach((item) => {
      const li = document.createElement("li");
      li.textContent = item;
      li.className = "p-2 cursor-pointer hover:bg-gray-200";
      listElement.appendChild(li);

      li.addEventListener("click", () => {
        addTag(item, type); // Use the original item string
        console.log(`Clicked on: ${item}, Type: ${type}`);
      });
    });
  }

  function addTag(tag, type) {
    if (!selectedTags[type].includes(tag)) {
      selectedTags[type].push(tag);
      updateRecipes();
      displaySelectedTags(selectedTags, removeTag);
    }
  }

  function removeTag(tag, type) {
    const index = selectedTags[type].indexOf(tag);
    if (index !== -1) {
      selectedTags[type].splice(index, 1);
      updateRecipes();
      displaySelectedTags(selectedTags, removeTag); // Update the display of selected tags
    }
  }

  async function updateRecipes() {
    const query = normalizeString(mainSearch.value);
    const data = await fetchRecipes();
    const filteredRecipes = [];

    for (let i = 0; i < data.recipes.length; i++) {
      const recipe = data.recipes[i];
      const normalizedTitle = normalizeString(recipe.name);
      const normalizedDescription = normalizeString(recipe.description);
      const normalizedIngredients = recipe.ingredients.map((ingredient) =>
        normalizeString(ingredient.ingredient)
      );

      const matchesMainSearch =
        query === "" ||
        normalizedTitle.includes(query) ||
        normalizedDescription.includes(query) ||
        normalizedIngredients.some((ingredient) => ingredient.includes(query));

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
            recipe.ustensils
              .map((ustensil) => normalizeString(ustensil))
              .includes(tag)
          ));

      if (matchesMainSearch && matchesTags) {
        filteredRecipes.push(recipe);
      }
    }

    displayRecipes(filteredRecipes);
  }

  async function initialize() {
    const ingredients = await fetchItems("ingredients");
    const appliances = await fetchItems("appliances");
    const ustensils = await fetchItems("ustensils");

    displayItems(ingredients, ingredientsList, "ingredients");
    displayItems(appliances, appliancesList, "appliances");
    displayItems(ustensils, ustensilsList, "ustensils");

    const recipes = await fetchRecipes();
    displayRecipes(recipes.recipes);
  }

  initialize();

  // Main bar search logic
  mainSearch.addEventListener("input", function (e) {
    if (e.target.value.length >= 3 || e.target.value.length === 0) {
      updateRecipes();
    }
  });

  // Search logic for filters
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
        // If the input is less than 3 characters, display all items again
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
