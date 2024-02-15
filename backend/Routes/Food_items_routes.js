const express = require("express");
const FoodItems = require("../model/Food_Items");
const routes = express.Router();
routes.post("/add/food/items", async (req, res) => {
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
routes.get("/food/items", async (req, res) => {
  try {
    const data = await FoodItems.find();
    res.status(200).json(data);
  } catch (error) {
    res.status(400).json(error);
  }
});
routes.get("/item/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const data = await FoodItems.findById(id);
    res.status(200).json(data);
  } catch (error) {
    res.status(400).json(error);
  }

});

module.exports = routes;
