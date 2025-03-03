// document.addEventListener("DOMContentLoaded", async () => {
//     const recipeContainer = document.getElementById("recipe-container");
//     const searchName = document.getElementById("search-name");
//     const searchLetter = document.getElementById("search-letter");

//     async function fetchRecipes(url) {
//         try {
//             const response = await fetch(url);
//             if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
//             const data = await response.json();
//             return data.meals || [];
//         } catch (error) {
//             console.error("Error fetching data:", error);
//             return [];
//         }
//     }

//     function displayRecipes(meals) {
//         let rowHTML = '<div class="row gx-2 gy-4">';
//         meals.forEach(meal => {
//             rowHTML += `
//                 <div class="col-md-4 d-flex justify-content-center">
//                     <div class="card border-0 shadow-sm" style="width: 220px; background: #feeee7; border-radius: 10px;">
//                         <img src="${meal.strMealThumb}" class="w-100 object-fit-contain" style="border-radius: 10px;" alt="${meal.strMeal}">
//                         <div class="card-body text-center">
//                             <h5 class="card-title">${meal.strMeal}</h5>
//                             <p class="card-text">${meal.strCategory}</p>
//                             <a href="${meal.strSource}" target="_blank" class="btn btn-warning text-white">View Recipe</a>
//                         </div>
//                     </div>
//                 </div>
//             `;
//         });
//         rowHTML += '</div>';
//         recipeContainer.innerHTML = rowHTML;
//     }

//     // Load Random Recipes Initially
//     async function loadRandomRecipes() {
//         let meals = await fetchRecipes("https://www.themealdb.com/api/json/v1/1/search.php?s=");
//         meals.sort(() => Math.random() - 0.5);
//         displayRecipes(meals.slice(0, 9)); // Show 9 recipes
//     }

//     // Search by Name
//     searchName.addEventListener("input", async () => {
//         let query = searchName.value.trim();
//         if (query.length === 0) {
//             loadRandomRecipes();
//         } else {
//             let meals = await fetchRecipes(`https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`);
//             displayRecipes(meals);
//         }
//     });

//     // Search by First Letter
//     searchLetter.addEventListener("change", async () => {
//         let letter = searchLetter.value;
//         if (letter) {
//             let meals = await fetchRecipes(`https://www.themealdb.com/api/json/v1/1/search.php?f=${letter}`);
//             displayRecipes(meals);
//         } else {
//             loadRandomRecipes();
//         }
//     });

//     // Load recipes on page load
//     loadRandomRecipes();
// });





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
