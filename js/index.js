const cardGrid = document.getElementById('card-grid')
const ingredientsTagGrid = document.getElementById('categories-items_container_ingredients')
const appareilsTagGrid = document.getElementById('categories-items_container_appareil')
const ustensilesTagGrid = document.getElementById('categories-items_container_ustensiles')
const errorMsg = document.getElementById('error-msg')
let recipesChosenArray = recipes
let ingredientsTagArray = []
let appareilsTagArray = []
let ustensilesTagArray = []
let tagsArrayIngredients = []
let tagsArrayAppareils = []
let tagsArrayUstensiles = []
let recipesChosenArrayTag = recipes

init()

function init() {
    displayCards(recipes)
}

// DISPLAY CARDS
function displayCards(inputArray) {
    // ERROR MSG
    inputArray.length === 0 ? errorMsg.classList.add('active') : errorMsg.classList.remove('active')

    cardGrid.innerHTML = ""
    ingredientsTagArray = []
    appareilsTagArray = []
    ustensilesTagArray = []
    inputArray.forEach((recipe) => {
        let { id, name, ingredients, time, description, appliance, ustensils } = recipe

        // CREATION DES ELEMENTS
        const div = document.createElement('div')
        div.className = "card"

        // DETAILLER LES CREATIONS
        div.innerHTML = `<div class="card-image"></div>
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
        cardGrid.appendChild(div)

        // RAJOUT DES INGREDIENTS
        ingredients.forEach((item) => {
            let { ingredient, quantity, unit } = item
            const listIngredients = document.getElementById(`list-ingredients${id}`)
            const liste = document.createElement('li')
            if (quantity === undefined || null) {
                liste.innerHTML = `<b>${ingredient}</b>`
            } else {
                if (unit === undefined || null) {
                    liste.innerHTML = `<b>${ingredient}: </b> ${quantity}`
                } else {
                    liste.innerHTML = `<b>${ingredient}: </b> ${quantity} ${unit}`
                }
            }
            listIngredients.appendChild(liste)

            //  INGREDIENTS TAGS
            ingredientsTagArray.push(ingredient)
        })
        appareilsTagArray.push(appliance)
        ustensils.forEach((item) => {
            ustensilesTagArray.push(item)
        })
    })

    // NO DOUBLONS TAGS
    ingredientsTagArray = uniq(ingredientsTagArray)
    appareilsTagArray = uniq(appareilsTagArray)
    ustensilesTagArray = uniq(ustensilesTagArray)

    // REMPLI LES TAGS INGREDIENTS
    displayIngredientTags(ingredientsTagArray)
    displayAppareilTags(appareilsTagArray)
    displayUstensileTags(ustensilesTagArray)
}

// REMPLI LES TAGS INGREDIENTS
function displayIngredientTags(array) {
    ingredientsTagGrid.innerHTML = ""
    array.forEach((item) => {
        const tagDiv = document.createElement('div')
        tagDiv.className = "tag"
        tagDiv.dataset.type = "ingredient"
        tagDiv.innerHTML = `${item}`
        ingredientsTagGrid.appendChild(tagDiv)
    })
    // EVENT CLICK TAG
    tagClick()
}
// REMPLI LES TAGS APPAREILS
function displayAppareilTags(array) {
    appareilsTagGrid.innerHTML = ""
    array.forEach((item) => {
        const tagDiv = document.createElement('div')
        tagDiv.className = "tag"
        tagDiv.dataset.type = "appareil"
        tagDiv.innerHTML = `${item}`
        appareilsTagGrid.appendChild(tagDiv)
    })
    // EVENT CLICK TAG
    tagClick()
}
// REMPLI LES TAGS USTENSILES
function displayUstensileTags(array) {
    ustensilesTagGrid.innerHTML = ""
    array.forEach((item) => {
        const tagDiv = document.createElement('div')
        tagDiv.className = "tag"
        tagDiv.dataset.type = "ustensile"
        tagDiv.innerHTML = `${item}`
        ustensilesTagGrid.appendChild(tagDiv)
    })
    // EVENT CLICK TAG
    tagClick()
}

// EVENT CLICK TAG
function tagClick() {
    let tags = document.querySelectorAll(".tag")
    tags.forEach((tag) => {
        tag.addEventListener('click', () => {

            let tagValue = tag.textContent
            let tagType = tag.dataset.type

            addTag(tagValue, tagType)
        })
    })
}

// ADD TAG
function addTag(tag, type) {
    if (type === "ingredient") {
        tagsArrayIngredients.push(tag)
        tagsArrayIngredients = uniq(tagsArrayIngredients)
    }
    if (type === "appareil") {
        tagsArrayAppareils.push(tag)
        tagsArrayAppareils = uniq(tagsArrayAppareils)
    }
    if (type === "ustensile") {
        tagsArrayUstensiles.push(tag)
        tagsArrayUstensiles = uniq(tagsArrayUstensiles)
    }

    rerollCardsWithTags()

    // 
    tagClass = tag.toLowerCase().replace(/\s/g, '').replace(/[{()}]/g, '');
    if (document.getElementById("tags-actives").querySelectorAll(`.${tagClass}`).length === 0) {
        printTag(tag, tagClass, type)
    }
}

// PRINT TAG
function printTag(tag, tagClass, type) {
    const tagPrintedContainer = document.getElementById('tags-actives')
    const tagDiv = document.createElement('div')
    if (type === "ingredient") tagDiv.className = `tagPrinted tagPrinted-blue ${tagClass}`
    if (type === "appareil") tagDiv.className = `tagPrinted tagPrinted-green ${tagClass}`
    if (type === "ustensile") tagDiv.className = `tagPrinted tagPrinted-red ${tagClass}`
    tagDiv.innerHTML = `${tag} <img class="tags-actives_close" src="assets/icons/close.svg" alt="">`
    tagPrintedContainer.appendChild(tagDiv)

    //  EVENT CLOSE TAG
    onTagCloseClick()
}

// EVENT CLICK TAG
function onTagCloseClick() {

    let tagsClose = document.querySelectorAll(".tags-actives_close")
    tagsClose.forEach((closer) => {
        closer.addEventListener('click', () => {

            // REMOVE TAG ON ARRAY
            let tagValue = closer.parentElement.textContent.trim()
            if (closer.parentElement.classList.contains('tagPrinted-blue')) {
                let index = tagsArrayIngredients.indexOf(tagValue)
                if (index > -1) {
                    tagsArrayIngredients.splice(index, 1) // 2nd parameter means remove one item only
                }
            }
            if (closer.parentElement.classList.contains('tagPrinted-green')) {
                let index = tagsArrayAppareils.indexOf(tagValue)
                if (index > -1) {
                    tagsArrayAppareils.splice(index, 1) // 2nd parameter means remove one item only
                }
            }
            if (closer.parentElement.classList.contains('tagPrinted-red')) {
                let index = tagsArrayUstensiles.indexOf(tagValue)
                if (index > -1) {
                    tagsArrayUstensiles.splice(index, 1) // 2nd parameter means remove one item only
                }
            }

            rerollCardsWithTags()

            // REMOVE TAG PRINTED
            closer.parentElement.remove()
        })
    })
}

// REROLL CARDS WITH TAGS
function rerollCardsWithTags() {
    if (tagsArrayIngredients.length === 0 && tagsArrayAppareils.length === 0 && tagsArrayUstensiles.length === 0) {
        displayCards(recipes)
    } else {
        // init search ingredients
        recipesChosenArray = recipes

        if (tagsArrayIngredients.length !== 0) {
            tagsArrayIngredients.forEach((tag) => {
                // search ingredients
                recipesChosenArray = recipesChosenArray.filter((recipe) =>
                    recipe.ingredients.some(ingredient =>
                        ingredient.ingredient.toLowerCase().includes(tag.toLowerCase())
                    )
                )
            })
            console.log(recipesChosenArray)
        }

        if (tagsArrayAppareils.length !== 0) {
            tagsArrayAppareils.forEach((tag) => {
                // search appareil
                recipesChosenArray = recipesChosenArray.filter((recipe) =>
                    recipe.appliance.toLowerCase().includes(tag.toLowerCase())
                )
            })
            console.log(recipesChosenArray)
        }

        if (tagsArrayUstensiles.length !== 0) {
            tagsArrayUstensiles.forEach((tag) => {
                // search ustensiles
                recipesChosenArray = recipesChosenArray.filter((recipe) =>
                    recipe.ustensils.some(item =>
                        item.toLowerCase().includes(tag.toLowerCase())
                    )
                )
            })
        }

        displayCards(recipesChosenArray)
    }
}

// SEARCH ON ENTER KEY
document.getElementById("searching-input").addEventListener("keydown", function (event) {
    if (event.defaultPrevented) {
        return
    }
    switch (event.key) {
        case "Enter":
            submitSearch()
            break
        default:
            return
    }
    event.preventDefault()
}, true)

// SEARCH BAR
function submitSearch() {
    let inputValue = document.getElementById("searching-input").value
    let searchIngredient = [];
    let searchName = [];
    let searchDescription = [];

    // AT LEAST 3 CHARACTERS
    if (inputValue.length < 3) return;

    // search ingredients
    for (let j = 0; j < recipes.length; j++) {
        for (let k = 0; k < recipes[j].ingredients.length; k++) {
            if (recipes[j].ingredients[k].ingredient.toLowerCase().includes(inputValue.toLowerCase())) {
                searchIngredient.push(recipes[j]);
            }
            break;
        }
    }

    // search name
    for (let j = 0; j < recipes.length; j++) {
        if (recipes[j].name.toLowerCase().includes(inputValue.toLowerCase())) {
            searchName.push(recipes[j]);
        }
    }
    
    // search description
    for (let j = 0; j < recipes.length; j++) {
        if (recipes[j].description.toLowerCase().includes(inputValue.toLowerCase())) {
            searchDescription.push(recipes[j]);
        }
    }

    recipesChosenArray = [...searchIngredient, ...searchName, ...searchDescription]
    recipesChosenArray = uniq(recipesChosenArray)

    // MAJ FOR TAG ARRAY
    recipesChosenArrayTag = recipesChosenArray


    //  TAGS ALREADY SELECTED
    if (tagsArrayIngredients.length !== 0) {
        tagsArrayIngredients.forEach((tag) => {
            // search ingredients
            recipesChosenArray = recipesChosenArray.filter((recipe) =>
                recipe.ingredients.some(ingredient =>
                    ingredient.ingredient.toLowerCase().includes(tag.toLowerCase())
                )
            )
        })
        console.log(recipesChosenArray)
    }

    if (tagsArrayAppareils.length !== 0) {
        tagsArrayAppareils.forEach((tag) => {
            // search appareil
            recipesChosenArray = recipesChosenArray.filter((recipe) =>
                recipe.appliance.toLowerCase().includes(tag.toLowerCase())
            )
        })
        console.log(recipesChosenArray)
    }

    if (tagsArrayUstensiles.length !== 0) {
        tagsArrayUstensiles.forEach((tag) => {
            // search ustensiles
            recipesChosenArray = recipesChosenArray.filter((recipe) =>
                recipe.ustensils.some(item =>
                    item.toLowerCase().includes(tag.toLowerCase())
                )
            )
        })
    }

    displayCards(recipesChosenArray)
}


// INGREDIENT TAG SEARCH ON ENTER KEY
document.getElementById("searching-ingredient-input").addEventListener("input", function () {
    submitIngredientSearch()
})

// INGREDIENT SEARCH BAR
function submitIngredientSearch() {
    let inputValue = document.getElementById("searching-ingredient-input").value

    // search tag in ingredient
    const searchTagIngredient = ingredientsTagArray.filter((item) => {
        return item.toLowerCase().includes(inputValue.toLowerCase())
    })

    displayIngredientTags(searchTagIngredient)
}

// APPAREIL TAG SEARCH ON ENTER KEY
document.getElementById("searching-appareil-input").addEventListener("input", function () {
    submitAppareilSearch()
})

// APPAREIL SEARCH BAR
function submitAppareilSearch() {
    let inputValue = document.getElementById("searching-appareil-input").value

    // search tag in ustensils
    const searchTagAppareil = appareilsTagArray.filter((item) => {
        return item.toLowerCase().includes(inputValue.toLowerCase())
    })

    displayAppareilTags(searchTagAppareil)
}

// USTENSILE TAG SEARCH ON ENTER KEY
document.getElementById("searching-ustensile-input").addEventListener("input", function () {
    submitUstensileSearch()
})

// USTENSILE SEARCH BAR
function submitUstensileSearch() {
    let inputValue = document.getElementById("searching-ustensile-input").value

    // search tag in ustensils
    const searchTagAppareil = ustensilesTagArray.filter((item) => {
        return item.toLowerCase().includes(inputValue.toLowerCase())
    })

    displayUstensileTags(searchTagAppareil)
}

// DELETE DOUBLONS
function uniq(a) {
    return Array.from(new Set(a))
}

// TAGS SELECTOR
const ingredientTags = document.getElementById("categories-item_ingredients")
const appareilTags = document.getElementById("categories-item_appareil")
const ustensileTags = document.getElementById("categories-item_ustensiles")
const ingredientsExpand = document.getElementById("ingredients_expand")
const appareilExpand = document.getElementById("appareil_expand")
const ustensilesExpand = document.getElementById("ustensiles_expand")
const ingredientsClose = document.getElementById("ingredients_close")
const appareilClose = document.getElementById("appareil_close")
const ustensilesClose = document.getElementById("ustensiles_close")



// CLOSE
document.addEventListener('click', (event) => {
    if (!ingredientTags.contains(event.target) || event.target === ingredientsClose) {
        ingredientTags.classList.remove('open')
        ingredientsClose.style.display = 'none'
        ingredientsExpand.style.display = 'initial'
    }
    if (!appareilTags.contains(event.target) || event.target === appareilClose) {
        appareilTags.classList.remove('open')
        appareilClose.style.display = 'none'
        appareilExpand.style.display = 'initial'
    }
    if (!ustensileTags.contains(event.target) || event.target === ustensilesClose) {
        ustensileTags.classList.remove('open')
        ustensilesClose.style.display = 'none'
        ustensilesExpand.style.display = 'initial'
    }
})


//  METTRE 2 ICONE ET CHANGE LE DISPLAY

// OPEN
// INGREDIENTS
ingredientTags.addEventListener('click', () => {
    ingredientTags.classList.add('open')
    ingredientsClose.style.display = 'initial'
    ingredientsExpand.style.display = 'none'
})
// APPAREIL
appareilTags.addEventListener('click', () => {
    appareilTags.classList.add('open')
    appareilClose.style.display = 'initial'
    appareilExpand.style.display = 'none'
})
// INGREDIENTS USTENSILES
ustensileTags.addEventListener('click', () => {
    ustensileTags.classList.add('open')
    ustensilesClose.style.display = 'initial'
    ustensilesExpand.style.display = 'none'
})
