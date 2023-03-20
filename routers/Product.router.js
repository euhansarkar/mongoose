const express = require(`express`);
const router = express.Router();
const { getProducts, postProducts, updateProduct, bulkUpdateProduct, bulkDeleteProduct, fileUpload } = require("../controllers/Product.controller");
const multer = require(`multer`);
const uploader = require(`../middlewires/uploader`)

// const uploader = multer({dest: `images/`})

router.route(`/`)
.get(getProducts)
.post(postProducts);



router.route(`/file-upload`).post(uploader.array(`image`, 2) ,fileUpload);

router.route(`/bulk-update`).patch(bulkUpdateProduct);

router.route(`/bulk-delete`).delete(bulkDeleteProduct)

router.route(`/:id`).patch(updateProduct)

module.exports = router;