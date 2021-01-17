const express = require("express");
const router = express.Router();
const dropbase = require("../services/dropbase");
const fs = require("fs");
const axios = require("axios");
const passport = require("passport");

const User = require("../models/User");
const Thread = require("../models/Thread");
const Comment = require("../models/Comment");
const Contribution = require("../models/Contribution");

router.get("/view/:threadId", (req, res) => {
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

  Thread.findByPk(threadId).then(async (thread, err) => {
    if (thread) {
      if (thread.contributions == null) {
        return res.json([]);
      }

      const contributions = await Promise.all(thread.contributions.map(id => Contribution.findByPk(id)))

      res.send(contributions);
    } else {
      res.send("Thread not found. Error: " + JSON.stringify(err));
    }
  });
});

router.get("/:id/comments", (req, res) => {
  const threadId = req.params.id;

  Thread.findByPk(threadId).then(async (thread, err) => {
    if (thread && thread.comments) {
      const comments = await Promise.all(thread.comments.map(commentId => Comment.findOne({where: {uuid: commentId}})))

      res.send(comments);
    } else {
      res.send("Thread not found. Error: " + JSON.stringify(err));
    }
  });
});

router.post("/:id/comments", passport.authMiddleware(), async (req, res) => {
  const threadId = req.params.id;

  var username = null;
  var avatar = null;

  if (req.user) {
    username = req.user.username;
    avatar = req.user.avatar;
  }

  const comment = req.body.comment;
  var mainThread = await Thread.findByPk(threadId);

  var commentObj = await Comment.create({
    username: username,
    avatar: avatar,
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

router.post(
  "/:id/contributions",
  passport.authMiddleware(),
  async (req, res) => {
    const threadId = req.params.id;

    var username = null;
    var avatar = null;
    if (req.user) {
      username = req.user.username;
      avatar = req.user.avatar;
    }
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
    const dropbaseApi = mainThread.dropbaseApi;

    var contribObj = await Contribution.create({
      username: username,
      avatar: avatar,
      description: description,
      fileUrl: file,
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

    const jobId = await dropbase.runPipelineUrl(dropbaseApi, file);

    res.send({ ...finalThread.dataValues, dropbaseJobId: jobId });
  }
);

router.get("/threads", async (req, res) => {
  const offset = req.query.offset;
  const limit = req.query.limit;
  const threads = await Thread.findAll({
    offset: offset,
    limit: limit,
    order: [["createdAt", "DESC"]],
  });

  res.send(threads);
});

router.post("/new", passport.authMiddleware(), async (req, res) => {
  var userId = null;
  if (req.user) {
    userId = req.user.uuid;
  }
  const title = req.body.title;
  const description = req.body.description;
  const dropbaseApi = req.body.pipelineToken;
  const fileUrl = req.body.fileUrl;

  const jobId = await dropbase.runPipelineUrl(dropbaseApi, fileUrl);

  Thread.create({
    user: userId,
    title: title,
    description: description,
    dropbaseApi: dropbaseApi,
    fileUrl: fileUrl,
  }).then((thread, err2) => {
    res.send({ ...thread.dataValues, dropbaseJobId: jobId });
  });
});

module.exports = router;
