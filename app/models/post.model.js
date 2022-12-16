const mongoose = require("mongoose");

const Post = mongoose.model(
  "Post",
  new mongoose.Schema({
    imageUrl: String,
    userid: String,
    title: String,
    category: String,
    price: Number,
    description: String,
    address: String,
    condition: String,
    timestamp: String,
  })
);

module.exports = Post;
