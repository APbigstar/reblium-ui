const express = require("express");
const serverless = require("serverless-http");
const mysql = require('mysql2/promise');

const app = express();
const router = express.Router();

app.use(express.json({ limit: '10mb' })); // Parse the request body as JSON

router.post("/", async (req, res) => {
    // Log received request body for debugging
    console.log("Received request body:", req.body);

    // Retrieve environment variables for database connection
    const host = process.env.DB_HOST;
    const user = process.env.DB_USER;
    const password = process.env.DB_PASSWORD;
    const database = process.env.DB_DATABASE;

    // Validate required fields
    const { Avatar_Name, Avatar_Image, Avatar, user_info_id, Face_Albedo, Body_Albedo } = req.body;
    if (typeof Avatar_Name === 'undefined' || typeof Avatar_Image === 'undefined' || typeof Avatar === 'undefined' || typeof user_info_id === 'undefined' || typeof Face_Albedo === 'undefined' || typeof Body_Albedo === 'undefined') {
        console.error('Missing required fields:', { Avatar_Name, Avatar_Image, Avatar, user_info_id });
        return res.status(400).json({ error: 'One or more required fields are missing' });
    }

    try {
        // Create a database connection
        const connection = await mysql.createConnection({
            host: host,
            user: user,
            password: password,
            database: database,
        });

        // Execute database query
        const addAvatarQuery = 'INSERT INTO PersonalizedAvatar (Avatar_Name, Avatar_Image, Avatar, User_Info_id, Face_Albedo, Body_Albedo) VALUES (?, ?, ?, ?, ?, ?)';
        const [result] = await connection.execute(addAvatarQuery, [Avatar_Name, Avatar_Image, Avatar, user_info_id, Face_Albedo, Body_Albedo]);

        // Get the inserted avatar_id
        const avatarId = result.insertId;

        // Send the inserted avatar_id in the response
        res.json({ message: 'Avatar added successfully', saveavatar: avatarId });
    } catch (error) {
        console.error('Error executing database query:', JSON.stringify(error, null, 2));
        res.status(500).json({ error: 'Error processing the request', details: error.toString() });
    } finally {
        // Close the database connection
        if (connection && connection.end) connection.end();
    }
});

// Mount the router at the base path for your function
app.use(`/.netlify/functions/PersonalizedAvatar`, router);

// Export the app wrapped with serverless-http
module.exports = app;
module.exports.handler = serverless(app);
