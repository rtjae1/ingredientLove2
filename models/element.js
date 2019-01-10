const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const elementSchema = new Schema({
  title: { type: String, required: true },
  quantity: { type: Number, required: true },
  unit: { type: String, required: true }
});

const Element = mongoose.model("Element", elementSchema);

module.exports = Element;
