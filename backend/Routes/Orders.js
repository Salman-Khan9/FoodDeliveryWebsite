const express = require("express")
const Order = require("../model/Orders")
const routes = express.Router()
routes.post("/order",async(req,res)=>{
    try {
        console.log(req.body)
        const data = await Order.create(req.body)
        res.status(200).json(data)
    } catch (error) {
        res.status(400).json("Error in posting order")
    }
})
routes.get("/orderhistory",async(req,res)=>{
    try {
        const data = await Order.find().sort({_id:-1})
        res.status(200).json(data)
    } catch (error) {
        res.status(400).json("error in getting orders")
    }
})
module.exports = routes