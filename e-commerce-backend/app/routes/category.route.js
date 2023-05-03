const express = require("express");
const categories = require("../controllers/category.controller");
const router = express.Router();
const checkAdminRole = require('../middlewares/checkAdminRole');
router.route("/")
    .get(categories.findAll)
    .post(checkAdminRole, categories.create)
    // .delete(categories.deleteAll);

router.route("/:id")
    .get(categories.findOne)
    .put(checkAdminRole, categories.update)
    .delete(checkAdminRole, categories.delete);

module.exports = router;
