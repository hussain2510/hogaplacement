const mongoose=require("mongoose");
const adminUser=require("../models/admin-login");
const bcrypt=require("bcrypt");

exports.login=(req,res)=>{
  res.render("admin-login");
}
exports.admincreate=(req,res)=>{
      const uA=new adminUser({
        email:req.body.email,
        password:bcrypt.hashSync(req.body.password, 10)
      });
      uA.save();
}
exports.admin=(req, res)=>{
    
    let data=req.body;
    adminUser.findOne({email:data.email},function(err,user){
      if(err)
      {
        return res.status(500).json({
          succes:false,
          title:'An error occured',
          err:err
        })
      }
      if(user)
      { 
      if(!bcrypt.compareSync(data.password,user.password))
      {
        return res.send("<h3>Wrong Password</h3><br><a href='/admin-login'>login Again</a>");

      }
      if(bcrypt.compareSync(data.password,user.password))
      {
      res.render("admin-panel");
      }
      }
    })
  }