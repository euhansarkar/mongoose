const Product = require(`../models/Product.model`);

module.exports.getProductsServices = async () => {
  const products = await Product.find({});
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

const updatedProduct = await Product.updateOne({_id: productId}, {$inc: data})

  return updatedProduct;
};
