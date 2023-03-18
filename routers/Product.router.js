const express = require(`express`);
const router = express.Router();
const { getProducts, postProducts, updateProduct, bulkUpdateProduct } = require("../controllers/Product.controller");

router.route(`/`)
.get(getProducts)
.post(postProducts);


router.route(`/bulk-update`).patch(bulkUpdateProduct);

router.route(`/:id`).patch(updateProduct)

module.exports = router;