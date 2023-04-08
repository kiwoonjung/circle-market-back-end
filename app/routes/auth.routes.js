const { verifySignUp } = require("../middlewares");
const controller = require("../controllers/auth.controller");
// parse requests of content-type - application/json

module.exports = function (app) {
  app.use(function (req, res, next) {
    // res.header(
    //   "Access-Control-Allow-Headers",
    //   "x-access-token, Origin, Content-Type, Accept",
    //   "Access-Control-Allow-Origin",
    //   "*"
    // );
    // res.setHeader(
    //   "Access-Control-Allow-Headers",
    //   "x-access-token, Origin, Content-Type, Accept"
    // );
    // res.setHeader("Access-Control-Allow-Origin", "*");
    // res.setHeader("Access-Control-Allow-Methods", "GET,POST,PUT,PATCH,DELETE");
    // res.setHeader(
    //   "Access-Control-Allow-Methods",
    //   "Content-Type",
    //   "Authorization"
    // );
    response.setHeader("Access-Control-Allow-Origin", "*");
    response.setHeader(
      "Access-Control-Allow-Methods",
      "POST, PUT, GET, OPTIONS, DELETE"
    );
    response.setHeader(
      "Access-Control-Allow-Headers",
      "Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With,observe"
    );
    response.setHeader("Access-Control-Max-Age", "3600");
    response.setHeader("Access-Control-Allow-Credentials", "true");
    response.setHeader("Access-Control-Expose-Headers", "Authorization");
    response.addHeader("Access-Control-Expose-Headers", "responseType");
    response.addHeader("Access-Control-Expose-Headers", "observe");
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
