const mongoose = require("mongoose");

const User = mongoose.model(
  "User",
  new mongoose.Schema({
    email: String,
    name: String,
    password: String,
  })
);

module.exports = User;
