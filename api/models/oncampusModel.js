const mongoose=require("mongoose");
const Schema=mongoose.Schema;

const onCampusSchema=new Schema({
    college:String,
    title:String,
    description:String,
    validity:String,
    link:String
});
module.exports=mongoose.model("onCampus",onCampusSchema);