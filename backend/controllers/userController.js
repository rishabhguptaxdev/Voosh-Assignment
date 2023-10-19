const User = require("../models/user");
const BigPromise = require("../middlewares/bigPromise");
const cookieToken = require("../utils/cookieToken");
const CustomError = require("../utils/customErrors");

exports.signup = BigPromise(async (req, res, next) => {
  const { name, phone, password } = req.body;

  if (!name || !phone || !password) {
    return next(new CustomError("Name, phone, password are required", 400));
  }

  if (await User.findOne({ phone })) {
    res.status(401).send("User already exists");
  }

  const user = await User.create({
    name,
    phone,
    password,
  });

  cookieToken(user, res);
});
