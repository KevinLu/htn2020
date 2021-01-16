const Sequelize = require("sequelize");
const sequelize = require("../services/database");

var User = sequelize.define("users", {
  id: { type: Sequelize.INTEGER, primaryKey: true },
  username: { type: Sequelize.STRING },
  password: { type: Sequelize.STRING },
});

module.exports = User;
