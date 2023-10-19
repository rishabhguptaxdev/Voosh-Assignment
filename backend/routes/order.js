const express = require("express");
const router = express.Router();

const {
  createOrder,
  getLoggedInUserOrder,
} = require("../controllers/orderController");
const { isLoggedIn } = require("../middlewares/user");

router.route("/addorder").post(isLoggedIn, createOrder);
router.route("/getorder").get(isLoggedIn, getLoggedInUserOrder);

module.exports = router;
