const userModel = require("../models/user.model");
const jwt = require("jsonwebtoken");
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

module.exports = autheUser;
