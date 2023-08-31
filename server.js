/**
 * Title: Server
 * Description:
 * Author: Samin Yasar
 * Date: 19/August/2023
 */

// Dependency
const http = require("http");
const dotenv = require("dotenv");
const app = require("./src/app/app");
const db = require("./src/db/db");

dotenv.config(__dirname);

// Create just the http server from the express app
const server = http.createServer(app);

const PORT = process.env.SERVER_PORT || 4001;

// Connect the database

(async () => {
    try {
        await db.sequelize.authenticate();
        console.log("Database connected successfully.");
    } catch (err) {
        console.log("Error occures while connecting the database.");
        console.log(err.message);
    } finally {
        server.listen(PORT, (err) => {
            if (!err) {
                console.log(`Server is running on port ${PORT}`);
            } else {
                console.log("Error occures while running the server.");
                console.log(err.message);
            }
        });
    }
})();