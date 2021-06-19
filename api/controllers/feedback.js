const mongoose=require("mongoose");
const feedback=require("../models/feedback");

exports.create=(req,res)=>{
    console.log(req.body);
    const newfeedback=new feedback({
        fullName:req.body.fullName,
        email:req.body.email,
        description:req.body.description
    })
    newfeedback.save();
    res.redirect("/");
}