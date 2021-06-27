const mongoose=require("mongoose");
const getNotified=require("../models/getNotification");
const sgMail=require("@sendgrid/mail");
sgMail.setApiKey(process.env.ADMIN_EMAIL_API_KEY);
const _ = require('lodash');
require('dotenv').config();

async function sendNotification(details){
    //console.log("send mail");
    let textToSend=JSON.stringify(details);
    let htmlText=`<h2>Thanks for registering with us.
    </h2>`;  //``for multiline string
    let info={
        from:'broforfunofficial@gmail.com',
        to:""+details.email,
        subject:'Successfully registered',
        text:textToSend,
        html:htmlText,
  
    };
    sgMail.send(info).then(res=>{console.log(res)}).catch(err => {
      console.log(err);
    });
  }
exports.create=(req,res)=>{
    //console.log(req.body);
    const newNotification=new getNotified({
        fullName:req.body.fullName,
        email:req.body.email
    })
    newNotification.save(async(err,notify)=>{
        if(err)
        {
            console.log(err);
        }
        if(notify)
        {
        let userFiltered = _.pick(notify.toObject(), [
            'fullName',
            'email',
          ]);
          sendNotification(userFiltered);
          res.status(201).redirect("/");
        }
    });
    res.redirect("/");
}