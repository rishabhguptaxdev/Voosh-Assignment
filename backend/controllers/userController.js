const User = require("../models/user");
const BigPromise = require("../middlewares/bigPromise");
const cookieToken = require("../utils/cookieToken");
const CustomError = require("../utils/customErrors");

exports.signup = BigPromise(async (req, res, next) => {
  const { name, email, password, loginBy } = req.body;

  if (!name || !email || !password || !loginBy) {
    return next(
      new CustomError("Name, email, password, and loginBy are required", 400)
    );
  }

  let user = await User.findOne({ email });
  console.log(user);
  if (user && loginBy === "google") {
    console.log("logged in via google.");
    cookieToken(user, res);
    return;
  }

  if (user) {
    console.log("user already exists");
    res.status(401).send("User already exists");
    return;
  }

  user = await User.create({
    name,
    email,
    password,
    loginBy,
  });

  console.log(`Sign up via ${loginBy}`);
  cookieToken(user, res);
});

exports.login = BigPromise(async (req, res, next) => {
  const { email, password } = req.body;

  // check if phone or password is missing
  if (!email || !password) {
    return next(new CustomError("Phone and Password both are required", 400));
  }

  // get user from db
  const user = await User.findOne({ email }).select("+password");

  // if user not found in db
  if (!user) {
    return next(new CustomError("Email is not registered", 400));
  }

  // match the password
  const isValidPassword = await user.isValidPassword(password);

  // if password do not match
  if (!isValidPassword) {
    return next(new CustomError("Password is not correct", 400));
  }

  // if everything is fine then generate token
  console.log("logged in via email");
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
