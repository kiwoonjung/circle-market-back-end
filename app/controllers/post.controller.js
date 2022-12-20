const db = require("../models");
const cloudinary = require("../middlewares/cloudinary");
const { post: Post } = db;
const fs = require("fs");
const { mongoose } = require("../models");
const { url } = require("inspector");
const { nextTick } = require("process");

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

exports.edit = (req, res) => {
  const id = req.params.id;
  if (!req.body) {
    return res.status(400).send({
      message: "Empty Request body. Update cannot be empty",
    });
  }

  Post.findOne({
    _id: id,
  }).exec(async (err, post) => {
    if (err) {
      res.status(500).send({ message: err });
    }
    if (!post) {
      res.status(404).send({ message: `post not found` });
    }

    //CHECK IF FRONTEND REQUEST IMAGE IDS MATCH BACKEND POST IMAGE IDS
    const existingImageIdsFrontend = JSON.parse(req.body.existingFiles).map(
      (image) => image.id
    );

    const existingImageIdsBackend = post.imageUrl.map((image) => image.id);
    for (let [index, image] of existingImageIdsBackend.entries()) {
      const found = existingImageIdsFrontend.includes(image); //check if each image in frontend exists in backend
      if (!found) {
        //if not found delete (should implement frontend to delete from req.body)
        await cloudinary.delete(image, (err, res) => {
          if (err) {
            res.status(500).send({
              message:
                "error deleting existing cloudinary images. please check if post exists.",
            });
          }
        });
        post.imageUrl.splice(index, 1); //delete index from database
      }
    }

    //ADD NEW IMAGE TO POST IF IT EXISTS
    const urls = [];
    if (req.files) {
      const uploader = async (path) =>
        await cloudinary.uploads(path, `${post.userid}/${post.uuid}`);
      for (const file of req.files) {
        const { path } = file;
        const newPath = await uploader(path);
        urls.push(newPath);
        fs.unlinkSync(path);
      }
    }

    //PUSH to existing post.imageUrl along with added images
    for (const url of urls) {
      post.imageUrl.push(url);
    }

    //UPDATE DATABASE
    Post.findByIdAndUpdate(
      id,
      {
        title: req.body.title,
        category: req.body.category,
        price: req.body.price,
        description: req.body.description,
        address: req.body.address,
        condition: req.body.condition,
        imageUrl: post.imageUrl,
        existingFiles: post.imageUrl,
      },
      { useFindAndModify: false }
    )
      .then((data) => {
        if (!data) {
          res.status(404).send({
            message: `cannot update post with id=${id}.`,
          });
        } else {
          res.send({ message: "Post was updated successfully." });
        }
      })
      .catch((err) => {
        res.status(500).send({
          message: "error updating",
        });
      });
  });
};

exports.post = async (req, res) => {
  if (!req.body) {
    res.status(400).send({ message: "Post can not be empty!" });
    return;
  }

  //Cloudinary
  const urls = [];
  const files = req.files;
  const uploader = async (path) => await cloudinary.uploads(path, `${req.body.userid}/${req.body.uuid}`); // TODO : Ideally get post id somehow
  for (const file of files) {
    const { path } = file;
    const newPath = await uploader(path);
    urls.push(newPath);
    fs.unlinkSync(path);
  }

  const post = new Post({
    imageUrl: urls,
    existingFiles: urls,
    uuid: req.body.uuid,
    userid: req.body.userid,
    title: req.body.title,
    category: req.body.category,
    price: req.body.price,
    description: req.body.description,
    address: req.body.address,
    condition: req.body.condition,
    timestamp: Date.now(),
    comments: [],
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

exports.postComment = (req, res) => {
  const id = req.params.id;
  Post.findOne({
    _id: id,
  }).exec((err, post) => {
    if (err) {
      res.status(500).send({ message: err });
    }
    if (!post) {
      res.status(404).send({ message: `post not found` });
    }

    post.comments.push(req.body);
    post.save((err) => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }

      res.send({ message: "comments added successfully" });
    });
  });
};

exports.findAllCommentByPostId = (req, res) => {
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
          "Some error occurred while retrieving posts from findAllCommentByPostId.",
      });
    });
};
