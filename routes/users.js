const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const passport = require("passport");
const router = express.Router();

//import user model
require("../models/User");

// User Register Route
// router.get('/register', (req, res) => {
//   res.render('users/register');
//  });

// Register Form POST
// router.post("/createnewaccount", (req, res) => {
//   const newUser = new User({
//     firstName: req.body.firstName,
//     lastName: req.body.lastName,
//     email: req.body.email,
//     password: req.body.password
//   });
//   console.log(newUser);
//   newUser.save();
// });

// module.export = router;
