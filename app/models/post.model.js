const mongoose = require("mongoose");

const Post = mongoose.model(
  "Post",
  new mongoose.Schema({
    title: String,
    category: String,
    price: Number,
    description: String,
    imageUrl: String,
  })
);

module.exports = Post;
