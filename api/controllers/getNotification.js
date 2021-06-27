const mongoose=require("mongoose");
const getNotified=require("../models/getNotification");
const sgMail=require("@sendgrid/mail");
sgMail.setApiKey(process.env.ADMIN_EMAIL_API_KEY);
const _ = require('lodash');
require('dotenv').config();

async function sendNotification(details){
    //console.log("send mail");
    let textToSend=JSON.stringify(details);
    let htmlText=`<h2>Thanks for subscribing us.
    <p style="color:light-grey;">we will let you know every latest job oppurtunities for both off campus as well as on campus.</p>
    </h2><br><h3>You can also prepare yourself for the placements all the resources are available on the website</h3><h3>Regards,</h3><p>Hoga Placement</p>`;  //``for multiline string
    let info={
        from:'broforfunofficial@gmail.com',
        to:""+details.email,
        subject:'Jobs Notification',
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
          res.redirect("/");
        }
    });
    res.redirect("/");
}