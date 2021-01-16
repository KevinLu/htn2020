const express = require("express");
const router = express.Router();
const User = require("../models/User");

/*
 * todo i think we use passport.js or something for auth strategy.
 *  then we can also implement fb oauth easily.
 * */

router.post("/login", (req, res) => {
  var username = req.params.username;
  var password = req.params.password;

  res.send(username);
});

router.post("/signup", async (req, res) => {
  var username = req.body["username"];
  var password = req.body["password"];

  console.log(username, password)

  const user = User.create({
    "username": username,
    "password": password
  });

  res.send(user);
});

module.exports = router;
