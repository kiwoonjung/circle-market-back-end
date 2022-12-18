const mongoose = require("mongoose");

const Post = mongoose.model(
  "Post",
  new mongoose.Schema({
    imageUrl: [],
    userid: String,
    title: String,
    category: String,
    price: Number,
    description: String,
    address: String,
    condition: String,
    timestamp: String,
    comments: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Comment",
      },
    ],
  })
);

module.exports = Post;
