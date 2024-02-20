const express = require("express");
const Order = require("../model/Orders");
const Auth = require("../Middleware/Auth");
const routes = express.Router();
routes.post("/order", Auth,async (req, res) => {
  try {
    
    const userId = req.user.id;

    // Map over each object in req.body to extract order details
    const ordersData = req.body.map((orderDetails) => {
      const { name, category, quantity, finalprice, totalamount } = orderDetails;

      return {
        User: userId,
        name: name,
        category: category,
        quantity: quantity,
        finalprice: finalprice,
        totalamount: totalamount
      };
    });
    console.log(ordersData)

    // Create the orders
    const orders = await Order.create(ordersData);

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
module.exports = routes;
