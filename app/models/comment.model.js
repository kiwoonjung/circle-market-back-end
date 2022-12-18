const mongoose = require("mongoose");

const Comment = mongoose.model(
  "Comment",
  new mongoose.Schema({
    useravatar: String,
    userid: String,
    name: String,
    comment: String,
  })
);

module.exports = Comment;
