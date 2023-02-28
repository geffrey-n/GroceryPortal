// Importing the functions from the populate.js file
import {
  categoryUserProductPage,
  categoryListProductPage,
} from "./populate.js";

// Declaration of global variables
let cartPage = document.getElementsByClassName("page-cart")[0];
let cart = document.getElementsByClassName("cart-name")[0];
let listPage = document.getElementsByClassName("page-category")[0];

// Function call for displaying the category page
categoryListProductPage();
categoryUserProductPage();

// Event Listener for triggering the cart page
cart.addEventListener("click", function () {
  listPage.style.display = "none";
  cartPage.style.display = "block";
});
