const {
  signUpService,
  findUserByEmailService,
} = require("../services/user.services");
const bcrypt = require(`bcryptjs`);
const comparePassword = require(`../models/User.model`);
const generateToken = require("../utils/token");
const { model } = require("mongoose");

module.exports.signUp = async (req, res, next) => {
  try {
    const user = await signUpService(req.body);

    res.status(200).json({
      status: `success`,
      message: `user created successfully`,
      data: user,
    });
  } catch (err) {
    res.status(400).json({
      status: `failed`,
      message: `user created failed`,
      error: err.message,
    });
  }
};

module.exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(401).json({
        status: `failed`,
        error: `please provide your credentials`,
      });
    }

    const user = await findUserByEmailService(email);
    console.log(user);

    if (!user) {
      return res.status(401).json({
        status: `failed`,
        error: `no user found. please create a new user`,
      });
    }

    const isPasswordValid = await user.comparePassword(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({
        status: `failed`,
        error: `password is not correct`,
      });
    }

    if (user.status !== `active`) {
      return res.status(401).json({
        status: `failed`,
        error: `your account is not active yet`,
      });
    }

    const token = generateToken(user);
    const {password: pwd, ...info} = user.toObject();

    return res.status(400).json({
      status: `success`,
      message: `successfully logged in`,
      data: { info, token },
    });
  } catch (err) {
    return res.status(400).json({
      status: `failed`,
      message: `user login failed`,
      error: err.message,
    });
  }
};

module.exports.getMe = async(req, res, next) => {
  try {

    const user = await findUserByEmailService(req.user?.email)
    res.status(200).json({
      status: `success`,
      data: user
    })

  } catch (error) {
    res.status(500).json({
      status: `failed`,
      error
    })
  }
}