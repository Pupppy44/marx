const fs = require('fs');
const path = require('path');

// Gets all routes from the routes directory
function getRoutes() {
    var rootsDir = __dirname;
    var routes = [];

    fs.readdirSync(rootsDir).forEach(file => {
        if (file === 'routes.js') {
            return; // Skip routes.js
        }

        if (file.endsWith('.js')) {
            var route = require(path.join(rootsDir, file));
            routes.push(route);
        }
    });

    return routes;
}

module.exports = {
    getRoutes: getRoutes
}