const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const pantrySchema = new Schema({
  name: { type: "string", required: true },
  quantity: { type: Number, required: true },
  unit: { type: "string", required: true }
});

const Pantry = mongoose.model("Pantry", pantrySchema);

module.exports = Pantry;
