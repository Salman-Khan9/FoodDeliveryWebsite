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
    const exp = Date.now() + 1000 * 60 * 60 * 24 * 30; // 30 days
    res.cookie("token",token,{
  path:"/",
  expires: new Date(exp),
      httpOnly:true,
sameSite : "none",
secure : true,
})

    
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

route.delete('/logout', (req, res) => {
  if (req.session) {
    req.session.destroy(() => {
      res.clearCookie(session.name, {
        path: session.get('token').path,
        httpOnly: session.get('token').httpOnly,
        secure: session.get('token').secure,
        sameSite: session.get('token').sameSite
      });
      res.sendStatus(200);
    });
  } else {
    res.sendStatus(400);
  }
});
//route.get("/logout",async(req,res)=>{

  //try {
    //req.session.destroy((err) => {
      //if (err) {
        //console.error(err.message);
        //res.sendStatus(400);
      //} else {
       // console.log("User session destroyed");
        //res.clearCookie("Authorization", {
          //httpOnly: true,
          //secure: process.env.NODE_ENV === "production",
          //sameSite: "none",
         // expires: new Date(0),
       // });
       // res.setHeader("Cache-Control", "no-cache, no-store, must-revalidate");
       // res.sendStatus(200);
     // }
   // });
  //try {
    //res.clearCookie("token", {
     // path: "/",
      //secure: true,
      //sameSite: "none",
      //expires: new Date(0),
    //});
   // res.cookie("token",token,{
     // path : "/",
      //httpOnly:true,
      //expires : new Date(Date.now()-86400*1000),
//sameSite : "none",
//secure : true,})
     // req.cookies.token = false
       // res.cookie("token","",{
         //   path:"/",
           // httpOnly : true,
            //expires : new Date(Date.now()-86400*1000),
            //sameSite : "none",
            //secure : true,
            
          //})
         // res.setHeader("Cache-Control", "no-cache, no-store, must-revalidate");
     //res.status(200).json("logged out successfully")
    //} catch (error) {
    //res.status(400).json(error)
        
   // }
    
//})
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
