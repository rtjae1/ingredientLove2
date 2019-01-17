const mongoose = require("mongoose");
const db = require("../models");
const recipes = require("./recipe");
const pantry = require("./pantry");

mongoose.connect(
  process.env.MONGODB_URI || "mongodb://localhost/ingredientLove"
);

const userSeed = [
  {
    firstName: "Ryan",
    lastName: "Jae",
    email: "ryan.t.jae@gmail.com",
    password: "test1234",
    pantry: pantry,
    shoppingList: [{ id: 0, quantity: 4 }]
  },
  {
    firstName: "Sally",
    lastName: "Test",
    email: "sally@gmail.com",
    password: "test1234",
    pantry: pantry,
    shoppingList: [{ id: 1, quantity: 6 }]
  }
];

const recipeSeed = recipes;

const pantrySeed = pantry;

db.Recipe.remove({})
  .then(() => db.Recipe.collection.insertMany(recipeSeed))
  .then(data => {
    console.log(data.result.n + " recipe records inserted!");
    process.exit(0);
  })
  .catch(err => {
    console.error(err);
    process.exit(1);
  });

db.Pantry.remove({})
  .then(() => db.Pantry.collection.insertMany(pantrySeed))
  .then(data => {
    console.log(data.result.n + " pantry records inserted!");
    process.exit(0);
  })
  .catch(err => {
    console.error(err);
    process.exit(1);
  });

db.User.remove({})
  .then(() => db.User.collection.insertMany(userSeed))
  .then(data => {
    console.log(data.result.n + " user records inserted!");
    process.exit(0);
  })
  .catch(err => {
    console.error(err);
    process.exit(1);
  });
