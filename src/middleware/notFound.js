/**
 * Title: 404 Not Found Middleware
 * Description:
 * Author: Samin Yasar
 * Date: 19/August/2023
 */

/**
 *
 * @param {import("express").Request} _req
 * @param {import("express").Response} _res
 * @param {import("express").NextFunction} next
 */
const notFoundMiddleware = (_req, _res, next) => {
    next({
        status: 404,
        message: "Not Found.",
    });
};

// Export module
module.exports = notFoundMiddleware;
