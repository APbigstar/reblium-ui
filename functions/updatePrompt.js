const express = require("express");
const serverless = require("serverless-http");
const mysql = require('mysql2/promise');

const app = express();
app.use(express.json());  // Ensures the body is parsed as JSON
const router = express.Router();

router.put("/", async (req, res) => {
    const { avatarId, newPrompt } = req.body;

    // Connection setup
    const connection = await mysql.createConnection({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE
    });

    try {
        // SQL to update the prompt
        const updateQuery = 'UPDATE Avatar SET Prompt = ? WHERE id = ?';
        const [result] = await connection.execute(updateQuery, [newPrompt, avatarId]);

        // Checking if the update was successful
        if (result.affectedRows) {
            res.json({ message: 'Prompt updated successfully', status: true });
        } else {
            res.status(404).json({ message: 'Avatar not found', status: false });
        }
    } catch (error) {
        console.error('Error executing database query:', error);
        res.status(500).json({ error: 'Error processing the request', details: error });
    } finally {
        connection.end();
    }
});

app.use(`/.netlify/functions/updatePrompt`, router);
module.exports = app;
module.exports.handler = serverless(app);
