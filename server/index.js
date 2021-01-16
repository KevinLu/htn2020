const express = require("express");
const app = express();
const path = require("path");
const cors = require("cors");
const sequelize = require("./services/database");

const bodyParser = require("body-parser");
const passport = require("passport");

const threadRouter = require("./routes/thread.js");
const usersRouter = require("./routes/users.js");
const authRouter = require("./routes/auth");
const contributionRouter = require("./routes/contribution")

// import models
const UserModel = require("./models/User");
const ThreadModel = require("./models/Thread");
const CommentModel = require("./models/Comment");
const ContributionModel = require("./models/Contribution");

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Serve static assets if in production
if (process.env.NODE_ENV === "production") {
  // Set static folder
  // All the javascript and css files will be read and served from this folder
  app.use(express.static(path.join(__dirname, "../client/build")));

  // index.html for all page routes    html or routing and naviagtion
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "../client", "build", "index.html"));
  });
}

UserModel.sync().then(() => {
  console.log(`User table created!`);
});
ThreadModel.sync().then(() => {
  console.log(`Thread table created!`);
});
CommentModel.sync().then(() => {
  console.log(`Comment table created!`);
});
ContributionModel.sync().then(() => {
  console.log(`Contribution table created!`);
});

const port = process.env.PORT || 5000;

// routers
app.use("/api/users", usersRouter);
app.use("/api/thread", threadRouter);
app.use("/api/contribution", contributionRouter);
app.use("/auth", authRouter);

app.listen(port, () => {
  console.log(`Server Listening on ${port}`);
});

module.exports = sequelize;
