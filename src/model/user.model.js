/**
 * Title: User Model
 * Description:
 * Author: Samin Yasar
 * Date: 19/August/2023
 */

// Dependency
const db = require("../db/db");
const bcrypt = require("bcrypt");
const { DataTypes } = require("sequelize");

const User = db.sequelize.define("User", {
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

    companyName: {
        type: DataTypes.STRING,
        allowNull: false,
    },

    phone: {
        type: DataTypes.STRING,
        allowNull: false,
    },

    tosAgreement: {
        type: DataTypes.ENUM,
        allowNull: false,
        values: ["true", "false"],
    },
});

// Hash the password before create
User.beforeCreate(async (user, _options) => {
    return bcrypt
        .hash(user.password, 10)
        .then((hash) => {
            user.password = hash;
        })
        .catch((err) => {
            throw new Error(err.message);
        });
});

// Validate the hashed password with the user given password
User.prototype.validatePassword = function (password) {
    return bcrypt.compare(password, this.password);
};

// Exports the module
module.exports = User;
