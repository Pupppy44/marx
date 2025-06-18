const mysql = require('mysql2/promise');
const logs = require('./logs.js');

const dbName = process.env.DB_NAME; // Planned names: "marx" and "marx_dev"

async function setup() {
    const conn = await mysql.createConnection({
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        multipleStatements: true
    });

    await conn.query(`CREATE DATABASE IF NOT EXISTS \`${dbName}\``);
    await conn.query(`USE \`${dbName}\``);

    // Setup schema
    // TODO: See how well this schema stands up in the long run
    const schema = `
        CREATE TABLE IF NOT EXISTS exams (
            id INT AUTO_INCREMENT PRIMARY KEY,
            name VARCHAR(255) NOT NULL,
            time_limit INT,
            directions TEXT,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        );
        CREATE TABLE IF NOT EXISTS questions (
            id INT AUTO_INCREMENT PRIMARY KEY,
            exam_id INT NOT NULL,
            name VARCHAR(255) NOT NULL,
            question_text TEXT NOT NULL,
            points DECIMAL(10,2) DEFAULT 1,
            show_points TINYINT(1) DEFAULT 0,
            show_title TINYINT(1) DEFAULT 0,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            FOREIGN KEY (exam_id) REFERENCES exams(id) ON DELETE CASCADE
        );
        CREATE TABLE IF NOT EXISTS choices (
            id INT AUTO_INCREMENT PRIMARY KEY,
            question_id INT NOT NULL,
            label CHAR(1) NOT NULL,
            choice_text TEXT NOT NULL,
            is_correct TINYINT(1) DEFAULT 0,
            FOREIGN KEY (question_id) REFERENCES questions(id) ON DELETE CASCADE
        );
        CREATE TABLE IF NOT EXISTS users (
            id INT AUTO_INCREMENT PRIMARY KEY,
            username VARCHAR(100) NOT NULL UNIQUE,
            password_hash VARCHAR(255) NOT NULL,
            role ENUM('admin','teacher','student') NOT NULL DEFAULT 'student',
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        );
        CREATE TABLE IF NOT EXISTS submissions (
            id INT AUTO_INCREMENT PRIMARY KEY,
            exam_id INT NOT NULL,
            user_id INT NOT NULL,
            score DECIMAL(10,2) DEFAULT 0,
            submitted_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            FOREIGN KEY (exam_id) REFERENCES exams(id) ON DELETE CASCADE,
            FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
        );
        CREATE TABLE IF NOT EXISTS submission_answers (
            id INT AUTO_INCREMENT PRIMARY KEY,
            submission_id INT NOT NULL,
            question_id INT NOT NULL,
            choice_id INT,
            answer_text TEXT,
            FOREIGN KEY (submission_id) REFERENCES submissions(id) ON DELETE CASCADE,
            FOREIGN KEY (question_id) REFERENCES questions(id) ON DELETE CASCADE,
            FOREIGN KEY (choice_id) REFERENCES choices(id) ON DELETE SET NULL
        );
    `;

    await conn.query(schema);
    logs.info('Database schema setup completed');
    return conn;
}

module.exports = {
    setup
};