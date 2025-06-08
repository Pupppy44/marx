const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const routes = require('./routes/routes.js');
const logs = require('./helpers/logs.js');

// Middleware setup
app.use(cors());
app.use(bodyParser.json());

// Routes setup
const allRoutes = routes.getRoutes();
allRoutes.forEach(route => {
    app.use(route.path, route.router);
});

app.listen(3000, () => {
    logs.info("Marx Server is running on port 3000");
});
