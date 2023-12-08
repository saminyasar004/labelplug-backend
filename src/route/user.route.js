/**
 * Title: User Routes
 * Description:
 * Author: Samin Yasar
 * Date: 19/August/2023
 */

// Dependency
const express = require("express");
const userController = require("../controller/user.controller");

// Module scaffolding
const userRouter = express.Router();

// Register User
userRouter.post("/register", userController.register);

// Login User
userRouter.post("/login", userController.login);

// Update the user information
userRouter.put("/", userController.updateUser);

// Export the module
module.exports = userRouter;
