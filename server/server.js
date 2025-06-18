require("dotenv").config();

const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const routes = require('./routes/routes.js');
const logs = require('./helpers/logs.js');
const db = require('./helpers/db.js');

// Middleware setup
app.use(cors());
app.use(bodyParser.json());

// Routes setup
const allRoutes = routes.getRoutes();
allRoutes.forEach(route => {
    app.use(route.path, route.router);
});

// Main setup
(async () => {
    try {
        // Setup database
        await db.setup();

        // Setup server
        const PORT = process.env.PORT;
        app.listen(PORT, () => {
            logs.info(`Marx Server is running on port ${PORT}`);
        });
    } catch (error) {
        logs.error("Error starting server: " +  error.message);
    }
})();
