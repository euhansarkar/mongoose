const express = require(`express`);
const { postCategory, getCategory } = require("../controllers/Category.controller");
const router = express.Router();


router.route(`/`)
.post(postCategory)
.get(getCategory);

module.exports = router;