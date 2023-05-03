const express = require("express");
const products = require('../controllers/product.controller');
const router = express.Router();
const checkAdminRole = require('../middlewares/checkAdminRole');
const verify = require("../middlewares/auth.middleware");

router.route("/")
    .post(verify,checkAdminRole, products.create)
    .get(products.findAll);

router.route("/:id")
    .get(products.findOne)
    .put(verify, products.update)
    .delete(verify, checkAdminRole, products.delete);
module.exports = router;