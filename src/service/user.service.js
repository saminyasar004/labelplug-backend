/**
 * Title: User Service
 * Description: All types of database operation for the user model
 * Author: Samin Yasar
 * Date: 19/August/2023
 */

// Dependency
const User = require("../model/user.model");
const bcrypt = require("bcrypt");

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
 * @param {String} fullName - fullname for the new user
 * @param {String} email - email for the new user
 * @param {String} password - password for the new user
 * @param {String} companyName - company name for the new user
 * @param {String} phone - phone number for the new user
 * @param {String} tosAgreement - tosAgreement for the new user
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
            res(user);
        } catch (err) {
            console.log("Error occures while registering the user.");
            console.log(err.message);
            res(err.message);
        }
    });
};

/**
 * Login the user
 *
 * @param {String} email - email of the user
 * @param {String} password - password of the user
 * @returns {Promise}
 */
userService.loginUser = (email, password) => {
    return new Promise(async (res) => {
        try {
            const user = await User.findOne({ where: { email: email } }).then(
                async function (user) {
                    if (!user) {
                        return null;
                    } else {
                        const isValidate = await user.validatePassword(
                            password
                        );
                        if (isValidate) {
                            return user;
                        } else {
                            return null;
                        }
                    }
                }
            );

            if (user) {
                res(user);
            } else {
                res("false");
            }
        } catch (err) {
            console.log("Error occures while login the user.");
            console.log(err.message);
            res(err.message);
        }
    });
};

/**
 * Update the user information
 *
 * @param {String} email - email of the user
 * @param {String} fullName - full name of the user
 * @param {String} companyName - company name of the user
 * @param {String} phone - phone number of the user
 * @param {String} newPassword - new password of the user
 * @returns {Promise}
 */
userService.updateUser = (email, fullName, companyName, phone, newPassword) => {
    return new Promise(async (res) => {
        try {
            const user = await User.update(
                {
                    fullName,
                    companyName,
                    phone,
                    password: await bcrypt.hash(newPassword, 10),
                },
                { where: { email: email } }
            );

            if (user.length === 1) {
                // updated successfully
                res(user);
            } else {
                res("false");
            }
        } catch (err) {
            console.log("Error occures while updating the user information.");
            console.log(err.message);
            res(err.message);
        }
    });
};

// Exports the module
module.exports = userService;
