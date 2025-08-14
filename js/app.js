const searchBtn = document.getElementById('searchBtn');
const searchInput = document.getElementById('searchInput');
const recipeList = document.getElementById('recipeList');

searchBtn.addEventListener('click', fetchRecipes);

async function fetchRecipes() {
    const query = searchInput.value.trim();
    if (!query) {
        alert('Please enter a recipe name.');
        return;
    }

    try {
        const res = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`);
        const data = await res.json();

        if (data.meals) {
            displayRecipes(data.meals);
        } else {
            recipeList.innerHTML = '<p>No recipes found. Try another search.</p>';
        }
    } catch (error) {
        console.error('Error fetching recipes:', error);
        recipeList.innerHTML = '<p>Something went wrong. Please try again.</p>';
    }
}

function displayRecipes(recipes) {
    recipeList.innerHTML = recipes.map(meal => `
        <div class="recipe-card" onclick="viewDetails('${meal.idMeal}')">
            <img src="${meal.strMealThumb}" alt="${meal.strMeal}">
            <h3>${meal.strMeal}</h3>
        </div>
    `).join('');
}

function viewDetails(id) {
    localStorage.setItem('selectedRecipe', id);
    window.location.href = 'details.html';
}
