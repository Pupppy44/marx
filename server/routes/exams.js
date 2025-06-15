const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');

router.use(bodyParser.json());

// Display the login page
router.get("/exams", (req, res) => {
    res.end();
});

router.get("/api/exams", (req, res) => {
    // Logic to get all exams
    res.json([{ id: 1, name: "Exam 1" }, { id: 2, name: "Exam 2" }]);
});

router.get("/api/exams/:id", (req, res) => {
    // Logic to get exam by ID
    res.json({ id: req.params.id, name: "Sample Exam" });
});

module.exports = {
    router: router,
    path: "/"
}