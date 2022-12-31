const mongoose = require("mongoose");

const commentSchema = mongoose.Schema({
  useravatar: String,
  userid: String,
  name: String,
  comment: String,
  timestamp: String,
});

const Post = mongoose.model(
  "Post",
  new mongoose.Schema({
    imageUrl: [],
    existingFiles: [],
    uuid: String,
    userid: String,
    name: String,
    title: String,
    category: String,
    price: Number,
    description: String,
    address: String,
    condition: String,
    timestamp: String,
    comments: [commentSchema],
  })
);

module.exports = Post;
