module.exports=(app)=>{
    const feedbackController=require("../controllers/feedback");
    app.route("/create/feedback").post(feedbackController.create);
}