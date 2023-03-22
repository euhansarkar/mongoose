const express = require(`express`);
const { signUp, login } = require("../controllers/User.controller");
const router = express.Router();


router.route(`/register`).post(signUp);
router.route(`/login`).post(login);


module.exports = router;