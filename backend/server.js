const dotenv = require("dotenv").config()

const express = require("express")
const mongoose = require("mongoose")

const app = express()
const Port = 3001 || Process.env.Port

mongoose.connect(process.env.MONGO_URI).then(()=>{
    
    app.listen(Port,()=>{
        console.log(`server is running on port ${Port}`)
        })
}).catch((err)=>{console.log(err)})
