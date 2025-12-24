const dotenv = require("dotenv");
dotenv.config();

const express = require("express");

const connectToDB = require("./db/db.config");
connectToDB();

const app = express();

app.get("/", (req, res) => {
  res.send("Hello");
});

module.exports = app;
