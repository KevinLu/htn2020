const Sequelize = require("sequelize");
const sequelize = require("../services/database");
const UserModel = require("./User");
const {v4: uuidv4} = require("uuid");

var User = sequelize.define("contributions", {
  uuid: {
    type: Sequelize.UUID,
    primaryKey: true,
    defaultValue: () => uuidv4(),
  },
  user: {
    type: Sequelize.UUID,
    references: { model: UserModel, key: "uuid" },
  },
  csv: { type: Sequelize.BLOB },
  description: { type: Sequelize.STRING }
});

module.exports = User;
