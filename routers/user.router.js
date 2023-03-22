const express = require(`express`);
const { signUp, login, getMe } = require("../controllers/User.controller");
const verifyToken = require("../middlewires/verifyToken");
const router = express.Router();


router.route(`/me`).get( verifyToken ,getMe);

router.route(`/register`).post(signUp);
router.route(`/login`).post(login);


module.exports = router;