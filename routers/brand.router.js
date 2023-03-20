const express = require(`express`);
const { postBrands, getBrands, updateBrands, deleteBrands } = require("../controllers/Brand.controller");
const router = express.Router();

router.route(`/`)
.post(postBrands)
.get(getBrands);


router.route(`/:id`).patch(updateBrands).delete(deleteBrands);



module.exports = router;