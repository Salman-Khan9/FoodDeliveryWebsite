const express = require("express");
const User = require("../model/User_scheme");
const route = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken")

const generateToken =(id)=>{
 return jwt.sign({id},process.env.SECRET_KEY,{expiresIn:"1d"})
}
route.post("/signup", async (req, res) => {
  try {
    const { name, email, password, location } = req.body;
    const emailexist = await User.findOne({email})
    if(emailexist){
      res.status(400).json("email Already exist")
    }
    const saltRounds = 10;
    const hashpass = await bcrypt.hash(password, saltRounds);
    const user = await User.create({
      name: name,
      email: email,
      password: hashpass,
      location: location,
    });
    const token = generateToken(user._id)
res.cookie("token",token,{
  path:"/",
  httpOnly : true,
  expires : new Date(Date.now()+86400*1000),
  sameSite : "none",
  secure : true,
})
    res.status(200).json({user,token});
  } catch (error) {
    res.status(400).json(error);
  }
});
route.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      res.status(400).json("Please Enter Your credentials");
    }
    const user = await User.findOne({ email });
   

    
    if (!user) {
      res.status(400).json("no user on this email");
    }
    const passcheck = await bcrypt.compare(password, user.password);
    const token = generateToken(user._id)
    res.cookie("token",token,{
      path : "/",
      httpOnly:true,
      expires : new Date(Date.now()+86400*1000),
sameSite : "none",
secure : true,})

    
    if (user && passcheck) {
      const {email} = user
    res.status(200).json(email);
      
    }else{
      res.status(400).json("invalid email or password")
  }
   

  } catch (error) {
    res.status(400).json(error);
  }
})

route.get("/logout",async(req,res)=>{

   try {
    const token = req.cookies.token
    
    res.cookie("token",token,{
      path : "/",
      httpOnly:true,
      expires : new Date(Date.now()-86400*1000),
sameSite : "none",
secure : true,})
     // req.cookies.token = false
       // res.cookie("token","",{
         //   path:"/",
           // httpOnly : true,
            //expires : new Date(Date.now()-86400*1000),
            //sameSite : "none",
            //secure : true,
            
          //})
    return res.json(token,"token")
    } catch (error) {
    res.status(400).json(error)
        
    }
    
})
route.get("/logged",async(req,res)=>{
  try {
    const token = req.cookies.token
    if(!token){
      return res.json(false)
    }
    const verify = jwt.verify(token,process.env.SECRET_KEY)
    if (verify){
     return res.status(200).json(true)
    }
    else{
      return res.status(400).json(false)
    }
  } catch (error) {
    res.status(400).json(error)
  }
})

module.exports = route;
