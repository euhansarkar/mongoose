const Supplier = require(`../models/Supplier.model`);
const Brand = require(`../models/Brand.model`)

module.exports.postSuppliersService = async (data) => {
  const supplier = await Supplier.create(data);
  const { _id: supplierId, brand } = supplier;
  const res = await Brand.updateOne({ _id: brand.id }, { $push: { supplier: supplierId } });

  console.log(res.nModified);

  return Supplier;
};

module.exports.getSuppliersService = async () => {
  const suppliers = await Supplier.find({});
  return suppliers;
};

module.exports.updateSuppliersService = async (supplierId, data) => {
  const updateSupplier = await Supplier.updateOne({ _id: supplierId }, data);
  return updateSupplier;
};

module.exports.deleteSuppliersService = async(supplierId) => {
  const deletedSupplier = await Supplier.findOneAndDelete({_id: supplierId});
  return deletedSupplier;
}
