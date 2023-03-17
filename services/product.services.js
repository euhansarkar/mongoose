
const Product = require(`../models/Product.model`)

module.exports.getProductsServices = async() => {
    const products = await Product.find({})
    return products;
}

module.exports.postProductsServices = async(data) => {
    const product = await Product.create(data);
    return product;
}