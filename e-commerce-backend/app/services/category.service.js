const { ObjectId } = require("mongodb");

class CategoryService {
    constructor(client) {
        this.Category = client.db().collection("categories");
        // this.Product = client.db().collection("products");
    }

    extractCategoryData(payload) {
        const category = {
            name: payload.name,
            image: payload.image? payload.image : "default.png",
        };

        Object.keys(category).forEach(
            (key) => category[key] === undefined && delete category[key]
        );
        console.log(category);
        return category;
    }

    async create(payload) {
        const category = this.extractCategoryData(payload);
        // console.log(category);
        const result = await this.Category.insertOne(
            category,
        );
        return result;
    }

    async find(filter) {
        const cursor = await this.Category.find(filter);
        return await cursor.toArray();
    }

    async findByName(name) {
        return await this.find({
            name: {$regex: new RegExp(name), $options: "i"},
        });
    }

    async findById(id) {
        // return await this.Category.findOne({
        //     _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
        // });
        const category = await this.Category.aggregate([
            {
              $match: { _id: ObjectId.isValid(id) ? new ObjectId(id) : null }
            },
            {
              $lookup: {
                from: "products",
                localField: "_id",
                foreignField: "categoryId",
                as: "products"
              }
            }
          ]);
        // for await (const doc of category) {
        //     console.log(doc);
        // }
        // category
        const doc = await category.toArray();
        // console.log(doc);
        return doc[0];
    }

    async update(id, payload) {
        const filter = {
            _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
        };
        const update = this.extractCategoryData(payload);
        const result = await this.Category.findOneAndUpdate(
            filter,
            { $set: update },
            { returnDocument: "after"}
        );
        return result.value;
    }

    async delete(id) {
        const result = await this.Category.findOneAndDelete({
            _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
        });
        return result.value;
    }

    // async deleteAll() {
    //     const result = await this.Category.deleteMany({});
    //     return result.deletedCount;
    // }
    
}

module.exports = CategoryService;