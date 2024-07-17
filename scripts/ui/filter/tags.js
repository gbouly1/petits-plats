// scripts/ui/filter/tags.js

import { updateRecipes } from "./updateRecipes.js";
import { selectedTags } from "../../utils.js";
import { displaySelectedTags } from "../display/displayTags.js";
import { displayItems } from "./filter.js";
import { fetchItems } from "../../api/fetch.js";

export function addTag(tag, type) {
  if (!selectedTags[type].includes(tag)) {
    selectedTags[type].push(tag);
    updateRecipes();
    displaySelectedTags(selectedTags, removeTag);

    const listElement =
      type === "ingredients"
        ? ingredientsList
        : type === "appliances"
        ? appliancesList
        : ustensilsList;

    // Re-display items to reflect the new selection
    fetchItems(type).then((items) => {
      displayItems(items, listElement, type);
    });
  }
}

export function removeTag(tag, type) {
  const index = selectedTags[type].indexOf(tag);
  if (index !== -1) {
    selectedTags[type].splice(index, 1);
    updateRecipes();
    displaySelectedTags(selectedTags, removeTag);

    const listElement =
      type === "ingredients"
        ? ingredientsList
        : type === "appliances"
        ? appliancesList
        : ustensilsList;

    // Re-display items to reflect the removed selection
    fetchItems(type).then((items) => {
      displayItems(items, listElement, type);
    });
  }
}
