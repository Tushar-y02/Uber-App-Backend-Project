const userModel = require("../models/user.model");
const { validationResult } = require("express-validator");
const userService = require("../services/user.service");
const blackListTokenModel = require("../models/token.model");

module.exports.userRegister = async (req, res, next) => {
  const error = validationResult(req);

  if (!error.isEmpty()) {
    return res.status(400).json({
      errors: error.array(),
    });
  }

  //   console.log(req.body);

  const { fullname, email, password } = req.body;

  const hashPassworded = await userModel.hashPassword(password);

  const user = await userService.createUser({
    firstname: fullname.firstname,
    lastname: fullname.lastname,
    email,
    password: hashPassworded,
  });

  const token = user.generateAuthToken();

  res.cookie("token", token);

  res.json({ token, user });

  //   return next();
};

module.exports.userLogin = async (req, res) => {
  const error = validationResult(req);

  if (!error.isEmpty()) {
    return res.status(400).json({
      errors: error.array(),
    });
  }

  const { email, password } = req.body;

  const user = await userModel.findOne({ email }).select("+password");

  if (!user) {
    return res.status(401).json({ message: "Invalid email or password" });
  }

  const isMatch = user.comparePassword(password);

  if (!isMatch) {
    return res.status(401).json({ message: "Invalid email or password" });
  }

  const token = user.generateAuthToken();

  res.cookie("token", token);

  res.json({ token, user });
};

module.exports.getUserProfile = async (req, res) => {
  res.status(200).json(req.user);
};

module.exports.userLogOut = async (req, res) => {
  // step-1: clear cookie
  res.clearCookie("token");

  // step-2: store the token and create the token in mongoose
  const token = req.cookies.token || req.headers.authorization?.split(" ")[1];

  await blackListTokenModel.create({ token });

  // step-3: send logout message
  res.status(200).json({ message: "Logged Out" });
};
