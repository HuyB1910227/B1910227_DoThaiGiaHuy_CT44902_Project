const express = require("express");
const products = require('../controllers/product.controller');
const router = express.Router();
const checkAdminRole = require('../middlewares/checkAdminRole');

router.route("/")
    .post(checkAdminRole, products.create)
    .get(products.findAll);

router.route("/:id")
    .get(products.findOne)
    .put(products.update)
    .delete(checkAdminRole, products.delete);
module.exports = router;