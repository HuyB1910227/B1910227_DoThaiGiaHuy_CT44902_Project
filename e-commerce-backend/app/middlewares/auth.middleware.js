const jwt = require('jsonwebtoken');
const MongoDB = require("../utils/mongodb.util");
const UserService = require('../services/user.service');
const JWT_SECRET = require('../config/jwt_secret');
const verifyToken = async (req, _res, next) => {
    const token = req.headers.authorization.split(' ')[1];
    if (!token) {
        return next(new ApiError(401, "Unauthorized!!!!"));
        
    }
    try {
        const tokenDecoded = jwt.verify(token, JWT_SECRET);
        console.log(tokenDecoded);
        req.user = tokenDecoded;

        console.log(req.user);
        const userService = new UserService(MongoDB.client);
        
        const userData = await userService.findById(req.user.id);
        if (userData.roles.includes('admin')){
            req.user.isAdmin = 1;
        }
        console.log(req.user);
        if (userData.accessToken === token) {
            console.log("middleware work find");
            next();
        }
        // next();
    } catch (err) {
        return next(new ApiError(401, "Invalid token!"));
    }
}

module.exports = verifyToken;