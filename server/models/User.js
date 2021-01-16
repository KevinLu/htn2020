const Sequelize = require('sequelize');

var User = function (sequelize) {
  return sequelize.define("users", {
    id: { type: Sequelize.INTEGER, primaryKey: true },
    username: { type: Sequelize.STRING },
    password: { type: Sequelize.STRING },
  });
};

module.exports = User;
