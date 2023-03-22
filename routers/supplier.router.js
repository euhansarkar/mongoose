const express = require(`express`);
const { postSuppliers, getSuppliers, updateSuppliers, deleteSuppliers } = require("../controllers/Supplier.controller");
const router = express.Router();

router.route(`/`)
.post(postSuppliers)
.get(getSuppliers);


router.route(`/:id`)
.patch(updateSuppliers)
.delete(deleteSuppliers);



module.exports = router;