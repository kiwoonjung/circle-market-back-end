const controller = require("../controllers/post.controller");
const db = require("../models/index");
const { post: Post } = db;

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.post("/api/auth/post", controller.post);
};
