const Sequelize = require("sequelize").Sequelize;
const sequelize = new Sequelize(
  "upstate_marketplace",
  "your_username",
  "your_password",
  {
    dialect: "mysql",
    host: "localhost",
  }
);

module.exports = sequelize;
