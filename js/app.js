const searchBtn = document.getElementById('searchBtn');
const searchInput = document.getElementById('searchInput');
const recipeList = document.getElementById('recipeList');
const categoryBtns = document.querySelectorAll('.categoryBtn');

// Search by button click
searchBtn.addEventListener('click', fetchRecipes);

// Search by Enter key
searchInput.addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
        fetchRecipes();
    }
});

// Category button clicks
categoryBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        fetchByCategory(btn.dataset.category);
    });
});

// Default recipes on load
window.addEventListener('DOMContentLoaded', () => {
    fetchByCategory("Chicken"); // You can change default to anything
});

// Fetch recipes by search
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

// Fetch recipes by category
async function fetchByCategory(category) {
    try {
        const res = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${category}`);
        const data = await res.json();

        if (data.meals) {
            displayRecipes(data.meals);
        } else {
            recipeList.innerHTML = '<p>No recipes available for this category.</p>';
        }
    } catch (error) {
        console.error('Error fetching category recipes:', error);
        recipeList.innerHTML = '<p>Unable to load category recipes.</p>';
    }
}

// Display recipes
function displayRecipes(recipes) {
    recipeList.innerHTML = recipes.map(meal => `
        <div class="recipe-card" onclick="viewDetails('${meal.idMeal}')">
            <img src="${meal.strMealThumb}" alt="${meal.strMeal}">
            <h3>${meal.strMeal}</h3>
        </div>
    `).join('');
}

// View details
function viewDetails(id) {
    localStorage.setItem('selectedRecipe', id);
    window.location.href = 'details.html';
}
