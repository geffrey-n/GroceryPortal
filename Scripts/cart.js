// Declaration og global variables
let backButton = document.getElementsByClassName("back-name")[0];
let listPage = document.getElementsByClassName("page-category")[0];
let cartPage = document.getElementsByClassName("page-cart")[0];
let invoicePage = document.getElementsByClassName("page-invoice")[0];
let logoutCart = document.getElementsByClassName("logout-name")[0];
let logoutInvoice = document.getElementsByClassName("logout-name")[1];
let categoryPage = document.getElementsByClassName("page-categories")[0];
let freshBasketInvoice = document.getElementsByClassName("app-logo-name")[5];
let freshBasketCart = document.getElementsByClassName("app-logo-name")[4];

// Importing functions from categories.js
import { search } from "./categories.js";
import { categoryUser, categoryContainer } from "./populate.js";

// Event Listener for listening the event at freshbasket logo
freshBasketCart.addEventListener("click", function () {
  categoryPage.style.display = "block";
  cartPage.style.display = "none";
  categoryContainer();
  categoryUser();
  search.value = "";
});

freshBasketInvoice.addEventListener("click", function () {
  categoryPage.style.display = "block";
  invoicePage.style.display = "none";
  categoryContainer();
  categoryUser();
  search.value = "";
});

// Event Listener for listening the event of back button
backButton.addEventListener("click", function () {
  cartPage.style.display = "none";
  listPage.style.display = "block";
});

// Creating the container for empty cart
document.getElementsByClassName("products-cart")[0].replaceChildren();
let cartContainer = `<div class="cart-product" style="display:block">
      <img class="image-cart-product" src="../Assets/Images/nocart.png" />
          <div class="name-cart-product">Cart is Empty</div>
          <div class="quantity-cart-product">Add products to the cart</div>
          </div>
          `;
document.getElementsByClassName("products-cart")[0].innerHTML += cartContainer;
document.getElementsByClassName("total")[0].replaceChildren();
let total = `<div class="buyall continue-shopping">
            <span class="name-buy-all">Continue Shopping</span>
          </div>`;
document.getElementsByClassName("total")[0].innerHTML += total;
let continueShopping = document.getElementsByClassName("buyall")[0];
continueShopping.addEventListener("click", function () {
  categoryPage.style.display = "block";
  cartPage.style.display = "none";
});

// Event Listener for listening the event of logout button in cart page
logoutCart.addEventListener("click", function () {
  document.location.reload();
});

// Event Listener for listening the event of logout button in invoice page
logoutInvoice.addEventListener("click", function () {
  document.location.reload();
});
