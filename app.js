const session = require("express-session");

const path = require("path");
const express = require("express");
const multer = require("multer");
const bodyParser = require("body-parser");
const Sequelize = require("sequelize").Sequelize;
const sequelize = require("./util/database");

//This must be imported in order to allow query to run

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.set("view engine", "ejs");
app.set("views", "views");

app.use(express.static(path.join(__dirname, "uploads")));
app.use(express.static(path.join(__dirname, "public")));

const shopRoutes = require("./routes/shop");
const adminRoutes = require("./routes/admin");
const User = require("./models/user");
const CartProduct = require("./models/cartProduct");

app.use(shopRoutes);
app.use(adminRoutes);

sequelize
  .sync()
  .then((result) => {
    app.listen(3000, () => {
      console.log("Your server is running");
    });
  })
  .catch((err) => console.log(err));
