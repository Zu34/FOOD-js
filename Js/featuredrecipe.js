//fetch data in img recepie 
document.addEventListener("DOMContentLoaded", async function () {
    const apiUrl = "https://www.themealdb.com/api/json/v1/1/random.php";

    try {
        let response = await fetch(apiUrl);
        if (!response.ok) throw new Error("Failed to fetch");

        let data = await response.json();
        console.log("API Data:", data); // Debugging API response

        if (data.meals) {
            let meal = data.meals[0];

            document.getElementById("recipe-title").innerText = meal.strMeal;
            document.getElementById("recipe-description").innerText =
                meal.strInstructions.substring(0, 150) + "..."; 

            let imgElement = document.getElementById("recipe-img");
            imgElement.src = meal.strMealThumb;
            imgElement.alt = meal.strMeal; // Better accessibility

            document.getElementById("recipe-link").href = meal.strSource || "#";
        } else {
            console.error("No recipe found");
        }
    } catch (error) {
        console.error("Error fetching data:", error);
    }
});
