const multer = require("multer");
const path = require("path");

// All the functionality

const sequelize = require("../util/database");

const Product = require("../models/products");
const CartProduct = require("../models/cartProduct");
const User = require("../models/user");

exports.getAuthorizedPage = (req, res, next) => {
  //   res.json({ msg: "Working" });
  res.render("admin/admin.ejs", {
    pageTitle: "Admin",
    path: "/admin",
  });
};

/// Sell product page
exports.getSellProductPage = (req, res, next) => {
  res.render("admin/sell-your-product", {
    pageTitle: "Your Products",
    path: "/your-products",
  });
};

// Set up Multer for file uploads
const storage = multer.diskStorage({
  destination: path.join(__dirname, "../", "public", "user-images"), // Correctly resolve the destination folder
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // Unique file name
  },
});

const upload = multer({ storage: storage });

// Export the route handler
exports.postSellProductPage = [
  upload.single("image"), // Apply multer middleware here
  (req, res) => {
    try {
      console.log(req.file);

      if (!req.file) {
        return res.status(400).send("No file uploaded.");
      }

      // Construct image URL
      const imageUrl = `/user-images/${req.file.filename}`;
      console.log(imageUrl);

      // Here, you would insert the product into the database
      // Uncomment and adapt this based on your product model

      Product.create({
        title: req.body.title,
        description: req.body.description,
        price: req.body.price,
        image: imageUrl,
      })
        .then(() => {
          // res.json({ ok: "Product created successfully" });
          res.render("admin/sell-your-product");
        })
        .catch((err) => {
          console.log(err);
          res.status(500).send("Error saving product");
        });
    } catch (err) {
      console.log(err);
    }
  },
];

exports.getShop = (req, res, next) => {
  Product.findAll()
    .then((products) => {
      const allProducts = products.map((product) => product.dataValues);
      // console.log(allProducts);
      res.render("admin/admin-shop.ejs", {
        pageTitle: "Shop",
        path: "/shop",
        allProducts: allProducts,
      });
    })
    .catch((err) => console.log(err));
};

// GETTING DETAILS ABOUT PARTICULAR PRODUCT WHEN "MORE" BUTTON IS PRESSED
exports.getMoreDetails = (req, res, next) => {
  const id = req.params.productId;
  console.log(id);

  Product.findByPk(id)
    .then((product) => {
      // console.log(product.dataValues);
      res.render("admin/product", {
        product: product.dataValues,
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.postCartItem = async (req, res, next) => {
  const product = await Product.findByPk(req.body.productId);
  const currentItemToAddIntoCart = product.dataValues;
  // console.log(currentItemToAddIntoCart);

  const { title, description, price, image } = currentItemToAddIntoCart;

  // const cartProduct = CartProduct.create({
  //   title,
  //   description,
  //   price,
  //   image,
  // });

  // await User.create();
  CartProduct.create({
    title,
    description,
    price,
    image,
  })
    .then((result) => {
      res.redirect("admin/cart");
    })
    .catch((err) => console.log(err));
};

exports.getMyCart = async (req, res, next) => {
  let total_price = await CartProduct.sum("price");
  if (total_price === null) {
    return;
  }
  total_price = total_price.toFixed(2); // Returns a string with 2 decimal places

  total_price = +total_price;
  let tax = total_price * 0.06;
  tax = tax.toFixed(2);
  tax = +tax;
  let total = total_price + tax;
  total = total.toFixed(2);
  total = +total;
  CartProduct.findAll()
    .then((result) => {
      // console.log(result);
      res.render("admin/cart", {
        products: result,
        total_price,
        tax,
        total,
      });
      // res.json({
      //   products: result,
      // });
    })
    .catch((err) => console.log(err));
};
