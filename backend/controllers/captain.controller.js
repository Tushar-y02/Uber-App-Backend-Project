const captainModel = require("../models/captain.model");
const captainService = require("../services/captain.service");
const { validationResult } = require("express-validator");
const tokenModel = require("../models/token.model");

module.exports.captainRegister = async (req, res) => {
  const error = validationResult(req);
  if (!error.isEmpty()) {
    return res.status(400).json({
      message: "All feild are required",
      error: error.array(),
    });
  }
  const { fullname, email, password, vehical, vehicalType } = req.body;

  const hashedPassword = await captainModel.hashPassword(password);

  // to unwrap the captain we need to use await
  const captain = await captainService.createCaptain({
    firstname: fullname.firstname,
    lastname: fullname.lastname,
    email,
    password: hashedPassword,
    color: vehical.color,
    plate: vehical.plate,
    capacity: vehical.capacity,
    vehicalType,
  });

  const token = captain.generateAuthToken();

  res.cookie("token", token);

  res.status(200).json({
    message: "Captain Register Sucessfully",
    token: token,
    captain: captain,
  });
};

module.exports.captainLogin = async (req, res) => {
  const error = validationResult(req);

  if (!error.isEmpty()) {
    return res.status(400).json({
      error: error.array(),
    });
  }

  const { email, password } = req.body;

  const captain = await captainModel.findOne({ email }).select("+password");

  console.log(captain);

  if (!captain) {
    return res.status(400).json({ message: "User not found" });
  }

  const isMatch = await captain.comparePassword(password);

  console.log(isMatch);

  if (!isMatch) {
    return res.status(400).json({ message: "incorrect password" });
  }

  const token = captain.generateAuthToken();

  res.cookie("token", token);

  res.json({
    token,
    captain,
  });
};

module.exports.captainProfile = (req, res) => {
  res.status(200).json(req.captain);
};

module.exports.captainLogout = async (req, res) => {
  res.clearCookie("token");
  const token = req.cookies?.token || req.headers.authorization?.split(" ")[1];

  await tokenModel.create({ token: token });

  res.status(200).json({
    message: "Captain Log Out",
  });
};
