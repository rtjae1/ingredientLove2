const express = require("express");
var session = require("express-session");
const path = require("path");
const PORT = process.env.PORT || 3001;
const app = express();

// requiring passport as we've configured it
var passport = require("./config/passport");

// middleware for parsing body on post request
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// db stuff
const mongoose = require("mongoose");
mongoose.connect(
  process.env.MONGODB_URI || "mongodb://localhost/ingredientLove"
);
const db = require("./models");

// set up passport here
app.use(
  session({ secret: "keyboard cat", resave: true, saveUninitialized: true })
);
app.use(passport.initialize());
app.use(passport.session());

// login post route

app.post("/login", passport.authenticate("local"), function(req, res) {
  res.json({
    loggedIn: true,
    message: "WOOOOO IT WORKED!",
    username: req.user.username
  });
});

// route to get user info

// route for getting some data about our users to be used client side
app.get("/user_data", function(req, res) {
  if (!req.user) {
    // The user is not logged in, send back an empty object
    res.json({ loggedIn: false });
  } else {
    // Otherwise send back the user's username and id
    // Sending back a password, even a hashed password, is not a good idea
    res.json({
      username: req.user.username,
      loggedIn: true
    });
  }
});

app.get("/allusers", function(req, res) {
  console.log("All users route was hit!");
  // get all users and send them back in a json blob
  db.User.find({})
    .then(dbModel => res.json(dbModel))
    .catch(err => res.status(422).json(err));
});

app.post("/createnewaccount", function(req, res) {
  console.log("New account created");
  console.log(req.body);
  // Create the new user in MongoDb (only if it doesn't already exist?)
  // Send success confirmation if new user created
  // send... something else? error? if user already existed
  db.User.create(req.body).then(dbModel => res.json(dbModel));
});

// Serve up static assets (usually on heroku)
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}

// Send every request to the React app
// Define any API routes before this runs
app.get("*", function(req, res) {
  res.sendFile(path.join(__dirname, "./client/build/index.html"));
});

app.listen(PORT, function() {
  console.log(`🌎 ==> API server now on port ${PORT}!`);
});
