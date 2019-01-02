const express = require("express");
const path = require("path");
const PORT = process.env.PORT || 3001;
const app = express();

// middleware for parsing body on post request
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// db stuff
const mongoose = require("mongoose");
mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/ingredientLove")
const db = require("./models");

// login post route

app.post("/login", function(req,res){
  console.log("login route hit!");
  console.log(req.body);
  res.json({loggedIn: true});
})

app.get("/allusers", function(req, res) {
  console.log("All users route was hit!");
  // get all users and send them back in a json blob
  db.User
    .find({})
    .then(dbModel => res.json(dbModel))
    .catch(err => res.status(422).json(err));
})

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
