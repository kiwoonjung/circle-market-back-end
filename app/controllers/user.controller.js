const db = require("../models/index");
const { user: User } = db;
const cloudinary = require("../middlewares/cloudinary");
const fs = require("fs");
var bcrypt = require("bcryptjs");

exports.editUserProfile = async (req, res) => {
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

  //Cloudinary
  const urls = [];
  const files = req.files;
  const uploader = async (path) =>
    await cloudinary.uploads(path, `${req.body.name}/${req.body.title}`);
  for (const file of files) {
    const { path } = file;
    const newPath = await uploader(path);
    urls.push(newPath);
    fs.unlinkSync(path);
  }

  const profileImage = new User({
    imageUrl: urls,
  });

  profileImage.save((err, user) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }
    res.send({ message: "Post was updated successfully!" });
  });
};
