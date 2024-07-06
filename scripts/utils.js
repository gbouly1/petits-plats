// utils.js

export function normalizeString(str) {
  const normalizedStr = str
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");

  return normalizedStr.charAt(0).toUpperCase() + normalizedStr.slice(1);
}

export const selectedTags = {
  ingredients: [],
  appliances: [],
  ustensils: [],
};
