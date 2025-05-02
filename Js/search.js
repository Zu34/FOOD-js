

import { fetchRecipes } from "../Js/receipes.js";

document.addEventListener("DOMContentLoaded", () => {
    const recipeContainer = document.getElementById("recipe-container");
    const messageContainer = document.getElementById("message-container");
    const searchName = document.getElementById("search-name");
    const searchLetter = document.getElementById("search-letter");

    // Load Random Recipes on Page Load
    fetchRecipes("https://www.themealdb.com/api/json/v1/1/search.php?s=", "", recipeContainer, messageContainer);

    // Search by Name
    searchName.addEventListener("input", () => {
        let query = searchName.value.trim();
        if (query.length === 0) {
            fetchRecipes("https://www.themealdb.com/api/json/v1/1/search.php?s=", "", recipeContainer, messageContainer);
        } else {
            fetchRecipes(`https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`, query, recipeContainer, messageContainer);
        }
    });

    // Search by First Letter
    searchLetter.addEventListener("change", () => {
        let letter = searchLetter.value;
        if (letter) {
            fetchRecipes(`https://www.themealdb.com/api/json/v1/1/search.php?f=${letter}`, letter, recipeContainer, messageContainer);
        } else {
            fetchRecipes("https://www.themealdb.com/api/json/v1/1/search.php?s=", "", recipeContainer, messageContainer);
        }
    });
});
