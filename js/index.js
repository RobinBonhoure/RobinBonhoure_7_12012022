const cardGrid = document.getElementById('card-grid');
const recipesChosenArray = [];

init();

function init() {
    displayCards(recipes);
}

// DISPLAY CARDS
function displayCards(inputArray) {
    cardGrid.innerHTML = "";
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
        })
    })
}

// SEARCH BAR
function submitSearch() {
    let inputValue = document.getElementById("searching-input").value;

    const searchResult = recipes.filter((recipe) => {
        // console.log(recipe.ingredients)
        return recipe.ingredients.some(ingredient => {
            const value = ingredient.ingredient.toLowerCase();
            return value.includes(inputValue.toLowerCase())
        })
    })

    console.log(searchResult)

    // displayCards(recipesChosenArray)
};

    // selectedIngredients.forEach((ingredients) => {
    //     const { date, title, video, image, likes, id } = ingredients;
    //     totalLikes += likes;
    //     if (image || video) {
    //         const div = document.createElement('div');
    //         div.className = "imgContainer";
    //         div.dataset.likes = likes;
    //         div.dataset.date = date;
    //         const pictures = `assets/images/${image || video}`;
    //         const img = document.createElement('img');
    //         const vid = document.createElement('video');
    //         const p1 = document.createElement('div');
    //         const heart = document.createElement('div');
    //         heart.className = "heartIcon";
    //         heart.setAttribute("alt", "Likes");
    //         const p2 = document.createElement('div');
    //         p1.textContent = title;
    //         p1.className = "imgTitle";
    //         p2.innerHTML = `<span>${likes}</span>`;
    //         p2.className = "imgLikes";
    //         p2.setAttribute("aria-label", "likes");
    //         p2.appendChild(heart);
    //         if (image) {
    //             img.setAttribute("src", pictures);
    //             img.setAttribute("aria-label", `${title}, closeup view`);
    //             img.dataset.title = title;
    //             img.setAttribute("tabindex", 0);
    //             img.setAttribute("onkeypress", "openPictureInLightBox(this)");
    //             div.dataset.url = image;
    //             div.dataset.type = "image";
    //             div.dataset.title = title;
    //             img.dataset.id = id;
    //             img.className = "photo";
    //             div.appendChild(img);
    //         }
    //         if (video) {
    //             vid.setAttribute("src", pictures);
    //             vid.setAttribute("aria-label", "Video, closeup view");
    //             vid.dataset.title = "Video";
    //             vid.setAttribute("tabindex", 0);
    //             vid.setAttribute("onkeypress", "openPictureInLightBox(this)");
    //             div.dataset.url = video;
    //             div.dataset.type = "video";
    //             div.dataset.title = "Video";
    //             vid.dataset.id = id;
    //             vid.className = "photo";
    //             div.appendChild(vid);
    //         }
    //         div.appendChild(p1);
    //         div.appendChild(p2);
    //         ingredientsSection.appendChild(div);
    //     }
    // })

//     document.getElementById("tarif-fixed").innerHTML = price + "€ / jour";
//     document.getElementById("likes-fixed").innerHTML = totalLikes;

// }

// function filterById(jsonObject, id) {
//     return jsonObject.filter(function (jsonObject) {
//         return (jsonObject['id'] == id);
//     })[0];
// }


// async function displayData() {
//     const photographeHeader = document.querySelector(".photographe-header");
//     openNew(arrayRecipes.recipes, arrayRecipes.media);
// };

// async function init() {
//     // Récupère les datas des photographes
//     const { ingredients } = await getIngredients();
//     displayData();
//     // check if ingredients are in the DOM
//     let checkExist = setInterval(function () {
//         if (document.querySelectorAll('.photo').length && document.querySelectorAll('.imgLikes').length) {
//             lightBox(ingredients);
//             likesCounter();
//             clearInterval(checkExist);
//         }
//     }, 100);
// };

// init();

// // INCREMENT LIKES
// async function likesCounter() {
//     let imgLikesCounter = document.querySelectorAll('.imgLikes');

//     imgLikesCounter.forEach((liker) => {
//         liker.addEventListener('click', () => {
//             liker.children[0].textContent++;
//             document.getElementById("likes-fixed").textContent++;
//         })
//     })
// }

// // LIGHTBOX
// const lightbox = document.querySelector("#lightbox");
// const lightboxPhoto = document.querySelector("#lightbox-photo");
// const lightboxVideo = document.querySelector("#lightbox-video");
// const lightboxTitle = document.querySelector("#lightbox-title");
// const lightboxLeft = document.querySelector("#lightbox-left");
// const lightboxRight = document.querySelector("#lightbox-right");
// const lightboxClose = document.querySelector("#lightbox-close");
// let photoIndice = 0;
// let leftClick;

