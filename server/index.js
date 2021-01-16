const express = require("express");
const app = express();
const path = require("path");
const cors = require("cors");
var Sequelize = require("sequelize-cockroachdb");
var fs = require("fs");

const bodyParser = require("body-parser");

app.use(cors());

//to not get any deprecation warning or error
//support parsing of application/x-www-form-urlencoded post data
app.use(bodyParser.urlencoded({ extended: true }));
//to get json data
// support parsing of application/json type post data
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

// Connect to CockroachDB through Sequelize.
var sequelize = new Sequelize("database", "maxroach", "", {
  dialect: "postgres",
  port: 26257,
  logging: false,
});

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`Server Listening on ${port}`);
});