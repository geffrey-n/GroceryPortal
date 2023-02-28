// Import required libraries
let express = require("express");
let bodyParser = require("body-parser");
let fs = require("fs");

// Declare the app
var app = express();
// Declare the host port number
var server = app.listen(8000, function () {
  console.log("Started the server");
});
// Link all the assets with index.html
app.use(express.static(process.cwd()));

// Body parser for converting the request body
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Post method for writing the user details on the json file
app.post("/jsondata", function (req, res) {
  res.json(req.body);
  let currentJsonData = fs.readFileSync(
    process.cwd() + "/Json/userDetails.json",
    { encoding: "utf-8" }
  );
  // Condition for writing the data if json file is empty
  if (currentJsonData == "") {
    let updateData = {
      [req.body.userMailId]: {
        firstName: [req.body.firstName],
        lastName: [req.body.lastName],
        mailId: [req.body.userMailId],
        password: [req.body.userPassword],
      },
    };
    let writeUsersLoginData = JSON.stringify(updateData);
    fs.writeFileSync(
      process.cwd() + "/Json/userDetails.json",
      writeUsersLoginData,
      "utf-8"
    );
  }
  // Condition for writing the data if json file is not empty
  else {
    let usersLoginData = JSON.parse(currentJsonData);
    let newData = {
      [req.body.userMailId]: {
        firstName: [req.body.firstName],
        lastName: [req.body.lastName],
        mailId: [req.body.userMailId],
        password: [req.body.userPassword],
      },
    };

    let updatedUsersLoginData = Object.assign(usersLoginData, newData);
    fs.writeFileSync(
      process.cwd() + "/Json/userDetails.json",
      JSON.stringify(updatedUsersLoginData),
      "utf-8"
    );
  }
});

// Post method for sending the user details json file
app.post("/userLoginData", function (req, res) {
  let currentJsonData = fs.readFileSync(
    process.cwd() + "/Json/userDetails.json",
    { encoding: "utf-8" }
  );
  let validateData = JSON.parse(currentJsonData);
  let userMails = Object.keys(validateData);
  let flag = 0;
  for (let i = 0; i < userMails.length; i++) {
    if (req.body.mailId == userMails[i]) {
      if (req.body.password == validateData[req.body.mailId].password) {
        res.send({ response: "valid" });
        flag = 0;
        break;
      } else {
        flag = 1;
      }
    } else {
      flag = 1;
    }
  }
  if (flag == 1) {
    res.send({ response: "invalid" });
  }
});

//Post method for writing the products data in the json file
app.post("/productQuantity", function (req, res) {
  let currentJsonData = fs.readFileSync(process.cwd() + "/Json/category.json", {
    encoding: "utf-8",
  });
  jsonData = JSON.parse(currentJsonData);
  jsonData[req.body.category].categoryProducts[
    req.body.product
  ].productQuantity = parseInt(req.body.quantity);
  data = req.body.quantity;
  let updateData = JSON.stringify(jsonData);
  fs.writeFileSync(process.cwd() + "/Json/category.json", updateData, {
    encoding: "utf-8",
  });
  res.send();
});

// Post method for sending the updated json file for products
app.post("/currentValue", function (req, res) {
  let currentJsonData = fs.readFileSync(process.cwd() + "/Json/category.json", {
    encoding: "utf-8",
  });
  let parseJson = JSON.parse(currentJsonData);
  let updateData = JSON.stringify(parseJson);
  fs.writeFileSync(process.cwd() + "/Json/category.json", updateData, {
    encoding: "utf-8",
  });
  res.send(currentJsonData);
});
