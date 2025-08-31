const searchBtn = document.getElementById('searchBtn');
const searchInput = document.getElementById('searchInput');
const recipeList = document.getElementById('recipeList');
const cuisineBtns = document.querySelectorAll('.categoryBtn');
const arrowBack = document.getElementById("back-btn")
// Go back function
function goBack() {
    window.history.back();
}
arrowBack.addEventListener('click', goBack)
// Search by button click
searchBtn.addEventListener('click', fetchRecipes);

// Search by Enter key
searchInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') fetchRecipes();
});

// Cuisine button clicks (use Area)
cuisineBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        const area = btn.dataset.area; // e.g. "Spanish"
        fetchByArea(area);
    });
});

// Default recipes on load (show Spanish by default)
window.addEventListener('DOMContentLoaded', () => {
    fetchByArea('Spanish');
});

// Fetch recipes by search term
async function fetchRecipes() {
    const query = searchInput.value.trim();
    if (!query) {
        alert('Please enter a recipe name.');
        return;
    }

    try {
        const res = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${encodeURIComponent(query)}`);
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

// Fetch recipes by cuisine (Area)
async function fetchByArea(area) {
    try {
        const res = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${encodeURIComponent(area)}`);
        const data = await res.json();

        if (data.meals) {
            displayRecipes(data.meals);
        } else {
            recipeList.innerHTML = `<p>No recipes available for ${area} cuisine.</p>`;
        }
    } catch (error) {
        console.error('Error fetching area recipes:', error);
        recipeList.innerHTML = '<p>Unable to load cuisine recipes.</p>';
    }
}

// Render recipe cards
function displayRecipes(recipes) {
    recipeList.innerHTML = recipes.map(meal => `
        <div class="recipe-card" onclick="viewDetails('${meal.idMeal}')">
            <img src="${meal.strMealThumb}" alt="${meal.strMeal}">
            <h3>${meal.strMeal}</h3>
        </div>
    `).join('');
}

// Navigate to details page
function viewDetails(id) {
    localStorage.setItem('selectedRecipe', id);
    window.location.href = 'details.html';
}
