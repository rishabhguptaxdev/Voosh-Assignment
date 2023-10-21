const express = require("express");
const app = express();

require("dotenv").config();
const cookieParser = require("cookie-parser");
const cors = require("cors");

// regular middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// cookies and file middlewares
app.use(cookieParser());

// cors filter middleware
// const corsOptions = {
//   origin: `${process.env.ALLOWED_ORIGIN}`,
//   credentials: true,
// };
// app.use(cors(corsOptions));
app.use(
  cors({
    origin: `${process.env.ALLOWED_ORIGIN}`,
    optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
    credentials: true,
  })
);

app.use(function (req, res, next) {
  res.header("Content-Type", "application/json;charset=UTF-8");
  res.header("Access-Control-Allow-Credentials", true);
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

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
