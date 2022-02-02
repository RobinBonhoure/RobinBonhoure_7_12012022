const cardGrid = document.getElementById('card-grid');
const ingredientsTagGrid = document.getElementById('categories-items_container_ingredients');
let recipesChosenArrayDoublons = [];
let recipesChosenArray = [];
let ingredientsTagArray = [];

init();

function init() {
    displayCards(recipes);
}

// DISPLAY CARDS
function displayCards(inputArray) {
    cardGrid.innerHTML = "";
    ingredientsTagGrid.innerHTML = "";
    ingredientsTagArray = [];
    inputArray.forEach((recipe) => {
        let { id, name, ingredients, time, description, appliance, ustensils } = recipe;

        // CREATION DES ELEMENTS
        const div = document.createElement('div');
        div.className = "card";

        // DETAILLER LES CREATIONS
        div.innerHTML = `<div class="card-image"></div>
        <div class="card-infos">
            <div class="card-infos_header">
                <h3>${name}</h3>
                <div class="card-infos_time">
                    <img src="assets/icons/time.svg" alt="">
                    <b>${time} min</b>
                </div>
            </div>
            <div class="card-infos_footer">
                <ul id="list-ingredients${id}"></ul>
                <p>${description}</p>
            </div>
        </div>`
        cardGrid.appendChild(div);

        // RAJOUT DES INGREDIENTS
        ingredients.forEach((item) => {
            let { ingredient, quantity, unit } = item;
            const listIngredients = document.getElementById(`list-ingredients${id}`);
            const liste = document.createElement('li')
            if (unit === undefined || null) {
                unit = "";
            }
            if (quantity === undefined || null) {
                quantity = "";
            }
            liste.innerHTML = `<b>${ingredient}: </b> ${quantity} ${unit}`
            listIngredients.appendChild(liste);

            // REMPLI LES TAGS INGREDIENTS
            displayIngredientTags(ingredient);
        })
    })
}

function displayIngredientTags(ingredient) {
    const tagDiv = document.createElement('div');
    tagDiv.innerHTML = `${ingredient}`;
    ingredientsTagGrid.appendChild(tagDiv);
    ingredientsTagArray.push(ingredient);
}

// SEARCH ON ENTER KEY
document.getElementById("searching-input").addEventListener("keydown", function (event) {
    if (event.defaultPrevented) {
        return;
    }
    switch (event.key) {
        case "Enter":
            submitSearch();
            break;
        default:
            return;
    }
    event.preventDefault();
}, true);

// SEARCH BAR
function submitSearch() {
    let inputValue = document.getElementById("searching-input").value;

    // search ingredients
    const searchIngredient = recipes.filter((recipe) => {
        return recipe.ingredients.some(ingredient => {
            return ingredient.ingredient.toLowerCase().includes(inputValue.toLowerCase())
        })
    })
    // search name
    const searchName = recipes.filter((recipe) => {
        return recipe.name.toLowerCase().includes(inputValue.toLowerCase())
    })
    // search description
    const searchDescription = recipes.filter((recipe) => {
        return recipe.description.toLowerCase().includes(inputValue.toLowerCase())
    })


    recipesChosenArrayDoublons = [...searchIngredient, ...searchName, ...searchDescription];
    recipesChosenArray = uniq(recipesChosenArrayDoublons);

    displayCards(recipesChosenArray)
};


// TAG SEARCH ON ENTER KEY
document.getElementById("searching-ingredient-input").addEventListener("keydown", function (event) {
    if (event.defaultPrevented) {
        return;
    }
    switch (event.key) {
        case "Enter":
            submitIngredientSearch();
            break;
        default:
            return;
    }
    event.preventDefault();
}, true);

// INGREDIENT SEARCH BAR
function submitIngredientSearch() {
    let inputValue = document.getElementById("searching-ingredient-input").value;
    console.log(inputValue)

    // search tag in ingredient
    const searchTagIngredient = ingredientsTagArray.filter((ingredient) => {
        return ingredient.toLowerCase().includes(inputValue.toLowerCase())
    })

    console.log(searchTagIngredient)

    displayIngredientTags(searchTagIngredient);
};

// DELETE DOUBLONS
function uniq(a) {
    return Array.from(new Set(a));
}

// OPEN TAGS SELECTOR
document.getElementById("categories-item_ingredients").addEventListener('click', () => {
    document.getElementById("categories-item_ingredients").classList.add('open');
})