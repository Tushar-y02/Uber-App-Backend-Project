const express = require("express");
const router = express.Router();
const { body } = require("express-validator");
const userController = require("../controllers/user.controller");

router.post(
  "/register",
  [
    body("fullname.firstname")
      .isLength({ min: 3 })
      .withMessage("First name must be atleast three character long"),
    body("email").isEmail().withMessage("Invalid Email"),
    body("password")
      .isLength({ min: 3 })
      .withMessage("Password must be atleast three character long"),
  ],
  userController.userRegister
);

router.post(
  "/login",
  [
    body("email").isEmail().withMessage("Invalid Email"),
    body("password")
      .isLength({ min: 3 })
      .withMessage("Password must be atleast three character long"),
  ],
  userController.userLogin
);

module.exports = router;
