const Category = require(`../models/Category.model`);

module.exports.postCategoryService = async(data) => {
    const category = await Category.create(data);
    return category;
}

module.exports.getCategoryService = async() => {
    const category = await Category.find({});
    return category;
}