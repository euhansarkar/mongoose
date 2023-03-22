const {
  createStocksService,
  getStocksService,
  updateStocksService,
  deleteStocksService,
  getStockByIdService,
} = require("../services/stock.services");

module.exports.createStocks = async (req, res, next) => {
  try {
    const stock = await createStocksService(req.body);

    res.status(200).json({
      status: `success`,
      message: `new stock created`,
      data: stock,
    });
  } catch (err) {
    res.status(400).json({
      status: `failed`,
      message: `new stock created`,
      error: err.message,
    });
  }
};

module.exports.getStocks = async (req, res, next) => {
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



    const stocks = await getStocksService(filters, queries);

    res.status(200).json({
      status: `success`,
      message: `get all stocks data`,
      data: stocks,
    });
  } catch (err) {
    res.status(400).json({
      status: `failed`,
      message: `could't get stockes`,
      error: err.message,
    });
  }
};


module.exports.updateStocks = async (req, res, next) => {
  try {
    const stockId = req.params.id;
    const updatedStock = await updateStocksService(stockId, req.body);

    res.status(200).json({
      status: `success`,
      message: `get all stocks data`,
      data: updatedStock,
    });
  } catch (err) {
    res.status(400).json({
      status: `failed`,
      message: `could't get stockes`,
      error: err.message,
    });
  }
};


module.exports.deleteStocks = async(req, res, next) => {
    try{
        const stock = await deleteStocksService(req.params.id);

        res.status(200).json({
            status: `success`,
            message: `stock successfully deleted`,
            data: stock,
          });
    }
    catch(err){
        res.status(400).json({
            status: `failed`,
            message: `could't get stockes`,
            error: err.message,
          });
    }
}


module.exports.getStocksById = async(req, res, next) => {
    try{
        
        const stock = await getStockByIdService(req.params.id);

        res.status(200).json({
            status: `success`,
            message: `specific stock getting successful`,
            data: stock,
          });
    }
    catch(err){
        res.status(400).json({
            status: `failed`,
            message: `could't get stockes`,
            error: err.message,
          });
    }
}