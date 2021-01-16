const express = require("express");
const cookieSession = require("cookie-session");

const app = express();
const path = require("path");
const cors = require("cors");
const sequelize = require("./services/database");

const bodyParser = require("body-parser");
const passport = require("passport");

const threadRouter = require("./routes/thread.js");
const usersRouter = require("./routes/users.js");
const authRouter = require("./routes/auth");

// import models
const UserModel = require("./models/User");
const ThreadModel = require("./models/Thread");

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(cookieSession({
  keys: ['secret key'],
  maxAge: 24 * 60 * 60 * 1000 // 24 hours
}))

app.use(passport.initialize());
app.use(passport.session());

require('./auth/setup_passport')

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

const port = process.env.PORT || 5000;

// routers
app.use("/api/users", usersRouter);
app.use("/api/thread", threadRouter);
app.use("/api/auth", authRouter);

// use passport.authMiddleware() to restrict access to pages where you need to be authenticated
// eg app.get('/api/create/thread/', passport.authMiddleware(), callback);

app.listen(port, () => {
  console.log(`Server Listening on ${port}`);
});

module.exports = sequelize;
