const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.ObjectId,
    ref: "VooshUser",
    required: true,
  },
  phone: {
    type: String,
    minlength: [10, "length of phone number can not be less than 10."],
    maxlength: [10, "length of phone number can not be greater than 10."],
  },
  subTotal: {
    type: Number,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("VooshOrder", orderSchema);
