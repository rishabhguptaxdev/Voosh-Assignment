const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const validator = require("validator");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please provide a name."],
    maxlength: [30, "Name should be max of 30 letters."],
  },
  email: {
    type: String,
    required: [true, "Please provide an email"],
    validate: [validator.isEmail, "Please enter email in correct format"],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "Please provide a password."],
    minlength: [5, "Password should be min of 5 letters."],
    select: false,
  },
  phone: {
    type: String,
    minlength: [10, "length of phone number can not be less than 10."],
    maxlength: [10, "length of phone number can not be greater than 10."],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// encrypt password before saving it -- HOOKS
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  }
  this.password = await bcrypt.hash(this.password, 10);
});

// validate the password with password sent by the user
userSchema.methods.isValidPassword = async function (passwordSentByUser) {
  return await bcrypt.compare(passwordSentByUser, this.password);
};

// create and return jwt token
userSchema.methods.getJwtToken = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRY,
  });
};

module.exports = mongoose.model("VooshUser", userSchema);
