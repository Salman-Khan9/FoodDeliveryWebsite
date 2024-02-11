const mongoose = require("mongoose")
const scheme = new mongoose.Schema({

    name:{
        type : String,
        required:true
    },
    category:{
        type:String,
        required:true,
    },
    price:{
        small:{type:Number,required:true},
        medium:{type:Number,required:true},
        large:{type:Number,required:true},
    }
})
const FoodItems = mongoose.model("Food_items",scheme)
module.exports = FoodItems