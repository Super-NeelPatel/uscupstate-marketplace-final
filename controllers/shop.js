// THIS PAGE CONTAINS ALL THE FUNCTIONALITY FOR THE PAGES BEFORE LOGGED IN
const session = require("express-session");

const Sequelize = require("sequelize").Sequelize;

const sequelize = require("../util/database");

const User = require("../models/user");

exports.getHomePage = (req, res, next) => {
  res.render("shop/home", {
    pageTitle: "Home",
  });
};

exports.getAboutPage = (req, res, next) => {
  res.render("shop/about", {
    pageTitle: "About us",
  });
};

exports.getSignupPage = (req, res, next) => {
  // console.log(req.query.isInfoMatch);
  res.render("shop/signup", {
    pageTitle: "Sign Up",
    userMsg: "",
  });
};

exports.postSignupPage = (req, res, next) => {
  // HERE WE ARE GOING TO CREATE NEW USER

  // IF USER IS EXISTS IN DB, THEN TELL THEM TO LOG IN, ELSE CREATE NEW ENTRY IN DB
  const userName = req.body.username;
  const userEmail = req.body.email;
  const userPassword = req.body.password;

  //IF USER IS NOT EXIST THEN SIGNUP, OTHERWISE CREATE NEW ONE

  User.findOne({
    where: {
      email: userEmail,
    },
  })
    .then((result) => {
      console.log(result);
      if (!result) {
        User.create({
          name: userName,
          email: userEmail,
          password: userPassword,
        })
          .then((result) => {
            res.render("shop/signup", {
              pageTitle: "Sign Up",
              userMsg: "Account Created! Please log in with credientials.",
            });
          })
          .catch((err) => {
            console.log(er);
          });
      } else {
        res.render("shop/signup", {
          pageTitle: "Sign Up",
          userMsg: "Account exist with email you have entered. Please Log In",
        });
      }
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.getLoginPage = (req, res, next) => {
  res.render("shop/login.ejs", {
    pageTitle: "Log In",
    userMsg: " ",
  });
};

exports.postLoginPage = async (req, res, next) => {
  const userEmail = req.body.email;
  const userPassword = req.body.password;

  User.findOne({
    where: {
      email: userEmail,
      password: userPassword,
    },
  })
    .then((result) => {
      if (!result) {
        res.render("shop/login.ejs", {
          pageTitle: "Login",
          userMsg:
            "Incorrect Credientials. Please check your email and password.",
        });
      } else {
        console.log(result);
        req.user = result;
        // console.log("++++++++", req.user);
        res.redirect("/admin/admin-shop");
      }
    })
    .catch((err) => {
      console.log(err);
    });
};
