const express = require("express");

const shopController = require("../controllers/shop");
const adminController = require("../controllers/admin");

const router = express.Router();

// router.get("/shop", shopController.getShop);
router.get("/home", shopController.getHomePage);
router.get("/signup", shopController.getSignupPage);
router.post("/signup", shopController.postSignupPage);
router.get("/login", shopController.getLoginPage);
router.post("/login", shopController.postLoginPage);
router.get("/about", shopController.getAboutPage);
module.exports = router;
