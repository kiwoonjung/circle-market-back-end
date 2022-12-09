const mongoose = require("mongoose");
mongoose.set('strictQuery', true);
mongoose.Promise = global.Promise;

const db = {};

db.mongoose = mongoose;

db.user = require("./user.model");
db.refreshToken = require("./refreshToken.model");

module.exports = db;
