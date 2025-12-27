const captainModel = require("../models/captain.model");

module.exports.createCaptain = ({
  firstname,
  lastname,
  email,
  password,
  color,
  plate,
  capacity,
  vehicalType,
}) => {
  if (
    !firstname ||
    !email ||
    !password ||
    !color ||
    !plate ||
    !capacity ||
    !vehicalType
  ) {
    throw new Error("All feilds are required");
  }
  // create() is async function so it always return promise even if we do not use async/await
  const captain = captainModel.create({
    fullname: {
      firstname,
      lastname,
    },
    email,
    password,
    vehical: {
      color,
      plate,
      capacity,
    },
    vehicalType,
  });
  //captain return object wrapped inside a promise
  return captain;
};
