const onCampus=require("../models/oncampusModel");
const User=require("../models/user");
const jwt=require("jsonwebtoken");
exports.create=(req,res)=>{
    console.log(req.body);
    let newonCampus=new onCampus({
        title:req.body.title,
        description:req.body.description,
        validity:req.body.validity,
        link:req.body.link,
        college:req.body.college
    })
    newonCampus.save((err,off)=>{
        console.log(off);
    })
    res.send("successful");
}
exports.getallOnCampus=async(req,res)=>{
    const token=req.cookies.jwt;
    const verifiedUser=jwt.verify(token,process.env.TOKEN_SECRET);
    const presentUser=await User.findById(verifiedUser._id);
    const applyverifiedStatus=presentUser.applyverification;
    const verifiedStatus=presentUser.verified;
    const presentUserCollege=presentUser.college;
    if(applyverifiedStatus && verifiedStatus)
    {

        onCampus.find({college:presentUserCollege},function(err,colleges){
            console.log(colleges);
            if(err)
            {
                console.log(err);
                res.redirect("/oncampus");
            }
            else
            {
                res.render("onCampus",{appliedstatus:applyverifiedStatus,verified:verifiedStatus,arrOnCampus:colleges});
            }
        })
    }
    else
    {
        res.render("onCampus",{appliedstatus:applyverifiedStatus,verified:verifiedStatus});
    }
}