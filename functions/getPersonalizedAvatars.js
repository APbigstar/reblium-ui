const express = require("express");
const serverless = require("serverless-http");
const mysql = require('mysql2/promise');

const app = express();
const router = express.Router();

router.get("/", async (req, res) => {
  // Retrieve environment variables for database connection
  const host = process.env.DB_HOST;
  const user = process.env.DB_USER;
  const password = process.env.DB_PASSWORD;
  const database = process.env.DB_DATABASE;

  // Create a database connection
  const connection = await mysql.createConnection({
    host: host,
    user: user,
    password: password,
    database: database,
  });

  try {
    // Get the user_info_id from the query parameters
    const { user_info_id } = req.query;
    // Updated query to include new columns: submission_time, Face_Albedo, and Body_Albedo
    const fetchAvatarsQuery = 'SELECT id, Avatar_Name, Avatar_Image, Avatar, submission_time, Face_Albedo, Body_Albedo FROM PersonalizedAvatar WHERE User_Info_id = ?';
    const [rows] = await connection.execute(fetchAvatarsQuery, [user_info_id]);
    res.json(rows);
  } catch (error) {
    console.error('Error executing database query:', error);
    res.status(500).json({ error: 'Error processing the request', details: error.message });
  } finally {
    // Close the database connection
    connection.end();
  }
});

// Mount the router at the base path for your function
app.use(`/.netlify/functions/getPersonalizedAvatars`, router);

// Export the app wrapped with serverless-http
module.exports = app;
module.exports.handler = serverless(app);
