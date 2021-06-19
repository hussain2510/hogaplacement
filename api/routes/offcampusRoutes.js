module.exports=(app)=>{
    console.log("off");
    const offCampusController=require("../controllers/offcampus");
    app.route("/create/offcampus").post(offCampusController.create);
    app.route("/offcampus").get(offCampusController.get_all_offcampus);
}