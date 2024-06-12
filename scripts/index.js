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
    const ingredientsRecipe = document.createElement("p");

    // recette.textContent = "Recette";
    card.innerHTML = `<h4> ${recipes[i].name} </h4> <p> Recette </p><p>${recipes[i].description}</p>`;

    // on ajoute les éléments a la card
    card.appendChild(ingredientsRecipe);
    recipesWrapper.appendChild(card);
  }
}
// Appeler la fonction pour récupérer les données
fetchRecipes();
