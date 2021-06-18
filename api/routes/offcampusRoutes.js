module.exports=(app)=>{
    const offCampusController=require("../controllers/offcampus");
    app.route("/create/offcampus").post(offCampusController.create);
    app.route("/offcampus").get(offCampusController.get_all_offcampus);
}