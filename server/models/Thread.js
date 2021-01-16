const Sequelize = require("sequelize");
const UserModel = require("./User");
const sequelize = require("../services/database");

var Thread = sequelize.define("threads", {
  id: { type: Sequelize.INTEGER, primaryKey: true },
  user_id: {
    type: Sequelize.INTEGER,
    references: { model: UserModel, key: "id" },
  },
  title: { type: Sequelize.STRING },
  description: { type: Sequelize.STRING },
  dropbaseDB: { type: Sequelize.STRING },
});

module.exports = Thread;
