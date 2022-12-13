const mongoose = require("mongoose");

const Post = mongoose.model(
  "Post",
  new mongoose.Schema({
    imageUrl: String,
    title: String,
    category: String,
    price: Number,
    description: String,
    address: String,
    condition: String,
  })
);

module.exports = Post;
