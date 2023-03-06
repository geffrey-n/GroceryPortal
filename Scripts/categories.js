// Importing the data from the json file
import data from "../Json/category.json" assert { type: "json" };

// Importing the functions from populate.js
import {
  categoryContainer,
  categoryUser,
  searchCategoryContainer,
  searchCategoryUser,
} from "./populate.js";

// Declaration of global variables
export let categories = Object.keys(data);
export let search = document.getElementsByClassName("search")[0];
let searchButton = document.getElementsByClassName("search-logo")[0];
let cartCategory = document.getElementsByClassName("cart-name")[0];
let categoryPage = document.getElementsByClassName("page-categories")[0];
let cartPage = document.getElementsByClassName("page-cart")[0];

// Creating the options for datalist of categories
for (let g = 0; g < categories.length; g++) {
  let products = data[categories[g]];
  let nameCategory = `<option value="${products.categoryName}">`;
  document.getElementById("data-items").innerHTML += nameCategory;
}

// Function call for displaying the categories page
categoryContainer();
categoryUser();

// Event Listener for listening the event lof searching the category
searchButton.addEventListener("click", function () {
  let searchValue = search.value;
  let flag = 0;
  for (let i = 0; i < categories.length; i++) {
    if (searchValue.toUpperCase() === data[categories[i]].categoryName) {
      searchCategoryContainer(categories[i]);
      searchCategoryUser(categories[i]);
      flag = 0;
      break;
    } else {
      flag = 1;
    }
  }
  if (flag == 1) {
    errorValueCategory();
  }
});

search.addEventListener("change", function (event) {
  let searchValue = search.value;
  let flag = 0;
  for (let i = 0; i < categories.length; i++) {
    if (searchValue.toUpperCase() === data[categories[i]].categoryName) {
      searchCategoryContainer(categories[i]);
      searchCategoryUser(categories[i]);
      flag = 0;
      break;
    } else {
      flag = 1;
    }
  }
  if (flag == 1) {
    errorValueCategory();
  }
  search.addEventListener("click", function () {
    categoryContainer();
    categoryUser();
  });
});

// Creating the container for invalid category search
let errorValueCategory = function () {
  document.getElementsByClassName("categories-list")[0].replaceChildren();
  let categoriesList = `<div class="categories-name" style="padding:4vw">
              <img class="category-logo" src="../Assets/Images/error.png" style="margin-bottom:2vw"/>
              <div class="category-name">No Results Found</div>
            </div>`;
  document.getElementsByClassName("categories-list")[0].innerHTML +=
    categoriesList;
};

// Event Listener for listening the event at freshbasket logo
let freshBasket = document.getElementsByClassName("app-logo-name")[2];
freshBasket.addEventListener("click", function () {
  categoryContainer();
  categoryUser();
  search.value = "";
});

// Event Listener for triggering the cart page
cartCategory.addEventListener("click", function () {
  categoryPage.style.display = "none";
  cartPage.style.display = "block";
});
