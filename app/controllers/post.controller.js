const db = require("../models");
const { post: Post } = db;

exports.findAll = (req, res) => {
  //GET ALL POSTS (currently fetching all but probably need to add condition)
  Post.find()
  .then((data)=>{
    res.send(data);
  })
  .catch((err) => {
    res.status(500).send({
      message:
        err.message || "Some error occurred while retrieving posts from database.",
    });
  });
};

exports.post = (req, res) => {
  console.log("body", req.body.title);
  console.log("files", req.files);

  const post = new Post({
    imageUrl: req.files[0].path,
    title: req.body.title,
    category: req.body.category,
    price: req.body.price,
    description: req.body.description,
    address: req.body.address,
    condition: req.body.condition,
    timestamp: Date.now(),
  });
  post.save((err, user) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }
    res.send({ message: "Post was updated successfully!" });
  });
};
