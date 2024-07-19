// scripts/utils.js

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
// console.log(selectedTags);
