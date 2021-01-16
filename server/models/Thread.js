const Sequelize = require("sequelize");
const UserModel = require("./User");
const sequelize = require("../services/database");

var Thread = sequelize.define("threads", {
  uuid: {
    type: Sequelize.UUID,
    primaryKey: true,
    defaultValue: Sequelize.UUIDV4,
  },
  user_id: {
    type: Sequelize.UUID,
    references: { model: UserModel, key: "uuid" },
  },
  title: { type: Sequelize.STRING },
  description: { type: Sequelize.STRING },
  dropbaseDB: { type: Sequelize.STRING },
});

module.exports = Thread;
