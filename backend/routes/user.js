const express = require("express");
const router = express.Router();

const { signup, login } = require("../controllers/userController");

router.route("/add-user").post(signup);
router.route("/login-user").post(login);

module.exports = router;
