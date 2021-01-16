const Sequelize = require("sequelize");
const UserModel = require("./User");
const ContributionModel = require("./Contribution");
const CommentModel = require("./Comment");
const sequelize = require("../services/database");
const {v4: uuidv4} = require("uuid");

var Thread = sequelize.define("threads", {
  uuid: {
    type: Sequelize.UUID,
    primaryKey: true,
    defaultValue: uuidv4(),
  },
  threadUrl: {
    type: Sequelize.STRING
  },
  user: {
    type: Sequelize.UUID,
    references: { model: UserModel, key: "uuid" },
  },
  title: { type: Sequelize.STRING },
  description: { type: Sequelize.STRING },
  comments: {
    type: Sequelize.ARRAY({
      type: Sequelize.UUID,
      references: { model: CommentModel, key: "uuid" },
    })
  },
  contributions: {
    type: Sequelize.ARRAY({
      type: Sequelize.UUID,
      references: { model: ContributionModel, key: "uuid" },
    })
  },
  rating: {
    type: Sequelize.INTEGER
  },
  dropbaseApi: { type: Sequelize.STRING },
});

module.exports = Thread;
