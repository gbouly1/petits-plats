// utils.js
const mainButton = document.getElementById("main-button");
console.log(mainButton.value);

export function normalizeString(str) {
  return str
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
}

export const selectedTags = {
  ingredients: [],
  appliances: [],
  ustensils: [],
};
