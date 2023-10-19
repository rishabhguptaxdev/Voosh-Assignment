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
