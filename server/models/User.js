const Sequelize = require("sequelize");
const sequelize = require("../services/database");
const uuid = require("uuid");

var User = sequelize.define("users", {
  uuid: {
    type: Sequelize.UUID,
    primaryKey: true,
    defaultValue: Sequelize.UUIDV4,
  },
  username: { type: Sequelize.STRING },
  password: { type: Sequelize.STRING },
});

module.exports = User;
