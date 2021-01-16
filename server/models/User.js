const Sequelize = require("sequelize");
const sequelize = require("../services/database");

var User = sequelize.define("users", {
  username: {
    type: Sequelize.STRING,
    primaryKey: true
  },
  password: { type: Sequelize.STRING },
});

module.exports = User;
