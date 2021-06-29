const mongoose=require("mongoose");
const getNotified=require("../models/getNotification");
const sgMail=require("@sendgrid/mail");
sgMail.setApiKey(process.env.ADMIN_EMAIL_API_KEY);
const _ = require('lodash');
require('dotenv').config();

async function sendNotification(details){
    //console.log("send mail");
    let textToSend=JSON.stringify(details);
    let htmlText="Dear "+details.fullName+","+`<p style="color:#555;">Thanks you very much for taking the time for subscribing us.<br><br>
    we will really appreciate your interest and wanted to let you know about every lastest job for both off campus as well as on campus.<br><br>
    You can also prepare yourself for the placements all the resources are available on the website<br><br>Regards,<br>Hoga Placement<br><br>
    Note:This mailbox is not monitored. Please do not respond to this email address.<br><br>
    You received this email because  you subscribed on hogaplacement.</p>`;  //``for multiline string
    let info={
        from:'hogaplacement@gmail.com',
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