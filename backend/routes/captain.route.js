const express = require("express");
const router = express.Router();
const { body } = require("express-validator");
const captainController = require("../controllers/captain.controller");
const auth = require("../middlewares/authe.middleware");

console.log("auth object:", auth);
console.log("authCaptain type:", typeof auth.authCaptain);

router.post(
  "/register",
  [
    body("fullname.firstname")
      .isLength({ min: 3 })
      .withMessage("First name must be atleast three character long"),
    body("fullname.lastname")
      .isLength({ min: 3 })
      .withMessage("last name must be atleast three character long"),
    body("email").isEmail().withMessage("Invalid Email"),
    body("password")
      .isLength({ min: 3 })
      .withMessage("Password must be atleast three character long"),
    body("vehical.color")
      .isLength({ min: 3 })
      .withMessage("color must be atleast three character long"),
    body("vehical.plate")
      .isLength({ min: 3 })
      .withMessage("Plate must be atleast three character long"),
    body("vehical.capacity")
      .isInt({ min: 1 })
      .withMessage("Plate must be atleast 1"),
    body("vehicalType")
      .isIn(["car", "bike", "auto"])
      .withMessage("Invalid Vehical Type"),
  ],
  captainController.captainRegister
);

router.post(
  "/login",
  [
    body("email").isEmail().withMessage("Invalid Email"),
    body("password")
      .isLength({ min: 3 })
      .withMessage("Password must be atleast three character long"),
  ],
  captainController.captainLogin
);

router.get("/profile", auth.authCaptain, captainController.captainProfile);

router.get("/logout", auth.authCaptain, captainController.captainLogout);

module.exports = router;
