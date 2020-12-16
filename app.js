const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const cors = require("cors");

const passportRouter = require("./routes/authRouter.js");

const configPassport = require("./auth/authConfig.js");

const app = express();

app.use(cors()); // Use this after the variable declaration

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "front/build")));

configPassport(app);

app.use("/", passportRouter);

module.exports = app;
