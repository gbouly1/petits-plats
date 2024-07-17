// scripts/ui/dropdown/dropdown.js

document.addEventListener("DOMContentLoaded", () => {
  const dropdownButtons = document.querySelectorAll(".dropdownButton");
  const dropdownMenus = document.querySelectorAll(".dropdownMenu");

  dropdownButtons.forEach((button, index) => {
    button.addEventListener("click", () => {
      dropdownMenus[index].classList.toggle("hidden");
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
});
