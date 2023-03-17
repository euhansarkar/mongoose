const express = require(`express`);
const { getProducts, postProducts } = require("../controllers/Product.controller");
const router = express.Router();

router.route(`/`)
.get(getProducts)
.post(postProducts);

module.exports = router;