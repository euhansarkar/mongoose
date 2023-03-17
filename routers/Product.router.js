const express = require(`express`);
const router = express.Router();
const { getProducts, postProducts } = require("../controllers/Product.controller");

router.route(`/`)
.get(getProducts)
.post(postProducts);

module.exports = router;