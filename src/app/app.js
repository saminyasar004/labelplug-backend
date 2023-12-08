/**
 * Title: App
 * Description:
 * Author: Samin Yasar
 * Date: 19/August/2023
 */

// Dependency
const path = require("path");
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const dotenv = require("dotenv").config(__dirname);
const notFoundMiddleware = require("../middleware/notFound.middleware");
const errorController = require("../controller/error.controller");
const userRouter = require("../route/user.route");
const adminRouter = require("../route/admin.route");

// Express app
const app = express();

// Config
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(morgan("dev"));

// test route
app.get("/health", (_req, res) => {
    res.status(200).json({
        status: 200,
        message: "OK",
    });
});

// Admin route
app.use("/admin", adminRouter);

// User route
app.use("/user", userRouter);

// 404 Not found controller
app.use(notFoundMiddleware);

// Error controller
app.use(errorController);

// Module export
module.exports = app;
