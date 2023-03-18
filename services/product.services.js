const Product = require(`../models/Product.model`);

module.exports.getProductsServices = async (query) => {
  const products = await Product.find(query);
  return products;
};

module.exports.postProductsServices = async (data) => {
  const product = await Product.create(data);
  return product;
};

module.exports.updateProductServices = async (productId, data) => {
  // update with updateOne method
  //   const updatedProduct = await Product.updateOne(
  //     { _id: productId },
  //     { $set: data },
  //     {
  //       runValidators: true,
  //     }
  //   );

  //   //update with save() method
  //   const product = await Product.findById(productId);
  //   const result = await product.set(data).save();
  //   return result;

  // we can also use findOneAndUpdate() and findByIdAnsUpdate()

  const updatedProduct = await Product.updateOne(
    { _id: productId },
    { $inc: data }
  );

  return updatedProduct;
};

module.exports.bulkUpdateProductServices = async (data) => {
  // data updating but all value same
  // const result = await Product.updateMany({ _id: data.ids }, data.data, {
  //   runValidators: true,
  // });

  // data updating but you can change indivisual values
  const products = [];
  data.ids.forEach((product) =>
    products.push(Product.updateOne({ _id: product.id }, product.data))
  );


  // const result = await Promise.all(products);

  return result;
};


module.exports.bulkDeleteProductServices = async(req, res, next) => {
  const products = await Product.deleteMany({});
  return products;
}