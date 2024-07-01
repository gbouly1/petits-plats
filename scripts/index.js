// index.js

import { fetchRecipes } from "./api/fetch.js";
import { displayRecipes } from "./ui/display.js";
import { searchRecipes } from "./api/search.js";
import "./ui/filter.js";
import "./ui/dropdown.js";

document.addEventListener("DOMContentLoaded", () => {
  // Initial fetch and display of recipes
  fetchRecipes().then((data) => {
    displayRecipes(data.recipes);
  });

  // Main search logic
  document.getElementById("search").addEventListener("input", function (e) {
    const query = e.target.value;
    if (query.length >= 3 || query.length === 0) {
      searchRecipes(query, selectedTags).then((filteredRecipes) => {
        displayRecipes(filteredRecipes);
      });
    }
  });
});
