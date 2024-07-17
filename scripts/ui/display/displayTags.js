// scripts/ui/display/displayTags.js

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
      class = "stroke-[#1B1B1B] stroke-3"
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
