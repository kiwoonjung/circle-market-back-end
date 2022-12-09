require("dotenv").config();
const fs = require("fs");
const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const { v4: uuid } = require("uuid");
const { JWT_SECRET } = process.env;

router
  .route("/")
  .get((req, res) => {
    const data = fs.readFileSync("./data/user-profile.json", "utf-8");
    res.json(JSON.parse(data));
  })
  .post((req, res) => {
    const data = fs.readFileSync("./data/user-profile.json", "utf-8");
    const userData = JSON.parse(data);
    if (req.body && req.body.email && req.body.name && req.body.password) {
      const updateUser = {
        id: uuid(),
        email: req.body.email,
        name: req.body.name,
        password: req.body.password,
        timestamp: Date.now(),
      };
      const newUserData = [...userData, updateUser];
      fs.writeFileSync("./data/user-profile.json", JSON.stringify(newUserData));
      res.send("User data updated");
    } else {
      res.send("You forgot to include json data in your request");
    }
  });

router.route("/login").post((req, res) => {
  if (req.body.email && req.body.password) {
    // check if user is in array of users
    const data = fs.readFileSync("./data/user-profile.json", "utf-8");
    const userData = JSON.parse(data);
    const foundUser = userData.find(
      (user) =>
        user.email === req.body.email && user.password === req.body.password
    );
    if (foundUser) {
      // create JWT token with id, name and avatar
      const jwtToken = jwt.sign(
        { id: foundUser.id, name: foundUser.name },
        JWT_SECRET
      );
      // send response with JWT token
      res.json({
        message: "login success",
        token: jwtToken,
      });
    } else {
      res.status(401).send("not a valid user");
    }
  } else {
    res.status(400).send("please provide an email and password");
  }
});

module.exports = router;
