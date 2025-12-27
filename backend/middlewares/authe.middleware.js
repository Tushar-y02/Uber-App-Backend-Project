const userModel = require("../models/user.model");
const jwt = require("jsonwebtoken");
const captainModel = require("../models/captain.model");
const tokenModel = require("../models/token.model");

async function autheUser(req, res, next) {
  // step-1: collect the token
  const token = req.cookies.token || req.headers.authorization?.split(" ")[1];

  //split function --> split(separator)
  // separator: the character (or string) where the split should happen
  // return value: an array of strings

  if (!token) {
    return res.status(401).json({ message: "Token not found" });
  }

  //   step-2: ckeck is if blacklisted Token
  const isBlackListed = await tokenModel.findOne({ token: token });

  if (isBlackListed) {
    return res.status(401).json({ message: "Token is Blacklisted" });
  }

  // step-3: decode the token and find the user
  try {
    const decode = jwt.verify(token, process.env.JWT_SECRET);

    // console.log(decode);

    const user = await userModel.findById(decode._id);
    // console.log(user);

    req.user = user;

    return next();
  } catch (err) {
    console.log("in catch");

    return res.status(401).json({ mesaage: "Unauthorized in catch" });
  }
}

async function authCaptain(req, res, next) {
  const token = req.cookies.token || req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.status(401).json({
      message: "token not found",
    });
  }

  const blackListed = await tokenModel.findOne({ token: token });

  if (blackListed) {
    return res.status(401).json({
      message: "Token is blackListed",
    });
  }
  try {
    const decode = jwt.verify(token, process.env.JWT_SECRET);

    const captain = await captainModel.findById(decode._id);
    req.captain = captain;
    return next();
  } catch (err) {
    return res.status(401).json({
      message: "Unauthorize",
    });
  }
}

module.exports = { autheUser, authCaptain };
