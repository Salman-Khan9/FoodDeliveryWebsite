const jwt = require("jsonwebtoken")
const User = require("../model/User_scheme")

const Auth = async (req,res,next)=>{
    try {
        const token = req.cookies.token
        console.log(token)
        if(!token){
            res.status(400).json("not authorized ,please login")
        }
            const verify = await jwt.verify(token,process.env.SECRET_KEY)
        const userinfo = await User.findById(verify.id).select("-password")
        if(!userinfo){
            res.status(400).json("user not found")
        }        
        req.user = userinfo
        next();
    } catch (error) {
        console.log(error)
    }
}

module.exports= Auth