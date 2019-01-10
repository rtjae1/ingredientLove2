const mongoose = require("mongoose");
const db = require("../models");

mongoose.connect(
  process.env.MONGODB_URI || "mongodb://localhost/ingredientLove"
);

const userSeed = [
  {
    username: "admin",
    password: "test",
    pantry: [{ id: 0, quantity: 6 }],
    shoppingList: [{ id: 0, quantity: 4 }]
  },
  {
    username: "admin",
    password: "test",
    pantry: [{ id: 1, quantity: 6 }],
    shoppingList: [{ id: 1, quantity: 6 }]
  }
];

const elementSeed = [
  {
    title: "tomoatos",
    unit: "lbs"
  },
  {
    title: "garlic",
    unit: "cloves"
  }
];

db.Element.remove({})
  .then(() => db.Element.collection.insertMany(elementSeed))
  .then(data => {
    console.log(data.result.n + " records inserted!");
    process.exit(0);
  })
  .catch(err => {
    console.error(err);
    process.exit(1);
  });

db.User.remove({})
  .then(() => db.User.collection.insertMany(userSeed))
  .then(data => {
    console.log(data.result.n + " records inserted!");
    process.exit(0);
  })
  .catch(err => {
    console.error(err);
    process.exit(1);
  });
