// Declaration of global variables
let emailId = document.getElementsByClassName("user-mail")[0];
let password = document.getElementsByClassName("user-password")[0];
let loginButton = document.getElementsByClassName("login-button")[0];
let signUpButton = document.getElementsByClassName("sign-up")[0];
let signupPage = document.getElementsByClassName("page-signup")[0];
let loginPage = document.getElementsByClassName("page-login")[0];
let categoryPage = document.getElementsByClassName("page-categories")[0];

// Function for sending the request for  fetching the user details json file
async function fetchLoginStatus(userLoginCredentials) {
  let getStatus = fetch("/userLoginData", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userLoginCredentials),
  });
  let data = await getStatus;
  let output = await data.json();
  return output;
}

// Event Listener for listening the event of loging in
loginButton.addEventListener("click", async function () {
  let userLoginCredentials = {
    mailId: emailId.value,
    password: password.value,
  };
  let loginStatus = await fetchLoginStatus(userLoginCredentials);
  if (loginStatus.response == "valid") {
    loginPage.style.display = "none";
    categoryPage.style.display = "block";
  } else if (loginStatus.response == "invalid") {
    window.alert("Enter a valid mail id and password");
    emailId.value = "";
    password.value = "";
  }
});

// Event Listener for listening the new user sign up
signUpButton.addEventListener("click", function () {
  signupPage.style.display = "block";
  loginPage.style.display = "none";
  emailId.value = "";
  password.value = "";
});
