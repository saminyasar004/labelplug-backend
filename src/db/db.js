/**
 * Title: Database Configuration
 * Description:
 * Author: Samin Yasar
 * Date: 19/August/2023
 */

// Dependency
const path = require("path");
const { Sequelize } = require("sequelize");
const dotenv = require("dotenv");

dotenv.config(path.resolve(__dirname, "../../"));

// Module scaffolding
const db = {
    config: {
        DB_HOST: process.env.DB_HOST || "",
        DB_NAME: process.env.DB_NAME || "",
        DB_USER: process.env.DB_USER || "",
        DB_PASSWORD: process.env.DB_PASSWORD || "",
        DB_PORT: process.env.DB_PORT || 3306,
    },
};

const sequelize = new Sequelize(
    db.config.DB_NAME,
    db.config.DB_USER,
    db.config.DB_PASSWORD,
    {
        host: db.config.DB_HOST,
        dialect: "mysql",
    }
);

// Exports the module
module.exports = {
    ...db,
    sequelize,
};
