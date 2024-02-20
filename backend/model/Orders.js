const mongoose = require("mongoose");
const schema = new mongoose.Schema([
  {
    User:{
      type:mongoose.Schema.Types.ObjectId,
      required: true,
      ref : "User"
  
    },
    name: {
      type: String,
      required: true,
    },

    category: {
      type: String,
      required: true,
    },
    quantity: {
      type: String,
      required: true,
    },
    finalprice: {
      type: String,
      required: true,
    },
    totalamount: {
      type: String,
      required: true,
    },
  },
]);
const Order = mongoose.model("orders", schema);
module.exports = Order;
