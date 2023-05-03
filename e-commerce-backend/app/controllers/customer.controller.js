const UserService = require('../services/user.service');
const MongoDB = require("../utils/mongodb.util");
const ApiError = require("../api-error");

exports.findOneCustomer = async (req, res, next) => {
    try {
        const userService = new UserService(MongoDB.client);
        const document = await userService.findById(req.user.id);
        if (!document) {
            return next(new ApiError(404, "Customer not found"));
        }
        return res.send(document);
    } catch (error) {
        return next (
            new ApiError(
                500,
                `Error retrieving customer with id = ${req.params.id}`
            )
        );
    }
}; 

exports.findAllCustomer = async (req, res, next) => {
    let documents = [];
    try {
        const userService = new UserService(MongoDB.client);

        documents = await userService.find({roles: "customer"});
        console.log(documents);
            
    } catch (error) {
        return next(
            new ApiError(500, "An error occured while retrieving customer!")
        );
    }

    return res.send(documents);
};