// // close lightbox
// lightboxClose.addEventListener("click", function () {
//     lightbox.style.display = "none";
// });

// // change photo
// // left
// lightboxLeft.addEventListener("click", function () {
//     leftClick = true;
//     changePhotoLightbox(leftClick);
// });
// // right
// lightboxRight.addEventListener("click", function () {
//     leftClick = false;
//     changePhotoLightbox(leftClick);
// });

// // CHANGE WITH KEYBOARD
// window.addEventListener("keydown", function (event) {
//     if (event.defaultPrevented) {
//         return; // Do nothing if the event was already processed
//     }

//     switch (event.key) {
//         case "ArrowLeft":
//             // code for "left arrow" key press.
//             leftClick = true;
//             changePhotoLightbox(leftClick);
//             break;
//         case "ArrowRight":
//             // code for "right arrow" key press.
//             leftClick = false;
//             changePhotoLightbox(leftClick);
//             break;
//         case "Escape":
//             lightbox.style.display = "none";
//         default:
//             return; // Quit when this doesn't handle the key event.
//     }

//     // Cancel the default action to avoid it being handled twice
//     event.preventDefault();
// }, true);
// // the last option dispatches the event to the listener first,
// // then dispatches event to window

// function changePhotoLightbox(value) {
//     // CHANGE LES PHOTOS EN REGARDANT CELLE AFFICHEES (RESPECTE LE TRI)
//     let selectedIngredients = document.getElementById("photo-grid");
//     // for (i = 0; i < (selectedIngredients.children.length); i++) {
//     // console.log(selectedIngredients.children[i])
//     // }

//     if (value) {
//         photoIndice = (photoIndice + selectedIngredients.children.length - 1) % selectedIngredients.children.length;
//     } else {
//         photoIndice = (photoIndice + selectedIngredients.children.length + 1) % selectedIngredients.children.length;
//     }

//     lightboxTitle.textContent = selectedIngredients.children[photoIndice].dataset.title;
//     if ((selectedIngredients.children[photoIndice].dataset.type) === "image") {
//         lightboxPhoto.src = `assets/images/${selectedIngredients.children[photoIndice].dataset.url}`;
//         lightboxPhoto.setAttribute("aria-label", `${selectedIngredients.children[photoIndice].dataset.title}`);
//         lightboxVideo.style.display = "none";
//         lightboxPhoto.style.display = "initial";
//     }
//     if ((selectedIngredients.children[photoIndice].dataset.type) === "video") {
//         lightboxVideo.src = `assets/images/${selectedIngredients.children[photoIndice].dataset.url}`;
//         lightboxVideo.setAttribute("aria-label", `${selectedIngredients.children[photoIndice].dataset.title}`);
//         lightboxVideo.style.display = "initial";
//         lightboxPhoto.style.display = "none";
//     }
// }

// // open the lightbox
// async function lightBox() {
//     let classIngredients = document.querySelectorAll(".photo");
//     classIngredients.forEach((classPhoto) => {
//         classPhoto.addEventListener("click", function () {
//             openPictureInLightBox(this);
//         });
//     });
// }

// function openPictureInLightBox(item) {
//     let selectedIngredients = document.getElementById("photo-grid");

//     let index = Array.prototype.indexOf.call(item.parentNode.parentNode.children, item.parentNode);
//     photoIndice = index;
//     // show photo
//     lightboxTitle.textContent = selectedIngredients.children[photoIndice].dataset.title;
//     if ((selectedIngredients.children[photoIndice].dataset.type) === "image") {
//         lightboxPhoto.src = `assets/images/${selectedIngredients.children[photoIndice].dataset.url}`;
//         lightboxPhoto.setAttribute("aria-label", `${selectedIngredients.children[photoIndice].dataset.title}`);
//         lightboxVideo.style.display = "none";
//         lightboxPhoto.style.display = "initial";
//     }
//     if ((selectedIngredients.children[photoIndice].dataset.type) === "video") {
//         lightboxVideo.src = `assets/images/${selectedIngredients.children[photoIndice].dataset.url}`;
//         lightboxVideo.setAttribute("aria-label", `${selectedIngredients.children[photoIndice].dataset.title}`);
//         lightboxVideo.style.display = "initial";
//         lightboxPhoto.style.display = "none";
//     }
//     lightbox.style.display = "flex";
// }


