// Importing the json data by function call
let data = await currentQuantity();

// Declaration of global variables
let categories = Object.keys(data);
let listPage = document.getElementsByClassName("page-category")[0];
let categoryPage = document.getElementsByClassName("page-categories")[0];
let cartPage = document.getElementsByClassName("page-cart")[0];
let invoicePage = document.getElementsByClassName("page-invoice")[0];
let cart = document.getElementsByClassName("cart-name")[0];
let userProductsData = [];

/** Function for creating the category container */
export let categoryContainer = function () {
  document.getElementsByClassName("categories-list")[0].replaceChildren();
  for (let i = 0; i < categories.length; i++) {
    let categoriesList = `<div class="categories-name">
              <img class="category-logo" src="${
                data[categories[i]].categoryImage
              }"/>
              <div class="category-name">${
                data[categories[i]].categoryName
              }</div>
            </div>`;
    document.getElementsByClassName("categories-list")[0].innerHTML +=
      categoriesList;
  }
};

/** Function for creating the user searched category */
export let searchCategoryContainer = function (keys) {
  document.getElementsByClassName("categories-list")[0].replaceChildren();
  let categoriesList = `<div class="categories-name">
              <img class="category-logo" src="${data[keys].categoryImage}"/>
              <div class="category-name">${data[keys].categoryName}</div>
            </div>`;
  document.getElementsByClassName("categories-list")[0].innerHTML +=
    categoriesList;
};

/** Function for triggering the product page */
export let categoryUser = function () {
  for (let i = 0; i < categories.length; i++) {
    let categoryName = document.getElementsByClassName("categories-name")[i];
    categoryName.addEventListener("click", () => {
      listPage.style.display = "block";
      categoryPage.style.display = "none";
      productUser(categories[i]);
    });
  }
};

/** Function for triggering user searched product page */
export let searchCategoryUser = function (category) {
  let categoryName = document.getElementsByClassName("categories-name")[0];
  categoryName.addEventListener("click", function () {
    listPage.style.display = "block";
    categoryPage.style.display = "none";
    productUser(category);
  });
};

/** Function for creating the category list in the product page */
export let categoryListProductPage = function () {
  document.getElementsByClassName("category-list")[0].replaceChildren();
  for (let i = 0; i < categories.length; i++) {
    let categoryItem = `<div class="category-item">${
      data[categories[i]].categoryName
    }</div>`;
    document.getElementsByClassName("category-list")[0].innerHTML +=
      categoryItem;
  }
};

/** Function for displaying the user selected category products */
export let categoryUserProductPage = function () {
  for (let i = 0; i < categories.length; i++) {
    let categoryName = document.getElementsByClassName("category-item")[i];
    categoryName.addEventListener("click", () => {
      productUser(categories[i]);
    });
  }
};

/** Function for trigeering all the functions that create the product page
 * @param {string} category provides the user selected category name
 */
let productUser = function (category) {
  productCategoryName(category);
  productsCategory(category);
  userProductDetails(category);
};

/**Function for creating the products of the selected category
 * @param {string} category provides the category name
 */
let productsCategory = async function (category) {
  let data = await currentQuantity();
  document.getElementsByClassName("category-products")[0].replaceChildren();
  let allproducts = data[category].categoryProducts;
  let products = Object.keys(allproducts);
  for (let i = 0; i < products.length; i++) {
    let stockQuantity = allproducts[products[i]].productQuantity;
    // Condition for creating the products container if the stock is available
    if (stockQuantity !== 0) {
      let categoryProduct = `<div class="product">
    <img class="image-product" src="${allproducts[products[i]].productImage}" />
            <div class="name-product">${
              allproducts[products[i]].productName
            }</div>
            <div class="quantity-product">${
              allproducts[products[i]].productPrice
            }</div>
            <div class="quantity-user">
              <img class="minus" src="./Assets/Images/minus.png" />
              <input
                class="user-purchase"
                type="number"
                value="1"
              />
              <img class="plus" src="./Assets/Images/plus.png" />
            </div>
            <div class="add-to-cart">Add to cart</div>
             </div>`;
      document.getElementsByClassName("category-products")[0].innerHTML +=
        categoryProduct;
    }
    // Condition for creating the products container if the stock is not available
    else {
      let categoryProduct = `<div class="product">
    <img class="image-product" src="${allproducts[products[i]].productImage}" />
            <div class="name-product">${
              allproducts[products[i]].productName
            }</div>
            <div class="quantity-product">${
              allproducts[products[i]].productPrice
            }</div>
            <div class="quantity-user">
              <img class="minus" src="./Assets/Images/minus.png" />
              <input
                class="user-purchase"
                type="number"
                value="0"
              />
              <img class="plus" src="./Assets/Images/plus.png" />
            </div>
            <div class="add-to-cart out-of-stock"style="color:red">Out of Stock</div>
             </div>`;
      document.getElementsByClassName("category-products")[0].innerHTML +=
        categoryProduct;
    }
  }
};

