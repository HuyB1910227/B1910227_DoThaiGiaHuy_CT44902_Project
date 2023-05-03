const express = require("express");
const orders = require('../controllers/order.controller');
const router = express.Router();
const checkAdminRole = require('../middlewares/checkAdminRole');

// router.route("/add")
    
    // .get(products.findAll);
router.route("/")
    .get(checkAdminRole, orders.findAll)
    .post(orders.create);
router.route("/:id")
    // .get(orders.findOne)
    // .put(orders.confirm)
    .patch(orders.execute)
//     .delete(products.delete);
router.route("/customer")
    .get(orders.findPersonalOrder);
module.exports = router;