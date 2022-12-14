const {
  realtimebidding,
} = require("googleapis/build/src/apis/realtimebidding");
const db = require("../models");
const { post: Post } = db;

exports.findAll = (req, res) => {
  //GET ALL POSTS (currently fetching all but probably need to add condition)
  Post.find()
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message ||
          "Some error occurred while retrieving posts from database.",
      });
    });
};

exports.findOneRequest = (req, res) => {
  const id = req.params.id;
  console.log(id);
  Post.find({
    _id: id,
  })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message ||
          "Some error occurred while retrieving posts from findOneRequest.",
      });
    });
};

exports.post = (req, res) => {
  console.log("body", req.body.title);
  console.log("files", req.files[0]);

  const post = new Post({
    imageUrl: "/uploads/" + req.files[0].filename,
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

exports.findOneRequest = (req, res) => {
  const id = req.params.id;
  Post.find({
    _id: id,
  })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message ||
          "Some error occurred while retrieving posts from findOneRequest.",
      });
    });
};

exports.edit = (req, res) => {
  const id = req.params.id;
  console.log(req.body);
  if (!req.body) {
    return res.status(400).send({
      message: "Empty Request body. Update cannot be empty",
    });
  }

  Post.find({
    _id: id,
  }).exec(async (err, post) => {
    console.log(post);
    if (err) {
      res.status(500).send({ message: err });
    }
    if (!post) {
      res.status(404).send({ message: `post not found` });
    }
    Post.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
      .then((data) => {
        if (!data) {
          res.status(404).send({
            message: `cannot update post with id=${id}.`,
          });
        } else res.send({ message: "Post was updated successfully." });
      })
      .catch((err) => {
        res.status(500).send({
          message: "error updating",
        });
      });
  });
};
