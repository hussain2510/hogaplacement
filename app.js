const express=require("express");
const bodyParser=require("body-parser");
const ejs=require("ejs");
const mongoose=require("mongoose");
const encrypt= require("mongoose-encryption");

const app=express();
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}));
app.set('view engine', 'ejs');

// mongoose.connect("mongodb://localhost:27017/userDB");

// const userSchema= new mongoose.Schema({
//     email: String,
//     password: String
// });

// const secret= "kuch vi";
// userSchema.plugin(encrypt,{secret: secret, encryptedFields: ["password"]});
// const User=new mongoose.model("User",userSchema);

app.get("/",function(req,res){
    res.render("home");
});

app.get("/preparation",function(req,res){
    res.render("preparation");
});

app.get("/oncampus",function(req,res){
    res.render("login");
});

app.get("/offCampus",function(req,res){
    res.render("offCampus");
});

app.get("/signup",function(req,res){
    res.render("signup");
});
app.get("/login",function(req,res){
    res.render("login");
});


app.listen(3000, function(res){
    console.log("server started...");
});