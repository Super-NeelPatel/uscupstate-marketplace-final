const sequelize = require("../util/database");

const Sequelize = require("sequelize").Sequelize;

const Product = sequelize.define("product", {
  id: {
    type: Sequelize.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  title: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  description: {
    type: Sequelize.TEXT,
    allowNull: false,
  },
  price: {
    type: Sequelize.DECIMAL(4, 2),
    allowNull: false,
  },
  image: {
    type: Sequelize.STRING,
  },
});

module.exports = Product;
