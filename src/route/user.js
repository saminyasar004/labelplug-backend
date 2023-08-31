/**
 * Title: User Routes
 * Description:
 * Author: Samin Yasar
 * Date: 19/August/2023
 */

// Dependency
const express = require("express");
const userController = require("../controller/user");

const userRouter = express.Router();

// Register User
userRouter.post("/register", userController.register);

// Export the module
module.exports = userRouter;
