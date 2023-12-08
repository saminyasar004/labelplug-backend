/**
 * Title: Admin service
 * Description:
 * Author: Samin Yasar
 * Date: 07/December/2023
 */

// Dependency
const Admin = require("../model/admin.model");
const bcrypt = require("bcrypt");

// Module scaffolding
const adminService = {};

/**
 * if there have an admin in the DB it returns true with the promise resolve otherwise return false with promise resolve
 *
 * @returns {Promise}
 */
adminService.isAdminExist = () => {
    return new Promise(async (res) => {
        try {
            const existingAdmin = await Admin.findAll();
            if (existingAdmin.length === 0) {
                res("false");
            } else {
                res("true");
            }
        } catch (err) {
            console.log(
                "Erorr occures while lookup in the database for existing admin."
            );
            console.log(err.message);
            res(err.message);
        }
    });
};

/**
 * Register the admin in the database
 *
 * @param {String} fullName - fullname for the admin
 * @param {String} email - email for the admin
 * @param {String} password - password for the admin
 * @returns
 */
adminService.registerAdmin = (fullName, email, password) => {
    return new Promise(async (res) => {
        try {
            const adminObj = {
                fullName,
                email,
                password,
            };

            const admin = await Admin.create({ ...adminObj });
            res(admin);
        } catch (err) {
            console.log("error occures while registering the admin.");
            console.log(err.message);
            res(err.message);
        }
    });
};

/**
 * Login the admin
 *
 * @param {String} email - email of the admin
 * @param {String} password - password of the admin
 * @returns {Promise}
 */
adminService.loginAdmin = (email, password) => {
    return new Promise(async (res) => {
        try {
            const admin = await Admin.findOne({ where: { email: email } }).then(
                async function (admin) {
                    if (!admin) {
                        return null;
                    } else {
                        const isValidate = await admin.validatePassword(
                            password
                        );
                        if (isValidate) {
                            return admin;
                        } else {
                            return null;
                        }
                    }
                }
            );

            if (admin) {
                res(admin);
            } else {
                res("false");
            }
        } catch (err) {
            console.log("Error occures while login the admin.");
            console.log(err.message);
            res(err.message);
        }
    });
};

/**
 * Update the admin information
 *
 * @param {String} email - email of the admin
 * @param {String} fullName - full name of the admin
 * @param {String} newPassword - new password of the admin
 * @returns {Promise}
 */
adminService.updateAdmin = (email, fullName, newPassword) => {
    return new Promise(async (res) => {
        try {
            const admin = await Admin.update(
                {
                    fullName,
                    password: await bcrypt.hash(newPassword, 10),
                },
                { where: { email: email } }
            );

            if (admin.length === 1) {
                // updated successfully
                res(admin);
            } else {
                res("false");
            }
        } catch (err) {
            console.log("Error occures while updating the admin information.");
            console.log(err.message);
            res(err.message);
        }
    });
};

// Export the module
module.exports = adminService;
