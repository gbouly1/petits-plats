function fetchRecipes() {
  fetch("recipes.json")
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok " + response.statusText);
      }
      return response.json();
    })
    .then((data) => {
      displayRecipes(data.recipes);
    })
    .catch((error) =>
      console.error(
        "There has been a problem with your fetch operation:",
        error
      )
    );
}

function displayRecipes(recipes) {
  const recipesWrapper = document.querySelector(".recipesWrapper");
  for (let i = 0; i < recipes.length; i++) {
    const card = document.createElement("div");
    card.className = "card";

    const ingredientsList = recipes[i].ingredients
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
    console.log(ingredientsList);

    card.innerHTML = ` 
    <img class="h-[253px] w-full object-cover overflow-hidden" src="./assets/recettes-img/${recipes[i].image}"/>
    <div class="info-recipes">
    <h4 class="font-[Anton] text-[18px] line-clamp-1"> ${recipes[i].name} </h4> 
    <p class="uppercase tracking-[1.8px] text-[12px] font-bold text-[#7A7A7A] pt-3 pb-2"> Recette </p>
    <p class="text-[14px] line-clamp-4">${recipes[i].description}</p>
    <p class="uppercase tracking-[1.8px] text-[12px] font-bold text-[#7A7A7A] pt-6 pb-2"> Ingrédients </p>
    <div class="ingredients grid grid-cols-2 gap-x-[35px] gap-y-[20px]">${ingredientsList}</div>
    </div>
    `;

    // on ajoute les éléments a la card
    recipesWrapper.appendChild(card);
  }
}
// Appeler la fonction pour récupérer les données
fetchRecipes();
