const Sequelize = require("sequelize");
const sequelize = require("../services/database");
const UserModel = require("./User");
const { v4: uuidv4 } = require("uuid");

var Contribution = sequelize.define("contributions", {
  uuid: {
    type: Sequelize.UUID,
    primaryKey: true,
    defaultValue: () => uuidv4(),
  },
  username: {
    type: Sequelize.STRING,
  },
  avatar: {
    type: Sequelize.STRING,
  },
  fileUrl: { type: Sequelize.STRING },
  fileSize: { type: Sequelize.INTEGER },
  description: { type: Sequelize.STRING },
});

module.exports = Contribution;
