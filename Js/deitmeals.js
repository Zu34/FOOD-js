

document.addEventListener("DOMContentLoaded", function () {
    const categories = [
        { name: "Vegetarian", icon: "fas fa-carrot", value: "Vegetarian" },
        { name: "Vegan", icon: "fas fa-seedling", value: "Vegan" },
        { name: "Seafood", icon: "fas fa-fish", value: "Seafood" },
        { name: "Pasta", icon: "fas fa-pizza-slice", value: "Pasta" },
        { name: "Dessert", icon: "fas fa-ice-cream", value: "Dessert" },
        { name: "Soup", icon: "fas fa-mug-hot", value: "Soup" }
    ];

    const categoriesContainer = document.getElementById("categories");
    const UNSPLASH_ACCESS_KEY = "lRNY8tCveV4BEwlCJMXJGOJSOPgWqP1SuzvOYETNvC8"; 

    // Generate category cards dynamically
    categories.forEach(category => {
        let card = document.createElement("div");
        card.classList.add("col");
        card.innerHTML = `
            <div class="card category-card text-center p-3 border border-warning shadow" data-category="${category.value}">
                <i class="${category.icon} category-icon text-warning"></i>
                <h5 class="mt-3">${category.name}</h5>
            </div>
        `;
        categoriesContainer.appendChild(card);
    });

    // Event Listener for category selection
    document.querySelectorAll(".category-card").forEach(card => {
        card.addEventListener("click", function () {
            let category = this.getAttribute("data-category");
            fetchMealPlan(category);
        });
    });

    // Function to Shuffle Array
    function shuffleArray(array) {
        return array.sort(() => Math.random() - 0.5);
    }

    // ✅ Function to Fetch Vegan Images from Unsplash
    async function fetchVeganImages() {
        try {
            let response = await fetch(`https://api.unsplash.com/search/photos?query=vegan food&per_page=7&client_id=${UNSPLASH_ACCESS_KEY}`);
            if (!response.ok) throw new Error("Failed to fetch Unsplash images");

            let data = await response.json();
            return shuffleArray(data.results.map(img => img.urls.regular)); // Shuffle & return image URLs
        } catch (error) {
            console.error("Error fetching Unsplash images:", error);
            return [];
        }
    }

    // ✅ Function to Fetch Meal Plan
    async function fetchMealPlan(category) {
        let mealPlanContainer = document.getElementById("mealPlan");
        mealPlanContainer.innerHTML = `<h3 class="text-center text-warning mt-4">Weekly ${category} Meal Plan</h3>`;

        // ✅ Handle Soup Category (Local JSON)
        if (category === "Soup") {
            try {
                let response = await fetch("soups.json");
                if (!response.ok) throw new Error("Failed to load soup images");

                let data = await response.json();
                let images = shuffleArray(data.images); // Shuffle the image array

                mealPlanContainer.innerHTML = ""; // Clear previous results
                let rowDiv = null;
                let days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

                days.forEach((day, index) => {
                    let imgSrc = images[index % images.length]; // Pick images in shuffled order

                    if (index % 3 === 0) {
                        rowDiv = document.createElement("div");
                        rowDiv.classList.add("row", "justify-content-center", "mb-3");
                        mealPlanContainer.appendChild(rowDiv);
                    }

                    let cardDiv = document.createElement("div");
                    cardDiv.classList.add("col-md-3", "d-flex", "justify-content-center");

                    cardDiv.innerHTML = `
                        <div class="card border-0 shadow-sm mt-4" style="width: 320px; background: #feeee7; border-radius: 10px;">
                            <img src="${imgSrc}" class="w-100 object-fit-contain" style="border-radius: 10px;" alt="Soup Image">
                            <div class="card-body">
                                <h5 class=" text-center">${day}</h5> 
                                <h6 class="card-title">Delicious Soup</h6>
                                <a href="#" target="_blank" class="btn btn-warning text-white">View Recipe</a>
                            </div>
                        </div>
                    `;

                    rowDiv.appendChild(cardDiv);
                });
            } catch (error) {
                console.error("Error fetching soup images:", error);
                mealPlanContainer.innerHTML = `<p class="text-center text-danger">Failed to load soups 😢</p>`;
            }
            return;
        }

        // ✅ Handle Vegan Category (Unsplash API)
        if (category === "Vegan") {
            let imageUrls = await fetchVeganImages();
            if (imageUrls.length === 0) {
                mealPlanContainer.innerHTML = `<p class="text-center text-danger">Failed to load vegan meals 😢</p>`;
                return;
            }

            mealPlanContainer.innerHTML = ""; // Clear previous results
            let rowDiv = null;
            let days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

            days.forEach((day, index) => {
                let imgSrc = imageUrls[index % imageUrls.length]; // Use Unsplash images

                if (index % 3 === 0) {
                    rowDiv = document.createElement("div");
                    rowDiv.classList.add("row", "justify-content-center", "mb-3");
                    mealPlanContainer.appendChild(rowDiv);
                }

                let cardDiv = document.createElement("div");
                cardDiv.classList.add("col-md-3", "d-flex", "justify-content-center");

                cardDiv.innerHTML = `
                    <div class="card border-0 shadow-sm mt-4" style="width: 220px; background: #feeee7; border-radius: 10px;">
                        <img src="${imgSrc}" class="w-100 object-fit-contain" style="border-radius: 10px;" alt="Vegan Meal">
                        <div class="card-body">
                            <h5 class=" text-center">${day}</h5>
                            <h6 class="card-title">Vegan Dish</h6>
                            <a href="#" target="_blank" class="btn btn-warning text-white">View Recipe</a>
                        </div>
                    </div>
                `;

                rowDiv.appendChild(cardDiv);
            });
            return;
        }

        // ✅ Handle Other Categories (MealDB API)
        let apiUrl = `https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`;
        
        try {
            let response = await fetch(apiUrl);
            if (!response.ok) throw new Error("Failed to fetch meals");

            let data = await response.json();
            let meals = data.meals ? shuffleArray(data.meals.slice(0, 7)) : [];

            if (meals.length === 0) {
                mealPlanContainer.innerHTML = `<p class="text-center text-danger">No meals found for ${category} 😢. Try another category!</p>`;
                return;
            }

            mealPlanContainer.innerHTML = ""; // Clear previous results
            let rowDiv = null;
            let days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

            days.forEach((day, index) => {
                let meal = meals[index];

                if (index % 3 === 0) {
                    rowDiv = document.createElement("div");
                    rowDiv.classList.add("row", "justify-content-center", "mb-3");
                    mealPlanContainer.appendChild(rowDiv);
                }

                let cardDiv = document.createElement("div");
                cardDiv.classList.add("col-md-3", "d-flex", "justify-content-center");

                cardDiv.innerHTML = `
                    <div class="card border-0 shadow-sm mt-4" style="width: 220px; background: #feeee7; border-radius: 10px;">
                        <img src="${meal.strMealThumb}" class="w-100 object-fit-contain" style="border-radius: 10px;" alt="${meal.strMeal}">
                        <div class="card-body">
                            <h5 class=" text-center">${day}</h5>
                            <h6 class="card-title">${meal.strMeal}</h6>
                            <a href="https://www.themealdb.com/meal/${meal.idMeal}" target="_blank" class="btn btn-warning text-white">View Recipe</a>
                        </div>
                    </div>
                `;

                rowDiv.appendChild(cardDiv);
            });
        } catch (error) {
            console.error("Error fetching data:", error);
            mealPlanContainer.innerHTML = `<p class="text-center text-danger">Failed to load meals 😢</p>`;
        }
    }
});
