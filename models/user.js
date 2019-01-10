const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: { type: "string", required: true },
  password: { type: "string", required: true },
  pantry: { type: Array, required: false },
  shoppingList: { type: Array, required: false }
});

const User = mongoose.model("User", userSchema);

module.exports = User;
