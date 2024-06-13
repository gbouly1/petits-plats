document.addEventListener("DOMContentLoaded", (event) => {
  const dropdownButton = document.getElementById("dropdownButton");
  const dropdownMenu = document.getElementById("dropdownMenu");
  const searchInput = document.getElementById("searchInput");
  const ingredientsList = document.getElementById("ingredientsList");

  const ingredients = [
    "Jus de citron",
    "Glaçons",
    "Tomate",
    "Poulet",
    "Poivron rouge",
    "Thon en miettes",
    "Vinaigrette",
  ];

  function displayIngredients(ingredients) {
    ingredientsList.innerHTML = "";
    ingredients.forEach((ingredient) => {
      const li = document.createElement("li");
      li.textContent = ingredient;
      li.className = "p-2 cursor-pointer hover:bg-gray-200";
      ingredientsList.appendChild(li);
    });
  }

  dropdownButton.addEventListener("click", () => {
    dropdownMenu.classList.toggle("hidden");
  });

  searchInput.addEventListener("input", (e) => {
    const filter = e.target.value.toLowerCase();
    const filteredIngredients = ingredients.filter((ingredient) =>
      ingredient.toLowerCase().includes(filter)
    );
    displayIngredients(filteredIngredients);
  });

  document.addEventListener("click", (e) => {
    if (
      !dropdownButton.contains(e.target) &&
      !dropdownMenu.contains(e.target)
    ) {
      dropdownMenu.classList.add("hidden");
    }
  });

  // Initial display
  displayIngredients(ingredients);
});
