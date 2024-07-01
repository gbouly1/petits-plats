// ui/filter.js

import { fetchItems } from "../api/fetch.js";
import { displayRecipes } from "./display.js";
import { searchRecipes } from "../api/search.js";

document.addEventListener("DOMContentLoaded", (event) => {
  const ingredientsList = document.querySelector("#ingredientsList");
  const appliancesList = document.querySelector("#appliancesList");
  const ustensilsList = document.querySelector("#ustensilsList");
  const searchInputs = document.querySelectorAll(".searchInput");
  const mainSearch = document.getElementById("search");
  console.log(mainSearch);

  function displayItems(items, listElement) {
    listElement.innerHTML = ""; // Clear the list first
    items.forEach((item) => {
      const li = document.createElement("li");
      li.textContent = item;
      li.className = "p-2 cursor-pointer hover:bg-gray-200";
      listElement.appendChild(li);
    });
  }

  // Fetch and display items
  fetchItems("ingredients").then((ingredients) => {
    displayItems(ingredients, ingredientsList);
  });
  fetchItems("appliances").then((appliances) => {
    displayItems(appliances, appliancesList);
  });
  fetchItems("ustensils").then((ustensils) => {
    displayItems(ustensils, ustensilsList);
  });

  // Search logic for filters
  for (let i = 0; i < searchInputs.length; i++) {
    searchInputs[i].addEventListener("input", function (e) {
      const filter = normalizeString(e.target.value);
      if (filter.length >= 3) {
        if (i === 0) {
          fetchItems("ingredients").then((ingredients) => {
            const filteredIngredients = ingredients.filter((ingredient) =>
              ingredient.includes(filter)
            );
            displayItems(filteredIngredients, ingredientsList);
          });
        } else if (i === 1) {
          fetchItems("appliances").then((appliances) => {
            const filteredAppliances = appliances.filter((appliance) =>
              appliance.includes(filter)
            );
            displayItems(filteredAppliances, appliancesList);
          });
        } else if (i === 2) {
          fetchItems("ustensils").then((ustensils) => {
            const filteredUstensils = ustensils.filter((ustensil) =>
              ustensil.includes(filter)
            );
            displayItems(filteredUstensils, ustensilsList);
          });
        }
      } else {
        // If the input is less than 3 characters, display all items again
        if (i === 0) {
          fetchItems("ingredients").then((ingredients) => {
            displayItems(ingredients, ingredientsList);
          });
        } else if (i === 1) {
          fetchItems("appliances").then((appliances) => {
            displayItems(appliances, appliancesList);
          });
        } else if (i === 2) {
          fetchItems("ustensils").then((ustensils) => {
            displayItems(ustensils, ustensilsList);
          });
        }
      }
    });
  }
});
