const express = require("express");
const app = express();

require("dotenv").config();
const cookieParser = require("cookie-parser");
const cors = require("cors");

// regular middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// cors filter middleware
const corsOptions = {
  origin: "https://voosh-assignment-a5up.onrender.com",
  credentials: true,
};
app.use(cors(corsOptions));

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
