const recipeDetails = document.getElementById('recipeDetails');
const recipeId = localStorage.getItem('selectedRecipe');

async function fetchRecipeDetails() {
    try {
        const res = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${recipeId}`);
        const data = await res.json();
        if (data.meals) {
            displayRecipeDetails(data.meals[0]);
        }
    } catch (error) {
        console.error('Error fetching recipe details:', error);
        recipeDetails.innerHTML = '<p>Unable to load recipe details.</p>';
    }
}

function displayRecipeDetails(meal) {
    recipeDetails.innerHTML = `
        <h2>${meal.strMeal}</h2>
        <img src="${meal.strMealThumb}" alt="${meal.strMeal}">
        <h3>Ingredients</h3>
        <ul>
            ${getIngredients(meal).map(ing => `<li>${ing}</li>`).join('')}
        </ul>
        <h3>Instructions</h3>
        <p>${meal.strInstructions}</p>
    `;
}

function getIngredients(meal) {
    const ingredients = [];
    for (let i = 1; i <= 20; i++) {
        const ingredient = meal[`strIngredient${i}`];
        const measure = meal[`strMeasure${i}`];
        if (ingredient && ingredient.trim()) {
            ingredients.push(`${ingredient} - ${measure}`);
        }
    }
    return ingredients;
}

fetchRecipeDetails();
