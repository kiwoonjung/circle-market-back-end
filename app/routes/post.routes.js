const controller = require("../controllers/post.controller");
const upload = require("../middlewares/multer");
const db = require("../models/index");
const { post: Post } = db;

module.exports = function (app) {
  app.use(function (req, res, next) {
    // res.header(
    //   "Access-Control-Allow-Headers",
    //   "x-access-token, Origin, Content-Type, Accept",
    //   "Access-Control-Allow-Origin",
    //   "*"
    // );
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "GET,POST,PUT,PATCH,DELETE");
    res.setHeader(
      "Access-Control-Allow-Methods",
      "Content-Type",
      "Authorization"
    );
    next();
  });

  //get find all posts in database
  app.get("/api/post/findAllPosts", controller.findAllPosts);

  //get single post by id
  app.get("/api/post/findOnePost/:id", controller.findOnePost);

  //get posts by userid
  app.get("/api/post/findPostsByUserId/:id", controller.findPostsByUserId);

  //update posts with given post id
  app.put("/api/post/editItem/:id", upload.array("files"), controller.edit);

  //add individual post
  app.post("/api/post/add", upload.array("files"), controller.post);

  //update all comments by post id
  app.get("/api/post/findAllComments/:id", controller.findAllCommentByPostId);

  //post individual comment
  app.post("/api/post/addComment/:id", controller.postComment);
};
