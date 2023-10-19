const express = require("express");
const router = express.Router();

const { signup, login, logout } = require("../controllers/userController");

router.route("/add-user").post(signup);
router.route("/login-user").post(login);
router.route("/logout").get(logout);

module.exports = router;
