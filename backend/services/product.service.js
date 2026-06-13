const Product = require("../models/Product");

const getAllProducts = async () => {
    return await Product.find();
};

const getProductById = async (id) => {
    return await Product.findById(id);
};

const createProduct = async (productData) => {
    const newProduct = new Product({
        name: productData.name,
        description: productData.description,
        price: productData.price,
        image: productData.image
    });

    return await newProduct.save();
};

const updateProduct = async (id, productData) => {
    return await Product.updateOne(
        { _id: id },
        {
            $set: {
                name: productData.name,
                description: productData.description,
                price: productData.price,
                image: productData.image
            }
        }
    );
};

const deleteProduct = async (id) => {
    return await Product.deleteOne({ _id: id });
};

module.exports = {
    getAllProducts,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct
};