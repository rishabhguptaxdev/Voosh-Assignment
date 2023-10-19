const express = require("express");
const app = express();

require("dotenv").config();
const cookieParser = require("cookie-parser");

// regular middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// cookies and file middlewares
app.use(cookieParser());

// import all routes
const home = require("./routes/home");
const user = require("./routes/user");
const order = require("./routes/order");

// router middleware
app.use("/api/v1", home);
app.use("/api/v1", user);
app.use("/api/v1", order);

// export app js
module.exports = app;