// // DROPDOWN
// /* When the user clicks on the button,
// toggle between hiding and showing the dropdown content */
// let dropbtn = document.getElementById("dropbtn");
// let myDropdown = document.getElementById("myDropdown");
// let dropdownItem = document.getElementsByClassName("dropdownItem");
// console.log(dropdownItem)

// function dropdownShow() {
//     myDropdown.classList.toggle("show");
//     dropbtn.classList.toggle("active");
// }

// dropbtn.addEventListener('click', dropdownShow);

// // Close the dropdown menu if the user clicks outside of it
// window.onclick = function (event) {
//     if (!event.target.matches('.dropbtn')) {
//         let dropdowns = document.getElementsByClassName("dropdown-content");
//         for (let i = 0; i < dropdowns.length; i++) {
//             let openDropdown = dropdowns[i];
//             if (openDropdown.classList.contains('show')) {
//                 openDropdown.classList.remove('show');
//             }
//         }
//     }
//     if (event.target.matches('.dropdownItem')) {
//         document.getElementById('dropbtn').textContent = event.target.textContent;
//         if (event.target.textContent === "Popularité") {
//             sortLikes();
//         }
//         if (event.target.textContent === "Date") {
//             sortDate();
//         }
//         if (event.target.textContent === "Titre") {
//             sortTitle();
//         }
//     }
// }

// // TRI PAR TITRE
// function sortTitle() {
//     let photoContainer, i, switching, shouldSwitch;
//     photoContainer = document.getElementById("photo-grid");

//     switching = true;
//     /* Make a loop that will continue until
//     no switching has been done: */
//     while (switching) {
//         // start by saying: no switching is done:
//         switching = false;
//         // Loop through all list-items:
//         for (i = 0; i < (photoContainer.children.length - 1); i++) {
//             // start by saying there should be no switching:
//             shouldSwitch = false;
//             /* check if the next item should
//             switch place with the current item: */
//             if (photoContainer.children[i].dataset.title.toLowerCase() > photoContainer.children[i + 1].dataset.title.toLowerCase()) {
//                 /* if next item is alphabetically
//                 lower than current item, mark as a switch
//                 and break the loop: */
//                 shouldSwitch = true;
//                 break;
//             }
//         }
//         if (shouldSwitch) {
//             /* If a switch has been marked, make the switch
//             and mark the switch as done: */
//             photoContainer.children[i].parentNode.insertBefore(photoContainer.children[i + 1], photoContainer.children[i]);
//             switching = true;
//         }
//     }
//     for (i = 0; i < (photoContainer.children.length - 1); i++) {
//         console.log(photoContainer.children[i])
//     }
// }

// // TRI PAR DATES
// function sortDate() {
//     let photoContainer, i, switching, shouldSwitch, startTime, endTime;
//     photoContainer = document.getElementById("photo-grid");
//     switching = true;
//     while (switching) {
//         switching = false;
//         for (i = 0; i < (photoContainer.children.length - 1); i++) {
//             shouldSwitch = false;
//             startTime = new Date(photoContainer.children[i].dataset.date);
//             endTime = new Date(photoContainer.children[i + 1].dataset.date);
//             if (+startTime < +endTime) {
//                 shouldSwitch = true;
//                 break;
//             }
//         }
//         if (shouldSwitch) {
//             photoContainer.children[i].parentNode.insertBefore(photoContainer.children[i + 1], photoContainer.children[i]);
//             switching = true;
//         }
//     }
//     for (i = 0; i < (photoContainer.children.length - 1); i++) {
//         console.log(photoContainer.children[i])
//     }
// }

// // TRI PAR LIKES
// function sortLikes() {
//     let photoContainer, i, switching, shouldSwitch;
//     photoContainer = document.getElementById("photo-grid");

//     switching = true;
//     while (switching) {
//         switching = false;
//         for (i = 0; i < (photoContainer.children.length - 1); i++) {
//             shouldSwitch = false;
//             if (+photoContainer.children[i].dataset.likes < +photoContainer.children[i + 1].dataset.likes) {
//                 shouldSwitch = true;
//                 break;
//             }
//         }
//         if (shouldSwitch) {
//             photoContainer.children[i].parentNode.insertBefore(photoContainer.children[i + 1], photoContainer.children[i]);
//             switching = true;
//         }
//     }
//     for (i = 0; i < (photoContainer.children.length - 1); i++) {
//         console.log(photoContainer.children[i])
//     }
// }