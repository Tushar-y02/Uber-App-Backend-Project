const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const captainSchema = new mongoose.Schema({
  fullname: {
    firstname: {
      type: String,
      required: true,
      minlength: [3, "minlength must be atleast three chahracter long"],
    },
    lastname: {
      type: String,
    },
  },
  email: {
    type: String,
    required: true,
    unique: true,
    minlength: [6, "email must be atleast 6 character long"],
  },
  password: {
    type: String,
    required: true,
    select: false,
    minlength: [6, "password must be 6 character long"],
  },
  status: {
    type: String,
    enum: ["active", "inactive"],
    default: "inactive",
  },
  vehical: {
    color: {
      type: String,
      required: true,
      minlength: [3, "colour must be three character long"],
    },
    plate: {
      type: String,
      required: true,
      minlength: [3, "Plate must be three character long"],
    },
    capacity: {
      type: Number,
      required: true,
      min: [1, "Capacity must be atleast One"],
    },
  },
  vehicalType: {
    type: String,
    required: true,
    enum: ["car", "auto", "bike"],
  },
});

captainSchema.methods.generateAuthToken = function () {
  const token = jwt.sign({ _id: this._id }, process.env.JWT_SECRET, {
    expiresIn: "24h",
  });
  return token;
};

captainSchema.methods.comparePassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

captainSchema.statics.hashPassword = async function (password) {
  return await bcrypt.hash(password, 10);
};

const captainModel = mongoose.model("captain", captainSchema);

module.exports = captainModel;
