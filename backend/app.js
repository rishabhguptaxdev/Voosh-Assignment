const express = require("express");
const app = express();

require("dotenv").config();

// import all routes
const home = require("./routes/home");

// router middleware
app.use("/api/v1", home);

// export app js
module.exports = app;
