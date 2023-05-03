const express = require("express");
const cart = require("../controllers/cart.controller");

const router = express.Router();

router.route("/add")
        .put(cart.addToCart);
router.route("/remove")
        .put(cart.removeFromCart);
router.route("/update")
        .put(cart.updateCart);
router.route("/").get(cart.findCart);
module.exports = router;
