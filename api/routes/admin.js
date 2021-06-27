const userController=require("../controllers/admin-panel");
module.exports=(app)=>{
    app.route("/admin").post(userController.admin);
    //app.route("/admin-create").post(userController.admincreate);
    app.route("/admin-login").get(userController.login);
}