const express = require("express");
const app = express();

require("dotenv").config();
const cookieParser = require("cookie-parser");
const cors = require("cors");

// regular middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// cookies middlewares
app.use(cookieParser());

// cors middleware
app.use(
  cors({
    origin: `${process.env.ALLOWED_ORIGIN}`,
    credentials: true,
  })
);

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
