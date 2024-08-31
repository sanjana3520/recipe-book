const sampleRecipes = [
    {
        name: "Pizza",
        ingredients: ["Pizza Base", "Tomato Sauce", "Cheese", "Vegetables", "Oregano"],
        instructions: "Spread sauce on the base, add toppings, and bake.",
        photo: "https://i.pinimg.com/474x/ff/b8/e8/ffb8e8c94bf6210bf383e050520b00cf.jpg"
    },
    {
        name: "Avocado Toast",
        ingredients: ["Avocado", "Bread", "Salt", "Pepper"],
        instructions: "Mash the avocado, spread on toast, and season with salt and pepper.",
        photo: "https://i.pinimg.com/564x/4b/91/56/4b9156c6d9c5be6cde10dbf4ea6c5446.jpg"
    },
    {
        name: "Pav Bhaji",
        ingredients: ["Potatoes", "Tomatoes", "Onion", "Pav Bhaji Masala", "Butter"],
        instructions: "Boil vegetables, mash, and cook with spices, serve with buttered pav.",
        photo: "https://i.pinimg.com/474x/9d/c9/15/9dc91554ce45e92f03aa59bb32b0dff6.jpg"
    },
    {
        name: "Grilled Chicken Salad",
        ingredients: ["Chicken", "Lettuce", "Tomatoes", "Cucumbers", "Olive Oil"],
        instructions: "Grill the chicken, chop the vegetables, and mix with olive oil.",
        photo: "https://i.pinimg.com/474x/9b/ec/a7/9beca7153757bbc850c276f0601c794f.jpg"
    },
    {
        name: "Poha",
        ingredients: ["Flattened Rice", "Onion", "Potato", "Mustard Seeds", "Curry Leaves"],
        instructions: "Soak poha, fry spices and vegetables, mix poha and cook.",
        photo: "https://i.pinimg.com/474x/3a/ec/90/3aec90e2528bee270cbbe71f4529d640.jpg"
    },
    {
        name: "Dosa",
        ingredients: ["Rice", "Urad Dal", "Salt", "Oil"],
        instructions: "Make batter from soaked rice and dal, spread on tawa, and cook.",
        photo: "https://i.pinimg.com/474x/7f/6d/3e/7f6d3ebdca842e61864b698a277c5418.jpg"
    },
    {
        name: "Idli",
        ingredients: ["Rice", "Urad Dal", "Salt", "Baking Soda"],
        instructions: "Make batter, pour into molds, and steam cook.",
        photo: "https://i.pinimg.com/474x/f4/d5/35/f4d535a76f86f7c909f15cf0457ccbf2.jpg"
    },
    {
        name: "Vada",
        ingredients: ["Urad Dal", "Onion", "Chilies", "Curry Leaves", "Oil"],
        instructions: "Grind soaked dal, add spices, shape into vadas, and deep fry.",
        photo: "https://i.pinimg.com/564x/7c/25/06/7c25062db19fcdb416f9fdc2ee743da5.jpg"
    },
    {
        name: "Paratha",
        ingredients: ["Wheat Flour", "Potatoes", "Ghee", "Spices"],
        instructions: "Make dough, stuff with spiced potatoes, and cook on tawa.",
        photo: "https://i.pinimg.com/474x/b3/ce/66/b3ce66729d36d53d779f6ef0bec25b2d.jpg"
    },
    {
        name: "Fried Rice",
        ingredients: ["Rice", "Vegetables", "Soy Sauce", "Oil"],
        instructions: "Stir fry vegetables, add cooked rice, and mix with soy sauce.",
        photo: "https://i.pinimg.com/474x/98/5d/86/985d8659d33083e205eeb1e841729362.jpg"
    },
    {
        name: "Veg Pulav",
        ingredients: ["Rice", "Vegetables", "Spices", "Oil"],
        instructions: "Cook rice with spiced vegetables.",
        photo: "https://i.pinimg.com/474x/c8/4d/5f/c84d5f520db53f64246998f26b7deacf.jpg"
    },
    {
        name: "Noodles",
        ingredients: ["Noodles", "Vegetables", "Soy Sauce", "Oil"],
        instructions: "Boil noodles, stir fry vegetables, and mix with sauce.",
        photo: "https://i.pinimg.com/474x/2e/ac/a3/2eaca366537c4cbb3c573ab63cfd7e05.jpg"
    }
];

let currentPage = 0;
const recipesPerPage = 1;

function loadRecipePage(page) {
    const mealResult = document.getElementById('meal-result');
    const start = page * recipesPerPage;
    const end = start + recipesPerPage;
    const recipesToShow = sampleRecipes.slice(start, end);

    mealResult.innerHTML = recipesToShow.map(recipe => `
        <div class="meal-item">
            <img src="${recipe.photo}" alt="${recipe.name}">
            <div class="meal-name">
                <h3>${recipe.name}</h3>
                <p>Ingredients: ${recipe.ingredients.join(', ')}</p>
                <p>Instructions: ${recipe.instructions}</p>
            </div>
        </div>
    `).join('');
}

