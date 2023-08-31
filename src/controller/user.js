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

const userService = require("../service/user");

// Module scaffolding
const userController = {};

/**
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

        console.log({
            fullName,
            email,
            password,
            companyName,
            phone,
            tosAgreement,
        });

        if (!fullName) {
            error = "Please enter a valid full name.";
        } else if (!email) {
            error = "Please enter a valid email address.";
        } else if (!password) {
            error =
                "Password must be atleast 8 characters long and must include a number and a special character.";
        } else if (!companyName) {
            error = "Please enter a valid company name.";
        } else if (!phone) {
            error = "Please enter a valid phone number.";
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
                message: error
                    ? error
                    : "Your request is not valid. Please make the request with all the required value accurately.",
            });
        } else {
            // TODO: lookup in the database that this email is not already registered
            // TODO: Register the user

            const isEmailUnique = userService.isEmailUnique(email);

            console.log(isEmailUnique);

            if (isEmailUnique === "false") {
                responseSender(res, 400, {
                    message: "Your given email is already exist. please login.",
                });
            } else {
                userService.registerUser(
                    fullName,
                    email,
                    password,
                    companyName,
                    phone,
                    tosAgreement
                );
                responseSender(res, 201, {
                    message: "Registration Successfull",
                    token: "2640c0085c1252d52b623d39d7e72ef3",
                });
            }
        }
    } catch (err) {
        console.log(err.message);
    }
};

// Export the module
module.exports = userController;
