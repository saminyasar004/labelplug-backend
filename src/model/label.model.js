/**
 * Title: Label model
 * Description:
 * Author: Samin Yasar
 * Date: 08/December/2023
 */

// Dependency
const db = require("../db/db");
const { DataTypes } = require("sequelize");

// Module Scaffolding
const Label = db.sequelize.define("Label", {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    width: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    height: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    length: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    weight: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    type: {
        type: DataTypes.ENUM,
        allowNull: false,
        values: ["express", "normal"],
    },
    service: {
        type: DataTypes.ENUM,
        allowNull: false,
        values: ["ups", "usps", "dhl"],
    },
    additionalInsurance: {
        type: DataTypes.INTEGER,
    },
    originalPrice: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    customFee: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    totalFee: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
});

// Export the module
module.exports = Label;
