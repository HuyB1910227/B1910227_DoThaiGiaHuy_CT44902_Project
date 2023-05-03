const UserService = require('../services/user.service');
const MongoDB = require("../utils/mongodb.util");
const ApiError = require("../api-error");
const { ObjectId } = require("mongodb");
const ProductService = require('../services/product.service');
exports.addToCart = async (req, res, next) => {
    if (!req.body?.productId || !req.body?.quantity) {
        return next(new ApiError(400, "id and quantity can not be empty!"));
    }
    try {
        const userService = new UserService(MongoDB.client);
        // const productService = new ProductService(MongoDB.client);
        const user = await userService.findById(req.user.id);
        const existingItem = user.cart.items.find(
            item => item.productId.toString() === req.body.productId
        );
        if (existingItem) {
            existingItem.quantity += req.body.quantity;
        }
        else {
            user.cart.items.push({
                productId: new ObjectId(req.body.productId),
                quantity: req.body.quantity,
            });
        }
        

        user.cart.total = await updateTotal(user.cart.items);
        const document = await userService.updateCart(req.user.id, user.cart);
        return res.send(document);
    } catch (error) {
        return next (
            new ApiError(500, `An error occurred while creating the cart! ${error}`)
        );
    }
}
//
exports.removeFromCart = async (req, res, next) => {
    if (!req.body?.productId) {
        return next(new ApiError(400, "id and quantity can not be empty!"));
    }
    console.log("yes");
    console.log(req.body);
    try {
        const userService = new UserService(MongoDB.client);
        const user = await userService.findById(req.user.id);
        // const existingItem = user.cart.items.find(
        //     item => item.productId.toString() === req.body.productId
        // );
        // return res.send(existingItem.quantity.toString());
        // if (existingItem.quantity < req.body.quantity) {
        //     return next(new ApiError(400, "Invalid quantity!"));
        // }
        
        // existingItem.quantity -= req.body.quantity;
        
        // if (existingItem.quantity === 0) {
            user.cart.items = user.cart.items.filter(
                item => item.productId.toString() !== req.body.productId
            );
        // }
        // return res.send("helo");
        user.cart.total = await updateTotal(user.cart.items);
        const document = await userService.updateCart(req.user.id, user.cart);
        return res.send(document);
    } catch (error) {
        return next (
            new ApiError(500, `An error occurred while creating the cart! ${error}`)
        );
    }
}

exports.updateCart = async (req, res, next) => {
    if (!req.body?.productId || !req.body?.quantity) {
        return next(new ApiError(400, "id and quantity can not be empty!"));
    }
    try {
        const userService = new UserService(MongoDB.client);
        const user = await userService.findById(req.user.id);
        const existingItem = user.cart.items.find(
            item => item.productId.toString() === req.body.productId
        );
        if (existingItem) {
            existingItem.quantity = req.body.quantity;
        }
        user.cart.total = await updateTotal(user.cart.items);
        const document = await userService.updateCart(req.user.id, user.cart);
        return res.send(document);
    } catch (error) {
        return next (
            new ApiError(500, `An error occurred while creating the cart! ${error}`)
        );
    }
}

// suport
const updateTotal = async (items) => {
    const productService = new ProductService(MongoDB.client);
    const total = await items.reduce(async (t, item) => {
        const product = await productService.findById(item.productId);
        return (await t) + (product.price * item.quantity);
    }, Promise.resolve(0));
    return total;
}

exports.findCart = async (req, res, next) => {
    try {
        console.log(req.user.id);
        const userService = new UserService(MongoDB.client);
        const document = await userService.findById(req.user.id);
        if (!document) {
            return next(new ApiError(404, "User not found"));
        }
        return res.send(document.cart);
    } catch (error) {
        return next (
            new ApiError(
                500,
                `Error retrieving cart with id = ${req.user.id}`
            )
        );
    }
}; 