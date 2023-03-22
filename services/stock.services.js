const Stock = require(`../models/Stock.model`)

module.exports.createStocksService = async(data) => {
    const stocks = await Stock.create(data)
    .skip(queries.skip)
    .limit(queries.limit)
    .select(queries.fields)
    .sort(queries.sortBy);

  const totalStocks = await Stock.countDocuments(filtering);
  console.log(totalStocks);

  const pageCount = Math.ceil(totalStocks / queries.limit);

  return { totalStocks, pageCount, stocks };
}

module.exports.getStocksService = async(filtering, queries) => {
    const stocks = await Stock.find({});
    return stocks;
}

module.exports.updateStocksService = async(stockId, data) => {
    const stock = await Stock.updateOne({_id: stockId}, data );
    return stock;
}

module.exports.deleteStocksService = async(stockId) => {
    const stock = await Stock.deleteOne({_id: stockId});
    return stock;
}

module.exports.getStockByIdService = async(stockId) => {
    const stock = await Stock.findOne({_id: stockId}).populate(`store.id`).populate(`brand.id`).populate(`suppliedBy.id`);
    return stock;
}