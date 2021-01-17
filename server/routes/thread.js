const express = require("express");
const router = express.Router();
const dropbase = require("../services/dropbase");
const fs = require("fs");
const axios = require("axios");

const User = require("../models/User");
const Thread = require("../models/Thread");
const Comment = require("../models/Comment");
const Contribution = require("../models/Contribution");

router.get("/:threadId", (req, res) => {
  const threadId = req.params.threadId;
  // respond with posts and data in the thread
  res.json(threadId);
});

router.post("/create/:name", (req, res) => {
  const name = req.params.name;
  // TODO: create a thread in the database

  res.send(name);
});

router.post("/upload", async (req, res) => {
  // TODO: get token and fileUrl (how?)
  const token = null;
  const fileUrl = null;
  const jobId = await dropbase.runPipelineUrl(token, fileUrl); // This calls the api to upload fileUrl to pipeline token
  res.json(jobId); // return the jobId
});

router.get("/:id/contributions", (req, res) => {
  const threadId = req.params.id;

  Thread.findByPk(threadId).then((thread, err) => {
    if (thread) {
      res.json(thread.contributions);
    } else {
      res.send("Thread not found. Error: " + JSON.stringify(err));
    }
  });
});

router.get("/:id/comments", (req, res) => {
  const threadId = req.params.id;

  Thread.findByPk(threadId).then((thread, err) => {
    if (thread) {
      res.json(thread.comments);
    } else {
      res.send("Thread not found. Error: " + JSON.stringify(err));
    }
  });
});

router.post("/:id/comments", async (req, res) => {
  const threadId = req.params.id;

  const userId = req.body.user;
  const comment = req.body.comment;
  var mainThread = await Thread.findByPk(threadId);

  var commentObj = await Comment.create({
    user: userId,
    comment: comment,
  });
  const uuid = commentObj.uuid;

  var commentsArr;

  if (mainThread.comments != null) {
    commentsArr = [...mainThread.comments];
    commentsArr.push(uuid);
  } else {
    commentsArr = [uuid];
  }

  mainThread.comments = commentsArr;

  const finalThread = await mainThread.save();

  res.send(finalThread);
});

router.post("/:id/contributions", async (req, res) => {
  const threadId = req.params.id;

  const userId = req.body.user;
  const description = req.body.description;
  const file = req.body.fileUrl;

  var fileSize = 0;
  try {
    const response = await axios.head(file);
    fileSize = response.headers["content-length"];
  } catch (e) {
    console.log(e);
  }

  var mainThread = await Thread.findByPk(threadId);

  var contribObj = await Contribution.create({
    user: userId,
    description: description,
    file: file,
    fileSize: fileSize,
  });
  const uuid = contribObj.uuid;

  var contribArr;

  if (mainThread.contributions != null) {
    contribArr = [...mainThread.contributions];
    contribArr.push(uuid);
  } else {
    contribArr = [uuid];
  }

  mainThread.contributions = contribArr;

  const finalThread = await mainThread.save();

  res.send(finalThread);
});

router.get("/threads", async (req, res) => {
  const offset = req.query.offset;
  const limit = req.query.limit;
  const threads = await Thread.findAll({
    offset: offset,
    limit: limit,
  });

  if (threads) {
    return threads;
  } else {
    return "bad request";
  }
});

router.post("/new", async (req, res) => {
  const userId = req.body.user;
  const title = req.body.title;
  const description = req.body.description;
  const dropbaseApi = req.body.dropbaseAPI;

  Thread.create({
    user: userId,
    title: title,
    description: description,
    dropbaseApi: dropbaseApi,
  }).then((thread, err2) => {
    res.send(thread);
  });
});

module.exports = router;
