const Sequelize = require("sequelize");
const UserModel = require("./User");

var Thread = function (sequelize) {

  const User = UserModel(sequelize);

  return sequelize.define("threads", {
    id: { type: Sequelize.INTEGER, primaryKey: true },
    user_id: { type: Sequelize.INTEGER, references: {model: User, key: 'id'} },
    title: { type: Sequelize.STRING },
    description: { type: Sequelize.STRING },
    dropbaseDB: { type: Sequelize.STRING },
  });
};

module.exports = Thread;
