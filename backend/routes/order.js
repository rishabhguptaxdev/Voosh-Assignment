const express = require("express");
const router = express.Router();

const {
  createOrder,
  getLoggedInUserOrder,
} = require("../controllers/orderController");
const { isLoggedIn } = require("../middlewares/user");

router.route("/add-order").post(isLoggedIn, createOrder);
router.route("/get-order").get(isLoggedIn, getLoggedInUserOrder);

module.exports = router;
