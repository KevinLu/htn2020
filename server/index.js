const express = require('express')
const app = express()
const path = require('path')
const cors = require('cors')

const bodyParser = require('body-parser')
const passport = require('passport')

const threadRouter = require("./routes/thread.js");
const usersRouter = require("./routes/users.js");

// import models
const UserModel = require("./models/User");

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

const port = process.env.PORT || 5000

// Add all database objects from models here
const User = UserModel(sequelize);

sequelize.sync({ force: true }).then(() => {
  console.log(`Database & tables created!`);
});

const port = process.env.PORT || 5000;

// routers
app.use("/api/users", usersRouter);
app.use("/api/thread", threadRouter);

app.listen(port, () => {
  console.log(`Server Listening on ${port}`);
});