function updateNavigationButtons() {
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');
    const totalPages = Math.ceil(sampleRecipes.length / recipesPerPage);

    prevBtn.disabled = currentPage === 0;
    nextBtn.disabled = currentPage === totalPages - 1;
}

document.getElementById('prev-btn').addEventListener('click', () => {
    if (currentPage > 0) {
        currentPage--;
        loadRecipePage(currentPage);
        updateNavigationButtons();
    }
});

document.getElementById('next-btn').addEventListener('click', () => {
    const totalPages = Math.ceil(sampleRecipes.length / recipesPerPage);
    if (currentPage < totalPages - 1) {
        currentPage++;
        loadRecipePage(currentPage);
        updateNavigationButtons();
    }
});

// Search functionality
document.getElementById('search-btn').addEventListener('click', () => {
    const query = document.getElementById('search-input').value.toLowerCase();
    const filteredRecipes = sampleRecipes.filter(recipe =>
        recipe.name.toLowerCase().includes(query) ||
        recipe.ingredients.some(ingredient => ingredient.toLowerCase().includes(query))
    );
    const totalPages = Math.ceil(filteredRecipes.length / recipesPerPage);
    currentPage = 0; // Reset to first page
    loadFilteredRecipePage(filteredRecipes, currentPage);
    updateNavigationButtons(filteredRecipes);
});

function loadFilteredRecipePage(recipes, page) {
    const mealResult = document.getElementById('meal-result');
    const start = page * recipesPerPage;
    const end = start + recipesPerPage;
    const recipesToShow = recipes.slice(start, end);

    mealResult.innerHTML = recipesToShow.map(recipe => `
        <div class="meal-item">
            <img src="${recipe.photo}" alt="${recipe.name}">
            <div class="meal-name">
                <h3>${recipe.name}</h3>
                <p>Ingredients: ${recipe.ingredients.join(', ')}</p>
                <p>Instructions: ${recipe.instructions}</p>
            </div>
        </div>
    `).join('');
}

function updateNavigationButtons(filteredRecipes = sampleRecipes) {
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');
    const totalPages = Math.ceil(filteredRecipes.length / recipesPerPage);

    prevBtn.disabled = currentPage === 0;
    nextBtn.disabled = currentPage === totalPages - 1;
}

document.getElementById('search-btn').addEventListener('click', () => {
    const query = document.getElementById('search-input').value.toLowerCase();
    const filteredRecipes = sampleRecipes.filter(recipe =>
        recipe.name.toLowerCase().includes(query) ||
        recipe.ingredients.some(ingredient => ingredient.toLowerCase().includes(query))
    );
    currentPage = 0; // Reset to first page
    loadFilteredRecipePage(filteredRecipes, currentPage);
    updateNavigationButtons(filteredRecipes);
});

// Initial load
loadRecipePage(currentPage);
updateNavigationButtons();


const userRecipes = [];

// Function to display user-added recipes
function loadUserRecipes() {
    const userRecipesList = document.getElementById('user-recipes-list');
    userRecipesList.innerHTML = userRecipes.map((recipe, index) => `
        <div class="meal-item">
            <img src="${recipe.photo}" alt="${recipe.name}">
            <div class="meal-name">
                <h3>${recipe.name}</h3>
                <p>Ingredients: ${recipe.ingredients.join(', ')}</p>
                <p>Instructions: ${recipe.instructions}</p>
            </div>
            <button onclick="deleteRecipe(${index})">Delete</button>
        </div>
    `).join('');
}

// Add recipe form submission
document.getElementById('add-recipe-form').addEventListener('submit', (event) => {
    event.preventDefault();

    const recipeName = document.getElementById('recipe-name').value;
    const ingredients = document.getElementById('ingredients').value.split(',').map(ingredient => ingredient.trim());
    const instructions = document.getElementById('instructions').value;
    const recipePhoto = document.getElementById('recipe-photo').files[0];

    if (recipePhoto) {
        const reader = new FileReader();
        reader.onload = () => {
            userRecipes.push({
                name: recipeName,
                ingredients: ingredients,
                instructions: instructions,
                photo: reader.result
            });

            loadUserRecipes();
            document.getElementById('add-recipe-form').reset();
        };
        reader.readAsDataURL(recipePhoto);
    }
});
// Delete recipe
function deleteRecipe(index) {
    userRecipes.splice(index, 1);
    loadUserRecipes();
}

// Initial load
loadRecipePage(currentPage);
updateNavigationButtons();
loadUserRecipes();


// Search functionality
document.getElementById('search-btn').addEventListener('click', () => {
    const query = document.getElementById('search-input').value.toLowerCase();
    const filteredRecipes = sampleRecipes.filter(recipe =>
        recipe.name.toLowerCase().includes(query) ||
        recipe.ingredients.some(ingredient => ingredient.toLowerCase().includes(query))
    );

    if (filteredRecipes.length === 0) {
        document.getElementById('meal-result').innerHTML = `
            <div class="no-results">
                <p>This recipe is not available on our page.</p>
            </div>
        `;
    } else {
        currentPage = 0; // Reset to the first page
        loadFilteredRecipePage(filteredRecipes, currentPage);
        updateNavigationButtons(filteredRecipes);
    }
});