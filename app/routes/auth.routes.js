const { verifySignUp } = require("../middlewares");
const controller = require("../controllers/auth.controller");
// parse requests of content-type - application/json

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept",
      "Access-Control-Allow-Origin",
      "http://localhost:8080"
    );
    next();
  });
  //get find all users in database
  app.get("/api/auth/findAllUsers", controller.findAllUsers);

  //get single user by id
  app.get("/api/auth/findOneUser/:id", controller.findOneUser);

  app.post(
    "/api/auth/signup",
    // [verifySignUp.checkDuplicateUsernameOrEmail],
    controller.signup
  );

  app.post("/api/auth/signin", controller.signin);

  app.post("/api/auth/signout", controller.signout);

  app.post("/api/auth/refreshtoken", controller.refreshToken);
};
