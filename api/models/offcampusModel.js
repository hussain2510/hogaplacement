const mongoose=require("mongoose");
const Schema=mongoose.Schema;

const OffCampusSchema=new Schema({
    title:String,
    description:String,
    validity:String,
    link:String
});
module.exports=mongoose.model("OffCampus",OffCampusSchema);