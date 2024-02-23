const express = require("express");
const Order = require("../model/Orders");
const Auth = require("../Middleware/Auth");
const routes = express.Router();
routes.post("/order", Auth,async (req, res) => {
  try {
    
    const userId = req.user.id;
    const bodyData = req.body;
    const amount = bodyData.map((Amount)=>Amount.totalamount)
    const totalamount = amount[0]
    // Create the orders
    const orders = await Order.create({User:userId,orders:bodyData,totalamount:totalamount});

    res.status(201).json(orders); 

  } catch (error) {
    res.status(400).json("Error in posting order");
  }
});
routes.get("/orderhistory", Auth,async (req, res) => {
  try {
    const data = await Order.find({User:req.user.id}).sort({ _id: -1 });
    res.status(200).json(data);
  } catch (error) {
    res.status(400).json("error in getting orders");
  }
});
routes.get("/orders",Auth,async(req,res)=>{
  try {
    const data = await Order.find().sort({_id:-1})
    res.status(200).json(data)
  } catch (error) {
    console.log(error)
  }
})
module.exports = routes;
