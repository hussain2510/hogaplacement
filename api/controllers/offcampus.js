const mongoose=require("mongoose");
const OffCampus=require("../models/offcampusModel");

exports.create=(req,res)=>{
    console.log("Asds");
    console.log(req.body);
    let newOffCampus=new OffCampus({
        title:req.body.title,
        description:req.body.description,
        validity:req.body.validity,
        link:req.body.link
    })
    newOffCampus.save((err,off)=>{
        console.log(off);
    })
    res.send("successful");
}
exports.get_all_offcampus=(req,res)=>{
    OffCampus.find(function(err,offcampus){
        console.log(offcampus);
        console.log(offcampus);
        res.render("offCampus",{arrOffCampus:offcampus});
    })
}