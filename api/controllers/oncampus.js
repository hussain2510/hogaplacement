const onCampus=require("../models/oncampusModel");
exports.create=(req,res)=>{
    console.log(req.body);
    let newonCampus=new onCampus({
        title:req.body.title,
        description:req.body.description,
        validity:req.body.validity,
        link:req.body.link
    })
    newonCampus.save((err,off)=>{
        console.log(off);
    })
    res.send("successful");
}
exports.getallOnCampus=(req,res)=>{
        res.render("onCampus");
}