const { authJwt } = require("../middlewares/");
const controller = require("../controllers/user.controller");
const db = require("../models/index");
const { user: User } = db;

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.get("/api/circlemarket_db/all", controller.allAccess);

  //GET USER
  app.get(
    "/api/circlemarket_db/user",
    [authJwt.verifyToken],
    controller.userBoard
  );
};
