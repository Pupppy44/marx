const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const loginApi = require('../apis/login.js');

router.use(bodyParser.json());

// Display the login page
router.get("/login", (req, res) => {
    res.end();
});

router.post("/api/login", (req, res) => {
    return loginApi.login(req.body.username, req.body.password);
});

module.exports = {
    router: router,
    path: "/"
}