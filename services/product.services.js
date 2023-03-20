const Product = require(`../models/Product.model`);
const Brand = require(`../models/Brand.model`);

module.exports.getProductsServices = async (filtering, queries) => {
  const products = await Product.find(filtering)
    .skip(queries.skip)
    .limit(queries.limit)
    .select(queries.fields)
    .sort(queries.sortBy);

  const totalProducts = await Product.countDocuments(filtering);
  console.log(totalProducts);

  const pageCount = Math.ceil(totalProducts / queries.limit);

  return { totalProducts, pageCount, products };
};

module.exports.postProductsServices = async (data) => {
  const product = await Product.create(data);
  const { _id: productId, brand } = product;
  const res = await Brand.updateOne({ _id: brand.id }, { $push: { products: productId } });

  console.log(res.nModified);

  return product;
};

module.exports.updateProductServices = async (productId, data) => {
  const updatedProduct = await Product.updateOne(
    { _id: productId },
    { $inc: data }
  );

  return updatedProduct;
};

module.exports.bulkUpdateProductServices = async (data) => {
  // data updating but you can change indivisual values
  const products = [];
  data.ids.forEach((product) =>
    products.push(Product.updateOne({ _id: product.id }, product.data))
  );

  // const result = await Promise.all(products);

  return result;
};

module.exports.bulkDeleteProductServices = async (req, res, next) => {
  const products = await Product.deleteMany({});
  return products;
};
