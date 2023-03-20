const Brand = require(`../models/Brand.model`);

module.exports.postBrandsService = async (data) => {
  const brand = await Brand.create(data);
  return brand;
};

module.exports.getBrandsService = async () => {
  const brands = await Brand.find({}) //.populate(`products`);
  return brands;
};

module.exports.updateBrandsService = async (brandId, data) => {
  const updateBrand = await Brand.updateOne({ _id: brandId }, data);
  return updateBrand;
};

module.exports.deleteBrandsService = async(brandId) => {
  const deletedBrand = await Brand.findOneAndDelete({_id: brandId});
  return deletedBrand;
}
