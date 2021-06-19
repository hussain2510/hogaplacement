module.exports=(app)=>{
    const getNotificationController=require("../controllers/getNotification");
    app.route("/create/notify").post(getNotificationController.create);
}