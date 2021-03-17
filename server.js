const express = require("express");
const path = require("path");
const passport = require("passport");
const apiRoutes = require("./controller/routes/api-routes");
const htmlRoutes = require("./controller/routes/html-routes");
const bodyParser = require("body-parser");
const session = require('express-session')

require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 8080;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({ 
  secret: process.env.SESSION_SECRET, 
  cookie: { 
      secure: false
  }}));
app.use(passport.initialize());
app.use(passport.session());
app.use(apiRoutes);
app.use(htmlRoutes);

app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
  });

module.exports = app