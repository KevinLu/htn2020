const Sequelize = require("sequelize");
const UserModel = require("./User");
const sequelize = require("../services/database");
const {v4: uuidv4} = require("uuid");

var Thread = sequelize.define("threads", {
  uuid: {
    type: Sequelize.UUID,
    primaryKey: true,
    defaultValue: uuidv4(),
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
