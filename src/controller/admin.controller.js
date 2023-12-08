/**
 * Title: Admin controller
 * Description:
 * Author: Samin Yasar
 * Date: 07/December/2023
 */

// Dependency
const adminService = require("../service/admin.service");
const {
    validateFullName,
    validateEmail,
    validatePassword,
    responseSender,
} = require("../util/script");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv").config(__dirname);

// Module scaffolding
const adminController = {};

/**
 * Register the admin
 *
 * @param {import("express").Request} req
 * @param {import("express").Response} res
 */
adminController.register = async (req, res) => {
    try {
        let error = "";

        const fullName =
            typeof req.body.fullName === "string" &&
            validateFullName(req.body.fullName.toString().trim()) === true
                ? req.body.fullName.toString().trim()
                : null;
        const email =
            typeof req.body.email === "string" &&
            validateEmail(req.body.email.toString().trim())
                ? req.body.email.toString().trim()
                : null;

        const password =
            typeof req.body.password === "string" &&
            validatePassword(req.body.password.toString().trim())
                ? req.body.password.toString().trim()
                : null;

        if (!fullName) {
            error = "Please provide a valid full name.";
        } else if (!email) {
            error = "Please provide a valid email address.";
        } else if (!password) {
            error =
                "Password must be atleast 8 characters long and must include a number and a special character.";
        }

        if (!fullName || !email || !password || error.length > 0) {
            responseSender(res, 400, {
                message:
                    error.length > 0
                        ? error
                        : "Your request is not valid. Please make the request with all the required value accurately.",
            });
        } else {
            const isAdminExist = await adminService.isAdminExist();

            if (isAdminExist === "true") {
                responseSender(res, 403, {
                    message:
                        "An admin already exist in the system. Please login.",
                });
            } else {
                await adminService.registerAdmin(fullName, email, password);
                const token = jwt.sign(
                    { fullName, email },
                    process.env.JWT_KEY,
                    {
                        expiresIn: "1d",
                    }
                );

                responseSender(res, 201, {
                    message: "Registration Successfull",
                    admin: {
                        fullName,
                        email,
                    },
                    token,
                });
            }
        }
    } catch (err) {
        console.log(err.message);
    }
};

/**
 * Login the admin
 *
 * @param {import("express").Request} req
 * @param {import("express").Response} res
 */
adminController.login = async (req, res) => {
    try {
        let error = "";

        const email =
            typeof req.body.email === "string" &&
            validateEmail(req.body.email.toString().trim())
                ? req.body.email.toString().trim()
                : null;

        const password =
            typeof req.body.password === "string" &&
            req.body.password.toString().trim()
                ? req.body.password.toString().trim()
                : null;

        if (!email) {
            error = "Please provide a valid email address.";
        } else if (!password) {
            error = "Please provide a valid password.";
        }
        if (!email || !password || error.length > 0) {
            responseSender(res, 400, {
                message:
                    error.length > 0
                        ? error
                        : "Your request is not valid. Please make the request with all the required value accurately.",
            });
        } else {
            const admin = await adminService.loginAdmin(email, password);

            console.log(admin);

            if (admin.id) {
                const token = jwt.sign(
                    {
                        fullName: admin.fullName,
                        email: admin.email,
                    },
                    process.env.JWT_KEY,
                    {
                        expiresIn: "1d",
                    }
                );
                responseSender(res, 200, {
                    message: "Login Successfull.",
                    admin: {
                        fullName: admin.fullName,
                        email: admin.email,
                    },
                    token,
                });
            } else {
                responseSender(res, 400, {
                    message: "Unauthenticated",
                });
            }
        }
    } catch (err) {
        console.log(err.message);
    }
};

/**
 * Update the information of the admin
 *
 * @param {import("express").Request} req
 * @param {import("express").Response} res
 */
adminController.updateAdmin = async (req, res) => {
    try {
        let error = "";
        const adminToken =
            typeof req.headers.authorization === "string"
                ? req.headers.authorization.toString().trim().split(" ")[1]
                : null;

        if (!adminToken) {
            error = "Please provide the authorization token.";
        }

        if (!adminToken || error.length > 0) {
            responseSender(res, 401, {
                message:
                    error.length > 0
                        ? error
                        : "Authorization Error. Please provide the authorization token.",
            });
        } else {
            const adminObj = jwt.verify(adminToken, process.env.JWT_KEY);

            const fullName =
                typeof req.body.fullName === "string" &&
                req.body.fullName.toString().trim()
                    ? req.body.fullName.toString().trim()
                    : null;

            const currentPassword =
                typeof req.body.currentPassword === "string" &&
                req.body.currentPassword.toString().trim()
                    ? req.body.currentPassword.toString().trim()
                    : null;

            const newPassword =
                typeof req.body.newPassword === "string" &&
                req.body.newPassword.toString().trim()
                    ? req.body.newPassword.toString().trim()
                    : null;

            if (!fullName) {
                error = "Please provide a valid full name.";
            } else if (!currentPassword) {
                error =
                    "Please provide the current password to change the password.";
            } else if (!newPassword) {
                error = "Please provide the new password.";
            }

            if (
                !fullName ||
                !newPassword ||
                !currentPassword ||
                error.length > 0
            ) {
                responseSender(res, 400, {
                    message:
                        error.length > 0
                            ? error
                            : "Your request is not valid. Please make the request with all the required value accurately.",
                });
            } else {
                const admin = await adminService.loginAdmin(
                    adminObj.email,
                    currentPassword
                );

                if (admin.id) {
                    const updateAdminResult = await adminService.updateAdmin(
                        adminObj.email,
                        fullName,
                        newPassword
                    );

                    if (updateAdminResult.length === 1) {
                        responseSender(res, 201, {
                            message:
                                "Successfully updated the admin information.",
                        });
                    } else {
                        responseSender(res, 500, {
                            message: "Internal server side error occured.",
                        });
                    }
                } else {
                    responseSender(res, 400, {
                        message: "Unauthenticated.",
                    });
                }
            }
        }
    } catch (err) {
        console.log(err.message);

        if (err instanceof jwt.JsonWebTokenError) {
            responseSender(res, 401, {
                message: "Unauthorized.",
            });
        }
    }
};

// Export the module
module.exports = adminController;
