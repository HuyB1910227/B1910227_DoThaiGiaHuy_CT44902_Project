const express = require("express");
const categories = require("../controllers/category.controller");
const router = express.Router();
const checkAdminRole = require('../middlewares/checkAdminRole');
const verify = require("../middlewares/auth.middleware");
router.route("/")
    .get(categories.findAll)
    .post(verify, checkAdminRole, categories.create)
    // .delete(categories.deleteAll);

router.route("/:id")
    .get(categories.findOne)
    .put(verify,checkAdminRole, categories.update)
    .delete(verify,checkAdminRole, categories.delete);

module.exports = router;
