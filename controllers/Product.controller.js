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
    let filters = { ...req.query };
    const excludeFields = [`page`, `sort`, `limit`];
    excludeFields.forEach((field) => delete filters[field]);

    // { price: { $gt: '1460' } }
    // { price: { gt: '1460' } }

    let filterString = JSON.stringify(filters);
    filterString = filterString.replace(
      /\b(gt|gte|lt|lte)\b/g,
      (match) => `$${match}`
    );

    filters = JSON.parse(filterString);
    console.log(filters);
    const queries = {};
    if (req.query.sort) {
      const sortBy = req.query.sort.replaceAll(`,`, ` `);
      queries.sortBy = sortBy;
    }

    if (req.query.fields) {
      const fields = req.query.fields.split(`,`).join(` `);
      queries.fields = fields;
    }

    if (req.query.page) {
      const { page = 1, limit = 10 } = req.query;
      // 50 products
      // per page 10 products

      // 1st page --> 1 - 10
      // 2nd page --> 11 - 20
      // 3rd page --> 21 - 30 (pageNumber - 1) * perPageProduct স্কিপ
      // 4th page --> 31 - 40
      // 5th page --> 41 - 50

      const skip = ((parseInt(page) - 1) * parseInt(limit));
      queries.skip = skip;
      queries.limit = parseInt(limit);
    }

    const products = await getProductsServices(filters, queries);

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

module.exports.bulkUpdateProduct = async (req, res, next) => {
  try {
    const products = await bulkUpdateProductServices(req.body);

    res.status(200).json({
      status: `success`,
      message: `products successfully updated`,
      data: products,
    });
  } catch (err) {
    res.status(400).json({
      status: `failed`,
      message: `product could'nt updated`,
      error: err.message,
    });
  }
};

module.exports.bulkDeleteProduct = async (req, res, next) => {
  try {
    const result = await bulkDeleteProductServices();

    res.status(200).json({
      status: `success`,
      message: `all products deleted successfully`,
      data: result,
    });
  } catch (err) {
    res.status(400).json({
      status: `failed`,
      message: `products could'nt deleted`,
      error: err.message,
    });
  }
};
