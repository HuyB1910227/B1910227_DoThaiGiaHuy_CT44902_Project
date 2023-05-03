const { ObjectId } = require("mongodb");
const bcrypt = require('bcrypt');

class UserService {
    constructor(client) {
        this.User = client.db().collection('users');
    }

    async extractUserData(payload) {
        const hashedPass = await bcrypt.hash(payload.password, 10);
        const user = {
            fullname: payload.fullname,
            email: payload.email,
            phone: payload.phone,
            address: payload.address,
            username: payload.username,
            password: hashedPass,
            roles: payload.roles,
            accessToken: "",
            cart: payload.cart ? payload.cart : { items: [], total: 0},
        };
        return user;
    }
        

    async create(payload) {
        const user = await this.extractUserData(payload);
        const result = await this.User.insertOne(user);
        return result;
    }

    async findByName(username) {
        return await this.User.findOne({ username: username});
    }

    async findByEmail(email) {
        return await this.User.findOne({email});
    }

    async updateToken(userId, token) {
        const result = await this.User.updateOne(
            { _id: new ObjectId(userId)},
            { $set: {accessToken: token} }
        );
        return result.modifiedCount > 0;
    }

    async updateCart(userId, cart) {
        const result = await this.User.updateOne(
            { _id: new ObjectId(userId)},
            { $set: {cart: cart} },
            { returnDocument: "after"}
        );
        return result.value;
        
    }

    async findById(userId) {
        return await this.User.findOne({ _id: new ObjectId(userId) });
    }

    async find(filter) {
        const cursor = await this.User.find(filter);
        return await cursor.toArray();
    }

}

module.exports = UserService;