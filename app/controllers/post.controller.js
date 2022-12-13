const db = require("../models");
const { post: Post } = db;

exports.list = (req, res) => {
  res.json({ message: "Hello there. Welcome to circle market api" });
};

exports.post = (req, res) => {
  console.log("body", req.body.title);
  console.log("files", req.files);

  const post = new Post({
    title: req.body.title,
    category: req.body.category,
    price: req.body.price,
    description: req.body.description,
    imageUrl: req.files.path,
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
