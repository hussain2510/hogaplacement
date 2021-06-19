const onCampusController=require("../controllers/oncampus");
const verify=require('./verifyToken');
module.exports=(app)=>{
    app.route("/create/oncampus").post(onCampusController.create);
    app.route("/onCampus").get(verify,onCampusController.getallOnCampus);
}