const BigPromise = require("../middlewares/bigPromise");
const Order = require("../models/order");

exports.createOrder = BigPromise(async (req, res) => {
  const { subTotal, phone } = req.body;

  const order = await Order.create({
    subTotal,
    phone,
    user: req.user._id,
  });

  res.status(201).json({
    success: true,
    order,
  });
});

exports.getLoggedInUserOrder = BigPromise(async (req, res, next) => {
  const order = await Order.find({ user: req.user._id });

  if (!order) {
    return next(new CustomError("No orders found for this user", 401));
  }

  res.status(200).json({
    success: true,
    order,
  });
});
