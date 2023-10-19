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

exports.login = BigPromise(async (req, res, next) => {
  const { phone, password } = req.body;

  // check if phone or password is missing
  if (!phone || !password) {
    return next(new CustomError("Phone and Password both are required", 400));
  }

  // get user from db
  const user = await User.findOne({ phone }).select("+password");

  // if user not found in db
  if (!user) {
    return next(new CustomError("Phone is not registered", 400));
  }

  // match the password
  const isValidPassword = await user.isValidPassword(password);

  // if password do not match
  if (!isValidPassword) {
    return next(new CustomError("Password is not correct", 400));
  }

  // if everything is fine then generate token
  cookieToken(user, res);
});

exports.logout = BigPromise(async (req, res, next) => {
  res.cookie("token", null, {
    expires: new Date(Date.now()),
    httpOnly: true,
  });
  res.status(200).json({
    success: true,
    message: "Logout success",
  });
});
