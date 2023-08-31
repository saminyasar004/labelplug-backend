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
 * @returns {Boolean} - if the email is unique then return true otherwise false
 */
userService.isEmailUnique = async (email) => {
    try {
        const existingUsers = await User.findAll({
            where: {
                email: email,
            },
        });
        return existingUsers.length === 0 ? true : false;
    } catch (err) {
        console.log("Erorr occures while lookup in the database by email.");
        console.log(err.message);
        return false;
    }
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
 * @returns {Boolean}
 */
userService.registerUser = async (
    fullName,
    email,
    password,
    companyName,
    phone,
    tosAgreement
) => {
    try {
        const newUserObj = {
            fullName,
            email,
            password,
            companyName,
            phone,
            tosAgreement,
        };

        await User.create({ ...newUserObj });
        return true;
    } catch (err) {
        console.log("Error occures while registering the user.");
        console.log(err.message);
        return false;
    }
};

// Exports the module
module.exports = userService;
