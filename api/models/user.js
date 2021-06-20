const mongoose=require("mongoose");
const Schema=mongoose.Schema;

const UserSchema=new Schema({
    fullName:String,
    email: {
        type: String,
        unique: true
      },
    password:String,
    verified:{
        type:Boolean,
        default:false
    },
    created_date: {
        type: Date,
        default: Date.now
    },
    college:{
        type:String,
        default:""
    },
    applyverification:{
        type:Boolean,
        default:false
    },
    rollNum:{
        type:Number,
        default:0
    },
    department:{
        type:String,
        default:""
    }
});
module.exports=mongoose.model("User",UserSchema);