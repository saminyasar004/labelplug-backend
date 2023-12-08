/**
 * Title: Admin Router
 * Description:
 * Author: Samin Yasar
 * Date: 07/December/2023
 */

// Dependency
const express = require("express");
const adminController = require("../controller/admin.controller");

// Module scaffolding
const adminRouter = express.Router();

// Register the one and only admin
adminRouter.post("/register", adminController.register);

// Login the admin
adminRouter.post("/login", adminController.login);

// Update the name and password of the admin
adminRouter.put("/", adminController.updateAdmin);

// Export the module
module.exports = adminRouter;
