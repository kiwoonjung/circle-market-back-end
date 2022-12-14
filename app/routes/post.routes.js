const controller = require("../controllers/post.controller");
const db = require("../models/index");
const { post: Post } = db;
const multer = require("multer");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./public/uploads");
  },
  filename: function (req, file, cb) {
    let extArray = file.mimetype.split("/");
    // let extension = extArray[extArray.length - 1];
    // cb(null, file.fieldname + "-" + Date.now() + "." + extension);
    let ext = file.originalname.substring(file.originalname.lastIndexOf("."));
    cb(null, file.fieldname + "-" + Date.now() + "." + ext);
  },
});

const upload = multer({ storage: storage });

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  //get find all posts in database
  app.get("/api/post/findAll", controller.findAll);

  //get single post by id
  app.get("/api/post/findOneRequest/:id", controller.findOneRequest);
  app.put("/api/post/editItem/:id", controller.edit);

  app.post("/api/post/add", upload.any(), controller.post);
};
