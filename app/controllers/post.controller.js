const db = require("../models");
const cloudinary = require("../middlewares/cloudinary");
const { post: Post } = db;
const fs = require("fs");

exports.findAllPosts = (req, res) => {
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

exports.post = async (req, res) => {
  const urls = [];
  const files = req.files;
  const uploader = async (path) =>
    await cloudinary.uploads(path, req.body.userid); // TODO : Ideally get post id somehow
  for (const file of files) {
    const { path } = file;
    const newPath = await uploader(path);
    urls.push(newPath);
    fs.unlinkSync(path);
  }

  const post = new Post({
    imageUrl: urls,
    userid: req.body.userid,
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

exports.findOnePost = (req, res) => {
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

exports.findPostsByUserId = (req, res) => {
  const id = req.params.id;
  Post.find({
    userid: id,
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
  console.log(req.body);
  const id = req.params.id;
  if (!req.body) {
    return res.status(400).send({
      message: "Empty Request body. Update cannot be empty",
    });
  }

  Post.find({
    _id: id,
  }).exec(async (err, post) => {
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
