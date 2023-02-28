// Declaration og global variables
let backButton = document.getElementsByClassName("back-name")[0];
let listPage = document.getElementsByClassName("page-category")[0];
let cartPage = document.getElementsByClassName("page-cart")[0];

// Event Listener for listening the event of back button
backButton.addEventListener("click", function () {
  cartPage.style.display = "none";
  listPage.style.display = "block";
});
