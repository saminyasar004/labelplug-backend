/**
 * Title: User Controller
 * Description:
 * Author: Samin Yasar
 * Date: 19/August/2023
 */

const {
    validateFullName,
    validateEmail,
    validatePassword,
    validatePhone,
    responseSender,
} = require("../util/script");

const userService = require("../service/user.service");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv").config(__dirname);

// Module scaffolding
const userController = {};

/**
 * Register a new user
 *
 * @param {import("express").Request} req
 * @param {import("express").Response} res
 */
userController.register = async (req, res) => {
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

        const companyName =
            typeof req.body.companyName === "string"
                ? req.body.companyName.toString().trim()
                : null;

        const phone =
            typeof req.body.phone === "string" &&
            validatePhone(req.body.phone.toString().trim())
                ? req.body.phone.toString().trim()
                : null;

        const tosAgreement = ["true", "false"].includes(
            req.body.tosAgreement.toString().trim()
        )
            ? req.body.tosAgreement.toString().trim() === "true"
                ? "true"
                : "false"
            : null;

        if (!fullName) {
            error = "Please provide a valid full name.";
        } else if (!email) {
            error = "Please provide a valid email address.";
        } else if (!password) {
            error =
                "Password must be atleast 8 characters long and must include a number and a special character.";
        } else if (!companyName) {
            error = "Please provide a valid company name.";
        } else if (!phone) {
            error = "Please provide a valid phone number.";
        } else if (tosAgreement !== "true") {
            error =
                "Please make sure you have agree with our terms of services.";
        }

        if (
            !fullName ||
            !email ||
            !password ||
            !companyName ||
            !phone ||
            tosAgreement !== "true" ||
            error.length > 0
        ) {
            responseSender(res, 400, {
                message:
                    error.length > 0
                        ? error
                        : "Your request is not valid. Please make the request with all the required value accurately.",
            });
        } else {
            const isEmailUnique = await userService.isEmailUnique(email);

            if (isEmailUnique === "false") {
                responseSender(res, 400, {
                    message: "Your given email is already exist. please login.",
                });
            } else {
                await userService.registerUser(
                    fullName,
                    email,
                    password,
                    companyName,
                    phone,
                    tosAgreement
                );
                const token = jwt.sign(
                    { fullName, email, companyName, phone },
                    process.env.JWT_KEY,
                    {
                        expiresIn: "1d",
                    }
                );

                responseSender(res, 201, {
                    message: "Registration Successfull",
                    user: {
                        fullName,
                        email,
                        companyName,
                        phone,
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
 * Login an existing user
 *
 * @param {import("express").Request} req
 * @param {import("express").Response} res
 */
userController.login = async (req, res) => {
    try {
        let error = "";

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

        if (!email) {
            error = "Please provide a valid email address.";
        } else if (!password) {
            error =
                "Password must be atleast 8 characters long and must include a number and a special character.";
        }

        if (!email || !password || error.length > 0) {
            responseSender(res, 400, {
                message:
                    error.length > 0
                        ? error
                        : "Your request is not valid. Please make the request with all the required value accurately.",
            });
        } else {
            const user = await userService.loginUser(email, password);

            if (user.id) {
                const token = jwt.sign(
                    {
                        fullName: user.fullName,
                        email: user.email,
                        companyName: user.companyName,
                        phone: user.phone,
                    },
                    process.env.JWT_KEY,
                    {
                        expiresIn: "1d",
                    }
                );
                responseSender(res, 200, {
                    message: "Login Successfull.",
                    user: {
                        fullName: user.fullName,
                        email: user.email,
                        companyName: user.companyName,
                        phone: user.phone,
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

// Export the module
module.exports = userController;
