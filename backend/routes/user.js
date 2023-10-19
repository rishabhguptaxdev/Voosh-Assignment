const express = require("express");
const router = express.Router();

const { signup } = require("../controllers/userController");

router.route("/add-user").post(signup);

module.exports = router;
