


export async function fetchRecipes(url, query = "", recipeContainer, messageContainer = null) {
    try {
        const response = await fetch(url);
        if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);

        const data = await response.json();
        let meals = data.meals || [];

        // Shuffle meals randomly only
        if (!query) {
            meals.sort(() => Math.random() - 0.5);
            meals = meals.slice(0, 6); 
        }

        displayRecipes(meals, query, recipeContainer, messageContainer);
    } catch (error) {
        console.error("Error fetching data:", error);
        if (messageContainer) {
            messageContainer.innerHTML = `
                <div class="alert alert-danger text-center">
                    <strong>Error!</strong> Could not fetch recipes. Please try again later.
                </div>
            `;
        } else {
            recipeContainer.innerHTML = `<p class="text-danger">Failed to load recipes. Please try again later.</p>`;
        }
    }
}

export function displayRecipes(meals, query, recipeContainer, messageContainer) {
    recipeContainer.innerHTML = "";
    if (messageContainer) messageContainer.innerHTML = "";

    if (meals.length === 0) {
        if (messageContainer) {
            messageContainer.innerHTML = `
                <div class="alert alert-warning text-center">
                    <strong>Oops!</strong> No recipes found for <span class="text-uppercase text-warning">${query}</span>.
                </div>
            `;
        }
        return;
    }

    let rowHTML = '<div class="row g-2 justify-content-center">';
    meals.forEach((meal, index) => {
        let recipeCard = `
            <div class="col-md-3 d-flex justify-content-center">
                <div class="card border-0 shadow-sm" style="width: 220px; background: #feeee7; border-radius: 10px;">
                    <img src="${meal.strMealThumb}" class="w-100 object-fit-contain" style="border-radius: 10px;" alt="${meal.strMeal}">
                    <div class="card-body text-center">
                        <h5 class="card-title">${meal.strMeal}</h5>
                        <p class="card-text">${meal.strCategory}</p>
                        <a href="${meal.strSource}" target="_blank" class="btn btn-warning text-white">View Recipe</a>
                    </div>
                </div>
            </div>
        `;

        rowHTML += recipeCard;

        if ((index + 1) % 3 === 0) {
            rowHTML += '</div><div class="row g-2 justify-content-center">';
        }
    });

    rowHTML += '</div>';
    recipeContainer.innerHTML = rowHTML;
}
