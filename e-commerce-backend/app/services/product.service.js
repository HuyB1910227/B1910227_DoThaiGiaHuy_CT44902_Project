const { ObjectId } = require("mongodb");

class ProductService {
    constructor(client) {
        this.Product = client.db().collection("products");
    }

    extractProductData(payload) {
        const product = {
            name: payload.name,
            description: payload.description,
            price: parseInt(payload.price),
            itemsInStock: payload.itemsInStock? parseInt(payload.itemsInStock) : 0,
            image: payload.image? payload.image : "default.png",
            categoryId: payload.categoryId ? new ObjectId(payload.categoryId) : undefined,
            subDescription: payload.subDescription,
        };

        Object.keys(product).forEach(
            (key) => product[key] === undefined && delete product[key]
        );
        // console.log(product);
        return product;
    }

    async create(payload) {
        const product = this.extractProductData(payload);
        product.createAt = new Date();
        product.updateAt = new Date();
        console.log(product);
        const result = await this.Product.insertOne(
            product,
        );
        return result;
    }

    async update(id, payload) {
        const filter = {
            _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
        };
        const update = this.extractProductData(payload);
        update.updateAt = new Date();
        console.log(update);
        const result = await this.Product.findOneAndUpdate(
            filter,
            { $set: update },
            { returnDocument: "after"}
        );
        return result.value;
    }

    async delete(id) {
        const result = await this.Product.findOneAndDelete({
            _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
        });
        return result.value;
    }

    
    async find(filter) {
        const cursor = await this.Product.find(filter);
        return await cursor.toArray();
    }

    async findByName(name) {
        return await this.find({
            name: {$regex: new RegExp(name), $options: "i"},
        });
    }   

    async findById(id) {
        return await this.Product.findOne({
            _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
        });
    }
    
}

module.exports = ProductService;