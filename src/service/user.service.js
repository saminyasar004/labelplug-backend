/**
 * Title: User Service
 * Description: All types of database operation for the user model
 * Author: Samin Yasar
 * Date: 19/August/2023
 */

// Dependency
const db = require("../db/db");
const User = require("../model/User");

// Module scaffolding
const userService = {};

/**
 * Lookup in the database by given email and return if the email is unique or not
 *
 * @param {String} email - The requested email
 * @returns {Promise} - if the email is unique then resolve the promise with true otherwise false
 */
userService.isEmailUnique = (email) => {
    return new Promise(async (res) => {
        try {
            const existingUsers = await User.findAll({
                where: {
                    email: email,
                },
            });
            if (existingUsers.length === 0) {
                res("true");
            } else {
                res("false");
            }
        } catch (err) {
            console.log("Erorr occures while lookup in the database by email.");
            console.log(err.message);
            res(err.message);
        }
    });
};

/**
 * Register a new user into database
 *
 * @param {String} fullName
 * @param {String} email
 * @param {String} password
 * @param {String} companyName
 * @param {String} phone
 * @param {String} tosAgreement
 * @returns {Promise}
 */
userService.registerUser = (
    fullName,
    email,
    password,
    companyName,
    phone,
    tosAgreement
) => {
    return new Promise(async (res) => {
        try {
            const newUserObj = {
                fullName,
                email,
                password,
                companyName,
                phone,
                tosAgreement,
            };

            const user = await User.create({ ...newUserObj });
            console.log(user);
            res(user);
        } catch (err) {
            console.log("Error occures while registering the user.");
            console.log(err.message);
            res(err.message);
        }
    });
};

userService.loginUser = (email, password) => {
    return new Promise(async (res) => {
        try {
            const user = await User.findOne({
                where: {
                    email: email,
                    password: password,
                },
            });
            if (user) {
                res(user);
            } else {
                res("false");
            }
        } catch (err) {
            console.log("Erorr occures while login the user.");
            console.log(err.message);
            res(err.message);
        }
    });
};

// Exports the module
module.exports = userService;
