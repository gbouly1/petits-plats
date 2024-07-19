// Importation des fonctions et constantes nécessaires
import { updateRecipes } from "./updateRecipes.js";
import { selectedTags } from "../../utils.js";
import { displaySelectedTags } from "../display/displayTags.js";
import { displayItems } from "./filter.js";
import { fetchItems } from "../../api/fetch.js";

// Fonction pour ajouter un tag à la liste des tags sélectionnés
export function addTag(tag, type) {
  if (!selectedTags[type].includes(tag)) {
    // Ajoute le tag s'il n'est pas déjà présent
    selectedTags[type].push(tag);
    updateRecipes();
    displaySelectedTags(selectedTags, removeTag);

    // Détermine l'élément de liste approprié en fonction du type
    const listElement =
      type === "ingredients"
        ? ingredientsList
        : type === "appliances"
        ? appliancesList
        : ustensilsList;

    // Récupère et affiche les éléments pour refléter la nouvelle sélection
    fetchItems(type).then((items) => {
      displayItems(items, listElement, type);
    });
  }
}

// Fonction pour retirer un tag de la liste des tags sélectionnés
export function removeTag(tag, type) {
  const index = selectedTags[type].indexOf(tag);
  if (index !== -1) {
    // Supprime le tag s'il est présent
    selectedTags[type].splice(index, 1);
    updateRecipes(); // Met à jour les recettes affichées
    displaySelectedTags(selectedTags, removeTag); // Affiche les tags sélectionnés

    // Détermine l'élément de liste approprié en fonction du type
    const listElement =
      type === "ingredients"
        ? ingredientsList
        : type === "appliances"
        ? appliancesList
        : ustensilsList;

    // Récupère et affiche les éléments pour refléter la suppression de la sélection
    fetchItems(type).then((items) => {
      displayItems(items, listElement, type);
    });
  }
}
