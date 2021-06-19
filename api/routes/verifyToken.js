const jwt=require("jsonwebtoken");
const User=require("../models/user");
module.exports=async function (req,res,next){
    console.log("middleware");
    try{
        const token=req.cookies.jwt;
        const verified=jwt.verify(token,process.env.TOKEN_SECRET);
        console.log(await User.findById(verified._id))
        next();
    }
    catch(err){
        res.status(401).render("login");
    }
}