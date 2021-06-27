const express=require("express");
const bodyParser=require("body-parser");
const ejs=require("ejs");
const mongoose=require("mongoose");
const encrypt= require("mongoose-encryption");
const offcampusRoutes=require("./api/routes/offcampusRoutes");
const oncampusRoutes=require("./api/routes/oncampusRoutes");
const getNotificationRoutes=require("./api/routes/getNotificationRoutes");
const feedbackRoutes=require("./api/routes/feedback");
const adminRoutes=require("./api/routes/admin");
const userRoutes=require("./api/routes/user");
const cookieParser=require("cookie-parser");
const app=express();
app.use(express.json());
app.use(cookieParser());
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}));
app.set('view engine','ejs');

mongoose.connect("mongodb+srv://"+process.env.MongoDb_Admin+":"+process.env.MongoDb_Password+"@cluster0.xqekq.mongodb.net/PlacementDB",{useNewUrlParser:true,useUnifiedTopology: true});

offcampusRoutes(app);
oncampusRoutes(app);
userRoutes(app);
getNotificationRoutes(app);
feedbackRoutes(app);
adminRoutes(app);

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

app.get("/language",function(req,res){
    res.render("language");
});

app.get("/developement",function(req,res){
    res.render("developement");
});

app.get("/coding",function(req,res){
    res.render("coding");
});

app.get("/placement",function(req,res){
    res.render("placement");
});

app.listen(process.env.LOCAL_PORT || 4000, function(res){
    console.log("server started...");
});