const dotenv = require("dotenv");
dotenv.config();

const express = require("express");

const userRouter = require("./routes/user.routes");
const captainRouter = require("./routes/captain.route");
const cookieParser = require("cookie-parser");

const connectToDB = require("./db/db.config");
connectToDB();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use("/user", userRouter);
app.use("/captain", captainRouter);

app.get("/", (req, res) => {
  res.send("Hello");
});

module.exports = app;
