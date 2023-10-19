const express = require("express");
const router = express.Router();

const { signup, login, logout } = require("../controllers/userController");

router.route("/adduser").post(signup);
router.route("/loginuser").post(login);
router.route("/logout").get(logout);

module.exports = router;
