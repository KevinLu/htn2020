const express = require("express");
const router = express.Router();
const User = require("../models/User");

router.get("/self", async (req, res) => {
  var userId = null;
  if (req.user) {
    userId = req.user.uuid;
  }

  const user = await User.findByPk(userId);

  // todo send data about user

  res.send(user);
});

module.exports = router;
