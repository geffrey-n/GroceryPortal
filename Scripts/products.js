// Importing the functions from the populate.js file
import {
  categoryUserProductPage,
  categoryListProductPage,
  categoryContainer,
  categoryUser,
} from "./populate.js";
// Importing the functions from categories.js
import { search } from "./categories.js";

// Declaration of global variables
let cartPage = document.getElementsByClassName("page-cart")[0];
let categoryPage = document.getElementsByClassName("page-categories")[0];
let cart = document.getElementsByClassName("cart-name")[1];
let listPage = document.getElementsByClassName("page-category")[0];
let freshBasket = document.getElementsByClassName("app-logo-name")[3];

// Event Listener for listening the event at freshbasket logo
freshBasket.addEventListener("click", function () {
  categoryPage.style.display = "block";
  listPage.style.display = "none";
  categoryContainer();
  categoryUser();
  search.value = "";
});

// Function call for displaying the category page
categoryListProductPage();
categoryUserProductPage();

// Event Listener for triggering the cart page
cart.addEventListener("click", function () {
  listPage.style.display = "none";
  cartPage.style.display = "block";
});