/**Function for creating the category list container
 * @param {string} category provides the category name
 */
let productCategoryName = function (category) {
  let categoryTitle = data[category].categoryName;
  document.getElementsByClassName("userCategory-name")[0].replaceChildren();
  let categoryName = `<span class="category-firstletter">${categoryTitle.substr(
    0,
    1
  )}</span
            ><span class="category-nextletters">${categoryTitle.substr(
              1
            )}</span>`;
  document.getElementsByClassName("userCategory-name")[0].innerHTML +=
    categoryName;
};

//Function for trigeering the events in the products page
async function userProductDetails(category) {
  let data = await currentQuantity();
  let allproducts = data[category].categoryProducts;
  let products = Object.keys(allproducts);
  for (let x = 0; x < products.length; x++) {
    let stockQuantity = allproducts[products[x]].productQuantity;
    let productPrice = document.getElementsByClassName("quantity-product")[x];
    let productImage = document.getElementsByClassName("image-product")[x];
    let productName = document.getElementsByClassName("name-product")[x];
    let quantity = document.getElementsByClassName("user-purchase")[x];
    let addToCart = document.getElementsByClassName("add-to-cart")[x];
    let plus = document.getElementsByClassName("plus")[x];
    // Condition for checking the quantity of the products available
    if (stockQuantity !== 0) {
      // Event Listener for listening the event of value provided in the input field
      quantity.addEventListener("change", function () {
        if (quantity.value == "") {
          quantity.value = 1;
        } else if (quantity.value <= 0) {
          quantity.value = 1;
        } else if (quantity.value > stockQuantity) {
          quantity.value = stockQuantity;
        }
      });
      // Event Listener for listening the click event for incrementing the quantity of the product
      plus.addEventListener("click", function () {
        if (quantity.value >= 1 && quantity.value < stockQuantity)
          quantity.value = parseInt(quantity.value) + 1;
      });
      // Event Listener for listening the click event for decrementing the quantity of the product
      let minus = document.getElementsByClassName("minus")[x];
      minus.addEventListener("click", function () {
        if (quantity.value >= 2 && quantity.value <= stockQuantity)
          quantity.value = parseInt(quantity.value) - 1;
      });
      // Event Listener for lsitening the event for clicking the add to cart event
      addToCart.addEventListener("click", function () {
        console.log("add1");
        let userSelectedProducts = {
          [productName.innerHTML]: {
            category: category,
            product: products[x],
            userQuantity: quantity.value,
            image: productImage.src,
            price: productPrice.innerHTML,
          },
        };
        userProductsData.push(userSelectedProducts);
        // Event Listener for displaying the cart products in the cart
        cart.addEventListener("click", function () {
          cartProduct(userProductsData);
          for (let i = 0; i < userProductsData.length; i++) {
            // Event Listener for listening the removal of products in the cart
            let removeButton = document.getElementsByClassName("remove")[i];
            removeButton.addEventListener("click", function () {
              cartProduct(userProductsData);
              // Functions for events that are triggered after the remove option
              for (let j = 0; j < userProductsData.length; j++) {
                // Event Listener for listening the event of purchasing the products in the cart
                let buy = document.getElementsByClassName("buy-option")[j];
                buy.addEventListener("click", function () {
                  let product = Object.keys(userProductsData[j]);
                  let userProductQuantity =
                    userProductsData[j][product].userQuantity;
                  let productCategory = userProductsData[j][product].category;
                  let productName = userProductsData[j][product].product;
                  let stockQuantity =
                    data[productCategory].categoryProducts[productName]
                      .productQuantity;
                  let updateQuantity = stockQuantity - userProductQuantity;
                  let updateData = {
                    category: [productCategory],
                    product: [productName],
                    quantity: [updateQuantity],
                  };
                  // Function for sending the request for updating the json file
                  fetchQuantity(updateData);
                  cartPage.style.display = "none";
                  invoicePage.style.display = "block";
                  // Function for creating the invoice page
                  buyPage();
                  let backCart =
                    document.getElementsByClassName("cart-back")[0];
                  let backCategory =
                    document.getElementsByClassName("category-back")[0];
                  userProductsData = userProductsData.filter(
                    (item) => item !== userProductsData[j]
                  );
                  {
                    cartProduct(userProductsData);
                  }
                  // Event Listener for listening the event of back to cart
                  backCart.addEventListener("click", function () {
                    invoicePage.style.display = "none";
                    cartPage.style.display = "block";
                    cartProduct(userProductsData);
                  });
                  // Event Listener for listening the event of back to category
                  backCategory.addEventListener("click", function () {
                    invoicePage.style.display = "none";
                    categoryPage.style.display = "block";
                    cartProduct(userProductsData);
                  });
                });
                // Event Listener for listening the event of purchasing all products
                let buyAll = document.getElementsByClassName("buyall")[0];
                buyAll.addEventListener("click", function () {
                  cartPage.style.display = "none";
                  invoicePage.style.display = "block";
                  // Function for creating the invoice page
                  buyAllPage();
                  let backCategory =
                    document.getElementsByClassName("category-back")[0];
                  userProductsData = [];
                  backCategory.addEventListener("click", function () {
                    invoicePage.style.display = "none";
                    categoryPage.style.display = "block";
                    cartProduct(userProductsData);
                    cart.addEventListener("click", function () {
                      cartProduct(userProductsData);
                    });
                  });
                });
              }
            });
          }
          for (let j = 0; j < userProductsData.length; j++) {
            // Event Listener for listening the event of purchasing the products in the cart
            let buy = document.getElementsByClassName("buy-option")[j];
            buy.addEventListener("click", function () {
              let product = Object.keys(userProductsData[j]);
              let userProductQuantity =
                userProductsData[j][product].userQuantity;
              let productCategory = userProductsData[j][product].category;
              let productName = userProductsData[j][product].product;
              let stockQuantity =
                data[productCategory].categoryProducts[productName]
                  .productQuantity;
              let updateQuantity = stockQuantity - userProductQuantity;
              let updateData = {
                category: [productCategory],
                product: [productName],
                quantity: [updateQuantity],
              };
              // Function for sending the request for updating the json file
              fetchQuantity(updateData);
              cartPage.style.display = "none";
              invoicePage.style.display = "block";
              // Function for creating the invoice page
              buyPage();
              let backCart = document.getElementsByClassName("cart-back")[0];
              let backCategory =
                document.getElementsByClassName("category-back")[0];
              userProductsData = userProductsData.filter(
                (item) => item !== userProductsData[j]
              );
              {
                cartProduct(userProductsData);
              }
              //Functions for events that are triggered after buy option
              backCart.addEventListener("click", function () {
                invoicePage.style.display = "none";
                cartPage.style.display = "block";
                for (let j = 0; j < userProductsData.length; j++) {
                  // Event Listener for listening the event of purchasing the products in the cart
                  let buy = document.getElementsByClassName("buy-option")[j];
                  buy.addEventListener("click", function () {
                    let product = Object.keys(userProductsData[j]);
                    let userProductQuantity =
                      userProductsData[j][product].userQuantity;
                    let productCategory = userProductsData[j][product].category;
                    let productName = userProductsData[j][product].product;
                    let stockQuantity =
                      data[productCategory].categoryProducts[productName]
                        .productQuantity;
                    let updateQuantity = stockQuantity - userProductQuantity;
                    let updateData = {
                      category: [productCategory],
                      product: [productName],
                      quantity: [updateQuantity],
                    };
                    // Function for sending the request for updating the json file
                    fetchQuantity(updateData);
                    cartPage.style.display = "none";
                    invoicePage.style.display = "block";
                    // Function for creating the invoice page
                    buyPage();
                    let backCart =
                      document.getElementsByClassName("cart-back")[0];
                    let backCategory =
                      document.getElementsByClassName("category-back")[0];
                    userProductsData = userProductsData.filter(
                      (item) => item !== userProductsData[j]
                    );
                    {
                      cartProduct(userProductsData);
                    }
                    // Event Listener for listening the event of back to cart
                    backCart.addEventListener("click", function () {
                      invoicePage.style.display = "none";
                      cartPage.style.display = "block";
                      cartProduct(userProductsData);
                    });
                    // Event Listener for listening the event of back to category
                    backCategory.addEventListener("click", function () {
                      invoicePage.style.display = "none";
                      categoryPage.style.display = "block";
                      cartProduct(userProductsData);
                    });
                  });
                }
                // Event Listener for listening the event of purchasing all products
                let buyAll = document.getElementsByClassName("buyall")[0];
                buyAll.addEventListener("click", function () {
                  cartPage.style.display = "none";
                  invoicePage.style.display = "block";
                  // Function for creating the invoice page
                  buyAllPage();
                  let backCategory =
                    document.getElementsByClassName("category-back")[0];
                  userProductsData = [];
                  backCategory.addEventListener("click", function () {
                    invoicePage.style.display = "none";
                    categoryPage.style.display = "block";
                    cartProduct(userProductsData);
                    cart.addEventListener("click", function () {
                      cartProduct(userProductsData);
                    });
                  });
                });
              });
              // Event Listener for listening the event of back to category
              backCategory.addEventListener("click", function () {
                invoicePage.style.display = "none";
                categoryPage.style.display = "block";
                cart.addEventListener("click", function () {
                  cartProduct(userProductsData);
                  cart.addEventListener("click", function () {
                    cartProduct(userProductsData);
                  });
                });
              });
            });
          }
          // Event Listener for listening the event of purchasing all products
          let buyAll = document.getElementsByClassName("buyall")[0];
          buyAll.addEventListener("click", function () {
            cartPage.style.display = "none";
            invoicePage.style.display = "block";
            for (let s = 0; s < userProductsData.length; s++) {
              let userProduct = Object.keys(userProductsData[s]);
              let categoryProduct = userProductsData[s][userProduct].category;
              let categoryProductName =
                userProductsData[s][userProduct].product;
              let categoryProductQuantity =
                userProductsData[s][userProduct].userQuantity;
              let stockQuantity =
                data[categoryProduct].categoryProducts[categoryProductName]
                  .productQuantity;
              console.log(stockQuantity);
              let updateQuantity = stockQuantity - categoryProductQuantity;
              console.log(categoryProductName, updateQuantity);
              let updateData = {
                category: [categoryProduct],
                product: [categoryProductName],
                quantity: [updateQuantity],
              };
              // Function for sending the request for updating the json file
              fetchQuantity(updateData);
            }
            // Function for creating the invoice page
            buyAllPage();
            let backCategory =
              document.getElementsByClassName("category-back")[0];
            userProductsData = [];
            backCategory.addEventListener("click", function () {
              invoicePage.style.display = "none";
              categoryPage.style.display = "block";
              cartProduct(userProductsData);
              cart.addEventListener("click", function () {
                cartProduct(userProductsData);
              });
            });
            userProductsData = [];
          });
        });
      });
    }
  }
}

