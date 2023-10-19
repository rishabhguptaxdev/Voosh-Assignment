const express = require("express");
const router = express.Router();

const { createOrder } = require("../controllers/orderController");
const { isLoggedIn } = require("../middlewares/user");

router.route("/add-order").post(isLoggedIn, createOrder);

module.exports = router;
