const db = require("../models/index");
const { user: User } = db;
const cloudinary = require("../middlewares/cloudinary");
const fs = require("fs");
var bcrypt = require("bcryptjs");

exports.editUserProfile = (req, res) => {
  User.findOne({ userId: req.params.id }, (err, foundProfile) => {
    if (err) {
      console.log(err);
    } else {
      const profile = {
        name: req.body.name,
      };
      if (foundProfile !== null) {
        User.findByIdAndUpdate(
          foundProfile._id,
          profile,
          function (err, updatedProfile) {
            if (err) {
              console.log(err);
            } else {
              res.statusCode === 200
                ? res.json("profile updated")
                : res.json("Error from editUserProfile");
            }
          }
        );
      }
    }
  });
};
