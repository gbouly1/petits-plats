// Fonction pour afficher les tags sélectionnés
export function displaySelectedTags(tags, removeTagCallback) {
  const selectedTagsWrapper = document.querySelector(".selectedTagsWrapper");
  selectedTagsWrapper.innerHTML = "";

  // Parcourt chaque type de tag (ingrédients, appareils, ustensiles)
  for (const [type, tagList] of Object.entries(tags)) {
    // Parcourt chaque tag dans le type de tag actuel
    tagList.forEach((tag) => {
      const tagElement = document.createElement("div");
      tagElement.className = "tag";
      tagElement.innerHTML = `<p class=""> ${tag}</p>`;

      const removeButton = document.createElement("button");
      removeButton.innerHTML = `<img
      class="stroke-[#1B1B1B] stroke-3"
      src="./assets/svg/cross.svg"
      alt="Croix"
      />`;

      // Ajoute un événement click au bouton pour supprimer le tag
      removeButton.addEventListener("click", () => {
        removeTagCallback(tag, type);
      });

      tagElement.appendChild(removeButton);
      selectedTagsWrapper.appendChild(tagElement);
    });
  }
}
