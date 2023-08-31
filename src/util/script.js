/**
 * Title: Utility functions
 * Description:
 * Author: Samin Yasar
 * Date: 19/August/2023
 */

// Module scaffolding
const util = {};

/**
 *
 * @param {import("express").Response} res
 * @param {Number} status
 * @param {Object} payload
 */
util.responseSender = (res, status, payload) => {
    const statusCode = typeof status === "number" ? status : 500;
    const payloadObj =
        typeof payload === "object"
            ? {
                  status: statusCode,
                  ...payload,
              }
            : {
                  status: 500,
                  message: "Error occures in the server side.",
              };
    res.setHeader("Content-Type", "application/json");
    res.status(statusCode).json(payloadObj);
};

/**
 *
 * @param {Number} status
 * @param {String} message
 * @returns {Error} - Returns the customized error object
 */
util.createError = (status, message) => {
    const error = new Error(
        typeof message === "string"
            ? message
            : "Error occures in the server side."
    );
    error.status = typeof status === "number" ? status : 500;
    return error;
};

/**
 *
 * @param {String} fullName
 * @returns {Boolean}
 */
util.validateFullName = (fullName) => {
    try {
        const pattern = new RegExp("^[a-zA-Z ]+$", "g");
        return pattern.test(fullName);
    } catch (err) {
        console.log(err.message);
        return false;
    }
};

/**
 *
 * @param {String} email
 * @returns {Boolean}
 */
util.validateEmail = (email) => {
    try {
        const pattern = new RegExp(
            "^\\w+([.-]?\\w+)*@\\w+([.-]?\\w+)*(\\.\\w{2,3})+$",
            "g"
        );
        return pattern.test(email);
    } catch (err) {
        console.log(err.message);
        return false;
    }
};

/**
 *
 * @param {String} password
 * @returns {Boolean}
 */
util.validatePassword = (password) => {
    try {
        const pattern = new RegExp(
            "^([a-zA-Z0-9!@#$%^&*]{8,16})([0-9]{1,8})",
            "g"
        );
        return pattern.test(password);
    } catch (err) {
        console.log(err.message);
        return false;
    }
};

/**
 *
 * @param {String} phone
 * @returns {Boolean}
 */
util.validatePhone = (phone) => {
    try {
        const pattern = new RegExp("^\\+(?:[0-9]●?){6,14}[0-9]$", "g");
        return pattern.test(phone);
    } catch (err) {
        console.log(err.message);
        return false;
    }
};

// Export the module
module.exports = util;
