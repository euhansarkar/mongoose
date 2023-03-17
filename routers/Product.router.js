const express = require(`express`);
const router = express.Router();
const { getProducts, postProducts, updateProduct } = require("../controllers/Product.controller");

router.route(`/`)
.get(getProducts)
.post(postProducts);


router.route(`/:id`).patch(updateProduct)

module.exports = router;