const express = require("express");
const bcrypt = require("bcryptjs");
const path = require("path");
const { v4: uuidv4 } = require('uuid');
const isAuthenticated = require("../isAuthenticated");
const User = require("../../model/user"); // TBD the model files
const passport = require("../../config/authConfigLocal");
const saltRounds = 10;
let user = new User();


let checkUserExists = function(req, res, next){
    let email = req.body.email;
    let emailExists = user.emailExists(email);
    emailExists.then(function(response){
        //console.log('response = ',response);
        if (!response) {
            next();
        } else {
            //console.log('sending error');
            res.status('400').send('ERROR: User with this email already exists');
        }
    })
    .catch(err => {
        throw err
    })
}

let hash = async function(password) {
    let hash = await bcrypt.hash(password, saltRounds);
    return hash;
}


var apiRoutes = express.Router();

apiRoutes.post('/api/login', passport.authenticate("local", {failureMessage: 'Incorrect user name or password'}), function(req, res){
    res.send('Success');
});

apiRoutes.get('/logout', function(req, res){
    req.logout();
    res.redirect('/login');
});

apiRoutes.post('/api/signup', checkUserExists, async function(req, res){
    console.log('ready to insert');
    let id = uuidv4();
    let {firstName, lastName, email, password} = req.body;
    let hashed = await hash(password); //hash the password before saving;
    user.addNew(id, firstName, lastName, email, hashed)
    .then(function(response) {res.send('200')})
    .catch(function(err) {res.status(500).send('There was an error creating user: '+err)});
});


module.exports = apiRoutes;