const express = require("express");
const serverless = require("serverless-http");
const mysql = require('mysql2/promise');
const bodyParser = require('body-parser');

const app = express();
const router = express.Router();

// Setup bodyParser with a limit for large payloads
app.use(bodyParser.json({ limit: '10mb' }));

// POST endpoint to insert/update blendshape data
router.post("/", async (req, res) => {
    // Database connection setup
    const host = process.env.DB_HOST;
    const user = process.env.DB_USER;
    const password = process.env.DB_PASSWORD;
    const database = process.env.DB_DATABASE;

    const connection = await mysql.createConnection({
        host: host,
        user: user,
        password: password,
        database: database,
    });

    try {
        const { user_info_id, blendshape_json } = req.body;

        // Ensure blendshape_json is an object
        if (typeof blendshape_json !== 'object' || blendshape_json === null) {
            res.status(400).json({ error: 'Invalid blendshape_json format, must be a JSON object' });
            return;
        }

        // Convert the blendshape_json object to a string for storing in the database
        const blendshapeData = JSON.stringify(blendshape_json);

        // Check if a record already exists for the given user_info_id
        const checkQuery = 'SELECT id FROM Blendshape WHERE user_info_id = ?';
        const [rows] = await connection.execute(checkQuery, [user_info_id]);

        let query, params;
        if (rows.length > 0) {
            // Update existing record
            query = 'UPDATE Blendshape SET blendshape_json = ? WHERE user_info_id = ?';
            params = [blendshapeData, user_info_id];
        } else {
            // Insert new record
            query = 'INSERT INTO Blendshape (user_info_id, blendshape_json) VALUES (?, ?)';
            params = [user_info_id, blendshapeData];
        }

        // Execute the query
        await connection.execute(query, params);
        res.json({ message: 'Blendshape data saved successfully' });
    } catch (error) {
        console.error('Error executing database query:', error);
        res.status(500).json({ error: 'Error processing the request', details: error });
    } finally {
        connection.end();
    }
});

app.use(`/.netlify/functions/postBlendshape`, router);

module.exports = app;
module.exports.handler = serverless(app);
