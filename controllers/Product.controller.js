const { getProductsServices, postProductsServices } = require("../services/product.services");

module.exports.getProducts = async (req, res, next) => {
  try { 
    const products = await getProductsServices();

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
      data: err.message,
    });
  }
};
