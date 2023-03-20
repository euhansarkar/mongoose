const { postCategoryService, getCategoryService } = require("../services/category.services");

module.exports.postCategory = async (req, res, next) => {
  try {
    const category = await postCategoryService(req.body);

    res.status(200).json({
      status: `success`,
      message: `category data succesfully posted`,
      data: category,
    });
  } catch (err) {
    res.status(400).json({
      status: `failed`,
      message: `category post req failed`,
      error: err.message,
    });
  }
};

module.exports.getCategory = async (req, res, next) => {
  try {
    const category = await getCategoryService();


    res.status(200).json({
      status: `success`,
      message: `category data succesfully posted`,
      data: category,
    });
  } catch (err) {
    res.status(400).json({
      status: `failed`,
      message: `category post req failed`,
      error: err.message,
    });
  }
};
