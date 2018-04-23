var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var jsonParser = bodyParser.json();
var router = express.Router();

var userMUC = require('../model/MUC/UserMUC');

// get all user
router.get('/all', function (req, res) {
    userMUC.getAllUsers((output, responseCode) => {
        res.status(responseCode).json(output);
    });
});

// get user by username
router.get('/:username', function (req, res) {
    var username = req.params.username;
    userMUC.getUserByUsername(username, (output, responseCode) => {
        res.status(responseCode).json(output);
    })
});

// create new user
router.post('/', jsonParser, function (req, res) {
    var username = req.body.username;
    var password = req.body.password;
    var name = req.body.name;
    var phone = req.body.phone;
    var email = req.body.email;

    userMUC.insertNewUser(username, password, name, phone, email, (output, responseCode) => {
        res.status(responseCode).json(output);
    })
});

// update info user
router.put('/', function(req, res) {
    var username = req.query.username;
    var password = req.query.password;
    var name = req.query.name;
    var phone = req.query.phone;
    var email = req.query.email;

    userMUC.updateUser(username, password, name, phone, email, (output, responseCode) => {
        res.status(responseCode).json(output);
    });
});

// delete user
router.delete('/:username', function(req, res) {
    var username = req.params.username;
    userMUC.deleteUser(username, (output, responseCode) => {
        res.status(responseCode).json(output);
    });
});

module.exports = router