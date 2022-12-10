const db = require("../models");
const { post: Post } = db;

exports.post = (req, res) => {
  const post = new Post({
    title: req.body.title,
    category: req.body.category,
    price: req.body.price,
    description: req.body.description,
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
