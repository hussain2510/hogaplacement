const mongoose=require("mongoose");
const Schema=mongoose.Schema;

const feedbackSchema=new Schema({
    fullName:String,
    email:{
        type:String,
        unique:true
    },
    description:String,
});
module.exports=mongoose.model("feedback",feedbackSchema);