const express = require("express");
const serverless = require("serverless-http");
const mysql = require('mysql2/promise');

const app = express();
const router = express.Router();
app.use(express.json());

router.get("/", async (req, res) => {
    const { user_info_id } = req.query;

    if (!user_info_id) {
        return res.status(400).json({ error: 'User info ID is required' });
    }

    try {
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

        const query = 'SELECT blendshape_json FROM Blendshape WHERE user_info_id = ?';
        const [rows] = await connection.execute(query, [user_info_id]);

        if (rows.length > 0) {
            res.json( rows[0].blendshape_json); 
        } else {
            res.status(404).json({ error: 'No data found for the provided User Info ID' });
        }

        connection.end();
    } catch (error) {
        console.error('Error executing database query:', error);
        res.status(500).json({ error: 'Internal Server Error', details: error.message });
    }
});

app.use(`/.netlify/functions/getBlendshape`, router);
module.exports = app;
module.exports.handler = serverless(app);
