const express = require("express");
var session = require("express-session");
const path = require("path");
const PORT = process.env.PORT || 3001;
const app = express();

var passport = require("./config/passport");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const mongoose = require("mongoose");
mongoose.connect(
  process.env.MONGODB_URI || "mongodb://localhost/ingredientLove"
);
const db = require("./models");

app.use(
  session({ secret: "keyboard cat", resave: true, saveUninitialized: true })
);
app.use(passport.initialize());
app.use(passport.session());

app.post("/login", passport.authenticate("local"), function(req, res) {
  res.json({
    loggedIn: true,
    message: "WOOOOO IT WORKED!",
    username: req.user.username
  });
});

app.get("/user_data", function(req, res) {
  if (!req.user) {
    res.json({ loggedIn: false });
  } else {
    res.json({
      username: req.user.username,
      loggedIn: true
    });
  }
});

app.get("/allusers", function(req, res) {
  console.log("All users route was hit!");
  db.User.find({})
    .then(dbModel => res.json(dbModel))
    .catch(err => res.status(422).json(err));
});

app.post("/createnewaccount", function(req, res) {
  console.log("New account created");
  console.log(req.body);
  db.User.create(req.body).then(dbModel => res.json(dbModel));
});

if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}

app.get("*", function(req, res) {
  res.sendFile(path.join(__dirname, "./client/build/index.html"));
});

app.listen(PORT, function() {
  console.log(`🌎 ==> API server now on port ${PORT}!`);
});
