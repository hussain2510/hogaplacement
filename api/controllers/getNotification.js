const mongoose=require("mongoose");
const getNotified=require("../models/getNotification");

exports.create=(req,res)=>{
    console.log(req.body);
    const newNotification=new getNotified({
        fullName:req.body.fullName,
        email:req.body.email
    })
    newNotification.save();
    res.redirect("/");
}