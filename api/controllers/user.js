const User=require("../models/user");
const bcrypt=require("bcrypt");
const _ = require('lodash');
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
        return res.status(401).json({
          success:false,
          title:'Login failed',
          error:{
            message:'invalid login credentials'
          }
        })
      }
      else if(user)
      { 
      if(!bcrypt.compareSync(data.password,user.password))
      {console.log("user found but password do not match");
        return res.status(401).json({
          success:false,
          title:'wrong password',
          error:{
            message:'password does not match'
          }
        })
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
      
    //    return res.status(201).json({
    //       success:true,
    //       title:'Login Successful',
    //       obj:userFiltered
    //     })
    res.render("oncampus");
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
      res.render("oncampus",{success:true});
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