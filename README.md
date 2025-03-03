

## this logic for fetch API of Meal planner I'll get it out once I get bact to this pro again


```js

document.addEventListener("DOMContentLoaded", function () {
    const apiKey = "YOUR_SPOONACULAR_API_KEY";
    const categories = [
        { name: "Vegetarian", icon: "fas fa-carrot", value: "vegetarian" },
        { name: "Vegan", icon: "fas fa-seedling", value: "vegan" },
        { name: "Keto", icon: "fas fa-bacon", value: "ketogenic" },
        { name: "Paleo", icon: "fas fa-drumstick-bite", value: "paleo" },
        { name: "Gluten-Free", icon: "fas fa-bread-slice", value: "gluten free" },
        { name: "Mediterranean", icon: "fas fa-fish", value: "mediterranean" }
    ];

    const categoriesContainer = document.getElementById("categories");

    // Generate category cards dynamically
    categories.forEach(category => {
        let card = document.createElement("div");
        card.classList.add("col");
        card.innerHTML = `
            <div class="card category-card text-center p-3" data-diet="${category.value}">
                <i class="${category.icon} category-icon"></i>
                <h5 class="mt-3">${category.name}</h5>
            </div>
        `;
        categoriesContainer.appendChild(card);
    });

    // Event Listener for category selection
    document.querySelectorAll(".category-card").forEach(card => {
        card.addEventListener("click", async function () {
            let diet = this.getAttribute("data-diet");
            fetchMealPlan(diet);
        });
    });

    async function fetchMealPlan(diet) {
        const apiUrl = `https://api.spoonacular.com/mealplanner/generate?timeFrame=week&diet=${diet}&apiKey=${apiKey}`;

        try {
            let response = await fetch(apiUrl);
            if (!response.ok) throw new Error("Failed to fetch meal plan");

            let data = await response.json();
            console.log("API Data:", data); // Debugging API response

            // Get the meal plan container
            let mealPlanContainer = document.getElementById("mealPlan");
            mealPlanContainer.innerHTML = `<h3 class="text-center text-warning mt-4">Meal Plan for ${diet.charAt(0).toUpperCase() + diet.slice(1)}</h3>`;

            // Loop through each day in the meal plan
            Object.keys(data.week).forEach(day => {
                let dayMeals = data.week[day].meals;

                let daySection = document.createElement("div");
                daySection.classList.add("mb-4", "p-3", "border", "rounded", "bg-light");
                daySection.innerHTML = `<h4 class="text-warning text-uppercase">${day}</h4>`;

                // Loop through meals for the day
                dayMeals.forEach(meal => {
                    let mealCard = `
                        <div class="card mb-2">
                            <div class="card-body">
                                <h5 class="card-title">${meal.title}</h5>
                                <p class="card-text">Prep Time: ${meal.readyInMinutes} mins</p>
                                <a href="${meal.sourceUrl}" target="_blank" class="btn btn-warning text-white">View Recipe</a>
                            </div>
                        </div>
                    `;
                    daySection.innerHTML += mealCard;
                });

                mealPlanContainer.appendChild(daySection);
            });

        } catch (error) {
            console.error("Error fetching data:", error);
        }
    }
});
```

