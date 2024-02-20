const express = require("express");
const FoodItems = require("../model/Food_Items");
const Auth = require("../Middleware/Auth");
const router = express.Router();
router.post("/add/food/items",Auth,async (req, res) => {
  try {

    const { name, category, price } = req.body;
    const fooditems = await FoodItems.create({
      
      name: name,
      category: category,
      price: price,
    });
    res.status(200).json(fooditems);
  } catch (error) {
    res.status(400).json(error);
  }
});
router.get("/food/items",Auth,async (req, res) => {
  try {
    const data = await FoodItems.find();
    const {name,category,price} = data
    res.status(200).json(data);
  } catch (error) {
    res.status(400).json(error);
  }
});
router.get("/item/:id", Auth,async (req, res) => {
  try {
    const { id } = req.params;
    const data = await FoodItems.findById(id);
    res.status(200).json(data);
  } catch (error) {
    res.status(400).json(error);
  }
});

module.exports = router;
