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
let search = document.getElementsByClassName("search")[0];
let searchButton = document.getElementsByClassName("search-logo")[0];

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

search.addEventListener("keypress", function (event) {
  if (event.key == "Enter") {
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
  }
});
