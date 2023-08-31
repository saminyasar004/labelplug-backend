/**
 * Title: Error Controller
 * Description:
 * Author: Samin Yasar
 * Date: 19/August/2023
 */

// Dependency
const { responseSender } = require("../util/script");

/**
 *
 * @param {import("express").ErrorRequestHandler} err
 * @param {import("express").Request} _req
 * @param {import("express").Response} res
 * @param {import("express").NextFunction} _next
 */
const errorController = (err, _req, res, _next) => {
    try {
        if (err.status) {
            // our customized error
            responseSender(res, err.status, { message: err.message });
        } else {
            // Unknown server side error
            console.log(err.message);
            responseSender(res, 500, {
                message: "Error occures in the server side.",
            });
        }
    } catch (err) {
        console.log(err.message);
        res.status(500).json({
            status: 500,
            message: "Error occures in the server side.",
        });
    }
};

// Export module
module.exports = errorController;
