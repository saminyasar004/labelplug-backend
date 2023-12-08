/**
 * Title: Admin Model
 * Description:
 * Author: Samin Yasar
 * Date: 07/December/2023
 */

// Dependency
const db = require("../db/db");
const bcrypt = require("bcrypt");
const { DataTypes } = require("sequelize");

const Admin = db.sequelize.define("Admin", {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },

    fullName: {
        type: DataTypes.STRING,
        allowNull: false,
    },

    email: {
        type: DataTypes.STRING,
        allowNull: false,
    },

    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
});

// Hash the password before create
Admin.beforeCreate(async (admin, _options) => {
    return bcrypt
        .hash(admin.password, 10)
        .then((hash) => {
            admin.password = hash;
        })
        .catch((err) => {
            throw new Error(err.message);
        });
});

// Validate the hashed password with the user given password
Admin.prototype.validatePassword = function (password) {
    return bcrypt.compare(password, this.password);
};

// Exports the module
module.exports = Admin;
