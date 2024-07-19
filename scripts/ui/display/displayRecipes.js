// Fonction pour afficher les recettes sur la page
export function displayRecipes(recipes) {
  const recipesWrapper = document.querySelector(".recipesWrapper");
  const searchValue = document.getElementById("search");
  recipesWrapper.innerHTML = "";

  // Si aucune recette n'est trouvée, affiche un message
  if (recipes.length === 0) {
    const noResultsMessage = document.createElement("p");
    noResultsMessage.classList.add("noResultsMessage");
    noResultsMessage.textContent =
      "Aucune recette ne contient " + searchValue.value;
    recipesWrapper.appendChild(noResultsMessage);
    return;
  }

  // Parcourt chaque recette et crée un élément de carte pour l'afficher
  recipes.forEach((recipe) => {
    const card = document.createElement("div");
    card.className = "card relative";

    // Crée une liste d'ingrédients pour chaque recette
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

    // Définit le contenu HTML de la carte avec les détails de la recette
    card.innerHTML = `
      <img class="h-[253px] w-full object-cover overflow-hidden" src="./assets/recettes-img/${recipe.image}"/>
      <p class="timer">${recipe.time}min</p>
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
