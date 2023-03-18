const Product = require("../models/Product.model");
const {
  getProductsServices,
  postProductsServices,
  updateProductServices,
  bulkUpdateProductServices,
  bulkDeleteProductServices,
} = require("../services/product.services");

module.exports.getProducts = async (req, res, next) => {
  try {
    console.log(req.query);
    const originalObject = {...req.query};
    const excludeFields = [`page`, `sort`, `limit`];
    excludeFields.forEach(field => delete originalObject[field])
    console.log(originalObject);
    const products = await getProductsServices(originalObject);

    res.status(200).json({
      status: `success`,
      message: `data get successful`,
      data: products,
    });
  } catch (err) {
    res.status(400).json({
      status: `failed`,
      message: `cannot get data`,
      error: err.message,
    });
  }
};

module.exports.postProducts = async (req, res, next) => {
  try {
    const result = await postProductsServices(req.body);
    res.status(200).json({
      status: `success`,
      message: `data inserted successful`,
      data: result,
    });
  } catch (err) {
    res.status(400).json({
      status: `failed`,
      message: `data is not inserted`,
      error: err.message,
    });
  }
};

module.exports.updateProduct = async (req, res, next) => {
  try {
    const productId = req.params.id;
    const result = await updateProductServices(productId, req.body);

    res.status(200).json({
      status: `success`,
      message: `product updated`,
      data: result,
    });
  } catch (err) {
    res.status(400).json({
      status: `failed`,
      message: `product could't updated`,
      error: err.message,
    });
  }
};


module.exports.bulkUpdateProduct = async(req, res, next) => {
  try{

    const products = await bulkUpdateProductServices(req.body);
    

    res.status(200).json({
      status: `success`,
      message: `products successfully updated`,
      data: products
    })


  }catch(err){
    res.status(400).json({
      status: `failed`,
      message: `product could'nt updated`,
      error: err.message
    })
  }
}


module.exports.bulkDeleteProduct = async(req, res, next) => {
  try{
    
    const result = await bulkDeleteProductServices();

    res.status(200).json({
      status: `success`,
      message: `all products deleted successfully`,
      data: result
    })
  }catch(err){
    res.status(400).json({
      status: `failed`,
      message: `products could'nt deleted`,
      error: err.message
    })
  }
}