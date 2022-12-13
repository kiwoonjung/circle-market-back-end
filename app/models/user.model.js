const mongoose = require("mongoose");

const User = mongoose.model(
  "User",
  new mongoose.Schema({
    email: String,
    name: String,
    password: String,
    timestamp: String,
  })
);

module.exports = User;