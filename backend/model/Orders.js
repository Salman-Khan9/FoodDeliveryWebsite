const mongoose = require("mongoose");
const schema = new mongoose.Schema({
  User :{
    type :  mongoose.Schema.Types.ObjectId,
    required :true,
    ref : "User"
  },
  date: { type: Date, default: Date.now },
  orders: { 
    type: JSON,
    required: true
  },
  totalamount:{
    type:Number,
    required:true
  }
  
  
});

const Order = mongoose.model("orders", schema);
module.exports = Order;
