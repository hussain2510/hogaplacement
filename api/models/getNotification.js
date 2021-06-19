const mongoose=require("mongoose");
const Schema=mongoose.Schema;

const getNotifiedSchema=new Schema({
    fullName:String,
    email:{
        type:String,
        unique:true
    }
});
module.exports=mongoose.model("getNotified",getNotifiedSchema);