const dotenv = require("dotenv").config()
const express = require("express")
const mongoose = require("mongoose")
const route = require("./Routes/UserRoutes")
const routes = require("./Routes/Food_items_routes")

const app = express()
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(route)
app.use(routes)

const Port = 3001 || Process.env.Port

mongoose.connect(process.env.MONGO_URI).then(()=>{
    
    app.listen(Port,()=>{
        console.log(`server is running on port ${Port}`)
        })
}).catch((err)=>{console.log(err)})