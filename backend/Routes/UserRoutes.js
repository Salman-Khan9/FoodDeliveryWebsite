const express = require("express");
const User = require("../model/User_scheme");
const route = express.Router();
const bcrypt = require("bcrypt");
route.post("/signup", async (req, res) => {
  try {
    const { name, email, password, location } = req.body;
    const saltRounds = 10;
    const hashpass = await bcrypt.hash(password, saltRounds);
    const user = await User.create({
      name: name,
      email: email,
      password: hashpass,
      location: location,
    });
    res.status(200).json(user);
  } catch (error) {
    res.status(400).json(error);
  }
});
route.get("/", async (req, res) => {
  try {
    const data = await User.find();
    res.status(200).json(data);
  } catch (error) {
    res.status(400).json(error);
  }
});
route.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!email || !password) {
      res.status(400).json("Please Enter Your credentials");
    }
    if (!user) {
      res.status(400).json("no user on this email");
    }
    const passcheck = await bcrypt.compare(password, user.password);
    if (user && passcheck) {
      res.status(200).json(user);
    }
  } catch (error) {
    res.status(400).json(error);
  }
});
module.exports = route;
