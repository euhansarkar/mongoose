const express = require(`express`);
const router = express.Router();
const { getStocks, createStocks, updateStocks, deleteStocks } = require("../controllers/Stock.controller");

router.route(`/`).get(getStocks).post(createStocks);

router.route(`/:id`).patch(updateStocks).delete(deleteStocks);

// router.route(`/bulk-update`).patch(bulkUpdateProduct);
// router.route(`/bulk-delete`).delete(bulkDeleteProduct);


module.exports = router;
