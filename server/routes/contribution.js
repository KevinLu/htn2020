const express = require("express");
const router = express.Router();
const axios = require("axios");
const {uploadFilePublic} = require("../services/awsupload");
const singleUploadPublic = uploadFilePublic.single('file');

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

router.post("/upload", (req, res) => {
  singleUploadPublic(req, res, err => {
    if (err) {
      console.log(err);
      return res.status(415).json({success: false, err});
    } else {
      return res.status(200).json({success: true, file: {location: req.file.location, name: req.file.originalname}});
    }
  })

  // var userId = null;
  // if (req.user) {
  //   userId = req.user.uuid
  // }
  // const csv = req.file;
  // const desc = req.body.description;

  // console.log(req.file)

  // var contribObj = await Contribution.create({
  //   user: userId,
  //   description: desc,
  //   csv: csv,
  // });

  // if (contribObj) {
  //   res.send(contribObj);
  // } else {
  //   res.send("bad request");
  // }
});

module.exports = router;
