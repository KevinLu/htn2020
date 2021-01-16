var Sequelize = require("sequelize-cockroachdb");
var fs = require("fs");

// Connect to CockroachDB through Sequelize.
const sequelize = new Sequelize(
  "nice-puma-270.defaultdb",
  "kevin",
  "K4OJov8KbV3clDKY",
  {
    host: "free-tier.gcp-us-central1.cockroachlabs.cloud",
    dialect: "postgres",
    port: 26257,
    logging: false,
    dialectOptions: {
      ssl: {
        ca: fs.readFileSync("C:/cc-ca.crt.txt").toString(),
      },
    },
  }
);

sequelize
  .authenticate()
  .then(() => {
    console.log("Connection has been established successfully.");
  })
  .catch((err) => {
    console.error("Unable to connect to the database:", err);
  });

module.exports = sequelize;
