const express = require("express");

const Sequelize = require("sequelize").Sequelize;
const sequelize = require("../util/database");

const Product = require("../models/products");

const adminController = require("../controllers/admin");

const router = express.Router();

router.get("/admin", adminController.getAuthorizedPage);
router.get("/admin/admin-shop", adminController.getShop);
router.get("/admin/sell-your-product", adminController.getSellProductPage);
router.post("/admin/sell-your-product", adminController.postSellProductPage);
router.get(
  "/admin/admin-shop/product/:productId",
  adminController.getMoreDetails
);

router.post("/cart", adminController.postCartItem);
router.get("/admin/cart", adminController.getMyCart);

module.exports = router;
