/**
 * Title: User Model
 * Description:
 * Author: Samin Yasar
 * Date: 19/August/2023
 */

// Dependency
const db = require("../db/db");
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

// (async () => {
//     await db.sequelize.sync({ force: true });
// })();

// Exports the module
module.exports = User;
