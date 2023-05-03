const express = require("express");
const customers = require("../controllers/customer.controller");
const checkAdminRole = require('../middlewares/checkAdminRole');
const router = express.Router();

router.route("/").get(checkAdminRole, customers.findAllCustomer);
router.route("/profile")
    .get(customers.findOneCustomer);

module.exports = router;