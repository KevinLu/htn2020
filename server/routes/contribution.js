const express = require("express");
const router = express.Router();
const axios = require("axios");
var upload = require('../services/multer');

const Contribution = require("../models/Contribution");

router.get("/:contribution_id", async (req, res) => {
  const contributionId = req.params.contribution_id;
  const contribution = await Contribution.findByPk(contributionId);

  if (contribution) {
    res.send(contribution);
  } else {
    res.send("bad request");
  }
});

router.post("/upload", upload.single('csv'), async (req, res) => {

  var userId = null;
  if (req.user) {
    userId = req.user.uuid
  }
  const csv = req.file;
  const desc = req.body.description;

  console.log(req.file)

  var contribObj = await Contribution.create({
    user: userId,
    description: desc,
    csv: csv,
  });
  
  if (contribObj) {
    res.send(contribObj);
  } else {
    res.send("bad request");
  }
});

module.exports = router;
