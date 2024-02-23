const mongoose = require("mongoose");
const scheme = new mongoose.Schema({
  
  name: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  price: {
    small: { type: Number, required: true },
    medium: { type: Number },
    large: { type: Number },
  },
});
const FoodItems = mongoose.model("Food_items", scheme);
module.exports = FoodItems;
