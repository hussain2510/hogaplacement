const User=require("../models/user");
require('dotenv').config();
const bcrypt=require("bcrypt");
const jwt=require("jsonwebtoken");
const _ = require('lodash');

exports.verification=async(req,res)=>{
  console.log(req.body);
  let data=req.body;
  let collegename=data.collegename;
  let rollnum=data.roll;
  let dept=data.dept;
  const token=req.cookies.jwt;
    const verifiedUser=jwt.verify(token,process.env.TOKEN_SECRET);
    const presentUser=await User.findById(verifiedUser._id);
    console.log(presentUser._id);
    
    await User.findByIdAndUpdate({_id:verifiedUser._id},{college:collegename,rollNum:rollnum,department:dept,applyverification:true},function(err,user){
      if (err) {
        res.send({
          error: err,
          message: "Couldn't create new user", 
          code: 400
        })
      }
      else
      {
        res.redirect("/oncampus");
      }
    })
    
}
exports.login = (req, res) => {

    let data=req.body;
      User.findOne({email:data.email},function(err,user){
      if(err)
      {
        return res.status(500).json({
          succes:false,
          title:'An error occured',
          err:err
        })
      }
      if(!user)
      {
        console.log("user not found");
        return res.status(401).redirect("/signup");
      }
      else if(user)
      { 
      if(!bcrypt.compareSync(data.password,user.password))
      {console.log("user found but password do not match");
        return res.status(401).redirect("/login");
      }
      if(bcrypt.compareSync(data.password,user.password))
      {
        console.log("password matched")
        let userFiltered = _.pick(user.toObject(), [
        'fullname',
        'email',
        'created_date',
        '_id',
        'status'
      ]);
      
      //  return res.status(201).json({
      //     success:true,
      //     title:'Login Successful',
      //     obj:userFiltered
      //   })

    // res.render("oncampus");


      //creating token and storing it in the browser
      const token=jwt.sign({_id:user._id},process.env.TOKEN_SECRET);
      res.cookie("jwt",token,{
        httpOnly:true
      });
      res.redirect("/onCampus");
      }
      }
    })
  }
exports.signUp= (req, res) => {
    console.log("fromclient");
    if(req.body.fullname && req.body.email && req.body.password)
    { 
        const newUser=new User({
            fullName:req.body.fullname,
            email:req.body.email,
            password:bcrypt.hashSync(req.body.password, 10)
        })
    newUser.save(async(err,user)=>{
      if (err) {
        res.send({
          error: err,
          message: "Couldn't create new user", 
          code: 400
        });
      }
      if(user)
      {
    //   let userFiltered = _.pick(user.toObject(), [
    //     'fullName',
    //     'email',
    //     'created_date',
    //     '_id',
    //     'status'
    //   ]);
    // //   sendNotification(userFiltered);
    //   res.status(201).json({
    //     message: 'User created',
    //     success: true,
    //     obj: userFiltered
    //   });
      // or
      // res.send(userFiltered)
      res.redirect("/login");
    }
  
  });
    }
    else
    {
    res.status(500).json({
      succes:false,
      title:'An error occured',
    })
  }
  };