const Product = require(`../models/Product.model`)

module.exports.getProducts = async (req, res, next) => {
  try {
    // find method
    // const products = await Product.find({}, 'name quantity'); // projection
    // const products = await Product.find({}, '-name -quantity -_id'); //projection
    // const products = await Product.find({}).limit(1); // limit
    // const products = await Product.find({}).sort({name: 1}); // sort
    // const products = await Product.find({}).select({name: 1, quantity: 1, unit: 1}); // select

    // where method
    // const products = await Product.where("name")
    //   .equals(/\w/)
    //   .where(`quantity`)
    //   .gt(2).lt(50)
    //   .limit(2).sort({quantity: -1});

    // findById method
    // const products = await Product.findById(`6414469f101705dbe8d3027d`);

    // what is the difference between find and findById ?
    // find দিলে empty array return করে। undefined দিলে null return করে।
   
    const products = await Product.find({});

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
    // we can save or create to insert a data
    console.log(req.body);

    const product = new Product(req.body);
    const result = await product.save();

    // logger method calling
    // result.logger();

    // const result = await Product.create(req.body);

    // instance creation
    // if (product.quantity === 0) {
    //   product.status = `out of stock`;
    // }

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
