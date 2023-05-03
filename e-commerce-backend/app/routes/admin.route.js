const express = require("express");
const user = require("../controllers/user.controller");

const router = express.Router();


router.route("/login").post(user.adminLogin);
router.route("/logout").post(user.logout);


module.exports = router;