/** Function for recalling the events in the product page
 * @param {Array} userData provides the array of user selected products
 */
let cartProduct = function (userData) {
  let totalUserPrice = [];
  // Creating the cart container for the user selected products
  document.getElementsByClassName("products-cart")[0].replaceChildren();
  for (let i = 0; i < userData.length; i++) {
    let keys = Object.keys(userData[i]);
    for (let j = 0; j < keys.length; j++) {
      let productPrice = userData[i][keys[j]].price;
      productPrice = productPrice.split("Rs ");
      let userProductPrice =
        productPrice[1] * userData[i][keys[j]].userQuantity;
      totalUserPrice.push(userProductPrice);
      let cartContainer = `<div class="cart-product">
      <img class="image-cart-product" src="${userData[i][keys[j]].image}" />
          <div class="name-cart-product">${keys[j]}</div>
          <div class="quantity-cart-product">${
            userData[i][keys[j]].userQuantity
          }</div>
          <div class="quantity-cart-price">Price : Rs ${userProductPrice}</div>
          <div class="buy-option">
            <img class="buy" src="./Assets/Images/buy_before.png" />
            <span class="buy-name">Buy</span>
          </div>
          <img class="remove" src="./Assets/Images/remove.png" />
          </div>
          `;
      document.getElementsByClassName("products-cart")[0].innerHTML +=
        cartContainer;
    }
  }

  // Creating the cart total price abd buy all option
  let totalAmount = 0;
  for (let i = 0; i < totalUserPrice.length; i += 1) {
    totalAmount += totalUserPrice[i];
  }
  document.getElementsByClassName("total")[0].replaceChildren();
  let total = `<span class="price-total">Total : Rs ${totalAmount}</span>
          <div class="buyall">
            <img class="buyall-image" src="./Assets/Images/buy_before.png" />
            <span class="name-buy-all">Buy All</span>
          </div>`;
  document.getElementsByClassName("total")[0].innerHTML += total;

  // Event Listener for listening the removal of products in the cart
  for (let i = 0; i < userData.length; i++) {
    let removeButton = document.getElementsByClassName("remove")[i];
    removeButton.addEventListener("click", function () {
      userData = userData.filter((item) => item !== userData[i]);
      {
        cartProduct(userData);
        userProductsData = userData;
        cart.addEventListener("click", function () {
          cartProduct(userData);
        });
      }
    });
  }
  // Event Listener for listening the event of purchasing the products in the cart
  for (let j = 0; j < userData.length; j++) {
    let buy = document.getElementsByClassName("buy-option")[j];
    buy.addEventListener("click", function () {
      let product = Object.keys(userData[j]);
      let userProductQuantity = userData[j][product].userQuantity;
      let productCategory = userData[j][product].category;
      let productName = userData[j][product].product;
      let stockQuantity =
        data[productCategory].categoryProducts[productName].productQuantity;
      let updateQuantity = stockQuantity - userProductQuantity;
      let updateData = {
        category: [productCategory],
        product: [productName],
        quantity: [updateQuantity],
      };
      fetchQuantity(updateData);
      cartPage.style.display = "none";
      invoicePage.style.display = "block";
      buyPage();
      let backCart = document.getElementsByClassName("cart-back")[0];
      let backCategory = document.getElementsByClassName("category-back")[0];
      userData = userData.filter((item) => item !== userData[j]);
      {
        cartProduct(userData);
        cart.addEventListener("click", function () {
          cartProduct(userData);
        });
      }
      backCart.addEventListener("click", function () {
        invoicePage.style.display = "none";
        cartPage.style.display = "block";
      });
      backCategory.addEventListener("click", function () {
        invoicePage.style.display = "none";
        categoryPage.style.display = "block";
      });
    });
  }
  // Event Listener for listening the event of purchasing all products
  let buyAll = document.getElementsByClassName("buyall")[0];
  buyAll.addEventListener("click", function () {
    cartPage.style.display = "none";
    invoicePage.style.display = "block";
    buyAllPage();
    let backCategory = document.getElementsByClassName("category-back")[0];
    userData = [];
    backCategory.addEventListener("click", function () {
      invoicePage.style.display = "none";
      categoryPage.style.display = "block";
      cartProduct(userData);
      cart.addEventListener("click", function () {
        cartProduct(userData);
      });
      userProductsData = [];
    });
  });
};

