import { fetchItems } from "./index.js";

document.addEventListener("DOMContentLoaded", (event) => {
  const ingredientsList = document.querySelector("#ingredientsList");
  const appliancesList = document.querySelector("#appliancesList");
  const ustensilsList = document.querySelector("#ustensilsList");

  function displayItems(items, listElement) {
    listElement.innerHTML = ""; // Clear the list first
    items.forEach((item) => {
      const li = document.createElement("li");
      li.textContent = item;
      li.className = "p-2 cursor-pointer hover:bg-gray-200";
      listElement.appendChild(li);
    });
  }

  // Fetch and display ingredients
  fetchItems("ingredients").then((ingredients) => {
    displayItems(ingredients, ingredientsList);
  });

  // Fetch and display appliances
  fetchItems("appliances").then((appliances) => {
    displayItems(appliances, appliancesList);
  });

  // Fetch and display ustensils
  fetchItems("ustensils").then((ustensils) => {
    displayItems(ustensils, ustensilsList);
  });

  const dropdownButtons = document.querySelectorAll(".dropdownButton");
  const dropdownMenus = document.querySelectorAll(".dropdownMenu");

  dropdownButtons.forEach((button, index) => {
    button.addEventListener("click", () => {
      dropdownMenus[index].classList.toggle("hidden");
    });
  });

  document.addEventListener("click", (e) => {
    dropdownButtons.forEach((button, index) => {
      if (
        !button.contains(e.target) &&
        !dropdownMenus[index].contains(e.target)
      ) {
        dropdownMenus[index].classList.add("hidden");
      }
    });
  });
});
