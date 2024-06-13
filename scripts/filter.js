document.addEventListener("DOMContentLoaded", (event) => {
  const dropdownButtons = document.querySelectorAll(".dropdownButton");
  const dropdownMenus = document.querySelectorAll(".dropdownMenu");
  const searchInputs = document.querySelectorAll(".searchInput");
  const ingredientsLists = document.querySelectorAll(".ingredientsList");

  const ingredients = [
    "Jus de citron",
    "Glaçons",
    "Tomate",
    "Poulet",
    "Poivron rouge",
    "Thon en miettes",
    "Vinaigrette",
  ];

  function displayIngredients(ingredients, listElement) {
    listElement.innerHTML = "";
    ingredients.forEach((ingredient) => {
      const li = document.createElement("li");
      li.textContent = ingredient;
      li.className = "p-2 cursor-pointer hover:bg-gray-200";
      listElement.appendChild(li);
    });
  }

  dropdownButtons.forEach((button, index) => {
    button.addEventListener("click", () => {
      dropdownMenus[index].classList.toggle("hidden");
    });
  });

  searchInputs.forEach((input, index) => {
    input.addEventListener("input", (e) => {
      const filter = e.target.value.toLowerCase();
      const filteredIngredients = ingredients.filter((ingredient) =>
        ingredient.toLowerCase().includes(filter)
      );
      displayIngredients(filteredIngredients, ingredientsLists[index]);
    });
  });

  document.addEventListener("click", (e) => {
    dropdownButtons.forEach((button, index) => {
      if (
        !button.contains(e.target) &&
        !dropdownMenus[index].contains(e.target)
      ) {
        dropdownMenus[index].classList.add("hidden");
      }
    });
  });

  // Initial display for all dropdowns
  ingredientsLists.forEach((list) => displayIngredients(ingredients, list));
});
