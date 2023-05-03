const MongoDB = require("../utils/mongodb.util");
const ApiError = require("../api-error");
const CategoryService = require("../services/category.service");
const path = require('path');
const ResizeImage = require("../services/resize-image.service");
exports.create = async (req, res, next) => {
    // console.log(req);
    if (!req.body?.name) {
        return next(new ApiError(400, "Category name can not be empty!"));
    }
    try {
        const categoryService = new CategoryService(MongoDB.client);
        const imagePath = path.join(__dirname, '../../public/images');
        // console.log(__dirname);
        const fileUpload = new ResizeImage(imagePath);
        // const document;
        // if (req.file) {
            console.log('cate img');
            const filename = await fileUpload.save(req.file.path);
            const document = await categoryService.create({...req.body, image: filename? filename : null});
        // }
        // else {
        //     console.log('none cate img');
        //     document = await categoryService.create({...req.body, image: 'default.png'});
        // }
        // const document = await productService.create({...req.body, image: filename});
        // console.log(document);
        return res.send(document);
    } catch (error) {
        return next (
            new ApiError(500, "An error occurred while creating the category")
        );
    }
}

exports.findAll = async (req, res, next) => {
    let documents = [];
    try {
        const categoryService = new CategoryService(MongoDB.client);
        const {name} = req.query;
        if (name) {
            documents = await categoryService.findByName(name);
        } else {
            documents = await categoryService.find({});
        }
            
    } catch (error) {
        return next(
            new ApiError(500, "An error occured while retrieving category!")
        );
    }

    return res.send(documents);
};

exports.findOne = async (req, res, next) => {
    try {
        const categoryService = new CategoryService(MongoDB.client);
        const document = await categoryService.findById(req.params.id);
       
        console.log(document);
        if (!document) {
            return next(new ApiError(404, "Category not found!"));
        }
        return res.send(document);
    } catch (error) {
        return next (
            new ApiError(
                500,
                `Error retrieving category with id = ${req.params.id} !`
            )
        );
    }
}; 

exports.update = async (req, res, next) => {
    if (Object.keys(req.body).length === 0) {
        return next (new ApiError(400, "Data to update can not be empty!"));
    }

    try {
        const categoryService = new CategoryService(MongoDB.client);
        const cate = await categoryService.findById(req.params.id);
        var currentImage = cate.image;
        console.log(currentImage);
        if (req.file != undefined) {
            
            const imagePath = path.join(__dirname, '../../public/images');
            const fileUpload = new ResizeImage(imagePath);
            const filename = await fileUpload.save(req.file.path);
            currentImage = filename;
        }
        console.log(currentImage);
        const document = await categoryService.update(req.params.id, {...req.body, image: currentImage});
        if (!document) {
            return next (new ApiError(404, "Category not found!"));
        }
        return res.send({message: "Category was updated successfully!"});
    } catch (error) {
        return next (
            new ApiError(
                500,
                `Error updating category with id = ${req.params.id} !`
            )
        );
    }
};

exports.delete = async (req, res, next) => {
    try {
        const categoryService = new CategoryService(MongoDB.client);
        const document = await categoryService.delete(req.params.id);
        if (!document) {
            return next(new ApiError(404, "Category not found!"));
        }
        return res.send({message: "Category was deleted successfully"});
    } catch (error) {
        return next (
            new ApiError(
                500,
                `Could not delete category with id = ${req.params.id} !`
            )
        );
    }
};



