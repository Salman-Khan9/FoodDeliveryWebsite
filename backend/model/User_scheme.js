const mongoose = require("mongoose");
const scheme = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  location: {
    latitude: {
      type: Number,
      
    },
    longitude: {
      type: Number,
     
    },
    formattedAddress: {
      type: String
    }
  
  },
  date: { type: Date, default: Date.now },
});
const User = mongoose.model("User", scheme);
module.exports = User;