// Function for creating the invoice page if individual product is purchased
let buyPage = function () {
  document.getElementsByClassName("invoice-bottom")[0].replaceChildren();
  let buyInvoice = `<div class="product-invoice">The product is purchased successfully</div>
  <div class="options-back">
          <span class="cart-back">Back to Cart</span>
          <span class="category-back">Back to Category</span>
        </div>
        `;
  document.getElementsByClassName("invoice-bottom")[0].innerHTML += buyInvoice;
};

// Function for creating the invoice page if all products are purchased
let buyAllPage = function () {
  document.getElementsByClassName("invoice-bottom")[0].replaceChildren();
  let buyInvoice = `<div class="product-invoice">All products are purchased successfully</div>
  <div class="options-back">
          <span class="category-back">Back to Category</span>
        </div>`;
  document.getElementsByClassName("invoice-bottom")[0].innerHTML += buyInvoice;
};

// Function for sending request to update the json file
function fetchQuantity(content) {
  let getQuantity = fetch("/productQuantity", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(content),
  });
}

/** Function for sending request to receive the updated json file
 * @return {object} The object provides the updated json file
 */
async function currentQuantity() {
  let jsonCurrentQuantity = fetch("/currentValue", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ user: "new Json" }),
  });
  let jsonValue = await jsonCurrentQuantity;
  let jsonUpdate = await jsonValue.json();
  return jsonUpdate;
}
