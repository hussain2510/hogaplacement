const express=require("express");
const bodyParser=require("body-parser");
const ejs=require("ejs");
const mongoose=require("mongoose");
const encrypt= require("mongoose-encryption");
const offcampusRoutes=require("./api/routes/offcampusRoutes");
const oncampusRoutes=require("./api/routes/oncampusRoutes");
const userRoutes=require("./api/routes/user");
const app=express();
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}));
app.set('view engine', 'ejs');

mongoose.connect("mongodb://localhost:27017/PlacementDB",{useNewUrlParser: true,useUnifiedTopology: true});

offcampusRoutes(app);
oncampusRoutes(app);
userRoutes(app);

app.get("/",function(req,res){
    res.render("home");
});

app.get("/preparation",function(req,res){
    res.render("preparation");
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










