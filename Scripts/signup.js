// Declaration of global variables
export let firstName = document.getElementsByClassName("user-name-first")[0];
let lastName = document.getElementsByClassName("user-name-last")[0];
let userEmail = document.getElementsByClassName("user-mail")[1];
let userPassword = document.getElementsByClassName("user-password")[1];
let signUpButton = document.getElementsByClassName("signup-button")[0];
let signupPage = document.getElementsByClassName("page-signup")[0];
let categoryPage = document.getElementsByClassName("page-categories")[0];

// Event Listener for listening the event of signing in
signUpButton.addEventListener("click", function () {
  let userFirstName = firstName.value;
  let userLastName = lastName.value;
  let userMailValue = userEmail.value;
  let userPasswordValue = userPassword.value;
  let userJsonData = {
    firstName: userFirstName,
    lastName: userLastName,
    userMailId: userMailValue,
    userPassword: userPasswordValue,
  };
  // Request for sending the user details json file
  fetch("/jsondata", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userJsonData),
  })
    .then(function (response) {
      return response.json();
    })
    .catch(function (error) {
      console.log(error);
    });
  firstName.value = "";
  lastName.value = "";
  userEmail.value = "";
  userPassword.value = "";
  signupPage.style.display = "none";
  categoryPage.style.display = "block";
});
