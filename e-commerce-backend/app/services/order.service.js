const { ObjectId } = require("mongodb");
const bcrypt = require('bcrypt');

class OrderService {
    constructor(client) {
        this.Order= client.db().collection('orders');
    }

    extractOrderData(payload) {
        const order = {
            userId: payload.userId ? new ObjectId(payload.userId) : undefined,
            name: payload.name,
            email: payload.email,
            phone: payload.phone,
            address: payload.address,
            message: payload.message,
            total: payload.total,
            status: payload.status,
            payment: payload.payment,
            details: payload.details,
            
        };
        Object.keys(order).forEach(
            (key) => order[key] === undefined && delete order[key]
        );
        return order;
    }
        

    async create(payload) {
        const order = await this.extractOrderData(payload);
        order.createdAt = new Date();
        order.updatedAt = new Date();
        const result = await this.Order.insertOne(order);
        return result;
    }


    async findByUserId(userId) {
        const cursor = await this.Order.find({ userId: new ObjectId(userId) });
        return await cursor.toArray;
    }

    async findById(id) {
        return await this.Order.findOne({ _id: new ObjectId(id) });
    }

    async find(filter) {
        const cursor = await this.Order.find(filter);
        return await cursor.toArray();
    }
    
    async update(id, payload) {
        const filter = {
            _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
        };
        const update = this.extractOrderData(payload);
        // update.status = 1;
        update.updatedAt = new Date();
        console.log(update);
        const result = await this.Order.findOneAndUpdate(
            filter,
            { $set: update },
            { returnDocument: "after"}
        );
        return result.value;
    }

    async updateStatus(id, status) {
        const filter = {
            _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
        };
        
        // update.updateAt = new Date();
        
        const result = await this.Order.findOneAndUpdate(
            filter,
            { $set: {status: status, updatedAt: new Date()} },
            { returnDocument: "after"}
        );
        return result.value;
    }
    
}

module.exports = OrderService;