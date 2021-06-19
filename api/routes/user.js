const userController=require("../controllers/user");
module.exports=(app)=>{
    app.route("/SignUp").post(userController.signUp);
    app.route("/Login").post(userController.login);
}