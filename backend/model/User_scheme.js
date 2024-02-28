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
      required: function() {
        return !this.formattedAddress; // Longitude is required if formattedAddress is not provided
      }
    },
    longitude: {
      type: Number,
      required: function() {
        return !this.formattedAddress; // Longitude is required if formattedAddress is not provided
      }
    },
    formattedAddress: {
      type: String,
      required : function() {
        return !this.latitude || !this.longitude; // Latitude is required if formattedAddress is not provided
      }

    }
  
  },
  date: { type: Date, default: Date.now },
});
const User = mongoose.model("User", scheme);
module.exports = User;
