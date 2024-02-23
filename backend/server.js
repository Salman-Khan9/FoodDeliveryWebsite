const dotenv = require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const route = require("./Routes/UserRoutes");
const router = require("./Routes/Food_items_routes")
const routes = require("./Routes/Orders")
const cors = require("cors");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser())

const allowedOrigins = ['https://food-delivery-website-frontend.vercel.app'];
app.use(cors({
  origin : ['https://food-delivery-website-frontend.vercel.app'],
  allowedHeaders:true,
  credentials: true // Allow credentials
}));
app.use(bodyParser.json());

app.use(route);
app.use(router);
app.use(routes);

const Port = 7001 || Process.env.Port;

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(Port, () => {
      console.log(`server is running on port ${Port}`);
    });
  })
  .catch((err) => {
    console.log(err);
  });
