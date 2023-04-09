const { authJwt } = require("../middlewares/");
const controller = require("../controllers/user.controller");
const db = require("../models/index");
const upload = require("../middlewares/multer");
const { user: User } = db;

module.exports = function (app) {
  app.use(function (req, res, next) {
    // res.header(
    //   "Access-Control-Allow-Headers",
    //   "x-access-token, Origin, Content-Type, Accept",
    //   "Access-Control-Allow-Origin",
    //   "*"
    // );
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
      "Access-Control-Allow-Methods",
      "GET,HEAD,OPTIONS,POST,PUT,DELETE"
    );
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept, Authorization"
    );
    next();
  });

  //edit user profile
  app.put("/api/user/editProfile/:id", controller.editUserProfile);
};
