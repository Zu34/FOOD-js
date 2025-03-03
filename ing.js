window.addEventListener("DOMContentLoaded", () => {
    console.log("DOM fully loaded!");
    const ingredientsContainer = document.querySelector(".ingredients-container");

    if (!ingredientsContainer) {
        console.error("Error: ingredients-container not found!");
        return;
    }

    const ingredients = [
        { name: "Tomatoes", img: "img/foo.png" },
        { name: "Lettuce", img: "img/food2.png" },
    ];

    ingredients.forEach(ingredient => {
        const box = document.createElement("div");
        box.classList.add("ingredient-box");

        box.innerHTML = `
            <img src="${ingredient.img}" alt="${ingredient.name}">
            <h3>${ingredient.name}</h3>
        `;

        ingredientsContainer.appendChild(box);
    });

    console.log("Ingredients loaded successfully!");
});


