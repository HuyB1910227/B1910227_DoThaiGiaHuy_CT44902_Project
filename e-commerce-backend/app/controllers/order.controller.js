const MongoDB = require("../utils/mongodb.util");
const ApiError = require("../api-error");
const OrderService = require("../services/order.service");
const UserService = require("../services/user.service");
const ProductService = require("../services/product.service");
const { ObjectId } = require("mongodb");
exports.create = async (req, res, next) => {
    console.log(req.body);
    // userId: new ObjectId(payload.userId),
    //         name: payload.name, send
    //         email: payload.email, send
    //         phone: payload.phone, send
    //         message: payload.message, send
    //         total: payload.total, fromDataB
    //         status: payload.status, send
    //         payment: payload.payment, send 
    //         details: payload.details fromDataB
    if (!req.body?.email || !req.body?.phone || !req.body?.name || !req.body?.payment) {
        return next(new ApiError(400, "Can not add order!"));
    }
    try {
        const userService = new UserService(MongoDB.client);
        const orderServie = new OrderService(MongoDB.client);
        const productService = new ProductService(MongoDB.client)
        const user = await userService.findById(req.user.id);
        const details = [];
        for(const item of user.cart.items) {
            var foundProduct = await productService.findById(item.productId);
            var orderProduct = {
                _id: new ObjectId(foundProduct._id),
                name: foundProduct.name,
                price: parseInt(foundProduct.price),
                quantity: parseInt(item.quantity),
                image: foundProduct.image,
                categoryId: new ObjectId(foundProduct.categoryId),
            }
            // console.log(orderProduct);
            details.push(orderProduct);
            foundProduct.itemsInStock -= item.quantity;

            var doc = await productService.update(foundProduct._id, foundProduct);
            // console.log(doc);
            // console.log("updated product");
        }
        await orderServie.create({...req.body, userId: req.user.id, details: details, total: user.cart.total, status: 0});
        // for(const item of user.cart.items) {
        //     var findProduct = await productService.findById(item.productId);
        //     findProduct.itemsInStock = item.quantity - findProduct.itemsInStock;
        //     await productService.update(findProduct.id, findProduct);
        // }
        user.cart.items = [];
        user.cart.total = 0;
        const updateCart = await userService.updateCart(req.user.id, user.cart);
        return res.send(updateCart);
    } catch (error) {
        return next (
            new ApiError(500, "An error occurred while creating the order")
        );
    }
}


exports.findAll = async (req, res, next) => {
    let documents = [];
    try {
        const orderService = new OrderService(MongoDB.client);
        documents = await orderService.find({});
    } catch (error) {
        return next(
            new ApiError(500, "An error occured while retrieving order")
        );
    }

    return res.send(documents);
};

exports.findPersonalOrder = async (req, res, next) => {
    console.log(req.user.id);
    let documents = [];
    try {
        const orderService = new OrderService(MongoDB.client);
        documents = await orderService.find({userId: new ObjectId(req.user.id)});
        console.log(documents);
    } catch (error) {
        return next(
            new ApiError(500, "An error occured while retrieving order")
        );
    }

    return res.send(documents);
};

// exports.confirm = async (req, res, next) => {
//     if (Object.keys(req.body).length === 0) {
//         return next (new ApiError(400, "Data to update can not be empty"));
//     }
//     console.log(req.body.status);
//     try {
//         const orderService = new OrderService(MongoDB.client);
//         const document = await orderService.update(req.params.id, req.body);
//         if (!document) {
//             return next (new ApiError(404, "order not found"));
//         }
//         return res.send({message: "Confirmed 1 order"});
//     } catch (error) {
//         new ApiError(
//             500,
//             `Error updating contact with id = ${req.params.id}`
//         )
//     }
// }

exports.execute = async (req, res, next) => {
    if (Object.keys(req.body).length === 0) {
        return next (new ApiError(400, "Data to update can not be empty"));
    }
    console.log(req.body.status);
    //confirm
    if (req.body.status == 1) {
        try {
            const orderService = new OrderService(MongoDB.client);
            const document = await orderService.updateStatus(req.params.id, req.body.status);
            if (!document) {
                return next (new ApiError(404, "order not found"));
            }
            return res.send({message: "Executed 1 order"});
        } catch (error) {
            new ApiError(
                500,
                `Error updating order with id = ${req.params.id}`
            )
        }
        //cancel
    } else if (req.body.status == -1) {
        try {
            const orderService = new OrderService(MongoDB.client);
            const productService = new ProductService(MongoDB.client);
            const order = await orderService.findById(req.params.id);
            for(const item of order.details) {
                var foundProduct = await productService.findById(item._id);
                foundProduct.itemsInStock += item.quantity;
                var doc = await productService.update(foundProduct._id, foundProduct);
            }
            const document = await orderService.updateStatus(req.params.id, req.body.status);
            if (!document) {
                return next (new ApiError(404, "order not found"));
            }
            return res.send({message: "Executed 1 order"});
        } catch (error) {
            new ApiError(
                500,
                `Error updating order with id = ${req.params.id}`
            )
        }
    }
    
}


exports.findOne = async (req, res, next) => {
    try {
        const orderService = new OrderService(MongoDB.client);
        const document = await orderService.findById(req.params.id);
        if (!document) {
            return next(new ApiError(404, "Order not found"));
        }
        return res.send(document);
    } catch (error) {
        return next (
            new ApiError(
                500,
                `Error retrieving order with id = ${req.params.id}`
            )
        );
    }
}; 