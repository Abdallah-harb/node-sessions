const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const compression = require("compression");
const morgan = require("morgan");

require("dotenv").config();

module.exports = (app) => {
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));

    app.use(cors());
    app.use(helmet());
    app.use(compression());
    app.use(morgan("dev"));
};