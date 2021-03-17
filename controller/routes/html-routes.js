// Dependencies
const path = require("path");


// Routes
module.exports = function(app) {

  // Each of the below routes just handles the HTML page that the user gets sent to.

  // index route loads index.html
  app.get("/", isAuthenticated,function(req, res) {
    res.sendFile(path.join(__dirname, "../../public/index.html"));
  });

  app.get("/login", function(req, res) {
    res.sendFile(path.join(__dirname, "../../public/login.html"));
  });

  app.get("/register", function(req, res) {
    res.sendFile(path.join(__dirname, "../../public/signup.html"));
  });

};


// // The routes for 

// const express = require("express");
// const path = require("path");
// const isAuthenticated = require("../isAuthenticated");

// var htmlRoutes = express.Router();

// htmlRoutes.get('/login', function(req, res){
//     let loginPage = path.join(__dirname, "../../public/login.html");
//     res.sendFile(loginPage);
// });

// htmlRoutes.get('/signup', function(req, res){
//     let signupPage = path.join(__dirname, "../../public/signup.html");
//     res.sendFile(signupPage);
// });

// htmlRoutes.get('/', isAuthenticated, function(req, res){
//     let homePage = path.join(__dirname, "../../public/index.html");
//     res.sendFile(homePage);
// });

// module.exports = htmlRoutes;

