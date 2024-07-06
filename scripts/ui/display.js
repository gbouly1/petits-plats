// ui/display.js

export function displayRecipes(recipes) {
  const recipesWrapper = document.querySelector(".recipesWrapper");
  recipesWrapper.innerHTML = ""; // Clear previous results

  if (recipes.length === 0) {
    const noResultsMessage = document.createElement("p");
    noResultsMessage.textContent =
      "Aucune recette ne correspond à votre recherche.";
    recipesWrapper.appendChild(noResultsMessage);
    return;
  }

  recipes.forEach((recipe) => {
    const card = document.createElement("div");
    card.className = "card";
    const ingredientsList = recipe.ingredients
      .map(
        (ingredient) =>
          `<div class="ingredient flex flex-col">
          <span class="ingredient-name text-[14px]">${
            ingredient.ingredient
          }</span>
          <span class="ingredient-quantity text-[14px] text-[#7A7A7A]">${
            ingredient.quantity || ""
          } ${ingredient.unit || ""}</span>
      </div>`
      )
      .join("");

    card.innerHTML = `
      <img class="h-[253px] w-full object-cover overflow-hidden" src="./assets/recettes-img/${recipe.image}"/>
      <div class="info-recipes">
      <h4 class="font-[Anton] text-[18px] line-clamp-1"> ${recipe.name} </h4>
      <p class="uppercase tracking-[1.8px] text-[12px] font-bold text-[#7A7A7A] pt-3 pb-2"> Recette </p>
      <p class="text-[14px] line-clamp-4">${recipe.description}</p>
      <p class="uppercase tracking-[1.8px] text-[12px] font-bold text-[#7A7A7A] pt-6 pb-2"> Ingrédients </p>
      <div class="ingredients grid grid-cols-2 gap-x-[35px] gap-y-[20px]">${ingredientsList}</div>
      </div>
    `;

    recipesWrapper.appendChild(card);
  });
}

export function displaySelectedTags(tags, removeTagCallback) {
  const selectedTagsWrapper = document.querySelector(".selectedTagsWrapper");
  selectedTagsWrapper.innerHTML = ""; // Clear previous tags

  for (const [type, tagList] of Object.entries(tags)) {
    tagList.forEach((tag) => {
      const tagElement = document.createElement("div");
      tagElement.className = "tag";
      tagElement.innerHTML = `<p class=""> ${tag}</p>`;
      const removeButton = document.createElement("button");
      removeButton.innerHTML = `<img
      class = "stroke-[##1B1B1B] stroke-3"
                src="./assets/svg/cross.svg"
                alt="Croix"
              />`;
      removeButton.addEventListener("click", () => {
        removeTagCallback(tag, type);
      });

      tagElement.appendChild(removeButton);
      selectedTagsWrapper.appendChild(tagElement);
    });
  }
}
