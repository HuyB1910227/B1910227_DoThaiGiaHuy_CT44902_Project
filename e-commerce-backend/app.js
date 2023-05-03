const express = require('express');
const cors = require('cors');
// const multer = require('multer');


const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static('public/images/'));

const categoriesRouter = require('./app/routes/category.route');
const productsRouter = require('./app/routes/product.route');
const ApiError = require("./app/api-error");
const usersRouter = require("./app/routes/user.route");
const cartRouter = require("./app/routes/cart.route");
const verify = require("./app/middlewares/auth.middleware");
const ordersRouter = require('./app/routes/order.route');
const customersRouter = require('./app/routes/customer.route');
const adminRouter = require('./app/routes/admin.route');
const upload = require('./app/middlewares/upload.middleware');
//middle


app.get("/welcome", (_req, res) => {
    res.json({message: "Hi there! welcome to contact book application."});
});
app.use("/api/users", usersRouter);
app.use("/api/admin", adminRouter);
app.use("/api/products", verify, upload.single('image'), productsRouter);
app.use("/api/categories",verify, upload.single('imgCategory'), categoriesRouter);
app.use("/api/cart", verify, cartRouter);
app.use("/api/order", verify, ordersRouter);
app.use("/api/customers", verify, customersRouter);
app.use((req, _res, next) => {
    
    console.log(req.url);
    return next(new ApiError(404, "Resource not found"));
});

app.use((err, _req, res, _next) => {
    return res.status(err.statusCode || 500).json({
        message: err.message || "Internal Server Error",
    });
});
module.exports = app;