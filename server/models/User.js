const Sequelize = require("sequelize");
const sequelize = require("../services/database");
const {v4: uuidv4} = require("uuid");

var User = sequelize.define("users", {
  uuid: {
    type: Sequelize.UUID,
    primaryKey: true,
    defaultValue: () => uuidv4(),
  },
  username: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true,
  },
  password: { type: Sequelize.STRING },
  avatar: { type: Sequelize.STRING }
});

module.exports = User;
