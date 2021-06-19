const onCampusController=require("../controllers/oncampus");
module.exports=(app)=>{
    app.route("/onCampus").get(onCampusController.getallOnCampus);
}