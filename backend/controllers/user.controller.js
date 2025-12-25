const userModel = require("../models/user.model");
const { validationResult } = require("express-validator");
const userService = require("../services/user.service");

module.exports.userRegister = async (req, res, next) => {
  const error = validationResult(req);

  if (!error.isEmpty()) {
    return res.status(400).json({
      errors: error.array(),
    });
  }

  console.log(req.body);
  const { fullname, email, password } = req.body;

  const hashPassworded = await userModel.hashPassword(password);

  const user = await userService.createUser({
    firstname: fullname.firstname,
    lastname: fullname.lastname,
    email,
    password: hashPassworded,
  });

  const token = user.generateAuthToken();

  res.json({ token, user });

  return next();
};
